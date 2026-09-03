"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Home from "./routes/Home";

export function App() {
  const pathname = usePathname() || "/";

  // Normalize pathname (strip trailing slash unless it's root)
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");

  // Route: /
  if (normalizedPath === "" || normalizedPath === "/") {
    return <Home />;
  }

  // Example dynamic route matcher: /users/[id]
  const userMatch = normalizedPath.match(/^\/users\/([^/]+)$/);
  if (userMatch) {
    const userId = userMatch[1];
    return (
      <main className="min-h-screen flex items-center justify-center p-6 text-center bg-bg">
        <div className="p-8 bg-surface rounded-xl border border-border max-w-md shadow-lg">
          <h2 className="text-2xl font-bold font-heading text-primary mb-2">Korisnik: {userId}</h2>
          <p className="text-muted text-sm font-body">Dinamička SPA ruta uspješno prepoznata i renderirana.</p>
          <a
            href="/"
            className="inline-block mt-4 px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
          >
            Povratak na početnu
          </a>
        </div>
      </main>
    );
  }

  // Catch-all SPA route preview (proves PocketBase fallback served index.html)
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-bg">
      <div className="p-8 bg-surface rounded-xl border border-border max-w-md shadow-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-semibold">
          SPA Index Fallback Aktiviran
        </div>
        <h2 className="text-xl font-bold font-heading text-text mb-2">Ruta: {normalizedPath}</h2>
        <p className="text-muted text-sm font-body mb-4">
          Ovu rutu je PocketBase servirao kroz <code>indexFallback</code>, a klijentski router unutar Next.js SPA-a ju je preuzeo.
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
        >
          Povratak na početnu
        </a>
      </div>
    </main>
  );
}

export default App;
