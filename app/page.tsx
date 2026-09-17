import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Heart, 
  Zap, 
  BookOpen, 
  Smile, 
  ShieldCheck, 
  Cake,
  PartyPopper
} from 'lucide-react';
import { CardRenderer } from '@/components/card/card-renderer';
import { CardData } from '@/types/card';
import { WishlyPopLogo } from '@/components/brand/wishlypop-logo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wishlypop.com';

export default function HomePage() {
  // Sample showcase card
  const sampleCard: CardData = {
    cardId: 'sample-landing',
    templateId: 'minimalist-warm',
    recipientName: 'Sarah Jenkins',
    senderName: 'Maya & Alex',
    message: 'Happy Birthday to my favorite human! Thank you for another year of laughs, late-night talks, and boundless joy. You make the world so much brighter!',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    styling: {
      fontFamily: 'font-serif',
      accentColor: '#D97706',
      backgroundColor: '#FEF3C7',
      textColor: '#78350F',
      textAlign: 'center',
      envelopeColor: '#F59E0B'
    },
    isPaid: true
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col selection:bg-amber-100 selection:text-amber-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'WishlyPop',
            url: siteUrl,
            applicationCategory: 'LifestyleApplication',
            operatingSystem: 'Web',
            description: 'Create beautiful personalized birthday cards online with messages, photos, and an interactive envelope reveal.',
            offers: {
              '@type': 'Offer',
              price: '4.00',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
          }),
        }}
      />
      
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-amber-100/60 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="group">
            <WishlyPopLogo />
          </Link>

          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 hover:shadow-lg transition-all"
          >
            <span>Create a Card</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6">
        {/* Glow ambient circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-200/40 via-rose-200/30 to-amber-100/20 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text (lg:col-span-7) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-800 text-xs font-bold shadow-2xs">
              <Cake className="w-4 h-4 text-amber-600" />
              <span>Personal Birthday Ecard Generator</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Create a personal birthday card in{' '}
              <span className="bg-gradient-to-r from-amber-600 via-rose-500 to-amber-600 bg-clip-text text-transparent">
                2 minutes
              </span>
              , without wondering what to write.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Send a special birthday wish as an interactive web page with an animated envelope reveal and celebratory confetti. More memorable than an ordinary message.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/create"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-base shadow-xl shadow-rose-500/25 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-5 h-5" />
                <span>Create Your Card</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust bullet points */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                <span>No account required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                <span>24+ ready-made messages</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                <span>Interactive reveal animation</span>
              </div>
            </div>
          </div>

          {/* Right Hero Preview Mockup (lg:col-span-5) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Floating Decorative Badges */}
              <div className="absolute -top-4 -left-4 z-20 px-3 py-1.5 rounded-2xl bg-white shadow-lg border border-amber-100 flex items-center gap-2 text-xs font-bold text-slate-800 animate-pulse">
                <PartyPopper className="w-4 h-4 text-rose-500" />
                <span>Unique Envelope Reveal</span>
              </div>

              <div className="landing-card-stage p-3 bg-white rounded-3xl shadow-2xl border border-amber-100/80 -rotate-1 hover:rotate-0 transition-transform duration-300">
                <CardRenderer card={sampleCard} showWatermark={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="py-16 bg-gradient-to-b from-transparent via-amber-50/50 to-transparent border-y border-amber-100/60 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12 text-center">
          <div className="space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-600">
              Easy & Fast
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              3 Simple Steps to Send Happiness
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-white border border-amber-100 shadow-sm space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Choose a Design & Template</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Choose from curated designs (Sunlit Bloom, Festive Joy, or Color Memory) ready to delight the recipient.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-white border border-amber-100 shadow-sm space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">Personalize the Message & Photo</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Add a name, choose a heartfelt message from 24 options, upload a memory, and customize the font and accent color.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-white border border-amber-100 shadow-sm space-y-4 relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Send the Interactive Card Link</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                After activation, you get a private link to share via WhatsApp, Instagram DM, or email whenever you like.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all"
            >
              <span>Start Creating Your Card</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Comparison / Why WishlyPop */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-rose-600">
              More Meaningful
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Why Choose WishlyPop Over an Ordinary Message?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-amber-50/40 border border-amber-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Never Wonder What to Write</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Choose from 24 thoughtful messages for friends, partners, parents, and coworkers. Edit them to make them yours.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-rose-50/40 border border-rose-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Interactive Envelope Experience</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Not just a static JPG. The card opens like a surprise gift in a mobile browser with celebratory confetti.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50/40 border border-emerald-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Smile className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Perfect for Last-minute Gifting</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Forgot a friend&apos;s birthday until the night before? Your card is ready in 2 minutes, with no physical delivery wait.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-indigo-50/40 border border-indigo-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">No Subscription / No Account</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Pay one flat price per card. No monthly subscription traps and no account creation required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-amber-100 bg-white py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900">WishlyPop</span>
            <span>&bull;</span>
            <span>Personalized Birthday Ecards</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for life&apos;s meaningful moments</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
