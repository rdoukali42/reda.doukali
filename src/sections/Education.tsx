import { useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/hooks/use-locale';
import { FocusBracket } from '@/components/motion/FocusBracket';
import { TypewriterText } from '@/components/motion/TypewriterText';

const truncate = (text: string, max = 160) =>
  text.length <= max ? text : text.slice(0, max) + '...';

const Education = () => {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  return (
    <section id="education" className="py-20 px-6" aria-labelledby="education-heading">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
            <Star className="w-4 h-4" />
            <span>[ {t.education.label} ]</span>
          </div>
          <h2 id="education-heading" className="text-4xl font-bold mb-3">
            {t.education.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.education.description}
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {t.education.items.map((edu, index) => {
            const isOpen = expanded[index];
            return (
              <FocusBracket key={index} size={10}>
                <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 group-hover:border-primary/50 transition-all duration-300 h-full">
                  <div className="text-center">
                    <h3 className="text-lg font-bold font-mono mb-2 uppercase tracking-tight">
                      {edu.institution}
                    </h3>
                    <p className="text-primary text-sm italic font-mono mb-2">{edu.degree}</p>
                    <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider bg-muted/50 border border-border text-foreground">
                      {edu.duration}
                    </Badge>

                    {edu.description && (
                      <div className="mt-4 text-sm text-muted-foreground">
                        {isOpen ? (
                          <TypewriterText text={edu.description} speed={12} />
                        ) : (
                          <p className="whitespace-pre-line">{truncate(edu.description, 160)}</p>
                        )}
                        <div className="mt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggle(index)}
                            className="text-primary font-mono"
                            data-cursor="link"
                          >
                            {'> '}
                            {isOpen ? 'Show less' : 'Read more'}
                          </Button>
                        </div>
                      </div>
                    )}
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

export default Education;
