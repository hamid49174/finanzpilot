"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeftRight,
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LogOut,
  PiggyBank,
  ReceiptText,
  Settings,
  Wallet,
} from "lucide-react";
import { cn, formatEUR } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/balance", label: "Balance", icon: Wallet },
  { href: "/transactions", label: "Invoices", icon: ReceiptText },
  { href: "/budgets", label: "Cards", icon: CreditCard },
  { href: "/goals", label: "Transaction", icon: ArrowLeftRight },
  { href: "/analyse", label: "Analytics", icon: BarChart3 },
  { href: "/setup", label: "Settings", icon: Settings },
];

const MOBILE_NAV = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/balance", label: "Balance", icon: Wallet },
  { href: "/transactions", label: "Pay", icon: ArrowLeftRight },
  { href: "/budgets", label: "Budget", icon: PiggyBank },
  { href: "/setup", label: "Setup", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-[286px] shrink-0 flex-col border-r border-zinc-100 bg-sidebar text-sidebar-foreground lg:flex">
        <div className="flex items-center gap-3 px-8 pb-10 pt-9">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-2xl font-black text-white shadow-lg shadow-primary/20">
            F
          </div>
          <div className="text-[34px] font-black leading-none tracking-tight text-zinc-900">FinanzPilot</div>
        </div>

        <nav className="flex-1 space-y-3 px-8">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-5 rounded-[22px] py-2 text-[15px] font-bold transition-all",
                  active ? "text-zinc-900" : "hover:text-zinc-900"
                )}
              >
                <span
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-full transition-all",
                    active
                      ? "bg-primary text-white shadow-[0_18px_36px_rgba(102,98,232,0.28)]"
                      : "text-[#969aae] group-hover:bg-[#f2f2fb] group-hover:text-primary"
                  )}
                >
                  <Icon className="size-6" strokeWidth={2.3} />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-6 pb-8">
          <div className="rounded-[22px] border border-zinc-100 bg-zinc-50 p-4">
            <div className="text-[11px] font-black uppercase tracking-[0.12em] text-zinc-400">Monatsstatus</div>
            <div className="mt-2 text-xl font-black text-[#ff4f67]">{formatEUR(-1000)}</div>
            <div className="mt-1 text-[11px] font-semibold text-zinc-400">Ueberschuss diesen Monat</div>
          </div>

          <button className="mt-4 flex w-full items-center justify-between rounded-[14px] bg-zinc-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-primary">
            <span>Design wechseln</span>
            <span className="h-5 w-9 rounded-full bg-white/20 p-0.5">
              <span className="block h-4 w-4 rounded-full bg-white shadow-sm" />
            </span>
          </button>

          <button className="mt-3 flex items-center gap-2 px-2 py-2 text-xs font-semibold text-zinc-400 transition hover:text-[#ff4f67]">
            <LogOut className="size-3.5" />
            Abmelden
          </button>
        </div>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-[24px] border border-white/80 bg-white/88 p-2 shadow-[0_20px_60px_rgba(36,38,51,0.18)] backdrop-blur-xl lg:hidden">
        {MOBILE_NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              href={item.href}
              key={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-[18px] px-2 py-2 text-[10px] font-bold transition",
                active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-zinc-400"
              )}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
