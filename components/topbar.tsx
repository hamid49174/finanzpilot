"use client";

import type { ReactNode } from "react";
import {
  Bell,
  Download,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Sparkles,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-100/80 bg-background/82 backdrop-blur-2xl">
      <div className="flex min-h-[98px] items-center gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="min-w-0 flex-1 sm:min-w-[210px] sm:flex-none xl:min-w-[250px]">
          <p className="hidden text-[10px] font-black uppercase tracking-[0.26em] text-zinc-500 md:block">
            Ezhans Finanzzentrale
          </p>
          <h1 className="text-3xl font-black leading-none tracking-tight text-zinc-900 sm:text-4xl lg:text-[44px]">
            {title}
          </h1>
          {subtitle ? <p className="mt-1 text-sm font-medium text-zinc-400">{subtitle}</p> : null}
        </div>

        <div className="relative hidden w-full max-w-[480px] xl:block">
          <Search className="absolute left-6 top-1/2 size-5 -translate-y-1/2 text-[#969aae]" />
          <input
            placeholder="Search here..."
            className="h-[54px] w-full rounded-full border border-transparent bg-white pl-16 pr-20 text-sm font-semibold text-zinc-800 shadow-sm outline-none transition placeholder:text-[#969aae] focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
          />
          <kbd className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-black text-zinc-400">
            Ctrl K
          </kbd>
        </div>

        <div className="hidden items-center gap-2 2xl:flex">
          <Button variant="outline" size="sm">
            <Plus className="size-3.5" /> Einnahme
          </Button>
          <Button variant="outline" size="sm">
            <Plus className="size-3.5" /> Ausgabe
          </Button>
          <Button variant="outline" size="sm">
            <Download className="size-3.5" /> JSON
          </Button>
          <Button variant="outline" size="sm">
            <Download className="size-3.5" /> CSV
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="size-3.5" /> Import
          </Button>
          <Button variant="teal" size="sm">
            <Sparkles className="size-3.5" /> Buchung
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <IconButton>
            <MessageCircle className="size-5" />
            <span className="absolute right-2.5 top-2.5 h-3 w-3 rounded-full border-2 border-white bg-primary" />
          </IconButton>
          <IconButton>
            <Bell className="size-5" />
            <span className="absolute right-2.5 top-2.5 h-3 w-3 rounded-full border-2 border-white bg-primary" />
          </IconButton>
          <IconButton className="hidden sm:grid">
            <Settings className="size-5" />
          </IconButton>

          <div className="ml-2 flex items-center gap-3">
            <div
              className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-amber-200 via-rose-300 to-indigo-400 bg-cover bg-center text-sm font-black text-white shadow-md ring-4 ring-white"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1494790108377-be9c29d29330?auto=format&fit=crop&w=160&q=80), linear-gradient(135deg, #fde68a, #fb7185, #818cf8)",
              }}
              aria-label="Profilbild"
            />
            <div className="hidden min-w-[90px] xl:block">
              <div className="text-sm font-black leading-tight text-zinc-900">Rara Avis</div>
              <div className="mt-0.5 text-xs font-semibold text-zinc-400">Premium</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`relative grid h-12 w-12 place-items-center rounded-full border-2 border-[#969aae] text-[#969aae] transition hover:border-primary hover:bg-white hover:text-primary hover:shadow-lg hover:shadow-primary/10 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
