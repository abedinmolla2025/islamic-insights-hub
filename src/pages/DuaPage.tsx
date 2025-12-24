import { useState } from "react";
import { Search, BookOpen, ChevronRight, ArrowLeft, Sparkles, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

type Language = "bengali" | "english" | "hindi" | "urdu";

const LANGUAGE_LABELS: Record<Language, string> = {
  bengali: "বাংলা",
  english: "English",
  hindi: "हिंदी",
  urdu: "اردو",
};

interface DuaTranslation {
  title: string;
  translation: string;
  category: string;
}

interface Dua {
  id: number;
  arabic: string;
  transliteration: string;
  translations: Record<Language, DuaTranslation>;
}

const duas: Dua[] = [
  {
    id: 1,
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah",
    translations: {
      bengali: {
        title: "সকালের দোয়া",
        category: "সকাল",
        translation: "আমরা সকালে উপনীত হয়েছি এবং এই সময়ে সমস্ত সার্বভৌমত্ব আল্লাহর। সমস্ত প্রশংসা আল্লাহর জন্য।",
      },
      english: {
        title: "Morning Dua",
        category: "Morning",
        translation: "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is due to Allah.",
      },
      hindi: {
        title: "सुबह की दुआ",
        category: "सुबह",
        translation: "हम सुबह को पहुँचे और इस समय सारी बादशाहत अल्लाह की है। सारी तारीफ अल्लाह के लिए है।",
      },
      urdu: {
        title: "صبح کی دعا",
        category: "صبح",
        translation: "ہم نے صبح کی اور اس وقت ساری بادشاہت اللہ کی ہے۔ تمام تعریفیں اللہ کے لیے ہیں۔",
      },
    },
  },
  {
    id: 2,
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ",
    transliteration: "Amsayna wa amsal mulku lillah, walhamdu lillah",
    translations: {
      bengali: {
        title: "সন্ধ্যার দোয়া",
        category: "সন্ধ্যা",
        translation: "আমরা সন্ধ্যায় উপনীত হয়েছি এবং এই সময়ে সমস্ত সার্বভৌমত্ব আল্লাহর। সমস্ত প্রশংসা আল্লাহর জন্য।",
      },
      english: {
        title: "Evening Dua",
        category: "Evening",
        translation: "We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is due to Allah.",
      },
      hindi: {
        title: "शाम की दुआ",
        category: "शाम",
        translation: "हम शाम को पहुँचे और इस समय सारी बादशाहत अल्लाह की है। सारी तारीफ अल्लाह के लिए है।",
      },
      urdu: {
        title: "شام کی دعا",
        category: "شام",
        translation: "ہم نے شام کی اور اس وقت ساری بادشاہت اللہ کی ہے۔ تمام تعریفیں اللہ کے لیے ہیں۔",
      },
    },
  },
  {
    id: 3,
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    translations: {
      bengali: {
        title: "ঘুমানোর আগে দোয়া",
        category: "ঘুম",
        translation: "হে আল্লাহ, তোমার নামে আমি মৃত্যুবরণ করি এবং জীবিত হই।",
      },
      english: {
        title: "Dua Before Sleeping",
        category: "Sleep",
        translation: "In Your name O Allah, I live and die.",
      },
      hindi: {
        title: "सोने से पहले की दुआ",
        category: "नींद",
        translation: "हे अल्लाह, तेरे नाम पर मैं मरता हूँ और जीता हूँ।",
      },
      urdu: {
        title: "سونے سے پہلے کی دعا",
        category: "نیند",
        translation: "اے اللہ، تیرے نام پر میں مرتا ہوں اور جیتا ہوں۔",
      },
    },
  },
  {
    id: 4,
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
    translations: {
      bengali: {
        title: "ঘুম থেকে জাগার দোয়া",
        category: "জাগরণ",
        translation: "সমস্ত প্রশংসা আল্লাহর যিনি আমাদের মৃত্যুর পর জীবিত করেছেন এবং তাঁর কাছেই পুনরুত্থান।",
      },
      english: {
        title: "Dua Upon Waking",
        category: "Waking Up",
        translation: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
      },
      hindi: {
        title: "जागने पर की दुआ",
        category: "जागना",
        translation: "सारी तारीफ अल्लाह के लिए है जिसने हमें मौत के बाद ज़िंदा किया और उसी की तरफ़ लौटना है।",
      },
      urdu: {
        title: "جاگنے کی دعا",
        category: "جاگنا",
        translation: "تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں موت کے بعد زندہ کیا اور اسی کی طرف لوٹنا ہے۔",
      },
    },
  },
  {
    id: 5,
    arabic: "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    transliteration: "Bismillahi wa 'ala barakatillah",
    translations: {
      bengali: {
        title: "খাওয়ার আগে দোয়া",
        category: "খাবার",
        translation: "আল্লাহর নামে এবং আল্লাহর বরকতে।",
      },
      english: {
        title: "Dua Before Eating",
        category: "Food",
        translation: "In the name of Allah and with the blessings of Allah.",
      },
      hindi: {
        title: "खाने से पहले की दुआ",
        category: "खाना",
        translation: "अल्लाह के नाम पर और अल्लाह की बरकत से।",
      },
      urdu: {
        title: "کھانے سے پہلے کی دعا",
        category: "کھانا",
        translation: "اللہ کے نام سے اور اللہ کی برکت سے۔",
      },
    },
  },
  {
    id: 6,
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana muslimin",
    translations: {
      bengali: {
        title: "খাওয়ার পরে দোয়া",
        category: "খাবার",
        translation: "সমস্ত প্রশংসা আল্লাহর যিনি আমাদের খাওয়ালেন, পান করালেন এবং মুসলিম বানালেন।",
      },
      english: {
        title: "Dua After Eating",
        category: "Food",
        translation: "All praise is for Allah who fed us, gave us drink and made us Muslims.",
      },
      hindi: {
        title: "खाने के बाद की दुआ",
        category: "खाना",
        translation: "सारी तारीफ अल्लाह के लिए है जिसने हमें खिलाया, पिलाया और मुसलमान बनाया।",
      },
      urdu: {
        title: "کھانے کے بعد کی دعا",
        category: "کھانا",
        translation: "تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں کھلایا، پلایا اور مسلمان بنایا۔",
      },
    },
  },
  {
    id: 7,
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala Allahi rabbina tawakkalna",
    translations: {
      bengali: {
        title: "বাড়িতে প্রবেশের দোয়া",
        category: "বাড়ি",
        translation: "আল্লাহর নামে আমরা প্রবেশ করি এবং আল্লাহর নামে বের হই, এবং আমাদের রবের উপর ভরসা করি।",
      },
      english: {
        title: "Dua When Entering Home",
        category: "Home",
        translation: "In the name of Allah we enter and in the name of Allah we leave, and upon our Lord we place our trust.",
      },
      hindi: {
        title: "घर में दाखिल होने की दुआ",
        category: "घर",
        translation: "अल्लाह के नाम से हम दाखिल होते हैं और अल्लाह के नाम से निकलते हैं, और अपने रब पर भरोसा करते हैं।",
      },
      urdu: {
        title: "گھر میں داخل ہونے کی دعا",
        category: "گھر",
        translation: "اللہ کے نام سے ہم داخل ہوتے ہیں اور اللہ کے نام سے نکلتے ہیں، اور اپنے رب پر بھروسہ کرتے ہیں۔",
      },
    },
  },
  {
    id: 8,
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Bismillahi tawakkaltu 'alallah, la hawla wa la quwwata illa billah",
    translations: {
      bengali: {
        title: "বাড়ি থেকে বের হওয়ার দোয়া",
        category: "বাড়ি",
        translation: "আল্লাহর নামে, আমি আল্লাহর উপর ভরসা করি, আল্লাহ ছাড়া কোনো শক্তি ও ক্ষমতা নেই।",
      },
      english: {
        title: "Dua When Leaving Home",
        category: "Home",
        translation: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
      },
      hindi: {
        title: "घर से निकलने की दुआ",
        category: "घर",
        translation: "अल्लाह के नाम पर, मैं अल्लाह पर भरोसा करता हूँ, अल्लाह के सिवा कोई ताकत और शक्ति नहीं।",
      },
      urdu: {
        title: "گھر سے نکلنے کی دعا",
        category: "گھر",
        translation: "اللہ کے نام پر، میں اللہ پر بھروسہ کرتا ہوں، اللہ کے سوا کوئی طاقت اور قوت نہیں۔",
      },
    },
  },
  {
    id: 9,
    arabic: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    transliteration: "Allahu la ilaha illa huwal hayyul qayyum",
    translations: {
      bengali: {
        title: "আয়াতুল কুরসি",
        category: "সুরক্ষা",
        translation: "আল্লাহ - তিনি ছাড়া কোনো উপাস্য নেই, তিনি চিরঞ্জীব, সবকিছুর ধারক।",
      },
      english: {
        title: "Ayatul Kursi",
        category: "Protection",
        translation: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.",
      },
      hindi: {
        title: "आयतुल कुर्सी",
        category: "सुरक्षा",
        translation: "अल्लाह - उसके सिवा कोई माबूद नहीं, वह हमेशा जीने वाला, सब का सहारा है।",
      },
      urdu: {
        title: "آیۃ الکرسی",
        category: "حفاظت",
        translation: "اللہ - اس کے سوا کوئی معبود نہیں، وہ ہمیشہ زندہ رہنے والا، سب کا سہارا ہے۔",
      },
    },
  },
  {
    id: 10,
    arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ",
    transliteration: "Rabbana zalamna anfusana wa illam taghfir lana wa tarhamna lanakunanna minal khasireen",
    translations: {
      bengali: {
        title: "ক্ষমা প্রার্থনার দোয়া",
        category: "ক্ষমা",
        translation: "হে আমাদের রব, আমরা নিজেদের উপর জুলুম করেছি, যদি তুমি আমাদের ক্ষমা না কর এবং রহম না কর, তাহলে আমরা ক্ষতিগ্রস্তদের অন্তর্ভুক্ত হব।",
      },
      english: {
        title: "Seeking Forgiveness",
        category: "Forgiveness",
        translation: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.",
      },
      hindi: {
        title: "माफ़ी की दुआ",
        category: "माफ़ी",
        translation: "हे हमारे रब, हमने अपने ऊपर ज़ुल्म किया, अगर तू हमें माफ़ न करे और रहम न करे, तो हम नुक़सान उठाने वालों में होंगे।",
      },
      urdu: {
        title: "معافی کی دعا",
        category: "معافی",
        translation: "اے ہمارے رب، ہم نے اپنے اوپر ظلم کیا، اگر تو ہمیں معاف نہ کرے اور رحم نہ کرے، تو ہم نقصان اٹھانے والوں میں ہوں گے۔",
      },
    },
  },
];

const DuaPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<Language>("bengali");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDua, setSelectedDua] = useState<Dua | null>(null);

  const categories = [...new Set(duas.map((d) => d.translations[language].category))];

  const filteredDuas = duas.filter((dua) => {
    const translation = dua.translations[language];
    const matchesSearch =
      translation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dua.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      translation.translation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || translation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBack = () => {
    if (selectedDua) {
      setSelectedDua(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      navigate("/");
    }
  };

  const getTitle = () => {
    if (selectedDua) return selectedDua.translations[language].title;
    if (selectedCategory) return selectedCategory;
    return language === "bengali" ? "দোয়া সংকলন" : 
           language === "hindi" ? "दुआ संग्रह" : 
           language === "urdu" ? "دعا مجموعہ" : "Dua Collection";
  };

  return (
    <div className="min-h-screen bg-[hsl(158,64%,18%)]">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-gradient-to-b from-[hsl(158,55%,22%)] to-[hsl(158,55%,22%)]/95 backdrop-blur-lg border-b border-white/10"
      >
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(45,93%,58%)] to-[hsl(45,93%,48%)] flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-[hsl(158,64%,15%)]" />
          </div>
          <h1 className="text-xl font-bold text-white">{getTitle()}</h1>
        </div>

        {/* Language Selector */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setSelectedCategory(null);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  language === lang
                    ? "bg-gradient-to-r from-[hsl(45,93%,58%)] to-[hsl(45,93%,48%)] text-[hsl(158,64%,15%)] shadow-md"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {LANGUAGE_LABELS[lang]}
              </button>
            ))}
          </div>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {selectedDua ? (
          // Dua Detail View
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="p-4 space-y-6"
          >
            <div className="text-center space-y-6 py-6">
              {/* Arabic Text Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-gradient-to-br from-[hsl(158,55%,25%)] to-[hsl(158,64%,20%)] rounded-3xl p-6 border border-[hsl(45,93%,58%)]/20 shadow-lg overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[hsl(45,93%,58%)]/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[hsl(158,64%,30%)]/30 rounded-full blur-xl" />
                <div className="relative">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-[hsl(45,93%,58%)]" />
                    <span className="text-xs font-medium text-[hsl(45,93%,58%)]">
                      {language === "bengali" ? "আরবি" : language === "hindi" ? "अरबी" : language === "urdu" ? "عربی" : "Arabic"}
                    </span>
                    <Sparkles className="w-4 h-4 text-[hsl(45,93%,58%)]" />
                  </div>
                  <p className="text-3xl md:text-4xl font-arabic leading-[2] text-white">
                    {selectedDua.arabic}
                  </p>
                </div>
              </motion.div>

              {/* Transliteration */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 rounded-2xl p-4 border border-white/10"
              >
                <p className="text-xs font-medium text-[hsl(45,93%,58%)] mb-2">
                  {language === "bengali" ? "উচ্চারণ" : language === "hindi" ? "उच्चारण" : language === "urdu" ? "تلفظ" : "Transliteration"}
                </p>
                <p className="text-lg italic text-white/80">{selectedDua.transliteration}</p>
              </motion.div>

              {/* Translation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[hsl(45,93%,58%)]/10 to-transparent rounded-2xl p-5 border border-[hsl(45,93%,58%)]/20"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-4 h-4 text-[hsl(45,93%,58%)]" />
                  <p className="text-xs font-medium text-[hsl(45,93%,58%)]">
                    {language === "bengali" ? "অনুবাদ" : language === "hindi" ? "अनुवाद" : language === "urdu" ? "ترجمہ" : "Translation"}
                  </p>
                </div>
                <p className="text-white text-lg md:text-xl leading-relaxed">
                  {selectedDua.translations[language].translation}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // List View
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 space-y-4"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <Input
                placeholder={language === "bengali" ? "দোয়া খুঁজুন..." : language === "hindi" ? "दुआ खोजें..." : language === "urdu" ? "دعا تلاش کریں..." : "Search duas..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-2xl bg-white/10 border-white/10 text-white placeholder:text-white/50 focus:border-[hsl(45,93%,58%)]/50"
              />
            </div>

            {/* Categories */}
            {!selectedCategory && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2 flex-wrap"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white/80 hover:bg-[hsl(45,93%,58%)]/20 hover:text-[hsl(45,93%,58%)] transition-all border border-transparent hover:border-[hsl(45,93%,58%)]/30"
                  >
                    {cat}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Dua List */}
            <div className="space-y-3">
              {filteredDuas.map((dua, index) => (
                <motion.button
                  key={dua.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedDua(dua)}
                  className="w-full text-left p-4 rounded-2xl bg-gradient-to-br from-[hsl(158,55%,25%)] to-[hsl(158,64%,20%)] border border-white/10 hover:border-[hsl(45,93%,58%)]/30 transition-all active:scale-[0.98] group"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[hsl(45,93%,58%)]/20 flex items-center justify-center text-xs font-bold text-[hsl(45,93%,58%)]">
                          {dua.id}
                        </span>
                        <p className="font-semibold text-white">{dua.translations[language].title}</p>
                      </div>
                      <p className="text-sm text-white/60 line-clamp-1 font-arabic">
                        {dua.arabic}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-[hsl(45,93%,58%)] transition-colors" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DuaPage;
