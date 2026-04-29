import { Activity, BrainCircuit, CircleDollarSign, TrendingDown, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Card } from "@/components/ui/card";
import { BarChart } from "@/components/ui/bar-chart";
import { DonutChart } from "@/components/ui/donut-chart";
import { SparkLine } from "@/components/ui/spark-line";
import WebGLShader from "@/components/ui/web-gl-shader";
import {
  cashflow6M,
  expenseFlow30D,
  expenseMix,
  incomeFlow30D,
  monthlyExpense,
  monthlyIncome,
} from "@/lib/mock-data";
import { formatEUR } from "@/lib/utils";

export default function AnalysePage() {
  return (
    <div className="soft-page min-h-screen">
      <Topbar title="Analytics" subtitle="High-end Analyseoptik mit Shader, Charts und Forecast-Karten." />

      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        <section className="grid gap-7 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="relative min-h-[340px] overflow-hidden rounded-[34px] border-0 bg-zinc-950 text-white shadow-[0_26px_80px_rgba(36,38,51,0.22)]">
            <WebGLShader className="absolute inset-0 h-full w-full opacity-70" />
            <div className="relative z-10 flex min-h-[340px] flex-col justify-between p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/12 backdrop-blur">
                  <BrainCircuit className="size-6" />
                </span>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-white/55">Pilot Forecast</p>
                  <h2 className="text-3xl font-black">Naechster Monat: stabil</h2>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <GlassMetric label="Cash Reserve" value="64%" />
                <GlassMetric label="Risk Index" value="Low" />
                <GlassMetric label="Automation" value="12 Rules" />
              </div>
            </div>
          </Card>

          <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
            <h2 className="text-2xl font-black text-zinc-900">KPI Snapshot</h2>
            <p className="mt-1 text-sm font-semibold text-zinc-400">Schneller Blick auf die Monatsdynamik.</p>
            <div className="mt-7 grid gap-4">
              <Kpi icon={TrendingUp} label="Income" value={formatEUR(monthlyIncome, { maximumFractionDigits: 0 })} color="#0fb39f" />
              <Kpi icon={TrendingDown} label="Expense" value={formatEUR(monthlyExpense, { maximumFractionDigits: 0 })} color="#ff4f67" />
              <Kpi icon={Activity} label="Delta" value={formatEUR(monthlyIncome - monthlyExpense, { maximumFractionDigits: 0 })} color="#6662e8" />
              <Kpi icon={CircleDollarSign} label="Savings Rate" value="25,1%" color="#55c5e7" />
            </div>
          </Card>
        </section>

        <section className="grid gap-7 xl:grid-cols-[1fr_0.75fr]">
          <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
            <div className="mb-5">
              <h2 className="text-2xl font-black text-zinc-900">Monthly Cashflow</h2>
              <p className="mt-1 text-sm font-semibold text-zinc-400">Balkenlayout passend zum Dashboard.</p>
            </div>
            <BarChart
              labels={cashflow6M.map((item) => item.month)}
              height={320}
              series={[
                { name: "Income", color: "#6662e8", data: cashflow6M.map((item) => item.in) },
                { name: "Expense", color: "#55c5e7", data: cashflow6M.map((item) => item.out) },
              ]}
            />
          </Card>

          <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
            <h2 className="text-2xl font-black text-zinc-900">Category Pressure</h2>
            <p className="mt-1 text-sm font-semibold text-zinc-400">Wo der Monat am staerksten zieht.</p>
            <div className="mt-7 flex justify-center">
              <DonutChart data={expenseMix} size={250} thickness={38} centerValue="5" centerLabel="Kategorien" />
            </div>
          </Card>
        </section>

        <section className="grid gap-7 xl:grid-cols-2">
          <Trend title="Income Momentum" color="#6662e8" data={incomeFlow30D} />
          <Trend title="Expense Momentum" color="#55c5e7" data={expenseFlow30D} />
        </section>
      </div>
    </div>
  );
}

function GlassMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/12 bg-white/10 p-5 backdrop-blur">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-white/55">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="grid grid-cols-[54px_1fr] items-center gap-4 rounded-[22px] border border-zinc-100 bg-zinc-50 p-4">
      <span className="grid h-12 w-12 place-items-center rounded-full text-white" style={{ backgroundColor: color }}>
        <Icon className="size-6" />
      </span>
      <div>
        <p className="text-sm font-semibold text-zinc-400">{label}</p>
        <p className="text-2xl font-black text-zinc-900">{value}</p>
      </div>
    </div>
  );
}

function Trend({ title, color, data }: { title: string; color: string; data: number[] }) {
  return (
    <Card className="dashboard-card-strong overflow-hidden rounded-[34px] border-0">
      <div className="px-7 pt-7">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-zinc-400">{title}</p>
        <h2 className="mt-2 text-3xl font-black text-zinc-900">Real-time Curve</h2>
      </div>
      <SparkLine data={data} stroke={color} fill={color} height={170} className="mt-4 w-full" />
    </Card>
  );
}
