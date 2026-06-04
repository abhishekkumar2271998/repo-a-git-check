import { motion as Motion } from "framer-motion";

const clients = [
  { name: "AWS", src: "/logos/aws.svg" },
  { name: "HashiCorp", src: "/logos/hashicorp.svg" },
  { name: "Tesco", src: "/logos/tesco.svg" },
  { name: "Deliveroo", src: "/logos/deliveroo.svg" },
  { name: "Rutgers", src: "/logos/rutgers.svg" },
  { name: "European Union", src: "/logos/european-union.svg" },
];

export function Clients() {
  return (
    <section id="clients" className="sect">
      <div className="container-site">
        <div className="mb-[48px] md:mb-[72px]" style={{ maxWidth: 640 }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 400,
              fontSize: "clamp(34px, 4.6vw, 52px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--fg-1)",
              margin: "0 0 18px",
            }}
          >
            Used where it matters.
          </h2>
          <p className="text-fg-2 text-lg leading-[1.55]" style={{ maxWidth: "56ch" }}>
            From global enterprises to public institutions, people who can't compromise
            on privacy reach for Steno.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {clients.map((c, i) => (
            <Motion.div
              key={c.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center justify-center rounded-xl px-6 py-10"
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <img
                src={c.src}
                alt={c.name}
                className="h-8 sm:h-9 w-auto dark:invert"
                style={{ opacity: 0.65 }}
              />
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
