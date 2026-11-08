"use client";

import { useEffect, useState } from "react";
import { site, tiers } from "@/lib/site";
import { BtnInner } from "./Icons";

type Errors = Partial<Record<"name" | "email", string>>;

export default function Contact() {
  const [plan, setPlan] = useState("professional");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<"" | "opened" | "unconfigured">("");

  // Tier buttons carry data-plan; clicking one preselects that plan here.
  useEffect(() => {
    const pick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("[data-plan]");
      const id = a?.dataset.plan;
      if (id && tiers.some((t) => t.id === id)) setPlan(id);
    };
    document.addEventListener("click", pick);
    return () => document.removeEventListener("click", pick);
  }, []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const next: Errors = {};
    if (!name) next.name = "Enter your name so we know who to reply to.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a work email like you@company.com.";
    setErrors(next);
    if (Object.keys(next).length) return;

    if (!site.contactEmail) {
      setSent("unconfigured");
      return;
    }
    const tier = tiers.find((t) => t.id === plan)?.name ?? plan;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${f.get("company") || "-"}`,
      `Plan: ${tier}`,
      "",
      String(f.get("ship") || ""),
    ].join("\n");
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
      `Robustify licence: ${tier}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent("opened");
  };

  return (
    <form className="form" onSubmit={submit} noValidate aria-labelledby="contact-title">
      <div className="field-row">
        <div className="field">
          <label htmlFor="c-name">Name</label>
          <input
            id="c-name"
            name="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "c-name-err" : undefined}
          />
          {errors.name && (
            <span className="field-error" id="c-name-err">
              {errors.name}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="c-email">Work email</label>
          <input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "c-email-err" : undefined}
          />
          {errors.email && (
            <span className="field-error" id="c-email-err">
              {errors.email}
            </span>
          )}
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="c-company">Company or product</label>
          <input id="c-company" name="company" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="c-plan">Plan</label>
          <select id="c-plan" name="plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
            {tiers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} · {t.price}/yr
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-ship">What are you protecting?</label>
        <textarea id="c-ship" name="ship" placeholder="WinForms app, ~40k LOC, shipped to 3,000 customers" />
      </div>
      <div className="form-foot">
        <button type="submit" className="btn btn-primary btn-lg">
          <BtnInner label="Request my licence" />
        </button>
        {sent === "opened" && (
          <p className="form-msg" role="status">
            Your email app should open with the request filled in. Send it and we&apos;ll reply with licence details.
          </p>
        )}
        {sent === "unconfigured" && (
          <p className="form-msg" role="status">
            Licence requests aren&apos;t connected on this preview yet. The site owner needs to add a contact address.
          </p>
        )}
        <p className="form-note">No payment now. Licences renew annually.</p>
      </div>
    </form>
  );
}
