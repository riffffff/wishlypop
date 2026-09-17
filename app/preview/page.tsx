'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CardRenderer } from '@/components/card/card-renderer';
import { PaywallModal } from '@/components/card/paywall-modal';
import { CardData } from '@/types/card';
import { WishlyPopLogo } from '@/components/brand/wishlypop-logo';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Check, 
  Lock, 
  Mail, 
  Edit3, 
  CreditCard,
  Loader2,
  Copy,
  Share2,
  Download,
  Send
} from 'lucide-react';

function PreviewContent() {
  const searchParams = useSearchParams();
  const cardId = searchParams.get('id');

  const [card, setCard] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(Boolean(cardId));
  const [error, setError] = useState<string | null>(cardId ? null : 'Card ID not found.');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallAction, setPaywallAction] = useState<
    'share' | 'export' | 'copy-link' | 'send' | 'preview-unlock'
  >('preview-unlock');

  useEffect(() => {
    if (!cardId) return;

    let isMounted = true;
    async function loadCard() {
      try {
        const res = await fetch(`/api/cards?cardId=${cardId}`);
        const data = await res.json();
        if (!isMounted) return;

        if (!res.ok || !data.success) {
          setError(data.error || 'Failed to load the card.');
        } else {
          setCard(data.card);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError((err as Error).message || 'Failed to load the preview data.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCard();
    return () => {
      isMounted = false;
    };
  }, [cardId]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      alert('Please enter a valid email address to receive the card link.');
      return;
    }

    setIsProcessingCheckout(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardId,
          email: customerEmail.trim()
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to prepare checkout.');
      }

      // Redirect to Lemon Squeezy checkout URL
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('Checkout URL is not available.');
      }
    } catch (err: unknown) {
      console.error(err);
      alert((err as Error).message || 'Something went wrong while processing checkout.');
      setIsProcessingCheckout(false);
    }
  };

  const openPaywall = (action: 'share' | 'export' | 'copy-link' | 'send' | 'preview-unlock') => {
    setPaywallAction(action);
    setPaywallOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-sm font-medium text-slate-600">Loading card preview...</p>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">Card Not Found</h2>
        <p className="text-sm text-slate-600 max-w-md">{error || 'This card has not been created or has expired.'}</p>
        <Link
          href="/create"
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow transition-colors"
        >
          Create a New Card
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Column: Watermarked Preview (lg:col-span-6) */}
      <div className="lg:col-span-6 flex flex-col items-center space-y-3">
        <div className="w-full flex items-center justify-between mb-1 px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Preview
          </span>
          <Link
            href={`/create`}
            className="text-xs font-semibold text-slate-600 hover:text-amber-600 flex items-center gap-1 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Card
          </Link>
        </div>

        {/* Card Renderer WITHOUT Watermark (user sees clean version) */}
        <div className="w-full p-4 rounded-3xl bg-amber-50/50 border border-amber-100 flex justify-center shadow-inner">
          <CardRenderer 
            card={card} 
            showWatermark={false}
          />
        </div>

        <p className="text-[11px] text-slate-400 text-center">
          Downloaded cards include a watermark. It disappears after activation.
        </p>

        {/* Share Action Buttons (All trigger Paywall) */}
        <div className="w-full space-y-2">
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => openPaywall('copy-link')}
              className="py-3 px-2 rounded-2xl bg-white border border-slate-200 hover:bg-amber-50 hover:border-amber-200 text-slate-600 hover:text-amber-700 font-bold text-[10px] flex flex-col items-center gap-1 transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Link</span>
            </button>
            <button
              type="button"
              onClick={() => openPaywall('share')}
              className="py-3 px-2 rounded-2xl bg-white border border-slate-200 hover:bg-amber-50 hover:border-amber-200 text-slate-600 hover:text-amber-700 font-bold text-[10px] flex flex-col items-center gap-1 transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button
              type="button"
              onClick={() => openPaywall('export')}
              className="py-3 px-2 rounded-2xl bg-white border border-slate-200 hover:bg-amber-50 hover:border-amber-200 text-slate-600 hover:text-amber-700 font-bold text-[10px] flex flex-col items-center gap-1 transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download HD</span>
            </button>
            <button
              type="button"
              onClick={() => openPaywall('send')}
              className="py-3 px-2 rounded-2xl bg-white border border-slate-200 hover:bg-amber-50 hover:border-amber-200 text-slate-600 hover:text-amber-700 font-bold text-[10px] flex flex-col items-center gap-1 transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Checkout Box & Trust Signals (lg:col-span-6) */}
      <div className="lg:col-span-6 space-y-6">
        
        {/* Order Summary Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-xl space-y-6">
          <div className="flex items-start justify-between border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-600">
                Birthday Card Ready to Send
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                WishlyPop Birthday Ecard
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                For: <span className="font-semibold text-slate-800">{card.recipientName}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1.5 mb-0.5">
                <span className="text-[11px] line-through text-slate-400 font-bold">$8</span>
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider">
                  50% OFF
                </span>
              </div>
              <div className="mt-1">
                <span className="text-3xl font-black text-slate-900">$4</span>
                <span className="text-xs font-bold text-slate-400 block">/ card</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 block mt-0.5 uppercase tracking-wider">
                One-time delivery
              </span>
            </div>
          </div>

          {/* Value inclusions */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Included with your purchase:
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>1 Exclusive Personal Link</strong> just for <em>{card.recipientName}</em></span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Animated Envelope Reveal</strong> with celebratory confetti</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Watermark-free Card</strong> — your message takes center stage</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span><strong>Automatic Email Delivery</strong> — ready to forward to the recipient</span>
              </li>
            </ul>
          </div>

          {/* Buyer Email Input Form */}
          <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-slate-100">
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-amber-500" />
                Email to receive your card link *
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-800 text-sm outline-hidden transition-all"
              />
              <p className="text-[11px] text-slate-400">
                No account needed. The card link will be sent to this email as soon as checkout is complete.
              </p>
            </div>

            <button
              type="submit"
              disabled={isProcessingCheckout}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-rose-500/20 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              {isProcessingCheckout ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Preparing your card link...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Send Interactive Card Now</span>
                  <span className="px-2.5 py-0.5 rounded-xl bg-white/20 text-[11px] font-black flex items-center gap-1.5">
                    <span className="line-through opacity-60 text-[9px]">$8</span>
                    <span>$4</span>
                  </span>
                </>
              )}
            </button>
          </form>

          {/* Trust badges */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure payment via Lemon Squeezy</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <span>Visa • Mastercard • Apple Pay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        actionType={paywallAction}
        cardId={cardId}
      />
    </div>
  );
}

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-100/60 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <Link
          href="/create"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Editor</span>
        </Link>
        <WishlyPopLogo compact />
      </header>

      {/* Main Content with Suspense */}
      <main className="flex-1">
        <Suspense fallback={
          <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            <p className="text-sm font-medium text-slate-600">Loading...</p>
          </div>
        }>
          <PreviewContent />
        </Suspense>
      </main>
    </div>
  );
}
