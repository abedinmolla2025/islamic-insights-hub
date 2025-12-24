import { useState } from "react";
import { ArrowLeft, Search, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

const namesOfAllah = [
  { id: 1, arabic: "الرَّحْمَنُ", transliteration: "Ar-Rahman", meaning: "The Most Gracious" },
  { id: 2, arabic: "الرَّحِيمُ", transliteration: "Ar-Raheem", meaning: "The Most Merciful" },
  { id: 3, arabic: "الْمَلِكُ", transliteration: "Al-Malik", meaning: "The King" },
  { id: 4, arabic: "الْقُدُّوسُ", transliteration: "Al-Quddus", meaning: "The Most Holy" },
  { id: 5, arabic: "السَّلَامُ", transliteration: "As-Salam", meaning: "The Source of Peace" },
  { id: 6, arabic: "الْمُؤْمِنُ", transliteration: "Al-Mu'min", meaning: "The Guardian of Faith" },
  { id: 7, arabic: "الْمُهَيْمِنُ", transliteration: "Al-Muhaymin", meaning: "The Protector" },
  { id: 8, arabic: "الْعَزِيزُ", transliteration: "Al-Aziz", meaning: "The Almighty" },
  { id: 9, arabic: "الْجَبَّارُ", transliteration: "Al-Jabbar", meaning: "The Compeller" },
  { id: 10, arabic: "الْمُتَكَبِّرُ", transliteration: "Al-Mutakabbir", meaning: "The Supreme" },
  { id: 11, arabic: "الْخَالِقُ", transliteration: "Al-Khaliq", meaning: "The Creator" },
  { id: 12, arabic: "الْبَارِئُ", transliteration: "Al-Bari", meaning: "The Evolver" },
  { id: 13, arabic: "الْمُصَوِّرُ", transliteration: "Al-Musawwir", meaning: "The Fashioner" },
  { id: 14, arabic: "الْغَفَّارُ", transliteration: "Al-Ghaffar", meaning: "The Forgiver" },
  { id: 15, arabic: "الْقَهَّارُ", transliteration: "Al-Qahhar", meaning: "The Subduer" },
  { id: 16, arabic: "الْوَهَّابُ", transliteration: "Al-Wahhab", meaning: "The Bestower" },
  { id: 17, arabic: "الرَّزَّاقُ", transliteration: "Ar-Razzaq", meaning: "The Provider" },
  { id: 18, arabic: "الْفَتَّاحُ", transliteration: "Al-Fattah", meaning: "The Opener" },
  { id: 19, arabic: "اَلْعَلِيْمُ", transliteration: "Al-Alim", meaning: "The All-Knowing" },
  { id: 20, arabic: "الْقَابِضُ", transliteration: "Al-Qabid", meaning: "The Constrictor" },
  { id: 21, arabic: "الْبَاسِطُ", transliteration: "Al-Basit", meaning: "The Expander" },
  { id: 22, arabic: "الْخَافِضُ", transliteration: "Al-Khafid", meaning: "The Abaser" },
  { id: 23, arabic: "الرَّافِعُ", transliteration: "Ar-Rafi", meaning: "The Exalter" },
  { id: 24, arabic: "الْمُعِزُّ", transliteration: "Al-Mu'izz", meaning: "The Bestower of Honor" },
  { id: 25, arabic: "المُذِلُّ", transliteration: "Al-Mudhill", meaning: "The Humiliator" },
  { id: 26, arabic: "السَّمِيعُ", transliteration: "As-Sami", meaning: "The All-Hearing" },
  { id: 27, arabic: "الْبَصِيرُ", transliteration: "Al-Basir", meaning: "The All-Seeing" },
  { id: 28, arabic: "الْحَكَمُ", transliteration: "Al-Hakam", meaning: "The Judge" },
  { id: 29, arabic: "الْعَدْلُ", transliteration: "Al-Adl", meaning: "The Just" },
  { id: 30, arabic: "اللَّطِيفُ", transliteration: "Al-Latif", meaning: "The Subtle One" },
  { id: 31, arabic: "الْخَبِيرُ", transliteration: "Al-Khabir", meaning: "The All-Aware" },
  { id: 32, arabic: "الْحَلِيمُ", transliteration: "Al-Halim", meaning: "The Forbearing" },
  { id: 33, arabic: "الْعَظِيمُ", transliteration: "Al-Azim", meaning: "The Magnificent" },
  { id: 34, arabic: "الْغَفُورُ", transliteration: "Al-Ghafur", meaning: "The Forgiving" },
  { id: 35, arabic: "الشَّكُورُ", transliteration: "Ash-Shakur", meaning: "The Appreciative" },
  { id: 36, arabic: "الْعَلِيُّ", transliteration: "Al-Ali", meaning: "The Most High" },
  { id: 37, arabic: "الْكَبِيرُ", transliteration: "Al-Kabir", meaning: "The Greatest" },
  { id: 38, arabic: "الْحَفِيظُ", transliteration: "Al-Hafiz", meaning: "The Preserver" },
  { id: 39, arabic: "المُقيِت", transliteration: "Al-Muqit", meaning: "The Nourisher" },
  { id: 40, arabic: "الْحسِيبُ", transliteration: "Al-Hasib", meaning: "The Reckoner" },
  { id: 41, arabic: "الْجَلِيلُ", transliteration: "Al-Jalil", meaning: "The Majestic" },
  { id: 42, arabic: "الْكَرِيمُ", transliteration: "Al-Karim", meaning: "The Generous" },
  { id: 43, arabic: "الرَّقِيبُ", transliteration: "Ar-Raqib", meaning: "The Watchful" },
  { id: 44, arabic: "الْمُجِيبُ", transliteration: "Al-Mujib", meaning: "The Responsive" },
  { id: 45, arabic: "الْوَاسِعُ", transliteration: "Al-Wasi", meaning: "The All-Encompassing" },
  { id: 46, arabic: "الْحَكِيمُ", transliteration: "Al-Hakim", meaning: "The Wise" },
  { id: 47, arabic: "الْوَدُودُ", transliteration: "Al-Wadud", meaning: "The Loving One" },
  { id: 48, arabic: "الْمَجِيدُ", transliteration: "Al-Majid", meaning: "The Glorious" },
  { id: 49, arabic: "الْبَاعِثُ", transliteration: "Al-Ba'ith", meaning: "The Resurrector" },
  { id: 50, arabic: "الشَّهِيدُ", transliteration: "Ash-Shahid", meaning: "The Witness" },
  // ... continuing to 99
  { id: 99, arabic: "الصَّبُورُ", transliteration: "As-Sabur", meaning: "The Patient One" },
];

const NamesOfAllahPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedName, setSelectedName] = useState<typeof namesOfAllah[0] | null>(null);

  const filteredNames = namesOfAllah.filter((name) =>
    name.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    name.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
    name.arabic.includes(searchQuery)
  );

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
            onClick={() => selectedName ? setSelectedName(null) : navigate("/")}
            className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Star className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold">
            {selectedName ? selectedName.transliteration : "✨ 99 Names of Allah"}
          </h1>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {selectedName ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="p-4 space-y-6"
          >
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6"
              >
                <span className="text-4xl font-arabic text-primary">{selectedName.arabic}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-sm text-muted-foreground mb-2">#{selectedName.id}</p>
                <h2 className="text-3xl font-bold">{selectedName.transliteration}</h2>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-6 shadow-soft"
            >
              <p className="text-sm font-medium text-muted-foreground mb-2">Meaning</p>
              <p className="text-xl text-foreground">{selectedName.meaning}</p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 space-y-4"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search names..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-2xl bg-card border-0 shadow-soft"
              />
            </div>

            {/* Names Grid */}
            <div className="grid grid-cols-2 gap-3">
              {filteredNames.map((name, index) => (
                <motion.button
                  key={name.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                  onClick={() => setSelectedName(name)}
                  className="p-4 rounded-2xl bg-card shadow-soft hover:shadow-md transition-all active:scale-[0.98] text-center"
                >
                  <p className="text-2xl font-arabic text-primary mb-2">{name.arabic}</p>
                  <p className="font-semibold text-sm">{name.transliteration}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{name.meaning}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NamesOfAllahPage;
