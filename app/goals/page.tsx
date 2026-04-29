import { ArrowRightLeft, CalendarClock, CheckCircle2, Plus, Target } from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { goals, transactions } from "@/lib/mock-data";
import { formatDate, formatEUR } from "@/lib/utils";

export default function GoalsPage() {
  return (
    <div className="soft-page min-h-screen">
      <Topbar title="Transaction" subtitle="Ziele und wiederkehrende Transfers als moderne Arbeitsflaeche." />

      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        <section className="grid gap-7 xl:grid-cols-[0.8fr_1.2fr]">
          <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-zinc-900">Transfer Rules</h2>
                <p className="mt-1 text-sm font-semibold text-zinc-400">Automatisierungen fuer spaeter.</p>
              </div>
              <Button variant="gradient" size="sm">
                <Plus className="size-4" /> Neue Regel
              </Button>
            </div>
            <div className="space-y-4">
              {[
                ["Gehalt splitten", "35% Depot, 10% Tagesgeld", "#6662e8"],
                ["Abo Watcher", "Warnt bei neuen Abos", "#ff4f67"],
                ["Round-up", "Kleingeld auf Notgroschen", "#0fb39f"],
                ["Cash Buffer", "500 EUR Mindestbestand", "#55c5e7"],
              ].map(([title, description, color]) => (
                <div key={title} className="grid grid-cols-[48px_1fr_auto] items-center gap-4 rounded-[22px] border border-zinc-100 bg-zinc-50 p-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full text-white" style={{ backgroundColor: color }}>
                    <ArrowRightLeft className="size-5" />
                  </span>
                  <div>
                    <p className="font-black text-zinc-900">{title}</p>
                    <p className="text-xs font-semibold text-zinc-400">{description}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0fb39f]">On</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-zinc-900">Financial Goals</h2>
                <p className="mt-1 text-sm font-semibold text-zinc-400">Grosse Zielkarten mit Fortschritt.</p>
              </div>
              <Target className="size-9 text-primary" />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {goals.map((goal) => {
                const percent = Math.round((goal.current / goal.target) * 100);
                return (
                  <div key={goal.name} className="relative overflow-hidden rounded-[26px] border border-zinc-100 bg-zinc-50 p-5">
                    <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${goal.color}`} />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-black text-zinc-900">{goal.name}</h3>
                        <p className="mt-1 text-sm font-semibold text-zinc-400">Deadline {formatDate(goal.deadline)}</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-primary">{percent}%</span>
                    </div>
                    <div className="mt-7 h-3 overflow-hidden rounded-full bg-white">
                      <div className={`h-full rounded-full bg-gradient-to-r ${goal.color}`} style={{ width: `${percent}%` }} />
                    </div>
                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-400">Saved</p>
                        <p className="mt-1 text-2xl font-black text-zinc-900">{formatEUR(goal.current, { maximumFractionDigits: 0 })}</p>
                      </div>
                      <p className="text-sm font-bold text-zinc-400">of {formatEUR(goal.target, { maximumFractionDigits: 0 })}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-zinc-900">Scheduled Transactions</h2>
              <p className="mt-1 text-sm font-semibold text-zinc-400">Kalenderartige Vorschau fuer wiederkehrende Buchungen.</p>
            </div>
            <CalendarClock className="size-8 text-primary" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {transactions.slice(0, 4).map((tx) => (
              <div key={tx.id} className="rounded-[22px] border border-zinc-100 bg-zinc-50 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-primary">
                    <CheckCircle2 className="size-5" />
                  </span>
                  <span className="text-xs font-black text-zinc-400">{formatDate(tx.date)}</span>
                </div>
                <p className="font-black text-zinc-900">{tx.name}</p>
                <p className="mt-1 text-xs font-semibold text-zinc-400">{tx.account}</p>
                <p className="mt-5 text-2xl font-black text-zinc-900">{formatEUR(tx.amount)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
