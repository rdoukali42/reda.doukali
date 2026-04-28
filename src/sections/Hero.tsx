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
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      id="hero"
      aria-labelledby="hero-heading"
    >
      <GridReveal className="absolute inset-0" opacity={0.4} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-12 gap-8 items-center py-20 sm:py-24">
        {/* Text — full width below lg:, 7/12 at lg: */}
        <div className="lg:col-span-7 max-w-full">
          <div className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-3 py-1.5 rounded-sm bg-card/40 border border-primary/30 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-primary/90 max-w-full">
            <span className="w-1 h-1 rounded-full bg-primary shrink-0" aria-hidden="true" />
            <span className="truncate">[ {t.hero.badge} ]</span>
          </div>

          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-5 sm:mb-6 leading-[0.95] break-words"
          >
            {t.hero.title}
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]">
              {t.hero.subtitle}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="#projects" data-cursor="link" className="w-full sm:w-auto">
              <Button variant="gold" size="lg" className="group font-mono w-full sm:w-auto">
                <span className="text-primary-foreground/80 mr-1">[</span>
                {t.hero.viewWork}
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                <span className="text-primary-foreground/80 ml-1">]</span>
              </Button>
            </a>
            <a href="#contact" data-cursor="link" className="w-full sm:w-auto">
              <Button variant="glass" size="lg" className="font-mono w-full sm:w-auto">
                <Mail className="w-4 h-4 mr-2" />
                {t.hero.getInTouch}
              </Button>
            </a>
          </div>
        </div>

        {/* Pixel Portrait — only at lg:+ where it can sit beside the headline */}
        <div className="hidden lg:block lg:col-span-5 relative">
          <div className="relative max-w-md mx-auto">
            <div
              className="absolute -top-3 -left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/70"
              aria-hidden="true"
            >
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
