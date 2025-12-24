import { useNavigate } from "react-router-dom";
import { motion, TargetAndTransition } from "framer-motion";

interface FeatureItem {
  emoji: string;
  label: string;
  animation: TargetAndTransition;
  path: string;
}

const features: FeatureItem[] = [
  { 
    emoji: "📖", 
    label: "Quran",
    path: "/quran",
    animation: {
      rotateY: [0, 15, 0, -15, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
    }
  },
  { 
    emoji: "🤲", 
    label: "Dua",
    path: "/dua",
    animation: {
      y: [0, -4, 0],
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const }
    }
  },
  { 
    emoji: "👶", 
    label: "Names",
    path: "/baby-names",
    animation: {
      rotate: [-5, 5, -5],
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }
    }
  },
  { 
    emoji: "🧭", 
    label: "Qibla",
    path: "/qibla",
    animation: {
      rotate: [0, 20, -20, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
    }
  },
  { 
    emoji: "📿", 
    label: "Tasbih",
    path: "/tasbih",
    animation: {
      y: [0, -3, 0],
      rotate: [0, 10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" as const }
    }
  },
  { 
    emoji: "✨", 
    label: "99 Names",
    path: "/99-names",
    animation: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }
    }
  },
];

const FeatureIcons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {features.map((feature, index) => (
        <button
          key={feature.label}
          onClick={() => navigate(feature.path)}
          className="flex-shrink-0 group cursor-pointer w-16 h-16 bg-card rounded-2xl shadow-soft flex items-center justify-center hover:shadow-md transition-shadow active:scale-95"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <motion.span
            className="text-3xl"
            animate={feature.animation}
          >
            {feature.emoji}
          </motion.span>
        </button>
      ))}
    </div>
  );
};

export const FeatureLabels = () => {
  return (
    <div className="flex gap-3 mt-2">
      {features.map((feature) => (
        <div key={feature.label} className="w-16 flex-shrink-0 text-center">
          <span className="text-xs text-muted-foreground font-medium">
            {feature.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FeatureIcons;
