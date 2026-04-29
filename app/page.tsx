import {
  ArrowDownToLine,
  ArrowUpRight,
  BadgeEuro,
  ChevronDown,
  CircleDollarSign,
  MoreHorizontal,
  MoveDownLeft,
  MoveUpRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart } from "@/components/ui/bar-chart";
import { DonutChart } from "@/components/ui/donut-chart";
import { SparkLine } from "@/components/ui/spark-line";
import ShaderBackground from "@/components/ui/shader-background";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import {
  earningCategories,
  expenseFlow30D,
  expenseMix,
  incomeFlow30D,
  monthlyExpense,
  monthlyIncome,
  totalBalance,
  transactions,
  weeklyOverview,
} from "@/lib/mock-data";
import { cn, formatDate, formatEUR, formatTime } from "@/lib/utils";

const statusStyles = {
  Abgeschlossen: "text-[#0fb39f] bg-[#e9fbf6]",
  Ausstehend: "text-[#969aae] bg-zinc-100",
  Storniert: "text-[#ff4f67] bg-[#fff0f3]",
};

export default function Home() {
  const latest = transactions.slice(0, 5);

  return (
    <div className="soft-page min-h-screen">
      <Topbar title="Dashboard" subtitle="Live Finanzstand auf PC, Handy und iPad." />

      <div className="mx-auto max-w-[1440px] space-y-8 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        <HeroSyncPanel />

        <section className="grid gap-7 xl:grid-cols-[1.12fr_1fr_1fr]">
          <BankCard />
          <MetricCard
            icon={ArrowDownToLine}
            title="Income"
            value={formatEUR(monthlyIncome, { maximumFractionDigits: 0 })}
            delta="+0,5%"
            deltaTone="positive"
            sparkData={incomeFlow30D}
            stroke="#6662e8"
            fill="#6662e8"
          />
          <MetricCard
            icon={ArrowUpRight}
            title="Expense"
            value={formatEUR(monthlyExpense, { maximumFractionDigits: 0 })}
            delta="-0,5%"
            deltaTone="negative"
            sparkData={expenseFlow30D}
            stroke="#55c5e7"
            fill="#55c5e7"
          />
        </section>

        <section className="grid gap-7 xl:grid-cols-[1fr_0.96fr]">
          <Card className="dashboard-card-strong overflow-hidden rounded-[34px] border-0">
            <div className="flex flex-wrap items-center justify-between gap-3 px-7 pt-7">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-zinc-900">Overview</h2>
                <p className="mt-1 text-sm font-semibold text-zinc-400">This Week vs Last Week</p>
              </div>
              <div className="flex items-center gap-6">
                <LegendDot color="#6662e8" label="This Week" />
                <LegendDot color="#55c5e7" label="Last Week" />
                <button className="flex h-10 items-center gap-3 rounded-full bg-zinc-100 px-7 text-sm font-bold text-primary">
                  Week <ChevronDown className="size-4" />
                </button>
              </div>
            </div>
            <div className="px-6 pb-6 pt-4">
              <BarChart
                labels={weeklyOverview.map((item) => item.day)}
                height={255}
                series={[
                  {
                    name: "Last Week",
                    color: "#55c5e7",
                    data: weeklyOverview.map((item) => item.income),
                  },
                  {
                    name: "This Week",
                    color: "#6662e8",
                    data: weeklyOverview.map((item) => item.expense),
                  },
                ]}
                className="drop-shadow-sm"
              />
            </div>
          </Card>

          <Card className="dashboard-card-strong overflow-hidden rounded-[34px] border-0">
            <div className="grid gap-6 p-7 lg:grid-cols-[260px_1fr]">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-zinc-900">Outcome Categories</h2>
                <p className="mt-1 text-sm font-semibold text-zinc-400">Ausgabenmix im aktuellen Monat</p>
                <div className="mt-7">
                  <DonutChart
                    data={expenseMix}
                    size={236}
                    thickness={42}
                    centerValue="-20%"
                    centerLabel="Sparquote"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="mb-5 text-sm font-black text-[#969aae]">Legend</p>
                <div className="space-y-4">
                  {expenseMix.map((item) => (
                    <div key={item.label} className="grid grid-cols-[20px_1fr_auto] items-center gap-4">
                      <span className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-base font-bold text-zinc-800">{item.label}</span>
                      <span className="text-base font-black text-zinc-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="grid gap-7 xl:grid-cols-[1.18fr_0.82fr]">
          <Card className="dashboard-card-strong overflow-hidden rounded-[34px] border-0">
            <div className="flex items-center justify-between px-7 py-7">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-zinc-900">Lastest Transaction</h2>
                <p className="mt-1 text-sm font-semibold text-zinc-400">Die letzten Buchungen mit Status</p>
              </div>
              <Button variant="soft" size="sm">View All</Button>
            </div>
            <div>
              {latest.map((tx, index) => (
                <TransactionRow key={tx.id} tx={tx} index={index} />
              ))}
            </div>
          </Card>

          <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-zinc-900">Earning Categories</h2>
                <p className="mt-1 text-sm font-semibold text-zinc-400">Zielerfuellung pro Einnahmequelle</p>
              </div>
              <CircleDollarSign className="size-8 text-primary" />
            </div>
            <div className="space-y-7">
              {earningCategories.map((item) => {
                const percentage = Math.round((item.amount / item.limit) * 100);

                return (
                  <div key={item.label} className="grid grid-cols-[56px_1fr] gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-full text-white shadow-lg" style={{ backgroundColor: item.color }}>
                      <BadgeEuro className="size-7" />
                    </div>
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <p className="font-black text-zinc-800">{item.label}</p>
                        <p className="text-sm font-black" style={{ color: item.color }}>{percentage}%</p>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-zinc-100">
                        <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: item.color }} />
                      </div>
                      <p className="mt-3 text-base font-medium text-zinc-700">
                        {formatEUR(item.amount, { maximumFractionDigits: 0 })}{" "}
                        <span style={{ color: item.color }}>/ from {formatEUR(item.limit, { maximumFractionDigits: 0 })}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="mt-8 h-12 w-full rounded-full bg-zinc-100 text-sm font-black text-primary transition hover:bg-primary hover:text-white">
              View more
            </button>
          </Card>
        </section>
      </div>
    </div>
  );
}

function HeroSyncPanel() {
  return (
    <section className="dashboard-card-strong relative overflow-hidden rounded-[30px] border-0 p-5 md:p-7">
      <div className="absolute inset-0 opacity-[0.11]">
        <ShaderBackground />
      </div>
      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0fb39f] opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#0fb39f]" />
            </span>
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-600">Live Sync</span>
          </div>
          <h2 className="max-w-3xl text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl">
            Ein Finanzstand auf PC, Handy und iPad.
          </h2>
          <p className="mt-2 text-sm font-semibold text-zinc-400">Aktuell: 29.04.2026, 19:46</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <LiquidButton size="xl" className="rounded-full bg-zinc-900 px-7 text-white">
            Jetzt synchronisieren
          </LiquidButton>
          <Button variant="outline" size="lg" className="rounded-full bg-white">
            Dieses Geraet senden
          </Button>
        </div>
      </div>
    </section>
  );
}

function BankCard() {
  return (
    <article className="card-grid-lines relative min-h-[276px] overflow-hidden rounded-[34px] bg-[#6662e8] p-8 text-white shadow-[0_26px_70px_rgba(102,98,232,0.32)]">
      <div className="absolute -bottom-14 right-[-30px] h-48 w-48 rounded-full bg-[#55c5e7]" />
      <div className="absolute bottom-0 right-[72px] h-40 w-20 rounded-t-full bg-[#5c95df]/75" />
      <div className="absolute right-9 top-8 flex">
        <span className="h-14 w-14 rounded-full bg-white/35" />
        <span className="-ml-5 h-14 w-14 rounded-full bg-white/35" />
      </div>
      <div className="relative">
        <p className="text-base font-medium text-white/86">My Balance</p>
        <div className="mt-2 text-[36px] font-black leading-none tracking-tight sm:text-[42px]">
          {formatEUR(totalBalance, { maximumFractionDigits: 0 })}
        </div>
      </div>
      <div className="relative mt-12 flex items-center justify-end gap-3 text-2xl font-black tracking-[0.18em]">
        <span className="text-white/90">•••• •••• ••••</span>
        <span className="tracking-tight">1234</span>
      </div>
      <div className="relative mt-9 grid grid-cols-2 gap-8">
        <div>
          <p className="text-sm font-medium text-white/70">Card Holder</p>
          <p className="mt-1 text-base font-black">Rara Avis</p>
        </div>
        <div>
          <p className="text-sm font-medium text-white/70">Valid Thru</p>
          <p className="mt-1 text-base font-black">03/21</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="animate-shine-sweep absolute top-0 h-full w-1/3 bg-white/12 blur-2xl" />
      </div>
    </article>
  );
}

function MetricCard({
  icon: Icon,
  title,
  value,
  delta,
  deltaTone,
  sparkData,
  stroke,
  fill,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  delta: string;
  deltaTone: "positive" | "negative";
  sparkData: number[];
  stroke: string;
  fill: string;
}) {
  return (
    <Card className="dashboard-card-strong overflow-hidden rounded-[34px] border-0">
      <div className="flex items-start gap-4 p-7 pb-2">
        <div
          className={cn(
            "grid h-[66px] w-[66px] shrink-0 place-items-center rounded-full text-white shadow-lg",
            deltaTone === "positive" ? "bg-primary shadow-primary/20" : "bg-secondary shadow-secondary/20"
          )}
        >
          <Icon className="size-8" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-[#969aae]">{title}</p>
          <div className="mt-1 text-[32px] font-black leading-none tracking-tight text-zinc-900">{value}</div>
        </div>
        <div className="pt-1 text-right">
          <div className={cn("flex items-center justify-end gap-1 text-sm font-black", deltaTone === "positive" ? "text-[#0fb39f]" : "text-[#ff4f67]")}>
            {deltaTone === "positive" ? <MoveUpRight className="size-4" /> : <MoveDownLeft className="size-4" />}
            {delta}
          </div>
          <p className="mt-1 text-sm font-semibold text-[#969aae]">last month</p>
        </div>
      </div>
      <div className="px-0 pb-2 pt-2">
        <SparkLine data={sparkData} stroke={stroke} fill={fill} height={130} className="w-full" />
      </div>
    </Card>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs font-bold text-[#969aae]">
      <span className="h-2.5 w-2.5 rounded-full ring-2 ring-offset-2" style={{ backgroundColor: color, boxShadow: `0 0 0 2px ${color}22` }} />
      {label}
    </div>
  );
}

function TransactionRow({ tx, index }: { tx: (typeof transactions)[number]; index: number }) {
  const positive = tx.amount > 0;
  const transfer = tx.type === "Transfer";
  const Icon = positive ? MoveDownLeft : transfer ? ArrowUpRight : MoveUpRight;

  return (
    <div className={cn("grid grid-cols-[48px_1fr_32px] items-center gap-4 px-5 py-5 sm:grid-cols-[48px_1.25fr_0.8fr_1fr_0.9fr_32px] sm:px-7", index % 2 === 1 ? "bg-zinc-50" : "bg-white")}>
      <div className={cn("grid h-11 w-11 place-items-center rounded-full text-white", positive ? "bg-[#0fb39f]" : transfer ? "bg-primary" : "bg-[#ff4f67]")}>
        <Icon className="size-5" />
      </div>
      <div>
        <p className="font-black text-zinc-800">{tx.name}</p>
        <p className="mt-0.5 text-xs font-semibold text-[#969aae]">{tx.type}</p>
      </div>
      <p className="hidden font-black text-zinc-900 sm:block">{formatEUR(tx.amount)}</p>
      <div className="hidden sm:block">
        <p className="font-black text-zinc-800">{formatDate(tx.date)}</p>
        <p className="mt-0.5 text-xs font-semibold text-[#969aae]">{formatTime(tx.date)}</p>
      </div>
      <span className={cn("hidden w-fit rounded-full px-3 py-1 text-sm font-black sm:inline-flex", statusStyles[tx.status])}>
        {tx.status}
      </span>
      <button className="grid h-8 w-8 place-items-center rounded-full text-[#969aae] transition hover:bg-zinc-100 hover:text-zinc-900">
        <MoreHorizontal className="size-5" />
      </button>
      <div className="col-span-2 col-start-2 flex flex-wrap items-center gap-2 sm:hidden">
        <span className="font-black text-zinc-900">{formatEUR(tx.amount)}</span>
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-black", statusStyles[tx.status])}>{tx.status}</span>
        <span className="text-xs font-semibold text-[#969aae]">{formatDate(tx.date)}</span>
      </div>
    </div>
  );
}
