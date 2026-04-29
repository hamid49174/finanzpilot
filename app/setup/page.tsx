import { Bell, DatabaseZap, KeyRound, LockKeyhole, Palette, ShieldCheck, Smartphone, UserRound } from "lucide-react";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const settings = [
  { icon: UserRound, title: "Profile", description: "Name, Bild und Banking-Workspace." },
  { icon: ShieldCheck, title: "Security", description: "2FA, Sessions und Geraetevertrauen." },
  { icon: DatabaseZap, title: "Sync Engine", description: "Live Sync fuer PC, Handy und iPad." },
  { icon: Bell, title: "Notifications", description: "Warnungen fuer Limits und neue Buchungen." },
  { icon: Palette, title: "Design System", description: "Light, Dark und Kontrastprofile." },
  { icon: KeyRound, title: "API Access", description: "Tokens fuer Export und Automationen." },
];

export default function SetupPage() {
  return (
    <div className="soft-page min-h-screen">
      <Topbar title="Settings" subtitle="Setup-Screen als professionelles Control Center." />

      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        <section className="grid gap-7 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-zinc-900">Workspace</h2>
                <p className="mt-1 text-sm font-semibold text-zinc-400">Privates Finanzzentrum mit Premium-Look.</p>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
                FP
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-black text-zinc-800">Display Name</span>
                <input className="h-14 w-full rounded-full bg-zinc-100 px-5 text-sm font-semibold outline-none focus:ring-4 focus:ring-primary/10" defaultValue="Rara Avis" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-black text-zinc-800">Workspace Name</span>
                <input className="h-14 w-full rounded-full bg-zinc-100 px-5 text-sm font-semibold outline-none focus:ring-4 focus:ring-primary/10" defaultValue="FinanzPilot" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-black text-zinc-800">Sync Region</span>
                <select className="h-14 w-full rounded-full bg-zinc-100 px-5 text-sm font-semibold outline-none focus:ring-4 focus:ring-primary/10" defaultValue="eu">
                  <option value="eu">Europe</option>
                  <option value="local">Local Only</option>
                </select>
              </label>
            </div>

            <div className="mt-8 flex gap-3">
              <Button variant="gradient" size="lg" className="rounded-full">Save Changes</Button>
              <Button variant="outline" size="lg" className="rounded-full bg-white">Cancel</Button>
            </div>
          </Card>

          <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
            <h2 className="text-2xl font-black text-zinc-900">Device Sync</h2>
            <p className="mt-1 text-sm font-semibold text-zinc-400">Geraete und Vertrauensstatus.</p>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {[
                ["Desktop", "Online", "#6662e8"],
                ["iPhone", "2 min ago", "#55c5e7"],
                ["iPad", "Online", "#0fb39f"],
              ].map(([name, status, color]) => (
                <div key={name} className="rounded-[24px] border border-zinc-100 bg-zinc-50 p-5">
                  <div className="mb-8 grid h-12 w-12 place-items-center rounded-full text-white" style={{ backgroundColor: color }}>
                    <Smartphone className="size-6" />
                  </div>
                  <p className="text-xl font-black text-zinc-900">{name}</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-400">{status}</p>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white">
                    <div className="h-full w-[78%] rounded-full" style={{ backgroundColor: color }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {settings.map((item, index) => {
            const Icon = item.icon;
            const colors = ["#6662e8", "#55c5e7", "#ffba49", "#ff4f67", "#0fb39f", "#181b24"];
            return (
              <Card key={item.title} className="dashboard-card-strong rounded-[28px] border-0 p-6">
                <div className="mb-7 flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full text-white" style={{ backgroundColor: colors[index] }}>
                    <Icon className="size-6" />
                  </span>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-black text-zinc-500">Ready</span>
                </div>
                <h3 className="text-xl font-black text-zinc-900">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-zinc-400">{item.description}</p>
              </Card>
            );
          })}
        </section>

        <Card className="dashboard-card-strong rounded-[34px] border-0 p-7">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-zinc-900 text-white">
                <LockKeyhole className="size-7" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-zinc-900">Security Baseline</h2>
                <p className="mt-1 text-sm font-semibold text-zinc-400">Alle Demo-Schalter sind visuell aktiv, Logik folgt spaeter.</p>
              </div>
            </div>
            <Button variant="dark" size="lg" className="rounded-full">Run Audit</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
