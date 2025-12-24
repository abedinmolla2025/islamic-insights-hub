import { useState } from "react";
import { ArrowLeft, BookOpen, Search, Loader2, Star, BookMarked, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuranData, Surah } from "@/hooks/useQuranData";
import SurahReader from "@/components/SurahReader";

const JUZZ_INFO = [
  { start: 1, end: 2, name: "আলিফ লাম মীম" },
  { start: 2, end: 2, name: "সাইয়াকূল" },
];

const QuranPage = () => {
  const navigate = useNavigate();
  const { surahs, loading, error } = useQuranData();
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"surah" | "juz" | "bookmark">("surah");

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.name.includes(searchQuery) ||
      surah.number.toString().includes(searchQuery)
  );

  // Featured surahs for quick access
  const featuredSurahs = surahs.filter(s => [1, 36, 67, 55, 56, 18].includes(s.number));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-emerald-300 animate-pulse" />
          </div>
          <Loader2 className="w-6 h-6 animate-spin text-emerald-300 mx-auto" />
          <p className="text-emerald-200 mt-3 text-sm">কুরআন লোড হচ্ছে...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {selectedSurah ? (
          <motion.div
            key="reader"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            {/* Reader Header */}
            <motion.header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-lg">
              <div className="flex items-center gap-3 px-4 py-3">
                <button
                  onClick={() => setSelectedSurah(null)}
                  className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="flex-1">
                  <h1 className="text-lg font-bold">{selectedSurah.englishName}</h1>
                  <p className="text-xs text-emerald-200">{selectedSurah.englishNameTranslation}</p>
                </div>
                <span className="text-2xl font-arabic">{selectedSurah.name}</span>
              </div>
            </motion.header>
            
            <SurahReader
              surahNumber={selectedSurah.number}
              surahName={selectedSurah.englishName}
              arabicName={selectedSurah.name}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Premium Header */}
            <div className="bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-900 text-white">
              {/* Top Bar */}
              <div className="flex items-center justify-between px-4 py-3">
                <button
                  onClick={() => navigate("/")}
                  className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </motion.div>
              </div>

              {/* Hero Section */}
              <div className="px-4 pb-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h1 className="text-3xl font-arabic mb-1">الْقُرْآن الْكَرِيم</h1>
                  <p className="text-emerald-200 text-sm">পবিত্র কুরআন মাজীদ</p>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center gap-6 mt-4"
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold">114</p>
                    <p className="text-xs text-emerald-200">সূরা</p>
                  </div>
                  <div className="w-px bg-white/20" />
                  <div className="text-center">
                    <p className="text-2xl font-bold">30</p>
                    <p className="text-xs text-emerald-200">পারা</p>
                  </div>
                  <div className="w-px bg-white/20" />
                  <div className="text-center">
                    <p className="text-2xl font-bold">6236</p>
                    <p className="text-xs text-emerald-200">আয়াত</p>
                  </div>
                </motion.div>
              </div>

              {/* Search Bar */}
              <div className="px-4 pb-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300" />
                  <input
                    type="text"
                    placeholder="সূরা খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-emerald-200/60 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all"
                  />
                </motion.div>
              </div>

              {/* Tabs */}
              <div className="flex px-4 gap-1">
                {[
                  { id: "surah", label: "সূরা", icon: BookOpen },
                  { id: "juz", label: "পারা", icon: BookMarked },
                  { id: "bookmark", label: "সংরক্ষিত", icon: Star },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-t-xl text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-background text-foreground"
                        : "text-emerald-200 hover:bg-white/10"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="px-3 py-4">
              {/* Quick Access */}
              {activeTab === "surah" && !searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-sm">জনপ্রিয় সূরা</h3>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {featuredSurahs.map((surah) => (
                      <motion.button
                        key={surah.number}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSurah(surah)}
                        className="shrink-0 px-4 py-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 transition-all"
                      >
                        <p className="font-arabic text-primary text-lg">{surah.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{surah.englishName}</p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Surah List */}
              {activeTab === "surah" && (
                <div className="space-y-2">
                  {filteredSurahs.map((surah, index) => (
                    <motion.button
                      key={surah.number}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.01, 0.5) }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedSurah(surah)}
                      className="w-full text-left p-3 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        {/* Surah Number with decorative frame */}
                        <div className="relative w-12 h-12 shrink-0">
                          <div className="absolute inset-0 rotate-45 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-bold text-primary">{surah.number}</span>
                          </div>
                        </div>

                        {/* Surah Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="font-semibold text-foreground">{surah.englishName}</p>
                              <p className="text-xs text-muted-foreground">{surah.englishNameTranslation}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-arabic text-primary">{surah.name}</span>
                              <p className="text-xs text-muted-foreground">
                                {surah.numberOfAyahs} আয়াত
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Revelation Type Badge */}
                      <div className="mt-2 flex gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          surah.revelationType === "Meccan" 
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" 
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        }`}>
                          {surah.revelationType === "Meccan" ? "মক্কী" : "মাদানী"}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Juz Tab */}
              {activeTab === "juz" && (
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
                    <motion.button
                      key={juz}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: juz * 0.02 }}
                      className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all text-center"
                    >
                      <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-2">
                        <span className="font-bold text-primary">{juz}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">পারা {juz}</p>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Bookmark Tab */}
              {activeTab === "bookmark" && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <Star className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">কোন সংরক্ষিত সূরা নেই</p>
                  <p className="text-xs text-muted-foreground mt-1">আপনার পছন্দের সূরা সংরক্ষণ করুন</p>
                </div>
              )}

              {filteredSurahs.length === 0 && activeTab === "surah" && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">কোন সূরা পাওয়া যায়নি</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuranPage;
