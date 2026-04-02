import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

const GRID_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_DIR = { x: 1, y: 0 };

const randomFood = (snake: { x: number; y: number }[]) => {
  let pos;
  do {
    pos = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
  } while (snake.some(s => s.x === pos.x && s.y === pos.y));
  return pos;
};

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [dir, setDir] = useState(INITIAL_DIR);
  const [food, setFood] = useState({ x: 3, y: 3 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  const reset = () => {
    setSnake(INITIAL_SNAKE);
    setDir(INITIAL_DIR);
    setFood({ x: 3, y: 3 });
    setScore(0);
    setGameOver(false);
    setStarted(true);
  };

  useEffect(() => {
    if (!started || gameOver) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE || prev.some(s => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          return prev;
        }
        const ateFood = head.x === food.x && head.y === food.y;
        const newSnake = ateFood ? [head, ...prev] : [head, ...prev.slice(0, -1)];
        if (ateFood) {
          setScore(s => s + 1);
          setFood(randomFood(newSnake));
        }
        return newSnake;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [started, gameOver, dir, food]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) e.preventDefault();
      if (e.key === "ArrowUp" && dir.y !== 1) setDir({ x: 0, y: -1 });
      if (e.key === "ArrowDown" && dir.y !== -1) setDir({ x: 0, y: 1 });
      if (e.key === "ArrowLeft" && dir.x !== 1) setDir({ x: -1, y: 0 });
      if (e.key === "ArrowRight" && dir.x !== -1) setDir({ x: 1, y: 0 });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dir]);

  const swipe = useCallback((dx: number, dy: number) => {
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && dir.x !== -1) setDir({ x: 1, y: 0 });
      if (dx < 0 && dir.x !== 1) setDir({ x: -1, y: 0 });
    } else {
      if (dy > 0 && dir.y !== -1) setDir({ x: 0, y: 1 });
      if (dy < 0 && dir.y !== 1) setDir({ x: 0, y: -1 });
    }
  }, [dir]);

  useEffect(() => {
    let startX = 0, startY = 0;
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; };
    const onEnd = (e: TouchEvent) => swipe(e.changedTouches[0].clientX - startX, e.changedTouches[0].clientY - startY);
    window.addEventListener("touchstart", onStart);
    window.addEventListener("touchend", onEnd);
    return () => { window.removeEventListener("touchstart", onStart); window.removeEventListener("touchend", onEnd); };
  }, [swipe]);

  const cell = (x: number, y: number) => {
    const isHead = snake[0].x === x && snake[0].y === y;
    const isSnake = snake.some(s => s.x === x && s.y === y);
    const isFood = food.x === x && food.y === y;
    return (
      <div
        key={`${x}-${y}`}
        className={`aspect-square rounded-sm transition-colors ${
          isHead ? "bg-primary scale-110" :
          isSnake ? "bg-primary/70" :
          isFood ? "bg-accent animate-pulse rounded-full" :
          "bg-border/20"
        }`}
      />
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background gap-6 px-4">
      <div className="text-center space-y-1">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-muted-foreground">Page not found — play a game while you wait!</p>
      </div>

      <div className="text-sm text-muted-foreground">Score: <span className="text-primary font-bold">{score}</span></div>

      {/* Grid */}
      <div
        className="relative border border-border rounded-xl overflow-hidden"
        style={{ display: "grid", gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, width: "min(90vw, 360px)", gap: "2px", padding: "8px", background: "hsl(var(--card))" }}
      >
        {Array.from({ length: GRID_SIZE }, (_, y) =>
          Array.from({ length: GRID_SIZE }, (_, x) => cell(x, y))
        )}

        {/* Overlay */}
        {(!started || gameOver) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm gap-3">
            {gameOver && <p className="text-lg font-bold text-foreground">Game Over! Score: {score}</p>}
            {!started && <p className="text-muted-foreground text-sm">Use arrow keys or swipe</p>}
            <button onClick={reset} className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold hover:brightness-110 transition">
              {gameOver ? "Play Again" : "Start Game"}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Controls */}
      <div className="grid grid-cols-3 gap-2 w-36">
        {[
          { label: "↑", dx: 0, dy: -1, col: "col-start-2" },
          { label: "←", dx: -1, dy: 0, col: "col-start-1" },
          { label: "↓", dx: 0, dy: 1, col: "col-start-2" },
          { label: "→", dx: 1, dy: 0, col: "col-start-3" },
        ].map(({ label, dx, dy, col }) => (
          <button
            key={label}
            onClick={() => swipe(dx * 50, dy * 50)}
            className={`${col} aspect-square rounded-lg bg-card border border-border text-foreground text-lg flex items-center justify-center hover:bg-primary/10 active:scale-95 transition`}
          >
            {label}
          </button>
        ))}
      </div>

      <a onClick={() => navigate("/")} className="text-sm text-primary underline cursor-pointer hover:text-primary/80">
        Return to Home
      </a>
    </div>
  );
};

export default NotFound;