import { Star } from 'lucide-react';
import { useLocale } from '@/hooks/use-locale';
import { ChipMount } from '@/components/motion/ChipMount';
import { FocusBracket } from '@/components/motion/FocusBracket';

const Skills = () => {
  const { t } = useLocale();

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-background to-card/20" aria-labelledby="skills-heading">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
            <Star className="w-4 h-4" />
            <span>[ {t.skills.label} ]</span>
          </div>
          <h2 id="skills-heading" className="text-4xl font-bold mb-3">
            {t.skills.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.skills.description}
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-3">
          {t.skills.items.map((skill, index) => (
            <ChipMount key={skill} index={index} staggerStep={0.03}>
              <FocusBracket size={8}>
                <div className="px-5 py-2.5 bg-card/50 backdrop-blur-sm border border-border/50 rounded-sm group-hover:border-primary/50 transition-colors">
                  <span className="text-sm font-mono uppercase tracking-wider group-hover:text-primary transition-colors">
                    {skill}
                  </span>
                </div>
              </FocusBracket>
            </ChipMount>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
