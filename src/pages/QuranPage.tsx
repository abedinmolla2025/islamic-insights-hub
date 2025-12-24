import { useState } from "react";
import { ArrowLeft, BookOpen, Play, Pause } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const surahs = [
  { id: 1, name: "Al-Fatiha", arabic: "الفاتحة", verses: 7, type: "Meccan" },
  { id: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286, type: "Medinan" },
  { id: 3, name: "Ali 'Imran", arabic: "آل عمران", verses: 200, type: "Medinan" },
  { id: 4, name: "An-Nisa", arabic: "النساء", verses: 176, type: "Medinan" },
  { id: 5, name: "Al-Ma'idah", arabic: "المائدة", verses: 120, type: "Medinan" },
  { id: 6, name: "Al-An'am", arabic: "الأنعام", verses: 165, type: "Meccan" },
  { id: 7, name: "Al-A'raf", arabic: "الأعراف", verses: 206, type: "Meccan" },
  { id: 8, name: "Al-Anfal", arabic: "الأنفال", verses: 75, type: "Medinan" },
  { id: 9, name: "At-Tawbah", arabic: "التوبة", verses: 129, type: "Medinan" },
  { id: 10, name: "Yunus", arabic: "يونس", verses: 109, type: "Meccan" },
  { id: 111, name: "Al-Masad", arabic: "المسد", verses: 5, type: "Meccan" },
  { id: 112, name: "Al-Ikhlas", arabic: "الإخلاص", verses: 4, type: "Meccan" },
  { id: 113, name: "Al-Falaq", arabic: "الفلق", verses: 5, type: "Meccan" },
  { id: 114, name: "An-Nas", arabic: "الناس", verses: 6, type: "Meccan" },
];

const QuranPage = () => {
  const navigate = useNavigate();
  const [selectedSurah, setSelectedSurah] = useState<typeof surahs[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => selectedSurah ? setSelectedSurah(null) : navigate("/")}
            className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <BookOpen className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold">
            {selectedSurah ? selectedSurah.name : "📖 Holy Quran"}
          </h1>
        </div>
      </motion.header>

      {selectedSurah ? (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 space-y-6"
        >
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4"
            >
              <span className="text-3xl font-arabic text-primary">{selectedSurah.arabic}</span>
            </motion.div>
            <h2 className="text-2xl font-bold">{selectedSurah.name}</h2>
            <p className="text-muted-foreground">{selectedSurah.verses} verses • {selectedSurah.type}</p>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-soft text-center">
            <p className="text-muted-foreground mb-4">Full Quran reading coming soon!</p>
            <p className="text-sm text-muted-foreground">This feature will include Arabic text, translations, and audio recitation.</p>
          </div>
        </motion.div>
      ) : (
        <div className="p-4 space-y-4">
          {/* Surah List */}
          <div className="space-y-3">
            {surahs.map((surah, index) => (
              <motion.button
                key={surah.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => setSelectedSurah(surah)}
                className="w-full text-left p-4 rounded-2xl bg-card shadow-soft hover:shadow-md transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">{surah.id}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground">{surah.name}</p>
                      <span className="text-xl font-arabic text-primary">{surah.arabic}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {surah.verses} verses • {surah.type}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuranPage;
