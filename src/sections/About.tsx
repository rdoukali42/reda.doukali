import { Code2, Palette, Smartphone, Sparkles, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { socialLinks } from '@/config/links';
import { FocusBracket } from '@/components/motion/FocusBracket';
import { GridReveal } from '@/components/motion/GridReveal';
import type { ComponentType } from 'react';

interface AboutCardProps {
  index: number;
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const AboutCard = ({ index, icon: Icon, title, description }: AboutCardProps) => (
  <FocusBracket size={10}>
    <div className="p-4 sm:p-5 md:p-6 bg-card/50 backdrop-blur-sm border border-border/50 group-hover:border-primary/50 transition-colors duration-300 h-full">
      <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-primary/70 mb-2 sm:mb-3">
        [ {String(index).padStart(2, '0')} ]
      </div>
      <Icon className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 text-primary mb-3 sm:mb-4" />
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-mono mb-1.5 sm:mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground text-xs sm:text-sm leading-snug">{description}</p>
    </div>
  </FocusBracket>
);

const About = () => {
  const { t } = useLocale();

  return (
    <section id="about" className="relative py-20 sm:py-28 md:py-32 px-4 sm:px-6 overflow-hidden" aria-labelledby="about-heading">
      <GridReveal className="absolute inset-0" opacity={0.2} />

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
            <Star className="w-4 h-4" />
            <span>[ {t.about.label} ]</span>
          </div>
          <h2 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 sm:mb-6 leading-tight">
            {t.about.title}
            <span className="text-primary italic font-mono"> {t.about.titleHighlight}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-5 sm:mb-6">{t.about.paragraph1}</p>
          <p className="text-base sm:text-lg text-muted-foreground mb-5 sm:mb-6">{t.about.paragraph2}</p>
          <p className="text-base sm:text-lg text-muted-foreground mb-7 sm:mb-8">{t.about.paragraph3}</p>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" data-cursor="link" className="inline-block w-full sm:w-auto">
            <Button variant="gold" className="font-mono w-full sm:w-auto">
              <span className="text-primary-foreground/80 mr-1">[</span>
              {t.about.viewLinkedIn}
              <ArrowRight className="w-4 h-4 ml-1" />
              <span className="text-primary-foreground/80 ml-1">]</span>
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <AboutCard index={1} icon={Code2} title={t.about.cards.aiml.title} description={t.about.cards.aiml.description} />
          <AboutCard index={2} icon={Palette} title={t.about.cards.mlops.title} description={t.about.cards.mlops.description} />
          <AboutCard index={3} icon={Smartphone} title={t.about.cards.cloud.title} description={t.about.cards.cloud.description} />
          <AboutCard index={4} icon={Sparkles} title={t.about.cards.certifications.title} description={t.about.cards.certifications.description} />
        </div>
      </div>
    </section>
  );
};

export default About;
