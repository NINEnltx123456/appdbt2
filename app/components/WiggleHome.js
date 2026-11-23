"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UI = createContext(null);
const useUI = () => useContext(UI);

function GithubMark() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.7 7.7 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function SunIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
      <path strokeLinecap="round" d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4 19 19M19 5l-1.6 1.6M6.6 17.4 5 19" />
    </svg>
  );
}

function MoonIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M16 3.2A8.2 8.2 0 1 0 20.8 14 6.4 6.4 0 0 1 16 3.2Z" />
    </svg>
  );
}

function Hand({ deg, length, width, color }) {
  return (
    <span
      className="absolute left-1/2 top-1/2 rounded-full"
      style={{
        height: length,
        width,
        background: color,
        transform: `translate(-50%, -100%) rotate(${deg}deg)`,
        transformOrigin: "50% 100%",
      }}
    />
  );
}

function Dial({ size = 148, children }) {
  const labels = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const r = size * 0.39;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {labels.map((n, i) => {
        const ang = (i / 12) * Math.PI * 2 - Math.PI / 2;
        return (
          <span
            key={n}
            className="absolute text-[11px] opacity-75"
            style={{
              left: size / 2 + Math.cos(ang) * r,
              top: size / 2 + Math.sin(ang) * r,
              transform: "translate(-50%, -50%)",
            }}
          >
            {n}
          </span>
        );
      })}
      {children}
    </div>
  );
}

function LiveClock() {
  const { card } = useUI();
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const s = now ? now.getSeconds() : 0;
  const m = now ? now.getMinutes() : 22;
  const h = now ? now.getHours() : 4;
  const secDeg = s * 6;
  const minDeg = m * 6 + s * 0.1;
  const hourDeg = (h % 12) * 30 + m * 0.5;

  return (
    <article className={`${card} flex min-h-[230px] items-center justify-center`}>
      <Dial>
        <Hand deg={hourDeg} length="28%" width={3} color="currentColor" />
        <Hand deg={minDeg} length="38%" width={2} color="currentColor" />
        <Hand deg={secDeg} length="42%" width={1.5} color="#ef4444" />
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
      </Dial>
    </article>
  );
}

function Stopwatch() {
  const { card, dark } = useUI();
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!running) return undefined;
    const start = Date.now() - elapsed;
    const id = setInterval(() => setElapsed(Date.now() - start), 50);
    return () => clearInterval(id);
  }, [running]);

  const sec = Math.floor(elapsed / 1000);
  const cs = Math.floor((elapsed % 1000) / 10);
  const label = `${String(sec % 100).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
  const hand = ((elapsed / 1000) % 60) * 6;

  return (
    <article className={`${card} relative flex min-h-[230px] items-center justify-center`}>
      <Dial size={150}>
        <Hand deg={hand} length="36%" width={2} color="#ef4444" />
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
        <span className="absolute inset-x-0 top-[58%] text-center text-[22px] font-semibold tracking-wide">{label}</span>
      </Dial>
      <button
        aria-label="รีเซ็ต"
        onClick={() => {
          setRunning(false);
          setElapsed(0);
        }}
        className="absolute bottom-4 right-[72px] opacity-60"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 12a8 8 0 1 0 2.2-5.5" strokeLinecap="round" />
          <path d="M4 4v5h5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        aria-label={running ? "หยุด" : "เริ่ม"}
        onClick={() => setRunning((v) => !v)}
        className={`absolute bottom-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full ${dark ? "bg-white text-black" : "bg-neutral-900 text-white"}`}
      >
        {running ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor">
            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
          </svg>
        )}
      </button>
    </article>
  );
}

function CalendarCard() {
  const { card, muted } = useUI();
  const [cursor, setCursor] = useState(() => new Date(2025, 10, 1));
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1).getDay();
  const count = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];
  const label = cursor.toLocaleString("en-US", { month: "short", year: "numeric" });

  return (
    <article className={`${card} min-h-[230px] p-4`}>
      <div className="mb-2 flex items-center justify-between text-sm font-semibold">
        <button aria-label="เดือนก่อน" onClick={() => setCursor(new Date(year, month - 1, 1))} className="px-1 opacity-70">
          ‹
        </button>
        <span>{label}</span>
        <button aria-label="เดือนถัดไป" onClick={() => setCursor(new Date(year, month + 1, 1))} className="px-1 opacity-70">
          ›
        </button>
      </div>
      <div className={`grid grid-cols-7 text-center text-[10px] ${muted}`}>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={`${d}-${i}`} className="py-1">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center text-[11px]">
        {cells.map((d, i) => {
          const marked = d === 4 && year === 2025 && month === 10;
          return (
            <span key={i} className="flex h-6 items-center justify-center">
              {d ? (
                <span className={`flex h-5 w-5 items-center justify-center rounded-full ${marked ? "ring-1 ring-current" : ""}`}>
                  {d}
                </span>
              ) : null}
            </span>
          );
        })}
      </div>
    </article>
  );
}

function FlagIN() {
  return (
    <svg viewBox="0 0 18 12" className="h-3.5 w-5 rounded-[2px]" aria-hidden>
      <rect width="18" height="4" fill="#f97316" />
      <rect y="4" width="18" height="4" fill="#fff" />
      <rect y="8" width="18" height="4" fill="#16a34a" />
      <circle cx="9" cy="6" r="1.2" fill="none" stroke="#1d4ed8" strokeWidth="0.7" />
    </svg>
  );
}

function FlagAU() {
  return (
    <svg viewBox="0 0 18 12" className="h-3.5 w-5 rounded-[2px]" aria-hidden>
      <rect width="18" height="12" fill="#1d4ed8" />
      <rect width="8" height="6" fill="#172554" />
      <path d="M0 0l8 6M8 0L0 6" stroke="#fff" strokeWidth="0.8" />
      <circle cx="13.2" cy="2.6" r="0.6" fill="#fff" />
      <circle cx="15.2" cy="5.2" r="0.55" fill="#fff" />
      <circle cx="12.2" cy="7.4" r="0.55" fill="#fff" />
      <circle cx="14.6" cy="9" r="0.45" fill="#fff" />
    </svg>
  );
}

export default function WiggleHome() {
  const [dark, setDark] = useState(true);
  const card = dark
    ? "rounded-[22px] border border-white/10 bg-[#101010] text-white"
    : "rounded-[22px] border border-black/5 bg-white text-neutral-900 shadow-[0_10px_30px_rgba(0,0,0,0.04)]";
  const muted = dark ? "text-white/45" : "text-neutral-500";
  const page = dark ? "bg-[#050505] text-white" : "bg-[#f5f5f6] text-neutral-900";

  return (
    <UI.Provider value={{ dark, card, muted }}>
      <div
        className={`min-h-screen ${page}`}
        style={{
          backgroundImage: `radial-gradient(${dark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.14)"} 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      >
        <header className={`sticky top-0 z-20 backdrop-blur ${dark ? "bg-[#050505]/75" : "bg-[#f5f5f6]/75"}`}>
          <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 py-4">
            <div className="flex items-center gap-6">
              <a href="#top" className="flex items-center gap-2 text-[15px] font-semibold">
                <span className={`h-[18px] w-[18px] rounded-[4px] border-2 ${dark ? "border-white" : "border-neutral-900"}`} />
                Wiggle UI
              </a>
              <a href="#widgets" className="text-sm opacity-90">Widgets</a>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a
                href="[github](https://github.com/wigggle-ui/ui)"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                <GithubMark />
                Give us a Star
              </a>
              <button aria-label="สลับธีม" onClick={() => setDark((v) => !v)} className="opacity-90">
                {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </header>

        <main id="top" className="mx-auto w-full max-w-[1180px] px-5 pb-16 pt-12">
          <h1 className="mx-auto max-w-[920px] text-center text-[34px] font-bold leading-[1.15] tracking-tight sm:text-5xl md:text-[56px]">
            The first ever collection of Widgets for the Web.
          </h1>
          <p className={`mx-auto mt-5 max-w-xl text-center text-sm sm:text-base ${muted}`}>
            An open-source curated collection of copy-paste widgets for your next project.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6">
            <a
              href="#widgets"
              className={`rounded-full px-5 py-2 text-sm font-medium ${dark ? "bg-white text-black" : "bg-neutral-900 text-white"}`}
            >
              Get Started
            </a>
            <a href="#widgets" className="text-sm font-medium">View Widgets</a>
          </div>

          <section id="widgets" className="mt-16 grid scroll-mt-24 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <article className={`${card} flex min-h-[230px] flex-col justify-center px-5`}>
              <p className="text-lg font-semibold">
                <span className="text-red-500">Tue</span> Nov
              </p>
              <p className="mt-1 text-[78px] font-semibold leading-none tracking-tight">04</p>
            </article>

            <article className={`${card} flex min-h-[230px] flex-col p-4`}>
              <p className="flex items-center gap-1.5 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                Live
              </p>
              <div className="mt-3 flex items-start justify-between">
                <div className="flex flex-col items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fde047] text-[9px] font-black text-black">BVB</span>
                  <span className="text-3xl font-semibold leading-none">4</span>
                </div>
                <span className={`mt-3 rounded-md px-1.5 py-0.5 text-[10px] ${dark ? "bg-white/10" : "bg-black/5"}`}>34&apos;</span>
                <div className="flex flex-col items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-300 text-[8px] font-black text-sky-950">MCFC</span>
                  <span className="text-3xl font-semibold leading-none">4</span>
                </div>
              </div>
              <p className={`mt-auto pt-3 text-center text-xs ${muted}`}>UCL Final</p>
            </article>

            <LiveClock />

            <article className={`${card} flex min-h-[230px] flex-col justify-center px-4`}>
              <div className="flex items-start justify-between">
                <p className="text-[32px] font-semibold leading-none tracking-tight">732.17</p>
                <svg viewBox="0 0 12 10" className="mt-1 h-3 w-3 text-emerald-400" fill="currentColor" aria-hidden>
                  <path d="M6 0l6 10H0L6 0Z" />
                </svg>
              </div>
              <div className="mt-3 flex gap-4 text-sm font-medium text-emerald-400">
                <span>+2.76</span>
                <span>+0.47%</span>
              </div>
              <p className="mt-4 text-lg font-semibold">META</p>
              <p className={`text-xs ${muted}`}>Meta Platforms Inc</p>
            </article>

            <article className={`${card} flex min-h-[230px] flex-col p-4`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">Mumbai</p>
                  <p className={`text-xs ${muted}`}>Feels Like 36°</p>
                </div>
                <p className="text-4xl font-semibold leading-none">35°</p>
              </div>
              <div className={`mt-4 flex gap-6 text-sm ${muted}`}>
                <span>↑ 37°</span>
                <span>↓ 31°</span>
              </div>
              <div className="mt-auto flex justify-between pt-4 text-amber-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <SunIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <div className={`mt-1 flex justify-between text-[11px] ${muted}`}>
                <span>32°</span><span>37°</span><span>36°</span><span>38°</span><span>33°</span>
              </div>
            </article>

            <Stopwatch />

            <article className={`${card} flex min-h-[230px] flex-col p-4`}>
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="flex items-center gap-1 text-red-500">
                  <svg viewBox="0 0 12 10" className="h-2.5 w-2.5" fill="currentColor" aria-hidden>
                    <path d="M6 10 0 0h12L6 10Z" />
                  </svg>
                  AAPL
                </span>
                <span className="text-red-500">-4.26</span>
              </div>
              <svg viewBox="0 0 200 78" className="mt-2 w-full flex-1" aria-hidden>
                <defs>
                  <linearGradient id="aapl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 36 C16 48 28 64 48 50 C68 36 78 14 98 26 C116 38 128 58 148 40 C166 24 182 34 200 18 L200 78 L0 78 Z"
                  fill="url(#aapl)"
                />
                <path
                  d="M0 36 C16 48 28 64 48 50 C68 36 78 14 98 26 C116 38 128 58 148 40 C166 24 182 34 200 18"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2.4"
                />
              </svg>
              <p className="text-[28px] font-semibold leading-none">262.24</p>
            </article>

            <article className={`${card} flex min-h-[230px] flex-col justify-center gap-3 px-4 py-5 text-sm`}>
              {["Mon", "Tue", "Wed", "Thu"].map((day) => (
                <div key={day} className="flex items-center">
                  <span className="w-10">{day}</span>
                  <SunIcon className="h-4 w-4 text-amber-300" />
                  <span className="ml-auto">31°</span>
                  <span className="ml-4 w-8 text-right">38°</span>
                </div>
              ))}
            </article>

            <article className={`${card} flex min-h-[230px] flex-col p-4`}>
              <p className="text-sm font-semibold">ODI 2</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-semibold"><FlagIN /> IND</span>
                  <span>387/3 <span className={`text-xs ${muted}`}>(49)</span></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-semibold"><FlagAU /> AUS</span>
                  <span>200/6 <span className={`text-xs ${muted}`}>(30)</span></span>
                </div>
              </div>
              <p className={`mt-auto pt-4 text-xs ${muted}`}>
                AUS needs <span className={dark ? "text-white" : "text-neutral-900"}>187</span> from{" "}
                <span className="text-emerald-400">120</span>
              </p>
            </article>

            <article className={`${card} flex min-h-[230px] flex-col justify-center gap-6 px-4`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm ${muted}`}>Mumbai</p>
                  <p className="text-[28px] font-semibold leading-none">8:15 AM</p>
                </div>
                <SunIcon className="h-5 w-5 text-amber-300" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm ${muted}`}>Vancouver</p>
                  <p className="text-[28px] font-semibold leading-none">6:45 PM</p>
                </div>
                <MoonIcon className="h-5 w-5 opacity-80" />
              </div>
            </article>

            <CalendarCard />

            <article className={`${card} flex min-h-[230px] flex-col items-end justify-center px-5 text-right`}>
              <p className="text-6xl font-semibold leading-none tracking-tight">29°</p>
              <p className="mt-2 text-lg">Sunny</p>
              <p className={`text-sm ${muted}`}>Tue Nov 22</p>
            </article>
          </section>
        </main>
      </div>
    </UI.Provider>
  );
}