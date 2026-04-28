import { useState } from 'react';
import { Button } from './ui/button';
import { Sparkles, RotateCw, Linkedin } from 'lucide-react';
import { socialLinks } from '@/config/links';

interface Skill {
  id: number;
  name: string;
}

const skills = [
  "Python", "LLMs", "RAG", "Prompt Engineering",
  "LangGraph", "MLflow", "FASTAPI", "OpenStack",
  "Kubernetes", "Terraform", "Vue.js", "Docker",
  "Prometheus", "Grafana", "C", "JavaScript",
  "Jupyter", "Lora Adapter", "Fine-Tune", "Machine Learning",
  "Knowledge Graph"
];

const generateSkills = (): Skill[] => {
  // Shuffle and return all 21 skills
  const shuffled = [...skills].sort(() => Math.random() - 0.5);
  return shuffled.map((name, index) => ({ id: index, name }));
};

const SkillGame = () => {
  const [gameState, setGameState] = useState<'start' | 'round1' | 'round2' | 'round3' | 'reveal'>('start');
  const [skillCards, setSkillCards] = useState<Skill[]>(generateSkills());
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [revealedSkill, setRevealedSkill] = useState<Skill | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const startGame = () => {
    setSkillCards(generateSkills());
    setGameState('round1');
    setSelectedLine(null);
    setRevealedSkill(null);
  };

  const reshuffleSkills = (currentSkills: Skill[], chosenLine: number): Skill[] => {
    // Split into 3 piles (lines)
    const pile1 = currentSkills.slice(0, 7);
    const pile2 = currentSkills.slice(7, 14);
    const pile3 = currentSkills.slice(14, 21);

    // Stack the piles with the chosen pile in the MIDDLE
    let deck: Skill[];
    if (chosenLine === 1) {
      deck = [...pile2, ...pile1, ...pile3];  // Line1 in middle
    } else if (chosenLine === 2) {
      deck = [...pile1, ...pile2, ...pile3];  // Line2 in middle
    } else {
      deck = [...pile1, ...pile3, ...pile2];  // Line3 in middle
    }

    // Deal into 3 new piles, dealing LEFT TO RIGHT (alternating)
    const newPile1: Skill[] = [];
    const newPile2: Skill[] = [];
    const newPile3: Skill[] = [];

    deck.forEach((skill, index) => {
      if (index % 3 === 0) {
        newPile1.push(skill);
      } else if (index % 3 === 1) {
        newPile2.push(skill);
      } else {
        newPile3.push(skill);
      }
    });

    // Return as 3 lines
    return [...newPile1, ...newPile2, ...newPile3];
  };

  const handleLineChoice = (line: number) => {
    setSelectedLine(line);
    setIsShuffling(true);

    setTimeout(() => {
      if (gameState === 'round1') {
        const reshuffled = reshuffleSkills(skillCards, line);
        setSkillCards(reshuffled);

        setTimeout(() => {
          setGameState('round2');
          setSelectedLine(null);
          setIsShuffling(false);
        }, 800);
      } else if (gameState === 'round2') {
        const reshuffled = reshuffleSkills(skillCards, line);
        setSkillCards(reshuffled);

        setTimeout(() => {
          setGameState('round3');
          setSelectedLine(null);
          setIsShuffling(false);
        }, 800);
      } else if (gameState === 'round3') {
        // Reshuffle one last time based on round 3 choice
        const reshuffled = reshuffleSkills(skillCards, line);
        setSkillCards(reshuffled);

        // After 3 rounds with proper shuffling, skill is always at position 10
        const finalSkill = reshuffled[10];
        setRevealedSkill(finalSkill);

        setTimeout(() => {
          setGameState('reveal');
          setIsShuffling(false);
        }, 800);
      }
    }, 600);
  };

  const currentRound =
    gameState === 'round1' ? 1 :
    gameState === 'round2' ? 2 :
    gameState === 'round3' ? 3 : 0;

  const renderSkillCard = (skill: Skill, index: number) => {
    const flipDelay = isShuffling ? index * 25 : 0;
    return (
      <div
        key={skill.id}
        className={`
          relative flex-1 md:flex-initial
          min-w-[calc(33.333%-0.5rem)] md:min-w-[88px]
          min-h-[44px] md:min-h-[68px]
          [perspective:800px]
        `}
      >
        <div
          className="absolute inset-0 transition-transform duration-700 [transform-style:preserve-3d]"
          style={{
            transform: isShuffling ? 'rotateY(180deg)' : 'rotateY(0)',
            transitionDelay: `${flipDelay}ms`,
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 flex items-center justify-center text-center
                       bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5
                       border border-primary/40 rounded-md shadow-md
                       font-mono text-[10px] md:text-xs uppercase tracking-wider px-2"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/70" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/70" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/70" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/70" />
            <span className="text-foreground leading-tight">{skill.name}</span>
          </div>

          {/* Back face, sparkle while flipping */}
          <div
            className="absolute inset-0 flex items-center justify-center
                       bg-card/80 border border-primary/30 rounded-md
                       shadow-[inset_0_0_24px_hsl(45_100%_51%/0.2)]
                       [transform:rotateY(180deg)]"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <Sparkles className="w-4 h-4 text-primary/70" />
          </div>
        </div>
      </div>
    );
  };

  const renderLine = (lineNumber: number, startIndex: number) => {
    const lineSkills = skillCards.slice(startIndex, startIndex + 7);
    const isSelected = selectedLine === lineNumber;
    const isDimmed = selectedLine !== null && !isSelected;

    return (
      <div
        className={`
          relative flex flex-wrap gap-2 md:gap-3 p-3 md:p-5 rounded-xl cursor-pointer
          border transition-all duration-400
          ${isSelected
            ? 'border-primary bg-primary/10 scale-[1.02] -translate-y-1 shadow-[0_0_40px_hsl(45_100%_51%/0.35)]'
            : isDimmed
              ? 'border-border/30 bg-card/20 scale-[0.97] opacity-50'
              : 'border-border/40 bg-card/30 hover:bg-card/50 hover:border-primary/40'}
        `}
        onClick={() => !isShuffling && handleLineChoice(lineNumber)}
        role="button"
        tabIndex={isShuffling ? -1 : 0}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isShuffling) {
            e.preventDefault();
            handleLineChoice(lineNumber);
          }
        }}
        data-cursor="link"
      >
        <div
          className={`
            absolute -left-7 md:-left-12 top-1/2 -translate-y-1/2
            w-7 h-7 md:w-9 md:h-9 rounded-full border flex items-center justify-center
            font-mono text-sm md:text-base font-bold transition-colors
            ${isSelected
              ? 'border-primary bg-primary text-background'
              : 'border-primary/50 bg-card/60 text-primary'}
          `}
        >
          {lineNumber}
        </div>
        {lineSkills.map((skill, index) => renderSkillCard(skill, index))}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto">
      {/* === START === */}
      {gameState === 'start' && (
        <div className="text-center space-y-7 animate-fade-in max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-card/40 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              [ MIND_READER · v1 ]
            </span>
          </div>

          <h3 className="text-2xl md:text-4xl font-bold">
            Pick a skill. Don't tell me which.
          </h3>

          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Choose any skill from the 21 below and remember it. I'll ask which line it's
            in (1, 2, or 3) for three rounds. If I guess it correctly, you know the deal.
          </p>

          <p className="text-primary font-mono text-sm md:text-base">
            {'> '}guess_in &lt; 3 ? follow(linkedin) : laugh.at(me)
          </p>

          <Button
            variant="gold"
            size="lg"
            onClick={startGame}
            className="font-mono text-base md:text-lg px-8 group"
            data-cursor="link"
          >
            <span className="text-primary-foreground/70 mr-1">[</span>
            <Sparkles className="w-4 h-4 mr-1.5 transition-transform group-hover:rotate-12" />
            START_CHALLENGE
            <span className="text-primary-foreground/70 ml-1">]</span>
          </Button>
        </div>
      )}

      {/* === ROUNDS === */}
      {(gameState === 'round1' || gameState === 'round2' || gameState === 'round3') && (
        <div className="space-y-7 animate-fade-in w-full px-4">
          {/* Round indicator + status line */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/30 bg-card/40 backdrop-blur-sm">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                [ ROUND {String(currentRound).padStart(2, '0')} / 03 ]
              </span>
              <div className="w-20 h-0.5 bg-primary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${(currentRound / 3) * 100}%` }}
                />
              </div>
            </div>

            <p className="font-mono text-xs md:text-sm text-muted-foreground">
              {isShuffling ? (
                <>
                  <span className="text-primary">{'>'}</span> shuffling
                  <span className="ml-1 inline-flex gap-0.5 align-middle">
                    <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                    <span className="w-1 h-1 rounded-full bg-primary animate-pulse [animation-delay:200ms]" />
                    <span className="w-1 h-1 rounded-full bg-primary animate-pulse [animation-delay:400ms]" />
                  </span>
                </>
              ) : (
                <>
                  <span className="text-primary">{'>'}</span> awaiting line input · which line is your skill in?
                </>
              )}
            </p>
          </div>

          <div className="relative space-y-3 md:space-y-5 pl-9 md:pl-16 w-full">
            {renderLine(1, 0)}
            {renderLine(2, 7)}
            {renderLine(3, 14)}
          </div>
        </div>
      )}

      {/* === REVEAL === */}
      {gameState === 'reveal' && revealedSkill && (
        <div className="text-center space-y-8 max-w-4xl mx-auto px-4 relative">
          {/* Radial glow burst behind the card */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full bg-primary/15 blur-3xl animate-pulse"
          />

          <div className="relative space-y-4 animate-[revealFade_400ms_ease-out_forwards]">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80">
              {'> '}match.found
            </div>
            <h3 className="text-2xl md:text-4xl font-bold">
              Your skill is...
            </h3>
          </div>

          {/* Reveal card */}
          <div className="flex justify-center">
            <div
              className="relative animate-[scaleInBig_700ms_cubic-bezier(.16,1,.3,1)_200ms_both]"
            >
              {/* Card */}
              <div className="relative px-10 md:px-14 py-7 md:py-9
                              bg-gradient-to-br from-primary/35 via-primary/15 to-primary/5
                              border border-primary/60 rounded-md
                              shadow-[0_0_60px_hsl(45_100%_51%/0.45)]">
                <span className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
                <span className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary" />
                <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary" />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />

                <div className="font-mono text-2xl md:text-4xl font-bold text-primary tracking-tight whitespace-nowrap">
                  {revealedSkill.name}
                </div>
              </div>

              {/* Pulsing halo ring */}
              <div className="pointer-events-none absolute inset-0 rounded-md border-2 border-primary/40 animate-ping" />

              {/* Particle sparks radiating out */}
              <div className="pointer-events-none absolute inset-0">
                {Array.from({ length: 10 }).map((_, i) => {
                  const angle = (i / 10) * Math.PI * 2;
                  const dx = Math.cos(angle) * 110;
                  const dy = Math.sin(angle) * 80;
                  return (
                    <span
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                      style={{
                        boxShadow: '0 0 6px hsl(45 100% 51% / 0.8)',
                        animation: `sparkOut 1500ms ${500 + i * 60}ms ease-out forwards`,
                        // CSS variables for the keyframes:
                        ['--dx' as string]: `${dx}px`,
                        ['--dy' as string]: `${dy}px`,
                      } as React.CSSProperties}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4 animate-[revealFade_400ms_ease-out_900ms_both]">
            <p className="text-lg md:text-xl text-muted-foreground">Was I right? ✨</p>
            <p className="font-mono text-sm md:text-base text-primary">
              [ MIND_READ_OK ] · guessed in 3 rounds, pay up.
            </p>
            <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
              <Button
                variant="gold"
                size="lg"
                onClick={() => window.open(socialLinks.linkedin, '_blank', 'noopener, noreferrer')}
                className="font-mono text-base md:text-lg px-6 md:px-8"
                data-cursor="link"
              >
                <span className="text-primary-foreground/70 mr-1">[</span>
                <Linkedin className="w-4 h-4 mr-1.5" />
                FOLLOW_ON_LINKEDIN
                <span className="text-primary-foreground/70 ml-1">]</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={startGame}
                className="font-mono text-base md:text-lg px-6 md:px-8 border-primary/40 hover:bg-primary/10 hover:border-primary"
                data-cursor="link"
              >
                <span className="text-primary/80 mr-1">[</span>
                <RotateCw className="w-4 h-4 mr-1.5" />
                PLAY_AGAIN
                <span className="text-primary/80 ml-1">]</span>
              </Button>
            </div>
          </div>

          <style>{`
            @keyframes scaleInBig {
              0%   { transform: scale(0); opacity: 0; filter: blur(8px); }
              60%  { transform: scale(1.08); opacity: 1; filter: blur(0); }
              100% { transform: scale(1); opacity: 1; filter: blur(0); }
            }
            @keyframes revealFade {
              from { opacity: 0; transform: translateY(8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes sparkOut {
              0%   { transform: translate(-50%, -50%) scale(0); opacity: 0; }
              30%  { transform: translate(-50%, -50%) scale(1.4); opacity: 1; }
              100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0); opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default SkillGame;
