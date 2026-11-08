import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EngineDiff from "@/components/EngineDiff";
import LayerStack from "@/components/LayerStack";
import KillSwitch from "@/components/KillSwitch";
import Contact from "@/components/Contact";
import { RevealObserver, StickyCta } from "@/components/Motion";
import { BtnInner, CapIcon, Check, Clock, Gate, Logo, Shield, Stars } from "@/components/Icons";
import {
  addons,
  capabilities,
  competitors,
  defense,
  reviews,
  roadmap,
  site,
  tiers,
} from "@/lib/site";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Proof, early: social proof and production evidence before any feature talk. */}
        <section className="proof-band" aria-label="Proof">
          <div className="wrap">
            <div className="production">
              <p>
                In production, not just in tests: <strong>RisxnTweaks</strong>, a seven-figure software business with
                100,000+ users, ships its flagship installer through the Robustify engine.
              </p>
              <ul className="checks">
                <li>
                  <Check />
                  <span>
                    <b>20+ protection configurations</b> generated fresh for every build
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>20+ developers and ISVs</b> shipping production software through Robustify
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>55 regression tests</b>, green on every release candidate
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>30+ defect classes</b> root-caused and pinned, one test each
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>Red-teamed by AI:</b> we ran AI-driven analysis against our own output and closed every flank it
                    found
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Engine */}
        <section className="section" id="engine">
          <div className="wrap">
            <div className="section-head reveal">
              <h2>Everything randomized. Nothing predictable.</h2>
              <p className="lede">
                Randomness at every layer is the design goal, not a side effect. Free decompilers turn unprotected .NET
                back into readable C# in an afternoon, and a language model reads it at machine speed. Robustify leaves
                it nothing reusable.
              </p>
            </div>
            <div className="engine-grid">
              <div className="reveal">
                <EngineDiff />
              </div>
              <ul className="caps">
                {capabilities.map((c, i) => (
                  <li className="cap reveal" key={c.title} style={{ ["--d" as string]: `${i * 40}ms` }}>
                    <span className="cap-icon">
                      <CapIcon name={c.icon} />
                    </span>
                    <div>
                      <h3>{c.title}</h3>
                      <p>{c.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Layers */}
        <section className="section layers-section" aria-labelledby="layers-title">
          <div className="wrap">
            <div className="section-head reveal">
              <h2 id="layers-title">What an attacker must defeat, in order.</h2>
            </div>
            <LayerStack />
          </div>
        </section>

        {/* Kill switch */}
        <section className="section" id="killswitch">
          <div className="wrap ks-grid">
            <div className="ks-copy reveal">
              <h2>The heartbeat and the kill switch.</h2>
              <p>
                Every protected executable checks in with the Robustify server using a signed authentication token. No
                check-in, no execution.
              </p>
              <p>
                Revoke a build&apos;s registration and that executable stops working everywhere, immediately. Cut off a
                leaked build or a non-paying customer without shipping anything: the decision lives server-side, and the
                client fails closed.
              </p>
            </div>
            <div className="reveal" style={{ ["--d" as string]: "120ms" }}>
              <KillSwitch />
            </div>
          </div>
        </section>

        {/* Endgame */}
        <section className="section endgame" id="vision" aria-labelledby="vision-title">
          <div className="wrap">
            <div className="section-head reveal">
              <h2 id="vision-title">The endgame: nothing ships client-side.</h2>
              <span className="badge">
                <Clock width={14} height={14} /> In development
              </span>
              <p className="lede">
                Today, your code ships protected. The endgame removes it from the client entirely: your
                application&apos;s logic lives server-side, delivered on demand over an authenticated channel and executed
                remotely. The client becomes a shell with nothing to reverse engineer.
              </p>
            </div>
            <div className="flow reveal" role="img" aria-label="Client shell sends requests through an AI gate to a server holding all logic; forged requests are rejected at the gate.">
              <div className="node">
                <span className="node-tag">Client</span>
                <h3>UI shell only</h3>
                <p>No logic. No code to read. Nothing to steal.</p>
              </div>
              <div className="track" aria-hidden>
                <div className="track-line">
                  <span className="packet" />
                  <span className="packet p2" />
                </div>
                <span className="track-label">authenticated channel</span>
                <div className="track-line">
                  <span className="packet forged" />
                </div>
                <span className="track-label">forged requests</span>
              </div>
              <div className="node node-gate">
                <Gate />
                <h3>AI gate</h3>
                <p>Verifies every request</p>
              </div>
              <div className="track" aria-hidden>
                <div className="track-line">
                  <span className="packet" style={{ animationDelay: "0.4s" }} />
                  <span className="packet" style={{ animationDelay: "1.7s" }} />
                </div>
                <span className="track-label">logic on demand</span>
              </div>
              <div className="node node-server">
                <span className="node-tag">Server</span>
                <h3>All logic, server-side</h3>
                <p>Protected runtimes resident. Malicious traffic dies at the gate.</p>
              </div>
            </div>
            <p className="endgame-close reveal">
              Code that never leaves home cannot be decompiled, tampered with, or cracked. At all.
            </p>

            <div className="roadmap reveal" style={{ marginTop: 64 }}>
              {roadmap.map((r) => (
                <div className="road" key={r.title}>
                  <span
                    className={`road-status${r.status === "Shipped" ? " shipped" : r.status === "In progress" ? " progress" : ""}`}
                  >
                    <i aria-hidden /> {r.status}
                  </span>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Defense */}
        <section className="section" id="defense">
          <div className="wrap defense-grid">
            <div className="section-head reveal" style={{ marginBottom: 0 }}>
              <h2>Built for ground remote control software.</h2>
              <p className="lede">
                Ground control stations, mission planners, and payload-control apps for drones and unmanned systems are
                Windows software facing exactly the threat profile this engine answers.
              </p>
              <div className="threats" aria-label="Threats addressed">
                {["Captured hardware", "Intercepted laptops", "Adversary reverse engineering", "Tampered field binaries"].map(
                  (t) => (
                    <span className="threat" key={t}>
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
            <ul className="defense-list reveal">
              {defense.map((d) => (
                <li key={d}>
                  <Check />
                  <span>{d}</span>
                </li>
              ))}
              <li className="planned">
                <Clock />
                <span>
                  <strong>On the roadmap:</strong> offline activation tokens for air-gapped deployments.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Reviews */}
        <section className="section" id="reviews" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="reviews-head reveal">
              <h2>What developers say.</h2>
              <div className="rating">
                <span className="rating-num">5.0</span>
                <div>
                  <Stars />
                  <small>Average across 20+ Product Hunt reviews</small>
                </div>
              </div>
            </div>
            <div className="quotes">
              {reviews.map((r, i) => (
                <figure className="quote reveal" key={r.name} style={{ ["--d" as string]: `${(i % 3) * 60}ms` }}>
                  <blockquote>{r.quote}</blockquote>
                  <figcaption>
                    <b>{r.name}</b>
                    {r.role}
                  </figcaption>
                </figure>
              ))}
            </div>
            <a className="source-link" href={site.productHunt} target="_blank" rel="noopener noreferrer">
              Read every review on Product Hunt
            </a>
          </div>
        </section>

        {/* Compare */}
        <section className="section" aria-labelledby="compare-title" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="section-head reveal">
              <h2 id="compare-title">Where we sit.</h2>
              <p className="lede">The tools you&apos;re probably weighing us against, and what you get here instead.</p>
            </div>
            <table className="compare reveal">
              <thead>
                <tr>
                  <th scope="col">Alternative</th>
                  <th scope="col">What it does</th>
                  <th scope="col">With Robustify</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c) => (
                  <tr key={c.name}>
                    <th scope="row">
                      {c.name}
                      <small>{c.maker}</small>
                    </th>
                    <td>{c.them}</td>
                    <td className="us">
                      <Check />
                      {c.us}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing */}
        <section className="section pricing" id="pricing">
          <div className="wrap">
            <div className="section-head reveal">
              <h2>One engine. No protection held back.</h2>
              <p className="lede">
                Tiers differ in capacity and support, never in how protected your code is.
              </p>
            </div>
            <div className="pricing-promise reveal">
              <Shield />
              <p>
                <strong>Every tier runs the full protection pipeline.</strong>
                Deep code protection, heartbeat and kill switch, tamper detection, anti-debug, single-file output.
              </p>
            </div>
            <div className="tiers reveal">
              {tiers.map((t) => (
                <article className={`tier${t.featured ? " is-featured" : ""}`} key={t.id} aria-label={`${t.name} plan`}>
                  {t.featured && <span className="tier-flag">Most popular</span>}
                  <div>
                    <div className="tier-name">{t.name}</div>
                    <div className="tier-price" style={{ marginTop: 16 }}>
                      <span className="amt">{t.price}</span>
                      <span className="per">per year</span>
                    </div>
                    <div className="tier-monthly">{t.monthly ? `${t.monthly}/mo, billed yearly` : "Custom terms"}</div>
                  </div>
                  <div className="tier-cap">
                    <b>{t.products}</b>
                    <span>{t.keys}</span>
                  </div>
                  <ul>
                    {t.features.map((f) => (
                      <li key={f}>
                        <Check />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    data-plan={t.id}
                    className={`btn ${t.featured ? "btn-primary" : "btn-ghost"}`}
                  >
                    <BtnInner label={t.id === "enterprise" ? "Talk to us" : `Choose ${t.name}`} arrow={!!t.featured} />
                  </a>
                </article>
              ))}
            </div>
            <div className="pricing-note">
              <p>
                <strong>Licensing is direct for now.</strong> Online card payments aren&apos;t live yet; request a licence
                below and we&apos;ll set you up. Card payments will be announced here the moment they go live.
              </p>
              <p>
                <strong>No hard cut-offs.</strong> Licences renew annually. If a licence lapses, registered build hashes
                stay live for a 30-day grace period while new registrations pause.
              </p>
            </div>

            <div className="addons reveal">
              <h3>Optional services, billed separately.</h3>
              <ul className="addon-list">
                {addons.map((a) => (
                  <li className="addon" key={a.name}>
                    <b>{a.name}</b>
                    <p>{a.body}</p>
                    <span className="mono">{a.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Close */}
        <section className="section close" id="contact">
          <div className="wrap close-grid">
            <div className="close-copy reveal">
              <h2 id="contact-title">Ship your next build protected.</h2>
              <p className="lede">
                Tell us what you ship and which plan fits. We&apos;ll reply with licence details and help you wire the
                engine into your build.
              </p>
              <ul className="checks">
                <li>
                  <Check />
                  <span>
                    <b>Same full pipeline</b> on every plan
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>30-day grace period</b> if a licence lapses
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b>Owner and staff support</b>, praised in our reviews
                  </span>
                </li>
              </ul>
            </div>
            <div className="reveal" style={{ ["--d" as string]: "120ms" }}>
              <Contact />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a href="#top" className="brand" aria-label="Robustify, back to top">
            <Logo />
            Robustify
          </a>
          <span>© 2026 Robustify · robustify.xyz</span>
          <nav aria-label="Legal">
            {site.legal.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>

      <StickyCta />
      <RevealObserver />
    </>
  );
}
