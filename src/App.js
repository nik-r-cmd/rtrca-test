import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Book, Music, ChevronRight, Sparkles, Heart, SkipForward, SkipBack, ArrowLeft } from 'lucide-react';

import AudioPlayer from './AudioPlayer.jsx'; 

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/dancing-script/600.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';

export default function AudiobookLibrary() {
  const [currentView, setCurrentView] = useState('landing');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Audiobooks data (Update with your Internet Archive links)
  const audiobooks = {
    en:[{ 
      id: 1, 
      title: "The Magic of Mithai Lane", 
      author: "Nikhitha Reddy", 
      voicedBy: "Nikhitha Reddy", 
      duration: "35 mins", 
      color: "bg-green-400",
      ageRange: "3-8 years", 
      audioSrc: "YOUR_INTERNET_ARCHIVE_DIRECT_LINK_HERE"
    },
    { 
      id: 2, 
      title: "Bella and the Hidden Garden", 
      author: "Mahalaxmi Deveram", 
      voicedBy: "Mahalaxmi Deveram", 
      duration: "45 mins", 
      color: "bg-blue-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/1.mp3"
    },
    { 
      id: 3, 
      title: "Blissful Breeze", 
      author: "Anandi Raghavi", 
      voicedBy: "Anandi Raghavi", 
      duration: "40 mins", 
      color: "bg-orange-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/2.mp3"
    },
    { 
      id: 4, 
      title: "Lumo the Lamp", 
      author: "G. Shreya", 
      voicedBy: "Kaniganti Tejasvi", 
      duration: "38 mins", 
      color: "bg-indigo-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/3.m4a"
    },
    { 
      id: 5, 
      title: "Secret of The Singing Stones", 
      author: "G. Shreya", 
      voicedBy: "G. Shreya", 
      duration: "32 mins", 
      color: "bg-pink-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/4.mp3"
    },
    { 
      id: 6, 
      title: "Asha's Colors of Change", 
      author: "Spoorthy Reddy", 
      voicedBy: "Spoorthy Reddy", 
      duration: "35 mins", 
      color: "bg-indigo-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/5.mp3"
    },
    { 
      id: 7, 
      title: "The Tricolored Kite", 
      author: "Ruqayya Noorul Huda", 
      voicedBy: "Ruqayya Noorul Huda", 
      duration: "35 mins", 
      color: "bg-green-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/6.mp3"
    },
    { 
      id: 8, 
      title: "The Bracelet", 
      author: "Sree Lasya", 
      voicedBy: "Sree Lasya", 
      duration: "35 mins", 
      color: "bg-blue-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/7.mp3"
    },
    { 
      id:9, 
      title: "The Light of Loyalty", 
      author: "Selina Govada", 
      voicedBy: "Selina Govada", 
      duration: "35 mins", 
      color: "bg-green-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/8.mp3"
    },
    { 
      id: 10, 
      title: "The Puzzle of the Painted Wall", 
      author: "Vaishnavi Puligilla", 
      voicedBy: "Vaishnavi Puligilla", 
      duration: "35 mins", 
      color: "bg-cyan-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/9.mp3"
    },
    { 
      id: 11, 
      title: "The Forest of Everland", 
      author: "Safura Minhaj", 
      voicedBy: "Safura Minhaj", 
      duration: "35 mins", 
      color: "bg-green-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/10.mp3"
    },
    { 
      id: 12, 
      title: "The Four Cows and the Hungry Beasts", 
      author: "Vishishta M.", 
      voicedBy: "Vishishta M.", 
      duration: "35 mins", 
      color: "bg-indigo-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/11.mp3"
    },
    { 
      id: 13, 
      title: "A King's Magical Words", 
      author: "Vishishta M.", 
      voicedBy: "Vishishta M.", 
      duration: "35 mins", 
      color: "bg-orange-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/12.mp3"
    },
    { 
      id: 14, 
      title: "The Clock and the Competition", 
      author: "Vishishta M.", 
      voicedBy: "Vishishta M.", 
      duration: "35 mins", 
      color: "bg-pink-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/13.mp3"
    },
    { 
      id: 15, 
      title: "The Story of Lord Krishna and Sudama", 
      author: "Vishishta M.", 
      voicedBy: "Vishishta M.", 
      duration: "35 mins", 
      color: "bg-green-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/14.mp3"
    },
    { 
      id: 16, 
      title: "The Bond of Brothers - A Story from the Ramayana", 
      author: "Vishishta M.", 
      voicedBy: "Vishishta M.", 
      duration: "35 mins", 
      color: "bg-blue-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/15.mp3"
    },
    { 
      id: 17, 
      title: "Every Day: A Child's Simple Joys", 
      author: "Manasvi V.", 
      voicedBy: "Manasvi V.", 
      duration: "35 mins", 
      color: "bg-green-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/16.mp3"
    },
    { 
      id: 18, 
      title: "A Tale of Friendship and Balance", 
      author: "Anandi Raghavi", 
      voicedBy: "Faiza Hameed", 
      duration: "35 mins", 
      color: "bg-blue-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/17.m4a"
    },
    { 
      id: 19, 
      title: "The Kingdom of Everberries", 
      author: "Anagha Adiraju", 
      voicedBy: "Anagha Adiraju", 
      duration: "35 mins", 
      color: "bg-pink-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/18.mp3"
    },
    { 
      id: 20, 
      title: "Tommy's Triumph", 
      author: "A. Sai Laasya", 
      voicedBy: "Sahithi Reddigari", 
      duration: "35 mins", 
      color: "bg-blue-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/19.m4a"
    },
    { 
      id: 21, 
      title: "A World So Bright", 
      author: "Sana Mariyam", 
      voicedBy: "Anandi Raghavi", 
      duration: "35 mins", 
      color: "bg-pink-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/20.mp3"
    },
    { 
      id: 22, 
      title: "Little Lucy's Summer Delight", 
      author: "Niharika Mantravadi", 
      voicedBy: "Niharika Mantravadi", 
      duration: "35 mins", 
      color: "bg-green-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/21.mp3"
    },
    { 
      id: 23, 
      title: "Princess Mira and the Helpful Garden", 
      author: "Sahasra Ravi", 
      voicedBy: "Sahasra Ravi", 
      duration: "35 mins", 
      color: "bg-orange-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/22.mp3"
    },
    { 
      id: 24, 
      title: "The Curse of the Whispering Grove", 
      author: "Vasavi Lakshmi M.", 
      voicedBy: "Vasavi Lakshmi M.", 
      duration: "35 mins", 
      color: "bg-orange-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/23.m4a"
    },
    { 
      id: 25, 
      title: "Turtle Who Outsmarted the Storm", 
      author: "Shreya Daggumalli", 
      voicedBy: "Shreya Daggumalli", 
      duration: "35 mins", 
      color: "bg-orange-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/24.mp3"
    },
    { 
      id: 26, 
      title: "The Tale of Rani, the Brave Weaverbird Story", 
      author: "Sriya", 
      voicedBy: "Sriya", 
      duration: "35 mins", 
      color: "bg-orange-400",
      ageRange: "3-8 years", 
      audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/25.mp4"
    },    
 
    ], 
    tel: [
      { 
        id: 1, 
        title: "దయాలసీమైన చిన్న చిలుక", 
        author: "హర్షిణి రెడ్డి", 
        voicedBy: "హర్షిణి రెడ్డి", 
        duration: "25 నిమిషాలు", 
        color: "bg-purple-400",
        ageRange: "4-7 సంవత్సరాలు", 
        audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/harsh.mp3"
      }, 
      { 
        id: 2, 
        title: "ముక్కు చెవి నోటితో కబీర్లు", 
        author: "అమృత", 
        voicedBy: "అమృత", 
        duration: "25 నిమిషాలు", 
        color: "bg-purple-400",
        ageRange: "5-12 సంవత్సరాలు", 
        audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/amr.m4a"
      },
    ],
    hi:[
      { 
        id: 1, 
        title: "नन्हा थोथा और उसकी नयी दोस्ती", 
        author: "साई शालिनी पी", 
        voicedBy: "साई शालिनी पी", 
        duration: "30 मिनट", 
        color: "bg-orange-400",
        ageRange: "4-7 साल", 
        audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/shal.mp3"
      }, 
      { 
        id: 2, 
        title: "ज्ञानी की रोशनी", 
        author: "रफिया", 
        voicedBy: "रफिया", 
        duration: "30 मिनट", 
        color: "bg-orange-400",
        ageRange: "6-10 साल", 
        audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/raf.m4a"
      },
      { 
        id: 3, 
        title: "परिंदे के अंडे", 
        author: "हफ्सा खाजा", 
        voicedBy: "हफ्सा खाजा", 
        duration: "30 मिनट", 
        color: "bg-orange-400",
        ageRange: "6-10 साल", 
        audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/hafsa.m4a"
      },
      { 
        id: 4, 
        title: "कृष्ण और उनके मक्खन", 
        author: "कल्याणी पिन्नमनेनि", 
        voicedBy: "कल्याणी पिन्नमनेनि", 
        duration: "30 मिनट", 
        color: "bg-orange-400",
        ageRange: "7-9 साल", 
        audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/kal1.mp3"
      },
      { 
        id: 5, 
        title: "जादूई जंगल", 
        author: "कल्याणी पिन्नमनेनि", 
        voicedBy: "कल्याणी पिन्नमनेनि", 
        duration: "30 मिनट", 
        color: "bg-orange-400",
        ageRange: "4-7 साल", 
        audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/kal2.mp3"
      },
      { 
        id: 6, 
        title: "बब्लू और उसके रंगीले जूठे", 
        author: "कल्याणी पिन्नमनेनि", 
        voicedBy: "कल्याणी पिन्नमनेनि", 
        duration: "30 मिनट", 
        color: "bg-orange-400",
        ageRange: "2-4 साल", 
        audioSrc: "https://ia902903.us.archive.org/7/items/10_20241209/kal3.mp3"
      },
    ],
  };

  function FloatingIcon({ index }) {
    const colors = [
      'text-blue-400', 
      'text-green-400', 
      'text-yellow-400', 
      'text-purple-400', 
      'text-red-400', 
      'text-indigo-400'
    ];

    const icons = [Music, Heart, Sparkles, Book, Play, Pause];

    const [position, setPosition] = useState({
      x: Math.random() * 100,
      y: Math.random() * 100
    });

    useEffect(() => {
      const moveIcon = () => {
        setPosition(prev => ({
          x: (prev.x + (Math.random() - 0.5) * 5 + 100) % 100,
          y: (prev.y + (Math.random() - 0.5) * 5 + 100) % 100
        }));
      };

      const intervalId = setInterval(moveIcon, 3000); // Move every 3 seconds

      return () => clearInterval(intervalId);
    }, []);

    const IconComponent = icons[index % icons.length];
    const colorClass = colors[index % colors.length];

    return (
      <div
        className="absolute transition-all duration-3000 ease-in-out group animate-float"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
        }}
      >
        <div className="transition-all duration-500 group-hover:scale-150 group-hover:brightness-150 opacity-60">
          <IconComponent className={`w-6 h-6 ${colorClass}`} />
        </div>
      </div>
    );
  }

  function LandingPage() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white flex flex-col items-center justify-center space-y-8 text-center px-4 relative overflow-hidden font-poppins">
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <FloatingIcon key={i} index={i} />
          ))}
        </div>
  
        <div className="relative z-10 space-y-8 text-center">
          <h1 className="text-5xl font-bold text-pink-600 mb-2 font-dancing-script">
            The Audiobook Library
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 font-poppins">
            Club Administration Avenue
          </h2>
          <h2 className="text-3xl font-semibold text-pink-600 font-dancing-script">
            Rotaract Club of GNITS
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-nunito">
          Immersed in a world of words crafted for impact, our audiobook collection brings together narratives that inspire and poems that resonate. 
          Centered about education, social issues and awareness campaigns, each piece is a step towards transformation, especially for the underprivileged and visually impaired.
          </p>
          <button 
            onClick={() => setCurrentView('selectLanguage')}
            className="mx-auto transform hover:scale-110 transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-12 py-6 rounded-full text-2xl font-semibold hover:shadow-xl flex items-center gap-3 group animate-bounce"
          >
            Start Your Adventure 
            <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  function LanguageSelection() {
    const languages = [
      { 
        code: 'en', 
        name: 'English', 
        color: 'from-blue-200 to-blue-300', 
        textColor: 'text-blue-800',
        available: true
      },
      { 
        code: 'tel', 
        name: 'తెలుగు', 
        color: 'from-green-200 to-green-300', 
        textColor: 'text-green-800',
        available: audiobooks.tel.length > 0
      },
      { 
        code: 'hi', 
        name: 'हिन्दी', 
        color: 'from-orange-200 to-orange-300', 
        textColor: 'text-orange-800',
        available: audiobooks.hi.length > 0
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white flex flex-col items-center justify-center space-y-8 p-4 font-poppins">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center font-dancing-script">
          Choose Your Language
        </h2>

        <div className="flex space-x-6 justify-center">
          {languages.map((lang) => (
            <div 
              key={lang.code}
              onClick={() => {
                if (lang.available) {
                  setSelectedLanguage(lang.code);
                  setCurrentView('books');
                }
              }}
              className={`
                w-64 h-80 
                bg-gradient-to-br ${lang.color} 
                rounded-2xl shadow-lg 
                transform transition-all duration-300 
                hover:scale-105 hover:shadow-xl 
                ${lang.available ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                flex flex-col items-center justify-center 
                group relative overflow-hidden
              `}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              
              <h3 className={`text-2xl font-bold ${lang.textColor} mb-2 ${!lang.available ? 'opacity-50' : ''}`}>
                {lang.name}
              </h3>
              
              {!lang.available && (
                <p className="text-center text-gray-600 px-4 opacity-50">
                  Coming soon
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

function AudiobookList() {
    const languageBooks = audiobooks[selectedLanguage] || audiobooks.en;

    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white p-8 font-poppins">
        {/* Back Button Added */}
        <button 
          onClick={() => setCurrentView('selectLanguage')}
          className="mb-4 flex items-center text-pink-600 hover:text-pink-800 transition-colors"
        >
          <ArrowLeft className="mr-2" /> Back to Languages
        </button>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 flex items-center gap-4 font-dancing-script">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              The Audiobook Library
            </span>
            <Sparkles className="w-8 h-8 text-pink-500 animate-spin" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {languageBooks.map((book) => (
              <div
                key={book.id}
                className="transform hover:scale-105 transition-all duration-300 bg-white rounded-xl shadow-lg hover:shadow-xl p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => setSelectedBook(book)}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-xl opacity-20 transition-transform group-hover:scale-150 ${book.color}`} />
                <div className="relative z-10">
                  <div className="mb-4 flex justify-center">
                    <Book className={`w-16 h-16 text-pink-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-dancing-script">{book.title}</h3>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">{book.duration}</span>
                    <span className="text-sm text-gray-500 ml-4">{book.ageRange}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {selectedBook && (
        <AudiobookDetails 
          book={selectedBook} 
          onClose={() => {
            setSelectedBook(null);
            setIsPlaying(false);
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
          }} 
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      )}
    </div>
  );
}

  function AudiobookDetails({ book, onClose, audioRef, isPlaying, setIsPlaying }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 font-poppins">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative animate-[scaleUp_0.3s_ease-out_forwards]">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-pink-500 transition-colors"
          >
            Close
          </button>
          
          <div className="flex items-start space-x-8">
            <div className={`w-48 h-48 rounded-xl ${book.color} flex items-center justify-center`}>
              <Book className="w-24 h-24 text-white opacity-70" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-pink-600 mb-2 font-dancing-script">{book.title}</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Author</p>
                  <p className="font-semibold">{book.author}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Narrated By</p>
                  <p className="font-semibold">{book.voicedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-semibold">{book.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age Range</p>
                  <p className="font-semibold">{book.ageRange}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <AudioPlayer 
                  audioSrc={book.audioSrc} 
                  title={book.title} 
                  author={book.voicedBy} 
                  audioRef={audioRef}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans">
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'selectLanguage' && <LanguageSelection />}
      {currentView === 'books' && <AudiobookList />}
    </div>
  );
}

export const tailwindConfig = {
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'dancing-script': ['Dancing Script', 'cursive'],
        'nunito': ['Nunito', 'sans-serif']
      },
      animation: {
        float: 'float 10s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        scaleUp: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      transitionDuration: {
        '3000': '3000ms'
      }
    }
  }
};
  