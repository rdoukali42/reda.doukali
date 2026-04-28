import { useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { FocusBracket } from '@/components/motion/FocusBracket';
import { ChipMount } from '@/components/motion/ChipMount';

const truncate = (text: string, max = 120) =>
  text.length <= max ? text : text.slice(0, max) + '...';

const Experience = () => {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  return (
    <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 relative" aria-labelledby="experience-heading">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
            <Star className="w-4 h-4" />
            <span>[ {t.experience.label} ]</span>
          </div>
          <h2 id="experience-heading" className="text-4xl font-bold mb-3">
            {t.experience.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.experience.description}
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.experience.programs.map((program, index) => {
            const isOpen = expanded[index];
            return (
              <FocusBracket key={index} size={10}>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 group-hover:border-primary/50 transition-colors duration-300 h-full">
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider bg-primary/15 border border-primary/40 text-primary">
                        {program.duration}
                      </Badge>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/70">
                        STATUS: SHIPPED
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-primary/80 text-xs font-mono italic mb-3">
                      {program.company}
                    </p>
                    <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                      {isOpen ? program.description : truncate(program.description, 120)}
                    </p>

                    {program.description.length > 120 && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-primary font-mono p-0 h-auto mb-3"
                        onClick={() => toggle(index)}
                        data-cursor="link"
                      >
                        {'> '}
                        {isOpen ? t.experience.showLess : t.experience.readMore}
                        <ArrowRight className={`w-3 h-3 ml-1 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                      </Button>
                    )}

                    {isOpen && program.collaboration && (
                      <p className="text-xs text-primary/80 italic mb-3 font-mono">
                        {program.collaboration}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {program.tags.slice(0, isOpen ? program.tags.length : 3).map((tag, ti) => (
                        <ChipMount key={tag} index={ti}>
                          <Badge
                            variant="secondary"
                            className="font-mono text-[10px] uppercase tracking-wider bg-muted/50 border border-border text-foreground"
                          >
                            {tag}
                          </Badge>
                        </ChipMount>
                      ))}
                      {!isOpen && program.tags.length > 3 && (
                        <Badge variant="secondary" className="font-mono text-[10px] bg-muted/50 border border-border text-foreground">
                          +{program.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </FocusBracket>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
