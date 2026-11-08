"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { BtnInner, Logo, Moon, Sun } from "./Icons";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as "dark" | "light") || "dark");
  }, []);

  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("rb-theme", next);
    } catch {}
    setTheme(next);
  };

  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button type="button" className="theme-toggle" onClick={flip} aria-label={label} title={label}>
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`}>
      <div className="wrap header-inner">
        <a href="#top" className="brand" aria-label="Robustify home">
          <Logo />
          Robustify
        </a>
        <nav className="nav" aria-label="Primary">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a href="#pricing" className="btn btn-primary">
            <BtnInner label="Get a licence" />
          </a>
        </div>
      </div>
    </header>
  );
}
