import { Star, Linkedin, Github, Mail, MapPin } from 'lucide-react';
import { m } from 'framer-motion';
import { useLocale } from '@/hooks/use-locale';
import { socialLinks } from '@/config/links';
import { FocusBracket } from '@/components/motion/FocusBracket';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useInView } from '@/hooks/use-in-view';
import type { ComponentType } from 'react';

interface NodeCardProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  hint: string;
  href?: string;
}

const NodeCard = ({ icon: Icon, label, hint, href }: NodeCardProps) => {
  const inner = (
    <FocusBracket size={10}>
      <div className="relative w-36 h-36 md:w-40 md:h-40 bg-card/60 backdrop-blur-md border border-primary/20 group-hover:border-primary/60 transition-colors rounded-sm flex flex-col items-center justify-center p-4">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary/60 absolute top-2 left-2">
          [ NODE ]
        </div>
        <div className="p-3 rounded-sm bg-primary/10 group-hover:bg-primary/20 transition-colors mb-2">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="font-mono text-sm text-foreground">{label}</div>
        <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{hint}</div>
      </div>
    </FocusBracket>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" data-cursor="link" aria-label={label}>
      {inner}
    </a>
  ) : (
    inner
  );
};

const Contact = () => {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ amount: 0.2 });

  return (
    <section
      id="contact"
      className="py-20 px-4 md:px-6 relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
            <Star className="w-4 h-4" />
            <span>[ {t.contact.label} ]</span>
          </div>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-3">
            {t.contact.title}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t.contact.description}
          </p>
        </header>

        {/* Wiring diagram (md+) */}
        <div ref={ref} className="hidden md:block relative max-w-4xl mx-auto h-[28rem]">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 800 448"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {[
              { d: 'M 200 100 Q 350 150 400 224' }, // top-left → core
              { d: 'M 600 100 Q 450 150 400 224' }, // top-right → core
              { d: 'M 200 348 Q 350 298 400 224' }, // bottom-left → core
              { d: 'M 600 348 Q 450 298 400 224' }, // bottom-right → core
            ].map((p, i) => (
              <m.path
                key={i}
                d={p.d}
                fill="none"
                stroke="hsl(45 100% 51%)"
                strokeWidth={1.5}
                strokeOpacity={0.4}
                strokeDasharray="4 4"
                initial={reduced ? false : { pathLength: 0 }}
                animate={{ pathLength: reduced || inView ? 1 : 0 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 1, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }
                }
              />
            ))}
          </svg>

          <div className="absolute top-0 left-0">
            <NodeCard icon={Linkedin} label="LinkedIn" hint="connect" href={socialLinks.linkedin} />
          </div>
          <div className="absolute top-0 right-0">
            <NodeCard icon={Github} label="GitHub" hint="explore code" href={socialLinks.github} />
          </div>
          <div className="absolute bottom-0 left-0">
            <NodeCard icon={Mail} label="Email" hint="get in touch" href={`mailto:${socialLinks.email}`} />
          </div>
          <div className="absolute bottom-0 right-0">
            <NodeCard icon={MapPin} label="Location" hint={t.contact.location} />
          </div>

          {/* Core node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-20 h-20 rounded-full bg-card/80 border border-primary/40 flex items-center justify-center shadow-[0_0_30px_hsl(45_100%_51%/0.25)]">
              <span className="font-mono text-xl font-bold text-primary">RD</span>
              <div className="absolute -inset-2 rounded-full border border-primary/20 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Mobile fallback: vertical bus */}
        <div className="md:hidden relative pl-6">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-primary/30" aria-hidden="true" />
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute left-[-1rem] top-1/2 w-3 h-px bg-primary/50" aria-hidden="true" />
              <NodeCard icon={Linkedin} label="LinkedIn" hint="connect" href={socialLinks.linkedin} />
            </div>
            <div className="relative">
              <div className="absolute left-[-1rem] top-1/2 w-3 h-px bg-primary/50" aria-hidden="true" />
              <NodeCard icon={Github} label="GitHub" hint="explore code" href={socialLinks.github} />
            </div>
            <div className="relative">
              <div className="absolute left-[-1rem] top-1/2 w-3 h-px bg-primary/50" aria-hidden="true" />
              <NodeCard icon={Mail} label="Email" hint="get in touch" href={`mailto:${socialLinks.email}`} />
            </div>
            <div className="relative">
              <div className="absolute left-[-1rem] top-1/2 w-3 h-px bg-primary/50" aria-hidden="true" />
              <NodeCard icon={MapPin} label="Location" hint={t.contact.location} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
