'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, CreditCard, Sparkles, Check, Copy, Download, Share2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Emoji } from '../ui/emoji';

type PaywallActionType = 'share' | 'export' | 'copy-link' | 'send' | 'preview-unlock';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType?: PaywallActionType;
  cardId?: string | null;
  previewHref?: string;
}

const actionConfig: Record<PaywallActionType, {
  icon: React.ReactNode;
  title: string;
  description: string;
  ctaPrimary: string;
}> = {
  share: {
    icon: <Share2 className="w-6 h-6" />,
    title: 'Siap Kirim Kejutan ke Mereka?',
    description: 'Kirim kartu personal ini sebagai hadiah ulang tahun satu kali untuk orang spesial. Mereka akan dapat pengalaman buka amplop animasi yang tak terlupakan.',
    ctaPrimary: 'Kirim Kartu Sekarang',
  },
  export: {
    icon: <Download className="w-6 h-6" />,
    title: 'Unduh & Kirim Tanpa Watermark',
    description: 'Simpan kartu hasil desainmu dalam kualitas jernih untuk sekali pengiriman ke penerima. Tanpa watermark, pesanmu jadi pusat perhatian.',
    ctaPrimary: 'Buka Kunci & Unduh',
  },
  'copy-link': {
    icon: <Copy className="w-6 h-6" />,
    title: 'Salin Link & Kirim ke Penerima',
    description: 'Aktifkan link unik kartu ini, lalu kirim sekali saja ke orang tersayang. Mereka dapat membukanya kapan saja untuk melihat kejutanmu.',
    ctaPrimary: 'Aktifkan & Salin Link',
  },
  send: {
    icon: <ExternalLink className="w-6 h-6" />,
    title: 'Kirim Kartu Personal ke Mereka',
    description: 'Satu langkah lagi, dan hadiah ulang tahun paling personal ini sampai ke tangan mereka lewat link unik yang hanya untuk mereka.',
    ctaPrimary: 'Kirim Sekarang',
  },
  'preview-unlock': {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Buka Kunci & Kirim Kartu Ini',
    description: 'Kartu ini sudah siap membuat mereka tersenyum lebar. Lepaskan watermark-nya dan kirim sekali saja ke penerima hari ini.',
    ctaPrimary: 'Buka Kunci & Kirim',
  },
};

export function PaywallModal({
  isOpen,
  onClose,
  actionType = 'preview-unlock',
  cardId = null,
  previewHref
}: PaywallModalProps) {
  const config = actionConfig[actionType];
  const checkoutHref = previewHref || (cardId ? `/preview?id=${cardId}` : '/create');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="bg-gradient-to-br from-amber-500 via-rose-500 to-amber-500 p-6 pb-8 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
                    Hampir Jadi!
                  </span>
                  <h3 className="text-xl font-black mt-1 leading-tight">
                    {config.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-6 -mt-4">
              <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5 mb-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    {config.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {config.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between px-1 mb-1">
                  <h4 className="text-[11px] uppercase font-black tracking-widest text-slate-400">
                    Kamu dapatkan sekali kirim:
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] line-through text-slate-400 font-bold">$8</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black uppercase tracking-wide">
                      Diskon 50%
                    </span>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span><strong>Kartu Tanpa Watermark</strong> — siap dikirim ke penerima</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span><strong>1 Link Unik Eksklusif</strong> untuk orang spesialmu</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span><strong>Animasi Buka Amplop</strong> dengan konfeti perayaan</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span><strong>Link Masuk Email</strong> otomatis dalam hitungan detik</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <Link
                  href={checkoutHref}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-sm shadow-xl shadow-rose-500/20 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{config.ctaPrimary}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-black flex items-center gap-1.5">
                    <span className="line-through opacity-60 text-[9px]">$8</span>
                    <span>$4</span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Belum Sekarang, Lanjut Edit
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center mt-4">
                <span className="inline-flex items-center gap-1.5">
                  <Emoji emoji="💳" size={14} />
                  <span>Pembayaran aman via Lemon Squeezy • Sekali bayar untuk sekali kirim</span>
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
