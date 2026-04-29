import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  Filter,
  MoreHorizontal,
  ReceiptText,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SparkLine } from "@/components/ui/spark-line";
import { BarChart } from "@/components/ui/bar-chart";
import {
  cashflow6M,
  expenseFlow30D,
  incomeFlow30D,
  transactions,
} from "@/lib/mock-data";
import { cn, formatDate, formatEUR, formatTime } from "@/lib/utils";

const stats = [
  { label: "Completed", value: "9", color: "#0fb39f" },
  { label: "Pending", value: "2", color: "#ffba49" },
  { label: "Canceled", value: "1", color: "#ff4f67" },
];

export default function TransactionsPage() {
  return (
    <div className="soft-page min-h-screen">
      <Topbar title="Invoices" subtitle="Buchungen, Rechnungen und Transfers als sauberes Admin-Board." />

      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        <section className="grid gap-7 xl:grid-cols-[0.7fr_1.3fr]">
          <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-zinc-900">Invoice Health</h2>
                <p className="mt-1 text-sm font-semibold text-zinc-400">Status der letzten 30 Tage.</p>
              </div>
              <ReceiptText className="size-8 text-primary" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[22px] border border-zinc-100 bg-zinc-50 p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-black text-zinc-800">{stat.label}</p>
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: stat.color }} />
                  </div>
                  <p className="mt-3 text-4xl font-black text-zinc-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="dashboard-card-strong overflow-hidden rounded-[34px] border-0">
            <div className="flex flex-wrap items-center justify-between gap-3 px-7 pt-7">
              <div>
                <h2 className="text-2xl font-black text-zinc-900">Cashflow Timeline</h2>
                <p className="mt-1 text-sm font-semibold text-zinc-400">6 Monate Einnahmen gegen Ausgaben.</p>
              </div>
              <Button variant="outline" size="sm">
                <CalendarDays className="size-4" /> 6 Monate
              </Button>
            </div>
            <div className="px-6 pb-6 pt-4">
              <BarChart
                labels={cashflow6M.map((item) => item.month)}
                height={280}
                series={[
                  { name: "Einnahmen", color: "#0fb39f", data: cashflow6M.map((item) => item.in) },
                  { name: "Ausgaben", color: "#ff4f67", data: cashflow6M.map((item) => item.out) },
                ]}
              />
            </div>
          </Card>
        </section>

        <section className="grid gap-7 xl:grid-cols-[1fr_1fr]">
          <TrendCard title="Income Velocity" value="+12,8%" color="#6662e8" data={incomeFlow30D} />
          <TrendCard title="Expense Pressure" value="-4,3%" color="#55c5e7" data={expenseFlow30D} />
        </section>

        <Card className="dashboard-card-strong overflow-hidden rounded-[34px] border-0">
          <div className="flex flex-col gap-4 px-7 py-7 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-zinc-900">All Transactions</h2>
              <p className="mt-1 text-sm font-semibold text-zinc-400">Filterbare Tabellenoptik fuer spaetere Funktionen.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
                <input className="h-11 rounded-full border-0 bg-zinc-100 pl-10 pr-4 text-sm font-semibold outline-none focus:ring-4 focus:ring-primary/10" placeholder="Search..." />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="size-4" /> Filter
              </Button>
              <Button variant="dark" size="sm">
                <SlidersHorizontal className="size-4" /> Columns
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left">
              <thead>
                <tr className="border-y border-zinc-100 bg-zinc-50 text-xs font-black uppercase tracking-[0.14em] text-zinc-400">
                  <th className="px-7 py-4">Name</th>
                  <th className="px-4 py-4">Type</th>
                  <th className="px-4 py-4">Amount</th>
                  <th className="px-4 py-4">Account</th>
                  <th className="px-4 py-4">Date</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-7 py-4" />
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-zinc-100 bg-white transition hover:bg-zinc-50/80">
                    <td className="px-7 py-5">
                      <div className="flex items-center gap-4">
                        <span className={cn("grid h-11 w-11 place-items-center rounded-full text-white", tx.amount > 0 ? "bg-[#0fb39f]" : "bg-[#ff4f67]")}>
                          {tx.amount > 0 ? <ArrowDownLeft className="size-5" /> : <ArrowUpRight className="size-5" />}
                        </span>
                        <div>
                          <p className="font-black text-zinc-900">{tx.name}</p>
                          <p className="text-xs font-semibold text-zinc-400">{tx.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 font-bold text-zinc-700">{tx.type}</td>
                    <td className={cn("px-4 py-5 font-black", tx.amount > 0 ? "text-[#0fb39f]" : "text-zinc-900")}>{formatEUR(tx.amount)}</td>
                    <td className="px-4 py-5 font-semibold text-zinc-500">{tx.account}</td>
                    <td className="px-4 py-5">
                      <p className="font-black text-zinc-800">{formatDate(tx.date)}</p>
                      <p className="text-xs font-semibold text-zinc-400">{formatTime(tx.date)}</p>
                    </td>
                    <td className="px-4 py-5">
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-black text-zinc-500">{tx.status}</span>
                    </td>
                    <td className="px-7 py-5">
                      <button className="grid h-8 w-8 place-items-center rounded-full text-zinc-400 hover:bg-zinc-100">
                        <MoreHorizontal className="size-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

function TrendCard({
  title,
  value,
  color,
  data,
}: {
  title: string;
  value: string;
  color: string;
  data: number[];
}) {
  return (
    <Card className="dashboard-card-strong overflow-hidden rounded-[34px] border-0">
      <div className="flex items-center justify-between px-7 pt-7">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-zinc-400">{title}</p>
          <p className="mt-2 text-4xl font-black text-zinc-900">{value}</p>
        </div>
        <span className="rounded-full px-4 py-2 text-sm font-black text-white" style={{ backgroundColor: color }}>
          Live
        </span>
      </div>
      <SparkLine data={data} stroke={color} fill={color} height={145} className="mt-4 w-full" />
    </Card>
  );
}
