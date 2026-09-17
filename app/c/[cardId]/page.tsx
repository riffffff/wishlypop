import { Metadata } from 'next';
import Link from 'next/link';
import { prisma, formatCardRecord } from '@/lib/db';
import { EnvelopeCard } from '@/components/interactive/envelope-card';
import { WishlyPopLogo } from '@/components/brand/wishlypop-logo';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';

interface PageProps {
  params: Promise<{ cardId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cardId } = await params;
  const record = await prisma.card.findUnique({
    where: { cardId }
  });

  if (!record) {
    return {
      title: 'Birthday Card | WishlyPop',
      description: 'A personalized birthday card crafted on WishlyPop.'
    };
  }

  return {
    title: `Happy Birthday, ${record.recipientName}! 🎂 | WishlyPop`,
    description: `Someone special made a personalized birthday card for ${record.recipientName}. Open to reveal!`,
    openGraph: {
      title: `Happy Birthday, ${record.recipientName}! 🎂`,
      description: `Tap to open your personalized interactive birthday card!`,
    }
  };
}

export default async function PublicCardPage({ params }: PageProps) {
  const { cardId } = await params;

  const record = await prisma.card.findUnique({
    where: { cardId }
  });

  // 1. Card does not exist
  if (!record) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">Card Not Found</h1>
        <p className="text-sm text-slate-500 max-w-sm mt-1">
          This card URL is invalid or the card has been deleted.
        </p>
        <Link
          href="/"
          className="mt-6 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow transition-colors"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  // 2. Access Protection (FR-10): If not paid yet, deny full interactive reveal
  if (!record.isPaid) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 shadow-md">
          <Lock className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase font-extrabold tracking-widest text-amber-600">
          Limited Access
        </span>
        <h1 className="text-2xl font-black text-slate-900 mt-1">
          This Card Is Not Active Yet
        </h1>
        <p className="text-sm text-slate-600 max-w-md mt-2">
          The card for <strong>{record.recipientName}</strong> is still a draft and has not been paid for. Complete payment to unlock this interactive card.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href={`/preview?id=${record.cardId}`}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-colors inline-flex items-center justify-center gap-2"
          >
            <span>Open Payment Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/create"
            className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
          >
            Create a New Card
          </Link>
        </div>
      </div>
    );
  }

  // 3. Paid & Valid: Render full interactive envelope reveal
  const cardData = formatCardRecord(record);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-amber-50/20 to-[#FFFDF9] flex flex-col justify-between">
      {/* Brand header */}
      <header className="p-4 flex items-center justify-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors"
        >
          <WishlyPopLogo compact />
        </Link>
      </header>

      {/* Main interactive envelope & card */}
      <main className="flex-1 flex items-center justify-center">
        <EnvelopeCard card={cardData} />
      </main>

      {/* Subtle footer */}
      <footer className="p-4 text-center text-[11px] text-slate-400">
        WishlyPop &copy; {new Date().getFullYear()} &bull; Personalized Digital Ecards
      </footer>
    </div>
  );
}
