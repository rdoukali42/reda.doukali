import { Sparkles } from 'lucide-react';
import SkillGame from '@/components/SkillGame';

const SkillGameSection = () => (
  <section
    id="game"
    className="py-20 px-6"
    data-skin="workshop"
    aria-labelledby="game-heading"
  >
    <div className="max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-4 text-primary font-mono text-xs uppercase tracking-[0.2em]">
          <Sparkles className="w-4 h-4" />
          <span>[ FUN ZONE ]</span>
        </div>
        <h2 id="game-heading" className="text-4xl font-bold mb-3 font-mono">
          {'> '}SCENE 07 · MIND_READER.exe
        </h2>
      </header>

      <div className="flex justify-center">
        <SkillGame />
      </div>
    </div>
  </section>
);

export default SkillGameSection;
