import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Download,
  MoreHorizontal,
  SendHorizontal,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import {
  accounts,
  earningCategories,
  recipients,
  totalBalance,
  transactions,
} from "@/lib/mock-data";
import { cn, formatDate, formatEUR, formatTime } from "@/lib/utils";

export default function BalancePage() {
  return (
    <div className="soft-page min-h-screen">
      <Topbar title="Balance" subtitle="Transfer, Kartenstand und Verlauf im Tagih-Stil." />

      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        <section className="grid gap-8 xl:grid-cols-[1fr_1fr]">
          <BalanceVault />
          <TransferPanel />
        </section>

        <section className="grid gap-8 xl:grid-cols-[1fr_0.46fr]">
          <Card className="dashboard-card-strong overflow-hidden rounded-[34px] border-0">
            <div className="flex items-center justify-between px-7 py-7">
              <div>
                <h2 className="text-2xl font-black text-zinc-900">Transfer History</h2>
                <p className="mt-1 text-sm font-semibold text-zinc-400">Sauberer Verlauf fuer alle Konten.</p>
              </div>
              <Button variant="soft" size="sm">
                <Download className="size-4" /> Export
              </Button>
            </div>
            <div>
              {transactions.slice(0, 6).map((tx, index) => (
                <div
                  key={tx.id}
                  className={cn(
                    "grid grid-cols-[44px_1.2fr_0.8fr_1fr_32px] items-center gap-4 px-7 py-5",
                    index % 2 ? "bg-zinc-50" : "bg-white"
                  )}
                >
                  <div className={cn("grid h-11 w-11 place-items-center rounded-full text-white", tx.amount > 0 ? "bg-[#0fb39f]" : "bg-[#ff4f67]")}>
                    {tx.amount > 0 ? <ArrowRight className="size-5 -rotate-45" /> : <ArrowRight className="size-5 rotate-45" />}
                  </div>
                  <div>
                    <p className="font-black text-zinc-800">{tx.name}</p>
                    <p className="mt-0.5 text-xs font-semibold text-zinc-400">{tx.category}</p>
                  </div>
                  <p className="font-black text-zinc-900">{formatEUR(tx.amount)}</p>
                  <div>
                    <p className="font-black text-zinc-800">{formatDate(tx.date)}</p>
                    <p className="text-xs font-semibold text-zinc-400">{formatTime(tx.date)}</p>
                  </div>
                  <button className="grid h-8 w-8 place-items-center rounded-full text-zinc-400 hover:bg-zinc-100">
                    <MoreHorizontal className="size-5" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
            <h2 className="text-2xl font-black text-zinc-900">Invoices Sent</h2>
            <p className="mt-1 text-sm font-semibold text-zinc-400">Status fuer wiederkehrende Zahlungsziele.</p>
            <div className="mt-7 space-y-5">
              {accounts.map((account) => (
                <div key={account.id} className="rounded-[22px] border border-zinc-100 bg-zinc-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black text-zinc-900">{account.name}</p>
                      <p className="text-xs font-semibold text-zinc-400">{account.bank}</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-primary">Sent</span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                    <div className={`h-full rounded-full bg-gradient-to-r ${account.color}`} style={{ width: "72%" }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

function BalanceVault() {
  return (
    <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-semibold text-zinc-400">My Balance</p>
          <h2 className="mt-1 text-4xl font-black tracking-tight text-zinc-900">
            {formatEUR(totalBalance, { maximumFractionDigits: 0 })}
          </h2>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
          <Wallet className="size-7" />
        </div>
      </div>

      <div className="mt-9 h-3 overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full w-[62%] rounded-full bg-primary" />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-zinc-400">Card Holder</p>
          <p className="mt-1 font-black text-zinc-900">Rara Avis</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-400">Valid Thru</p>
          <p className="mt-1 font-black text-zinc-900">03/21</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-400">Card Number</p>
          <p className="mt-1 font-black tracking-[0.2em] text-zinc-900">•••• •••• 1234</p>
        </div>
      </div>

      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {earningCategories.map((item) => {
          const value = Math.round((item.amount / item.limit) * 100);

          return (
            <div key={item.label} className="grid grid-cols-[78px_1fr] items-center gap-4 rounded-[18px] border border-zinc-200 p-4">
              <ProgressRing value={value} color={item.color} size={64} />
              <div>
                <p className="font-black text-zinc-800">{item.label}</p>
                <p className="mt-1 text-base font-medium text-zinc-700">
                  {formatEUR(item.amount, { maximumFractionDigits: 0 })}{" "}
                  <span style={{ color: item.color }}>/ from {formatEUR(item.limit, { maximumFractionDigits: 0 })}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function TransferPanel() {
  return (
    <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
      <div className="mb-7 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black tracking-tight text-zinc-900">Transfer & Send Invoice</h2>
        <div className="rounded-full bg-zinc-100 p-1">
          <button className="rounded-full px-6 py-2 text-xs font-black text-zinc-400">Invoice</button>
          <button className="rounded-full bg-primary px-6 py-2 text-xs font-black text-white shadow-lg shadow-primary/20">Transfer</button>
        </div>
      </div>

      <p className="mb-4 font-black text-zinc-800">Recent Recipient</p>
      <div className="mb-7 flex items-start gap-5 overflow-x-auto pb-2 scrollbar-thin">
        {recipients.map((recipient) => (
          <div key={recipient.name} className="shrink-0 text-center">
            <div
              className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 bg-cover bg-center shadow-md ring-4 ring-zinc-50"
              style={{ backgroundImage: `url(${recipient.image}), linear-gradient(135deg, #e4e4e7, #c7d2fe)` }}
            />
            <p className="mt-3 text-sm font-semibold text-zinc-800">{recipient.name}</p>
          </div>
        ))}
        <button className="mt-2 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-zinc-100 text-primary">
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="space-y-6">
        <label className="block">
          <span className="mb-3 block font-black text-zinc-800">Recipient</span>
          <input className="h-14 w-full rounded-full border-0 bg-zinc-100 px-7 text-sm font-semibold outline-none placeholder:text-zinc-400 focus:ring-4 focus:ring-primary/10" placeholder="Insert recipient" />
        </label>
        <label className="block">
          <span className="mb-3 block font-black text-zinc-800">Amount</span>
          <input className="h-14 w-full rounded-full border-0 bg-zinc-100 px-7 text-sm font-semibold outline-none placeholder:text-zinc-400 focus:ring-4 focus:ring-primary/10" placeholder="0.00" />
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex max-w-[260px] items-start gap-3 text-sm font-semibold text-zinc-400">
          <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded bg-secondary text-white">
            <Check className="size-4" />
          </span>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </label>
        <Button variant="gradient" size="xl" className="min-w-[220px] rounded-full">
          <SendHorizontal className="size-5" /> Transfer
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <MiniAction icon={CreditCard} title="Virtual Card" value="4 aktive Karten" />
        <MiniAction icon={CircleDollarSign} title="Smart Rules" value="12 Automationen" />
      </div>
    </Card>
  );
}

function MiniAction({
  icon: Icon,
  title,
  value,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[20px] border border-zinc-100 bg-zinc-50 p-4">
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-white text-primary shadow-sm">
        <Icon className="size-5" />
      </div>
      <p className="font-black text-zinc-900">{title}</p>
      <p className="mt-1 text-xs font-semibold text-zinc-400">{value}</p>
    </div>
  );
}
