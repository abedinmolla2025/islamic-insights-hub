import { useState } from "react";
import { RotateCcw, Volume2, VolumeX, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const dhikrList = [
  { arabic: "سُبْحَانَ اللَّهِ", transliteration: "SubhanAllah", meaning: "Glory be to Allah", target: 33 },
  { arabic: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah", meaning: "Praise be to Allah", target: 33 },
  { arabic: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest", target: 34 },
  { arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ", transliteration: "La ilaha illallah", meaning: "There is no god but Allah", target: 100 },
  { arabic: "أَسْتَغْفِرُ اللَّهَ", transliteration: "Astaghfirullah", meaning: "I seek forgiveness from Allah", target: 100 },
];

const TasbihPage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [selectedDhikr, setSelectedDhikr] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isVibrating, setIsVibrating] = useState(false);

  const currentDhikr = dhikrList[selectedDhikr];

  const playClickSound = () => {
    if (soundEnabled && typeof window !== "undefined") {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {
        // Audio not supported
      }
    }
  };

  const vibrate = () => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleCount = () => {
    setCount((prev) => prev + 1);
    setTotalCount((prev) => prev + 1);
    playClickSound();
    vibrate();
    
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 100);
  };

  const handleReset = () => {
    setCount(0);
  };

  const handleDhikrChange = (index: number) => {
    setSelectedDhikr(index);
    setCount(0);
  };

  const progress = Math.min((count / currentDhikr.target) * 100, 100);
  const isComplete = count >= currentDhikr.target;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">📿 Tasbih Counter</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="h-10 w-10"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </Button>
        </div>
      </motion.header>

      <div className="p-4 flex flex-col items-center space-y-8">
        {/* Dhikr Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 flex-wrap justify-center"
        >
          {dhikrList.map((dhikr, index) => (
            <button
              key={index}
              onClick={() => handleDhikrChange(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedDhikr === index
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-muted shadow-soft"
              }`}
            >
              {dhikr.transliteration}
            </button>
          ))}
        </motion.div>

        {/* Current Dhikr Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-3"
        >
          <p className="text-4xl font-arabic text-primary">{currentDhikr.arabic}</p>
          <p className="text-xl font-medium">{currentDhikr.transliteration}</p>
          <p className="text-muted-foreground">{currentDhikr.meaning}</p>
        </motion.div>

        {/* Counter Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          onClick={handleCount}
          whileTap={{ scale: 0.95 }}
          className={`relative w-48 h-48 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-2xl transition-all ${
            isComplete ? "ring-4 ring-green-500 ring-offset-4 ring-offset-background" : ""
          }`}
        >
          <div className="absolute inset-3 rounded-full bg-primary/20" />
          <span className="relative text-6xl font-bold">{count}</span>
        </motion.button>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-xs space-y-2"
        >
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{count} / {currentDhikr.target}</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${isComplete ? "bg-green-500" : "bg-primary"}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={handleReset}
            className="gap-2 rounded-2xl"
          >
            <RotateCcw size={18} />
            Reset
          </Button>
        </motion.div>

        {/* Total Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl p-4 shadow-soft"
        >
          <p className="text-muted-foreground">
            Total today: <span className="font-bold text-foreground text-xl">{totalCount}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TasbihPage;
