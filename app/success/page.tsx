'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Copy, Check, ExternalLink, Sparkles, Heart, Share2, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Emoji } from '../../components/ui/emoji';

function SuccessContent() {
  const searchParams = useSearchParams();
  const cardId = searchParams.get('id');
  const isSimulated = searchParams.get('simulated') === 'true';
  const emailParam = searchParams.get('email');

  const [copied, setCopied] = useState(false);
  const [activating, setActivating] = useState(isSimulated);

  useEffect(() => {
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    // If simulated checkout in development, automatically mark as paid
    if (isSimulated && cardId) {
      fetch(`/api/webhook/lemon-squeezy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meta: {
            event_name: 'order_created',
            custom_data: {
              card_id: cardId,
              email: emailParam || 'customer@example.com'
            }
          },
          data: {
            id: 'sim_order_' + Date.now(),
            attributes: {
              user_email: emailParam || 'customer@example.com'
            }
          }
        })
      }).finally(() => {
        setActivating(false);
      });
    }
  }, [cardId, isSimulated, emailParam]);

  const publicUrl = typeof window !== 'undefined' && cardId ? `${window.location.origin}/c/${cardId}` : `/c/${cardId}`;

  const handleCopy = () => {
    if (navigator?.clipboard && publicUrl) {
      navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
      {/* Icon Badge */}
      <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase font-extrabold tracking-widest text-amber-600 inline-flex items-center gap-1.5">
          <span>Pembayaran Berhasil Dikonfirmasi</span>
          <Emoji emoji="🎉" size={16} />
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Kartu Ulang Tahun Kamu Sudah Siap!
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Pengalaman kartu interaktif personal kini telah aktif tanpa watermark dan siap dibagikan ke orang tersayang.
        </p>
      </div>

      {activating && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 text-amber-800 text-xs font-semibold">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Mengaktifkan status kartu...</span>
        </div>
      )}

      {/* Share Box Card */}
      <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xl text-left space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-amber-500" />
            Link Kartu Unik Penerima:
          </label>
          <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
            Aktif Selamanya
          </span>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-50 border border-slate-200">
          <input
            type="text"
            readOnly
            value={publicUrl}
            className="flex-1 px-2 text-xs sm:text-sm text-slate-700 bg-transparent outline-hidden font-mono truncate"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Link</span>
              </>
            )}
          </button>
        </div>

        <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 text-xs text-amber-900 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Kirimkan link ini lewat WhatsApp, Instagram DM, atau iMessage. Saat penerima membukanya, mereka akan disambut animasi buka amplop kejutan!
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href={`/c/${cardId}`}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>Buka Halaman Kartu</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
          <Link
            href="/create"
            className="py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm text-center transition-colors"
          >
            Buat Kartu Baru
          </Link>
        </div>
      </div>

      <div className="text-xs text-slate-400 flex items-center justify-center gap-1">
        <span>Dibuat dengan</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        <span>di Wishly</span>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col justify-center py-12 px-4 sm:px-6">
      <Suspense fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
          <p className="text-sm font-medium text-slate-600">Menyiapkan konfirmasi...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
