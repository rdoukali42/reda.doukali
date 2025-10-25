import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Sparkles, RotateCw, Linkedin } from 'lucide-react';

interface Skill {
  id: number;
  name: string;
}

const skills = [
  "Python", "LLMs", "RAG", "Prompt Engineering",
  "LangGraph", "MLflow", "Dagster", "OpenStack",
  "Kubernetes", "Terraform", "Vue.js", "Docker",
  "Prometheus", "Grafana", "C", "JavaScript",
  "Jupyter", "Vector Stores", "JWT", "Machine Learning",
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

  const renderSkillCard = (skill: Skill, index: number, highlight: boolean = false) => {
    return (
      <div
        key={skill.id}
        className={`
          relative px-2 py-2 md:px-4 md:py-4 bg-gradient-to-br from-primary/10 to-primary/5 
          rounded-md md:rounded-lg shadow-md border border-primary/20
          flex items-center justify-center text-center
          transform transition-all duration-500 hover:scale-105 hover:shadow-lg
          ${highlight ? 'ring-4 ring-primary animate-pulse scale-110 z-50 bg-gradient-to-br from-primary/30 to-primary/20' : ''}
          ${isShuffling ? 'animate-spin-slow' : ''}
          min-h-[45px] md:min-h-[70px] 
          flex-1 md:flex-initial
          min-w-[calc(33.333%-0.5rem)] md:min-w-0
        `}
        style={{
          animationDelay: `${index * 0.05}s`,
        }}
      >
        <span className="text-xs md:text-base font-semibold text-foreground leading-tight px-1">
          {skill.name}
        </span>
      </div>
    );
  };

  const renderLine = (lineNumber: number, startIndex: number) => {
    const lineSkills = skillCards.slice(startIndex, startIndex + 7);
    const isSelected = selectedLine === lineNumber;

    return (
      <div
        className={`
          relative flex flex-wrap gap-2 md:gap-3 p-3 md:p-6 rounded-xl transition-all duration-300 cursor-pointer
          ${isSelected ? 'bg-primary/20 ring-2 ring-primary scale-105' : 'bg-card/30 hover:bg-card/50'}
        `}
        onClick={() => !isShuffling && handleLineChoice(lineNumber)}
      >
        <div className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 text-primary font-bold text-lg md:text-2xl">
          {lineNumber}
        </div>
        {lineSkills.map((skill, index) => renderSkillCard(skill, index))}
      </div>
    );
  };

  return (
    <div className="w-full mx-auto">
      {gameState === 'start' && (
        <div className="text-center space-y-6 animate-fade-in max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            <Sparkles className="w-16 h-16 text-primary mx-auto animate-pulse" />
            <h3 className="text-2xl md:text-3xl font-bold">Skills Mind Reading Challenge</h3>
            <p className="text-muted-foreground text-base md:text-lg">
              Choose your preferred skill from the 21 shown below. Don't tell me which one! 
              Just remember it and tell me which line (1, 2, or 3) it's in.
            </p>
          </div>
          <p className="text-primary font-semibold text-lg md:text-xl">
            If I guess it in less than 3 rounds, I deserve a follow on LinkedIn! 😉
          </p>
          <Button variant="gold" size="lg" onClick={startGame} className="text-base md:text-lg px-6 md:px-8">
            <Sparkles className="w-5 h-5 mr-2" />
            Start the Challenge
          </Button>
        </div>
      )}

      {(gameState === 'round1' || gameState === 'round2' || gameState === 'round3') && (
        <div className="space-y-6 animate-fade-in w-full px-4">
          <div className="text-center space-y-2">
            <h3 className="text-xl md:text-2xl font-bold text-primary">
              Round {gameState === 'round1' ? '1' : gameState === 'round2' ? '2' : '3'} of 3
            </h3>
            <p className="text-muted-foreground text-base md:text-lg">
              {isShuffling 
                ? 'Shuffling the skills...' 
                : 'Which line is your skill in? Click on the line (1, 2, or 3)'}
            </p>
          </div>

          <div className="relative space-y-3 md:space-y-5 pl-8 md:pl-14 w-full">
            {renderLine(1, 0)}
            {renderLine(2, 7)}
            {renderLine(3, 14)}
          </div>
        </div>
      )}

      {gameState === 'reveal' && revealedSkill && (
        <div className="text-center space-y-8 animate-fade-in max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            <Sparkles className="w-16 h-16 text-primary mx-auto animate-pulse" />
            <h3 className="text-2xl md:text-3xl font-bold">Your Skill Is...</h3>
          </div>

          <div className="flex justify-center">
            <div className="relative px-6 md:px-8 py-4 md:py-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl shadow-2xl">
              <div className="text-xl md:text-2xl font-bold text-primary">
                {revealedSkill.name}
              </div>
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-xl animate-pulse -z-10" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg md:text-xl text-muted-foreground">
              Was I right? ✨
            </p>
            <p className="text-base md:text-lg text-primary font-semibold">
              I guessed it in just 3 rounds! Time to connect! 🎯
            </p>
            <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
              <Button 
                variant="gold" 
                size="lg" 
                onClick={() => window.open('https://www.linkedin.com/in/reda-doukali/', '_blank')}
                className="text-base md:text-lg px-6 md:px-8"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                Follow on LinkedIn
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={startGame} 
                className="text-base md:text-lg px-6 md:px-8"
              >
                <RotateCw className="w-5 h-5 mr-2" />
                Play Again
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGame;
