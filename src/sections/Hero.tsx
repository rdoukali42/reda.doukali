import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { PixelPortrait } from '@/components/motion/PixelPortrait';
import { BuildLog } from '@/components/motion/BuildLog';
import { TypewriterText } from '@/components/motion/TypewriterText';
import { GridReveal } from '@/components/motion/GridReveal';
import goldMe from '@/assets/gold_me.png';

const Hero = () => {
  const { t } = useLocale();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero" aria-labelledby="hero-heading">
      <GridReveal className="absolute inset-0" opacity={0.4} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-12 gap-8 items-center py-24">
        {/* Text */}
        <div className="md:col-span-7 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-sm bg-card/40 border border-primary/30 font-mono text-[11px] uppercase tracking-[0.2em] text-primary/90">
            <span className="w-1 h-1 rounded-full bg-primary" aria-hidden="true" />
            [ {t.hero.badge} ]
          </div>

          <h1 id="hero-heading" className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            {t.hero.title}
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]">
              {t.hero.subtitle}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" data-cursor="link">
              <Button variant="gold" size="lg" className="group font-mono">
                <span className="text-primary-foreground/80 mr-1">[</span>
                {t.hero.viewWork}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                <span className="text-primary-foreground/80 ml-1">]</span>
              </Button>
            </a>
            <a href="#contact" data-cursor="link">
              <Button variant="glass" size="lg" className="font-mono">
                <Mail className="w-4 h-4 mr-2" />
                {t.hero.getInTouch}
              </Button>
            </a>
          </div>
        </div>

        {/* Pixel Portrait */}
        <div className="md:col-span-5 order-1 md:order-2 relative">
          <div className="relative max-w-md mx-auto">
            <div className="absolute -top-3 -left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70" aria-hidden="true">
              <TypewriterText text="[ BUILDING REDA ]" speed={45} immediate />
            </div>

            <PixelPortrait
              finalImageSrc={goldMe}
              alt="Reda Doukali, Applied AI Engineer"
              duration={1600}
              delay={300}
              className="w-full"
            />

            <div className="mt-3">
              <BuildLog
                lines={['tokens loaded', 'portrait rasterized', 'profile resolved']}
                initialDelay={400}
                perLine={500}
                immediate
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
