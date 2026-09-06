'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface PhotoUploaderProps {
  photoUrl?: string | null;
  onPhotoChange: (url: string | null) => void;
}

export function PhotoUploader({ photoUrl, onPhotoChange }: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran foto maksimal 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onPhotoChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-amber-500" />
          Foto Penerima (Opsional)
        </label>
        {photoUrl && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Hapus Foto
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />

      {photoUrl ? (
        <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-slate-200 group bg-slate-50 flex items-center justify-center">
          <Image
            src={photoUrl}
            alt="Preview Foto"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-white text-slate-800 text-xs font-semibold shadow hover:bg-slate-100 cursor-pointer"
            >
              Ganti Foto
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-3 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-semibold shadow hover:bg-rose-600 cursor-pointer"
            >
              Hapus
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-6 px-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/30 transition-all flex flex-col items-center justify-center cursor-pointer text-center group"
        >
          <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-2 group-hover:border-amber-400 group-hover:shadow-sm text-slate-500 group-hover:text-amber-500 transition-colors">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-slate-700">
            Klik untuk upload foto
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            PNG, JPG, atau WebP (maks. 5MB)
          </p>
        </div>
      )}
    </div>
  );
}
