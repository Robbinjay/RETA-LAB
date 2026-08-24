import { NextRequest, NextResponse } from 'next/server';
import {
  getZohoTransporter,
  createTransporter,
  ZOHO_CONFIGS,
  interpretSmtpError,
} from '@/lib/email-service';

export async function GET() {
  const envEmail = process.env.ZOHO_EMAIL?.trim();
  const envPass = process.env.ZOHO_PASSWORD?.trim();
  const envHost = process.env.ZOHO_HOST?.trim() || 'smtppro.zoho.eu';
  const envPort = parseInt(process.env.ZOHO_PORT?.trim() || '465', 10);
  const envAdmin = process.env.ADMIN_EMAIL?.trim() || envEmail;

  const hasCredentials = Boolean(envEmail && envPass);

  const envSummary = {
    zohoEmailConfigured: Boolean(envEmail),
    zohoEmailMasked: envEmail ? maskEmail(envEmail) : 'Not configured',
    zohoPasswordConfigured: Boolean(envPass),
    zohoPasswordLength: envPass ? envPass.length : 0,
    zohoHost: envHost,
    zohoPort: envPort,
    adminEmailConfigured: Boolean(envAdmin),
    adminEmailMasked: envAdmin ? maskEmail(envAdmin) : 'Not configured',
  };

  if (!hasCredentials) {
    return NextResponse.json({
      status: 'unconfigured',
      message: 'Zoho Mail credentials (ZOHO_EMAIL / ZOHO_PASSWORD) are not set in environment variables.',
      envSummary,
      suggestedFix: 'Set ZOHO_EMAIL, ZOHO_PASSWORD (App Password), ZOHO_HOST, and ZOHO_PORT in the Settings panel.',
    });
  }

  // Run SMTP Handshake Verification
  try {
    const transporter = getZohoTransporter();
    if (!transporter) {
      throw new Error('Could not create transporter.');
    }

    // Verify SMTP connection
    await transporter.verify();

    return NextResponse.json({
      status: 'connected',
      message: `Successfully connected and authenticated with Zoho SMTP server (${envHost}:${envPort})!`,
      envSummary,
      activeConfig: {
        host: envHost,
        port: envPort,
        user: envEmail,
      },
    });
  } catch (err: any) {
    const detailedMessage = interpretSmtpError(err);

    return NextResponse.json({
      status: 'error',
      message: `Failed to connect or authenticate with Zoho SMTP server (${envHost}:${envPort})`,
      rawError: err?.message || String(err),
      interpretedError: detailedMessage,
      envSummary,
      troubleshooting: {
        probableCauses: [
          'Zoho requires an App Password instead of regular password if 2FA or security policies are enabled.',
          'Region mismatch: check whether your Zoho account is EU (smtppro.zoho.eu) or Global (smtppro.zoho.com).',
          'Port mismatch: try Port 465 (SSL) or Port 587 (STARTTLS).',
          'For personal accounts without custom domain, use smtp.zoho.eu / smtp.zoho.com instead of smtppro.',
        ],
        directLink: 'https://accounts.zoho.eu/home#security/app_password',
      },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { testEmail, customHost, customPort, customUser, customPass, probeAll } = body;

    const user = customUser?.trim() || process.env.ZOHO_EMAIL?.trim();
    const pass = customPass?.trim() || process.env.ZOHO_PASSWORD?.trim();
    const host = customHost?.trim() || process.env.ZOHO_HOST?.trim() || 'smtppro.zoho.eu';
    const port = parseInt(String(customPort || process.env.ZOHO_PORT || '465'), 10);
    const recipient = testEmail?.trim() || user;

    if (!user || !pass) {
      return NextResponse.json(
        { error: 'Zoho user email and app password are required to test the connection.' },
        { status: 400 }
      );
    }

    // If requested to probe all configurations to find which one works
    if (probeAll) {
      const results: Array<{
        config: string;
        host: string;
        port: number;
        success: boolean;
        error?: string;
      }> = [];

      for (const cfg of ZOHO_CONFIGS) {
        try {
          const t = createTransporter(cfg.host, cfg.port, user, pass);
          await t.verify();
          results.push({
            config: cfg.label,
            host: cfg.host,
            port: cfg.port,
            success: true,
          });
          // Found a working configuration!
          break;
        } catch (e: any) {
          results.push({
            config: cfg.label,
            host: cfg.host,
            port: cfg.port,
            success: false,
            error: e?.message || String(e),
          });
        }
      }

      const workingConfig = results.find((r) => r.success);

      return NextResponse.json({
        probeCompleted: true,
        workingConfig: workingConfig || null,
        allResults: results,
        recommendation: workingConfig
          ? `Recommended: Set ZOHO_HOST="${workingConfig.host}" and ZOHO_PORT="${workingConfig.port}"`
          : 'None of the tested Zoho endpoints authenticated. Please verify your Zoho App Password and that SMTP is enabled in your Zoho Mail admin settings.',
      });
    }

    // Send a real Test Email
    const transporter = createTransporter(host, port, user, pass);
    await transporter.verify();

    const timestamp = new Date().toUTCString();
    const info = await transporter.sendMail({
      from: `"Retatrutide Club Test" <${user}>`,
      to: recipient,
      subject: `✅ Zoho Mail Test Success - ${timestamp}`,
      html: `
        <div style="font-family: sans-serif; max-width: 550px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #0284c7; margin-top: 0;">✅ Zoho Mail SMTP Connected Successfully!</h2>
          <p style="font-size: 14px; color: #334155; line-height: 1.6;">
            This is an automated test email confirming that your Zoho Mail SMTP service is configured correctly for <strong>Retatrutide Club UK</strong>.
          </p>
          <div style="background: #f8fafc; border-radius: 8px; padding: 12px; font-size: 13px; font-family: monospace; color: #0f172a; margin: 16px 0;">
            <div><strong>Host:</strong> ${host}</div>
            <div><strong>Port:</strong> ${port}</div>
            <div><strong>Authenticated As:</strong> ${user}</div>
            <div><strong>Delivered To:</strong> ${recipient}</div>
            <div><strong>Timestamp:</strong> ${timestamp}</div>
          </div>
          <p style="font-size: 13px; color: #64748b;">
            All subsequent customer order confirmations and administrator notifications will be sent automatically through this connection.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: `Test email successfully sent to ${recipient} via ${host}:${port}!`,
      messageId: info.messageId,
    });
  } catch (err: any) {
    const interpreted = interpretSmtpError(err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'SMTP test failed',
        interpretedError: interpreted,
      },
      { status: 400 }
    );
  }
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  const maskedLocal = local.length > 2 ? `${local[0]}***${local[local.length - 1]}` : '***';
  return `${maskedLocal}@${domain}`;
}
