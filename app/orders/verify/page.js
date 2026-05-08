'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function VerifyContent() {
  const params    = useSearchParams();
  const reference = params.get('reference') || params.get('trxref');
  const [status, setStatus] = useState('loading'); // loading | success | failed

  useEffect(() => {
    if (!reference) { setStatus('failed'); return; }
    fetch(`${API}/orders/verify?reference=${reference}`)
      .then(r => r.json())
      .then(data => {
        setStatus(data.order?.status === 'paid' || data.success ? 'success' : 'failed');
      })
      .catch(() => setStatus('failed'));
  }, [reference]);

  if (status === 'loading') return (
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-14 h-14 text-forest-600 animate-spin"/>
      <p className="font-body text-ink-muted">Verifying your payment…</p>
    </div>
  );

  if (status === 'success') return (
    <div className="flex flex-col items-center gap-6 text-center">
      <CheckCircle className="w-16 h-16 text-forest-600"/>
      <div>
        <h1 className="font-display text-3xl font-bold text-forest-800">Payment Successful!</h1>
        <p className="font-body text-ink-muted mt-2 leading-relaxed">
          Thank you for your purchase. A confirmation email has been sent to you.<br/>
          Your books will be delivered to your provided address.
        </p>
        {reference && <p className="text-xs font-body text-ink-light mt-3">Reference: {reference}</p>}
      </div>
      <Link href="/bookstore"
        className="px-6 py-3 bg-forest-700 hover:bg-forest-600 text-cream-50 font-body font-semibold text-sm rounded-xl transition-colors">
        Continue Shopping
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <XCircle className="w-16 h-16 text-red-500"/>
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">Payment Failed</h1>
        <p className="font-body text-ink-muted mt-2">
          Your payment could not be verified. If money was deducted, please contact us with your reference number.
        </p>
        {reference && <p className="text-xs font-body text-ink-light mt-3">Reference: {reference}</p>}
      </div>
      <div className="flex gap-3">
        <Link href="/bookstore"
          className="px-5 py-2.5 border border-cream-300 hover:bg-cream-50 text-ink-DEFAULT font-body text-sm rounded-xl transition-colors">
          Back to Shop
        </Link>
        <Link href="/contact"
          className="px-5 py-2.5 bg-forest-700 hover:bg-forest-600 text-cream-50 font-body text-sm rounded-xl transition-colors">
          Contact Us
        </Link>
      </div>
    </div>
  );
}

export default function OrderVerifyPage() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl border border-cream-200 shadow-lg p-12 max-w-lg w-full">
        <Suspense fallback={<Loader2 className="w-10 h-10 text-forest-500 animate-spin mx-auto"/>}>
          <VerifyContent/>
        </Suspense>
      </div>
    </div>
  );
}