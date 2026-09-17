'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CardRenderer } from '@/components/card/card-renderer';
import { TemplateSelector } from '@/components/editor/template-selector';
import { MessageBankModal } from '@/components/editor/message-bank-modal';
import { StyleControls } from '@/components/editor/style-controls';
import { PhotoUploader } from '@/components/editor/photo-uploader';
import { PaywallModal } from '@/components/card/paywall-modal';
import { CARD_TEMPLATES } from '@/lib/templates';
import { CardData, TemplateId, CardStyling } from '@/types/card';
import { WishlyPopLogo } from '@/components/brand/wishlypop-logo';
import { 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  Eye,
  Loader2,
  Copy,
  Download,
  Share2
} from 'lucide-react';

export default function CreateCardPage() {
  const router = useRouter();

  // Selected template & styling
  const [templateId, setTemplateId] = useState<TemplateId>('minimalist-warm');
  const activeTemplate = CARD_TEMPLATES.find((t) => t.id === templateId) || CARD_TEMPLATES[0];

  const [recipientName, setRecipientName] = useState('Sarah');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState(
    'Happy Birthday to my favorite human! May this year bring you all the love, happiness, and adventures you deserve!'
  );
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [styling, setStyling] = useState<CardStyling>(activeTemplate.defaultStyling);

  // UI state
  const [isMessageBankOpen, setIsMessageBankOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [cardId, setCardId] = useState<string | null>(null);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallAction, setPaywallAction] = useState<
    'share' | 'export' | 'copy-link' | 'send' | 'preview-unlock'
  >('preview-unlock');

  // Template switch handler
  const handleTemplateChange = (newId: TemplateId) => {
    setTemplateId(newId);
    const tmpl = CARD_TEMPLATES.find((t) => t.id === newId);
    if (tmpl) {
      setStyling(tmpl.defaultStyling);
    }
  };

  // Construct card object for live preview
  const previewCard: CardData = {
    cardId: cardId || 'preview-draft',
    templateId,
    recipientName: recipientName.trim(),
    senderName: senderName.trim() || undefined,
    message: message.trim(),
    photoUrl,
    styling,
    isPaid: false
  };

  // Save draft and proceed to preview
  const handleProceedToPreview = async () => {
    if (!recipientName.trim()) {
      alert('Please enter the recipient name.');
      return;
    }
    if (!message.trim()) {
      alert('Please write or choose a birthday message.');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId,
          recipientName,
          senderName,
          message,
          photoUrl,
          styling,
          existingCardId: cardId
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save the card.');
      }

      setCardId(data.cardId);
      router.push(`/preview?id=${data.cardId}`);
    } catch (err) {
      console.error(err);
      alert('Something went wrong while preparing the preview. Please try again.');
      setIsSaving(false);
    }
  };

  const openPaywall = (action: 'share' | 'export' | 'copy-link' | 'send' | 'preview-unlock') => {
    setPaywallAction(action);
    setPaywallOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-amber-100/60 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-amber-50 transition-colors"
            title="Back to Home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <WishlyPopLogo compact />
            <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Birthday Card Editor</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Live Edit
              </span>
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={handleProceedToPreview}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-500/20 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Preparing...</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span>Preview Card</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </>
          )}
        </button>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Panel: All editor controls (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
          {/* Message */}
          <div className="bg-white rounded-3xl p-6 border border-amber-100/80 shadow-sm space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-800 flex items-center justify-between">
                  <span>Recipient Name *</span>
                  <span className="text-xs text-slate-400 font-normal">Example: Sarah, Mom, Dave</span>
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Enter the birthday person's name..."
                  maxLength={40}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-800 text-sm outline-hidden transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-800">
                    Birthday Message *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsMessageBankOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Choose from Message Bank</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a special birthday message here..."
                  maxLength={300}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-800 text-sm outline-hidden transition-all leading-relaxed"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Choose from 24 ready-to-use messages if you need inspiration.</span>
                  <span>{message.length}/300</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="text-sm font-semibold text-slate-800 flex items-center justify-between">
                  <span>Sender Name (Optional)</span>
                  <span className="text-xs text-slate-400 font-normal">Example: Alex, Your Bestie</span>
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Who is this card from? (optional)"
                  maxLength={40}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-800 text-sm outline-hidden transition-all"
                />
              </div>
          </div>

          {/* Template */}
          <div className="bg-white rounded-3xl p-6 border border-amber-100/80 shadow-sm">
            <TemplateSelector
              selectedId={templateId}
              onSelect={handleTemplateChange}
            />
          </div>

          {/* Photo */}
          <div className="bg-white rounded-3xl p-6 border border-amber-100/80 shadow-sm">
            <PhotoUploader
              photoUrl={photoUrl}
              onPhotoChange={(url) => setPhotoUrl(url)}
            />
          </div>

          {/* Style */}
          <div className="bg-white rounded-3xl p-6 border border-amber-100/80 shadow-sm">
            <StyleControls
              styling={styling}
              availableColors={activeTemplate.colorPalette}
              onChange={(newStyling) => setStyling(newStyling)}
            />
          </div>

          {/* Bottom Action Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Ready to send?
              </h4>
            </div>
            <button
              type="button"
              onClick={handleProceedToPreview}
              disabled={isSaving}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Preparing...</span>
                </>
              ) : (
                <>
                  <span>View Card Preview</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Panel: Sticky Live Preview (lg:col-span-5) */}
        <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-24 space-y-3">
          <div className="text-center mb-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Live Preview
            </span>
          </div>

          <div className="flex justify-center p-2 sm:p-4 rounded-3xl bg-amber-50/40 border border-amber-100/60 shadow-inner relative">
            <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-rose-500/90 text-white text-[9px] font-black uppercase tracking-wider shadow-md">
              Preview
            </div>
            <CardRenderer 
              card={previewCard} 
              showWatermark={false}
            />
          </div>

          {/* Quick Action Buttons (All trigger Paywall) */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => openPaywall('copy-link')}
              className="py-2.5 px-2 rounded-2xl bg-white border border-slate-200 hover:bg-amber-50 hover:border-amber-200 text-slate-600 hover:text-amber-700 font-bold text-[11px] flex flex-col items-center gap-1 transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Link</span>
            </button>
            <button
              type="button"
              onClick={() => openPaywall('share')}
              className="py-2.5 px-2 rounded-2xl bg-white border border-slate-200 hover:bg-amber-50 hover:border-amber-200 text-slate-600 hover:text-amber-700 font-bold text-[11px] flex flex-col items-center gap-1 transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button
              type="button"
              onClick={() => openPaywall('export')}
              className="py-2.5 px-2 rounded-2xl bg-white border border-slate-200 hover:bg-amber-50 hover:border-amber-200 text-slate-600 hover:text-amber-700 font-bold text-[11px] flex flex-col items-center gap-1 transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </main>

      {/* Message Bank Modal */}
      <MessageBankModal
        isOpen={isMessageBankOpen}
        onClose={() => setIsMessageBankOpen(false)}
        onSelectMessage={(text) => setMessage(text)}
      />

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
