import { CreditCard, LockKeyhole, Plus, ShieldCheck, Wifi } from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { accounts, budgets } from "@/lib/mock-data";
import { formatEUR } from "@/lib/utils";

export default function BudgetsPage() {
  return (
    <div className="soft-page min-h-screen">
      <Topbar title="Cards" subtitle="Karten, Limits und Budget-Pulse im Banking-Dashboard-Look." />

      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        <section className="grid gap-7 xl:grid-cols-[1fr_0.8fr]">
          <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-zinc-900">Virtual Cards</h2>
                <p className="mt-1 text-sm font-semibold text-zinc-400">Schoene Vorschau fuer spaetere Kartenfunktionen.</p>
              </div>
              <Button variant="gradient" size="sm">
                <Plus className="size-4" /> Add Card
              </Button>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {accounts.map((account, index) => (
                <article key={account.id} className={`card-grid-lines relative min-h-[220px] overflow-hidden rounded-[28px] bg-gradient-to-br ${account.color} p-6 text-white shadow-xl`}>
                  <div className="absolute -bottom-10 -right-8 h-36 w-36 rounded-full bg-white/20" />
                  <div className="absolute right-6 top-6 flex">
                    <span className="h-10 w-10 rounded-full bg-white/40" />
                    <span className="-ml-4 h-10 w-10 rounded-full bg-white/35" />
                  </div>
                  <p className="text-sm font-semibold text-white/75">{account.type}</p>
                  <h3 className="mt-2 text-2xl font-black">{account.name}</h3>
                  <p className="mt-5 text-3xl font-black">{formatEUR(account.balance, { maximumFractionDigits: 0 })}</p>
                  <div className="mt-8 flex items-end justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white/70">Number</p>
                      <p className="mt-1 font-black tracking-[0.18em]">{account.number}</p>
                    </div>
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black">{index % 2 ? "Debit" : "Credit"}</span>
                  </div>
                </article>
              ))}
            </div>
          </Card>

          <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
            <h2 className="text-2xl font-black text-zinc-900">Security Stack</h2>
            <p className="mt-1 text-sm font-semibold text-zinc-400">Visuelle Kontrollpunkte fuer Kartenrisiken.</p>
            <div className="mt-7 space-y-5">
              {[
                { icon: ShieldCheck, label: "3D Secure", value: "Active", color: "#0fb39f" },
                { icon: LockKeyhole, label: "Card Lock", value: "Instant", color: "#6662e8" },
                { icon: Wifi, label: "Contactless", value: "Limit 75 EUR", color: "#55c5e7" },
                { icon: CreditCard, label: "One-Time Cards", value: "4 ready", color: "#ffba49" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="grid grid-cols-[54px_1fr_auto] items-center gap-4 rounded-[22px] border border-zinc-100 bg-zinc-50 p-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full text-white" style={{ backgroundColor: item.color }}>
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <p className="font-black text-zinc-900">{item.label}</p>
                      <p className="text-xs font-semibold text-zinc-400">{item.value}</p>
                    </div>
                    <span className="h-3 w-3 rounded-full bg-[#0fb39f]" />
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-zinc-900">Budget Limits</h2>
              <p className="mt-1 text-sm font-semibold text-zinc-400">Die Limits sind bewusst gross, klar und scanbar.</p>
            </div>
            <Button variant="outline" size="sm">Manage Rules</Button>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {budgets.map((budget) => {
              const percent = Math.min(Math.round((budget.spent / budget.limit) * 100), 100);
              return (
                <div key={budget.name} className="rounded-[22px] border border-zinc-100 bg-zinc-50 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-black text-zinc-900">{budget.name}</h3>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black" style={{ color: budget.color }}>
                      {percent}%
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full" style={{ width: `${percent}%`, backgroundColor: budget.color }} />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-zinc-500">
                    {formatEUR(budget.spent, { maximumFractionDigits: 0 })} / {formatEUR(budget.limit, { maximumFractionDigits: 0 })}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
