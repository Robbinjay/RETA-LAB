'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Mail,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Send,
  Sparkles,
  Server,
  Key,
  ExternalLink,
  ArrowLeft,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

export default function EmailDiagnosticsPage() {
  const [loading, setLoading] = useState(true);
  const [diagData, setDiagData] = useState<any>(null);
  const [testEmail, setTestEmail] = useState('');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  // Custom credentials testing form
  const [showCustomTest, setShowCustomTest] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customPassword, setCustomPassword] = useState('');
  const [customHost, setCustomHost] = useState('smtppro.zoho.eu');
  const [customPort, setCustomPort] = useState('465');
  const [probing, setProbing] = useState(false);
  const [probeResult, setProbeResult] = useState<any>(null);

  const fetchDiagnostics = async () => {
    try {
      const res = await fetch('/api/email/diagnostics');
      const data = await res.json();
      setDiagData(data);
    } catch (err: any) {
      setDiagData({ status: 'error', message: err?.message || 'Failed to fetch diagnostics' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetch('/api/email/diagnostics')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setDiagData(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setDiagData({ status: 'error', message: err?.message || 'Failed to fetch diagnostics' });
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/email/diagnostics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testEmail: testEmail.trim() || undefined,
          customUser: customEmail.trim() || undefined,
          customPass: customPassword.trim() || undefined,
          customHost: customHost.trim() || undefined,
          customPort: customPort || undefined,
        }),
      });

      const data = await res.json();
      setTestResult(data);
      if (data.success) {
        fetchDiagnostics();
      }
    } catch (err: any) {
      setTestResult({ success: false, error: err?.message || 'Test request failed.' });
    } finally {
      setTesting(false);
    }
  };

  const handleAutoProbe = async () => {
    setProbing(true);
    setProbeResult(null);

    try {
      const res = await fetch('/api/email/diagnostics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          probeAll: true,
          customUser: customEmail.trim() || undefined,
          customPass: customPassword.trim() || undefined,
        }),
      });

      const data = await res.json();
      setProbeResult(data);
    } catch (err: any) {
      setProbeResult({ error: err?.message || 'Probe request failed.' });
    } finally {
      setProbing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6">
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Checkout
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-xs font-bold">
            <Server className="w-3.5 h-3.5" /> Zoho SMTP Diagnostics Console
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Zoho Mail Integration & Diagnostics
          </h1>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Verify your Zoho Mail SMTP connectivity, test automated customer and administrator order notifications, and resolve any authentication issues.
          </p>
        </div>

        {/* Current Environment Status Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  diagData?.status === 'connected'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : diagData?.status === 'unconfigured'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {diagData?.status === 'connected' ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : diagData?.status === 'unconfigured' ? (
                  <AlertCircle className="w-6 h-6" />
                ) : (
                  <Mail className="w-6 h-6" />
                )}
              </div>
              <div>
                <h2 className="text-base font-bold text-white">
                  SMTP Connection Status:{' '}
                  <span
                    className={
                      diagData?.status === 'connected'
                        ? 'text-emerald-400'
                        : diagData?.status === 'unconfigured'
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }
                  >
                    {loading
                      ? 'Checking connection...'
                      : diagData?.status === 'connected'
                      ? 'Connected & Authenticated'
                      : diagData?.status === 'unconfigured'
                      ? 'Credentials Not Configured'
                      : 'Connection / Authentication Error'}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {diagData?.message || 'Inspecting environment configuration...'}
                </p>
              </div>
            </div>

            <button
              onClick={fetchDiagnostics}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {/* Environment Variables Table */}
          {diagData?.envSummary && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">ZOHO_EMAIL</span>
                <span className="font-mono text-white font-semibold">
                  {diagData.envSummary.zohoEmailMasked}
                </span>
                <span className={`block text-[10px] mt-1 ${diagData.envSummary.zohoEmailConfigured ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {diagData.envSummary.zohoEmailConfigured ? '● Active' : '○ Missing'}
                </span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">ZOHO_PASSWORD</span>
                <span className="font-mono text-white font-semibold">
                  {diagData.envSummary.zohoPasswordConfigured
                    ? `•••••••• (${diagData.envSummary.zohoPasswordLength} chars)`
                    : 'Not set'}
                </span>
                <span className={`block text-[10px] mt-1 ${diagData.envSummary.zohoPasswordConfigured ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {diagData.envSummary.zohoPasswordConfigured ? '● Configured' : '○ Missing'}
                </span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">ZOHO_HOST</span>
                <span className="font-mono text-primary-400 font-semibold">
                  {diagData.envSummary.zohoHost}
                </span>
                <span className="text-slate-500 block text-[10px] mt-1">
                  Port {diagData.envSummary.zohoPort}
                </span>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">ADMIN_EMAIL</span>
                <span className="font-mono text-white font-semibold">
                  {diagData.envSummary.adminEmailMasked}
                </span>
                <span className="text-slate-500 block text-[10px] mt-1">Order Alert Inbox</span>
              </div>
            </div>
          )}

          {/* Interpreted Error Banner */}
          {diagData?.interpretedError && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 text-xs text-rose-200 space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-rose-300 font-bold mb-1">Issue Detected:</strong>
                  {diagData.interpretedError}
                </div>
              </div>
              {diagData.rawError && (
                <div className="mt-2 p-2 bg-slate-950/80 rounded border border-rose-500/20 font-mono text-[11px] text-slate-300 break-all">
                  Raw SMTP Response: {diagData.rawError}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Live Test Email Sender */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-primary-400" /> Send Live Test Email
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Dispatch a test message using your Zoho credentials to confirm receipt in your inbox.
            </p>
          </div>

          <form onSubmit={handleSendTestEmail} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Recipient email address (e.g. your personal or admin email)"
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                disabled={testing}
                className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-md whitespace-nowrap"
              >
                {testing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Dispatching...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Test Email
                  </>
                )}
              </button>
            </div>

            {testResult && (
              <div
                className={`p-4 rounded-xl text-xs border ${
                  testResult.success
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                }`}
              >
                <div className="flex items-start gap-2">
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <strong>{testResult.success ? 'Success!' : 'Dispatch Failed:'}</strong>
                    <p>{testResult.message || testResult.interpretedError || testResult.error}</p>
                    {testResult.messageId && (
                      <p className="font-mono text-[10px] text-slate-400">Message ID: {testResult.messageId}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </form>

          {/* Quick Toggle for Custom Credentials Testing */}
          <div className="pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowCustomTest(!showCustomTest)}
              className="text-xs text-primary-400 hover:text-primary-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>{showCustomTest ? '▲ Hide Custom Credentials Tester' : '▼ Test Alternative Credentials / Endpoints Directly'}</span>
            </button>

            {showCustomTest && (
              <div className="mt-4 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <p className="text-xs text-slate-300">
                  Enter your credentials below to test against various Zoho servers without waiting for environment restarts:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Zoho Email Address</label>
                    <input
                      type="email"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="e.g. orders@yourdomain.co.uk or user@zoho.eu"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Zoho App Password (16 chars)</label>
                    <input
                      type="password"
                      value={customPassword}
                      onChange={(e) => setCustomPassword(e.target.value)}
                      placeholder="xxxx xxxx xxxx xxxx"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">SMTP Host</label>
                    <select
                      value={customHost}
                      onChange={(e) => setCustomHost(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                    >
                      <option value="smtppro.zoho.eu">smtppro.zoho.eu (Zoho Workplace EU - Recommended for UK)</option>
                      <option value="smtppro.zoho.com">smtppro.zoho.com (Zoho Workplace Global)</option>
                      <option value="smtp.zoho.eu">smtp.zoho.eu (Zoho Personal EU)</option>
                      <option value="smtp.zoho.com">smtp.zoho.com (Zoho Personal Global)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">SMTP Port</label>
                    <select
                      value={customPort}
                      onChange={(e) => setCustomPort(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                    >
                      <option value="465">Port 465 (SSL - Recommended)</option>
                      <option value="587">Port 587 (STARTTLS)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleAutoProbe}
                    disabled={probing}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-primary-400" />
                    {probing ? 'Probing all endpoints...' : 'Auto-Detect Working Server'}
                  </button>
                </div>

                {probeResult && (
                  <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-2">
                    <strong className="text-white block">{probeResult.recommendation}</strong>
                    {probeResult.allResults && (
                      <div className="space-y-1 mt-2">
                        {probeResult.allResults.map((r: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between text-[11px] font-mono">
                            <span>{r.config}</span>
                            <span className={r.success ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                              {r.success ? '✅ Authenticated' : '❌ Failed'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Zoho Setup & App Password Guide */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-xs text-slate-300 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-primary-400" /> Essential Zoho Mail Setup Instructions
          </h3>

          <ol className="list-decimal pl-5 space-y-2.5 leading-relaxed text-slate-400">
            <li>
              <strong className="text-slate-200">Generate an Application-Specific Password:</strong> Zoho blocks standard passwords for SMTP connections. Go to{' '}
              <a
                href="https://accounts.zoho.eu/home#security/app_password"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:underline inline-flex items-center gap-1 font-semibold"
              >
                Zoho App Passwords <ExternalLink className="w-3 h-3" />
              </a>{' '}
              (or <a href="https://accounts.zoho.com/home#security/app_password" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:underline">accounts.zoho.com</a>), generate a password named &quot;Retatrutide Checkout&quot;, and copy the 16 characters into <code className="text-primary-300 font-mono">ZOHO_PASSWORD</code>.
            </li>
            <li>
              <strong className="text-slate-200">Ensure Outgoing SMTP is Enabled:</strong> In your Zoho Mail Control Panel, navigate to <em>Mail Accounts</em> &gt; <em>User Details</em> &gt; <em>Mail Configuration</em> and verify that <strong>SMTP Access</strong> is switched ON.
            </li>
            <li>
              <strong className="text-slate-200">Matching Sender Address:</strong> The <code className="text-primary-300 font-mono">ZOHO_EMAIL</code> address must match your authenticated Zoho user or an authorized sending alias.
            </li>
          </ol>
        </div>

      </div>
    </div>
  );
}
