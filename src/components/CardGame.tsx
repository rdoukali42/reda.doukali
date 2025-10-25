import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Sparkles, RotateCw } from 'lucide-react';

interface Card {
  id: number;
  suit: string;
  value: string;
  symbol: string;
}

const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const generateCards = (): Card[] => {
  const allCards: Card[] = [];
  suits.forEach(suit => {
    values.forEach(value => {
      allCards.push({
        id: Math.random(),
        suit,
        value,
        symbol: suit
      });
    });
  });
  
  // Shuffle and return 21 random cards
  const shuffled = allCards.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 21).map((card, index) => ({ ...card, id: index }));
};

const CardGame = () => {
  const [gameState, setGameState] = useState<'start' | 'round1' | 'round2' | 'round3' | 'reveal'>('start');
  const [cards, setCards] = useState<Card[]>(generateCards());
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [round1Choice, setRound1Choice] = useState<number | null>(null);
  const [round2Choice, setRound2Choice] = useState<number | null>(null);
  const [round3Choice, setRound3Choice] = useState<number | null>(null);
  const [revealedCard, setRevealedCard] = useState<Card | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const startGame = () => {
    setCards(generateCards());
    setGameState('round1');
    setSelectedLine(null);
    setRound1Choice(null);
    setRound2Choice(null);
    setRound3Choice(null);
    setRevealedCard(null);
  };

  const reshuffleCards = (currentCards: Card[], chosenLine: number): Card[] => {
    // Split into 3 piles (lines)
    const pile1 = currentCards.slice(0, 7);
    const pile2 = currentCards.slice(7, 14);
    const pile3 = currentCards.slice(14, 21);
    
    // Stack the piles with the chosen pile in the MIDDLE
    let deck: Card[];
    if (chosenLine === 1) {
      deck = [...pile2, ...pile1, ...pile3];  // Line1 in middle
    } else if (chosenLine === 2) {
      deck = [...pile1, ...pile2, ...pile3];  // Line2 in middle
    } else {
      deck = [...pile1, ...pile3, ...pile2];  // Line3 in middle
    }
    
    // Deal into 3 new piles, dealing LEFT TO RIGHT (alternating)
    const newPile1: Card[] = [];
    const newPile2: Card[] = [];
    const newPile3: Card[] = [];
    
    deck.forEach((card, index) => {
      if (index % 3 === 0) {
        newPile1.push(card);
      } else if (index % 3 === 1) {
        newPile2.push(card);
      } else {
        newPile3.push(card);
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
        setRound1Choice(line);
        
        const reshuffled = reshuffleCards(cards, line);
        setCards(reshuffled);
        
        setTimeout(() => {
          setGameState('round2');
          setSelectedLine(null);
          setIsShuffling(false);
        }, 800);
      } else if (gameState === 'round2') {
        setRound2Choice(line);
        
        const reshuffled = reshuffleCards(cards, line);
        setCards(reshuffled);
        
        setTimeout(() => {
          setGameState('round3');
          setSelectedLine(null);
          setIsShuffling(false);
        }, 800);
      } else if (gameState === 'round3') {
        setRound3Choice(line);
        
        // Reshuffle one last time based on round 3 choice
        const reshuffled = reshuffleCards(cards, line);
        setCards(reshuffled);
        
        // After 3 rounds with proper shuffling, card is always at position 10
        const finalCard = reshuffled[10];
        setRevealedCard(finalCard);
        
        setTimeout(() => {
          setGameState('reveal');
          setIsShuffling(false);
        }, 800);
      }
    }, 600);
  };

  const renderCard = (card: Card, index: number, highlight: boolean = false) => {
    const isRed = card.suit === '♥' || card.suit === '♦';
    
    return (
      <div
        key={card.id}
        className={`
          relative w-16 h-24 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center
          transform transition-all duration-500 hover:scale-105
          ${highlight ? 'ring-4 ring-primary animate-pulse scale-110 z-50' : ''}
          ${isShuffling ? 'animate-spin-slow' : ''}
        `}
        style={{
          animationDelay: `${index * 0.05}s`,
          color: isRed ? '#dc2626' : '#1f2937'
        }}
      >
        <div className="text-xs font-bold">{card.value}</div>
        <div className="text-2xl">{card.symbol}</div>
        <div className="text-xs font-bold">{card.value}</div>
      </div>
    );
  };

  const renderLine = (lineNumber: number, startIndex: number) => {
    const lineCards = cards.slice(startIndex, startIndex + 7);
    const isSelected = selectedLine === lineNumber;

    return (
      <div
        className={`
          relative flex gap-2 p-4 rounded-xl transition-all duration-300 cursor-pointer
          ${isSelected ? 'bg-primary/20 ring-2 ring-primary scale-105' : 'bg-card/30 hover:bg-card/50'}
        `}
        onClick={() => !isShuffling && handleLineChoice(lineNumber)}
      >
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-primary font-bold text-xl">
          {lineNumber}
        </div>
        {lineCards.map((card, index) => renderCard(card, index))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {gameState === 'start' && (
        <div className="text-center space-y-6 animate-fade-in">
          <div className="space-y-4">
            <Sparkles className="w-16 h-16 text-primary mx-auto animate-pulse" />
            <h3 className="text-3xl font-bold">21 Card Magic Trick</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Think of any card from the 21 cards shown. Don't tell me which one! 
              Just remember it and tell me which line (1, 2, or 3) it's in. 
              After 3 rounds, I'll reveal your card!
            </p>
          </div>
          <Button variant="gold" size="lg" onClick={startGame} className="text-lg px-8">
            <Sparkles className="w-5 h-5 mr-2" />
            Start the Magic
          </Button>
        </div>
      )}

      {(gameState === 'round1' || gameState === 'round2' || gameState === 'round3') && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-primary">
              Round {gameState === 'round1' ? '1' : gameState === 'round2' ? '2' : '3'} of 3
            </h3>
            <p className="text-muted-foreground">
              {isShuffling 
                ? 'Shuffling the cards...' 
                : 'Which line is your card in? Click on the line (1, 2, or 3)'}
            </p>
          </div>

          <div className="relative space-y-4 pl-12">
            {renderLine(1, 0)}
            {renderLine(2, 7)}
            {renderLine(3, 14)}
          </div>
        </div>
      )}

      {gameState === 'reveal' && revealedCard && (
        <div className="text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <Sparkles className="w-16 h-16 text-primary mx-auto animate-pulse" />
            <h3 className="text-3xl font-bold">Your Card Is...</h3>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              {renderCard(revealedCard, 0, true)}
              <div className="absolute -inset-4 bg-primary/10 rounded-xl blur-xl animate-pulse -z-10" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xl text-muted-foreground">
              Was I right? ✨
            </p>
            <Button variant="gold" size="lg" onClick={startGame} className="text-lg px-8">
              <RotateCw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGame;
