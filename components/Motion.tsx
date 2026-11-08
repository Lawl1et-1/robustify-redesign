"use client";

import { useEffect, useState } from "react";
import { BtnInner } from "./Icons";

/** Marks the document as JS-capable and reveals `.reveal` elements once they
 *  enter the viewport. Content is visible by default without JS. */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    // Anything already on screen stays visible; only below-the-fold content animates in.
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-in");
    });
    root.classList.add("js");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => !el.classList.contains("is-in") && io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

/** Mobile-only bar that keeps the primary action in thumb reach after the hero. */
export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const pricing = document.getElementById("pricing");
      const contact = document.getElementById("contact");
      const y = window.scrollY;
      const past = y > window.innerHeight * 0.9;
      const inBuy =
        (pricing && pricing.getBoundingClientRect().top < window.innerHeight && pricing.getBoundingClientRect().bottom > 0) ||
        (contact && contact.getBoundingClientRect().top < window.innerHeight);
      setShow(past && !inBuy);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`sticky-cta${show ? " is-visible" : ""}`} aria-hidden={!show}>
      <span>
        From <b>$10/mo</b>, billed yearly
      </span>
      <a href="#pricing" className="btn btn-primary" tabIndex={show ? 0 : -1}>
        <BtnInner label="See plans" />
      </a>
    </div>
  );
}
