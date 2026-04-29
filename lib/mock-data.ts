export type Tx = {
  id: string;
  name: string;
  category: string;
  type: "Einnahme" | "Ausgabe" | "Transfer";
  amount: number;
  date: string;
  status: "Abgeschlossen" | "Ausstehend" | "Storniert";
  account: string;
};

export const accounts = [
  {
    id: "giro",
    name: "Giro DKB",
    bank: "DKB",
    type: "Girokonto",
    balance: 8420.55,
    color: "from-[#6967e8] to-[#5b5fe6]",
    number: "•••• 1234",
  },
  {
    id: "spar",
    name: "Tagesgeld",
    bank: "Trade Republic",
    type: "Sparkonto",
    balance: 3579.45,
    color: "from-[#55c5e7] to-[#46bfe0]",
    number: "•••• 9821",
  },
  {
    id: "depot",
    name: "ETF Depot",
    bank: "Scalable",
    type: "Depot",
    balance: 12459,
    color: "from-[#ffbd4a] to-[#ff9e42]",
    number: "•••• 4456",
  },
  {
    id: "krypto",
    name: "Crypto Wallet",
    bank: "Bitpanda",
    type: "Krypto",
    balance: 1284.7,
    color: "from-[#ff4f67] to-[#f43f5e]",
    number: "•••• 0xAB",
  },
];

export const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

export const monthlyIncome = 4250;
export const monthlyExpense = 3180;

export const cashflow6M = [
  { month: "Nov", in: 4100, out: 2900 },
  { month: "Dec", in: 5200, out: 3600 },
  { month: "Jan", in: 4250, out: 3100 },
  { month: "Feb", in: 4400, out: 2950 },
  { month: "Mar", in: 4180, out: 3050 },
  { month: "Apr", in: 4250, out: 3180 },
];

export const weeklyOverview = [
  { day: "Mon", income: 70, expense: 92 },
  { day: "Tue", income: 53, expense: 41 },
  { day: "Wed", income: 27, expense: 33 },
  { day: "Thu", income: 36, expense: 46 },
  { day: "Fri", income: 18, expense: 26 },
  { day: "Sat", income: 78, expense: 62 },
  { day: "Sun", income: 51, expense: 70 },
];

export const expenseMix = [
  { label: "Monthly Need", value: 763, color: "#6366f1" },
  { label: "Groceries", value: 321, color: "#181b24" },
  { label: "Subscriptions", value: 690, color: "#55c5e7" },
  { label: "Tax", value: 154, color: "#ffba49" },
  { label: "Others", value: 696, color: "#ff4f67" },
];

export const transactions: Tx[] = [
  {
    id: "t1",
    name: "Gehalt Anthropic GmbH",
    category: "Gehalt",
    type: "Einnahme",
    amount: 4250,
    date: "2026-04-29T08:30:00",
    status: "Abgeschlossen",
    account: "Giro DKB",
  },
  {
    id: "t2",
    name: "Netflix Premium",
    category: "Abos",
    type: "Ausgabe",
    amount: -19.99,
    date: "2026-04-28T18:12:00",
    status: "Abgeschlossen",
    account: "Giro DKB",
  },
  {
    id: "t3",
    name: "Spotify Family",
    category: "Abos",
    type: "Ausgabe",
    amount: -17.99,
    date: "2026-04-28T09:00:00",
    status: "Abgeschlossen",
    account: "Giro DKB",
  },
  {
    id: "t4",
    name: "Edeka Hamburg",
    category: "Lebensmittel",
    type: "Ausgabe",
    amount: -68.42,
    date: "2026-04-27T19:48:00",
    status: "Abgeschlossen",
    account: "Giro DKB",
  },
  {
    id: "t5",
    name: "Sparplan VTI",
    category: "Investment",
    type: "Transfer",
    amount: -250,
    date: "2026-04-27T07:00:00",
    status: "Abgeschlossen",
    account: "ETF Depot",
  },
  {
    id: "t6",
    name: "Miete Wohnung",
    category: "Wohnen",
    type: "Ausgabe",
    amount: -1180,
    date: "2026-04-26T06:00:00",
    status: "Abgeschlossen",
    account: "Giro DKB",
  },
  {
    id: "t7",
    name: "Apple One",
    category: "Abos",
    type: "Ausgabe",
    amount: -22.95,
    date: "2026-04-26T11:30:00",
    status: "Abgeschlossen",
    account: "Giro DKB",
  },
  {
    id: "t8",
    name: "Rueckzahlung Tom",
    category: "Sonstige",
    type: "Einnahme",
    amount: 45,
    date: "2026-04-25T14:00:00",
    status: "Ausstehend",
    account: "Giro DKB",
  },
  {
    id: "t9",
    name: "Cloudflare Pro",
    category: "Abos",
    type: "Ausgabe",
    amount: -25,
    date: "2026-04-24T10:00:00",
    status: "Abgeschlossen",
    account: "Giro DKB",
  },
  {
    id: "t10",
    name: "BVG Monatskarte",
    category: "Mobilitaet",
    type: "Ausgabe",
    amount: -49,
    date: "2026-04-23T08:00:00",
    status: "Abgeschlossen",
    account: "Giro DKB",
  },
  {
    id: "t11",
    name: "Crypto Buy BTC",
    category: "Investment",
    type: "Transfer",
    amount: -100,
    date: "2026-04-22T20:00:00",
    status: "Abgeschlossen",
    account: "Crypto Wallet",
  },
  {
    id: "t12",
    name: "Restaurant Mitte",
    category: "Freizeit",
    type: "Ausgabe",
    amount: -82.5,
    date: "2026-04-21T21:30:00",
    status: "Storniert",
    account: "Giro DKB",
  },
];

export const budgets = [
  { name: "Lebensmittel", spent: 480, limit: 600, color: "#10b981" },
  { name: "Wohnen", spent: 1180, limit: 1200, color: "#6366f1" },
  { name: "Abos", spent: 1500, limit: 200, color: "#ff4f67" },
  { name: "Mobilitaet", spent: 220, limit: 350, color: "#55c5e7" },
  { name: "Freizeit", spent: 320, limit: 400, color: "#ffba49" },
];

export const goals = [
  { name: "Notgroschen", target: 10000, current: 6450, deadline: "2026-12-31", color: "from-indigo-500 to-violet-500" },
  { name: "Urlaub Japan", target: 4500, current: 1820, deadline: "2026-09-15", color: "from-rose-500 to-pink-500" },
  { name: "Neuer Mac", target: 3500, current: 2100, deadline: "2026-08-01", color: "from-emerald-500 to-teal-500" },
  { name: "ETF Pufferdepot", target: 25000, current: 12459, deadline: "2027-12-31", color: "from-amber-500 to-orange-500" },
];

export const incomeFlow30D = [
  3200, 3600, 3400, 3800, 4000, 3700, 4250, 4100, 4300, 4500, 4250, 4200, 4400,
  4250, 4150, 4350, 4250, 4500, 4700, 4250, 4150, 4300, 4250, 4100, 4250, 4400,
  4250, 4150, 4400, 4250,
];

export const expenseFlow30D = [
  2800, 3000, 2950, 3100, 3050, 3200, 3180, 3100, 3050, 3300, 3180, 3050, 3220,
  3180, 3100, 3250, 3180, 3300, 3400, 3180, 3050, 3220, 3180, 3100, 3180, 3300,
  3180, 3050, 3300, 3180,
];

export const earningCategories = [
  { label: "Working Hard", amount: 500, limit: 1000, color: "#6366f1" },
  { label: "Side Project", amount: 750, limit: 1000, color: "#55c5e7" },
  { label: "Investment", amount: 625, limit: 1000, color: "#ffba49" },
  { label: "Digital Assets", amount: 250, limit: 1000, color: "#ff4f67" },
];

export const recipients = [
  { name: "Jordan", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80" },
  { name: "Tony", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80" },
  { name: "Karen", image: "https://images.unsplash.com/photo-1494790108377-be9c29d29330?auto=format&fit=crop&w=160&q=80" },
  { name: "Johnny", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80" },
  { name: "Sariel", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80" },
  { name: "John", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=80" },
];
