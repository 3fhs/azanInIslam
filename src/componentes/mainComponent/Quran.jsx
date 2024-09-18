import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import "./quran.css";

// بيانات أسماء السور باللغة العربية
const surahNames = [
  { number: "1", name: "الفاتحة" },
  { number: "2", name: "البقرة" },
  { number: "3", name: "آل عمران" },
  { number: "4", name: "النساء" },
  { number: "5", name: "المائدة" },
  { number: "6", name: "الأنعام" },
  { number: "7", name: "الأعراف" },
  { number: "8", name: "الأنفال" },
  { number: "9", name: "التوبة" },
  { number: "10", name: "يونس" },
  { number: "11", name: "هود" },
  { number: "12", name: "يوسف" },
  { number: "13", name: "الرعد" },
  { number: "14", name: "إبراهيم" },
  { number: "15", name: "الحجر" },
  { number: "16", name: "النحل" },
  { number: "17", name: "الإسراء" },
  { number: "18", name: "الكهف" },
  { number: "19", name: "مريم" },
  { number: "20", name: "طه" },
  { number: "21", name: "الأنبياء" },
  { number: "22", name: "الحج" },
  { number: "23", name: "المؤمنون" },
  { number: "24", name: "النور" },
  { number: "25", name: "الفرقان" },
  { number: "26", name: "الشعراء" },
  { number: "27", name: "النمل" },
  { number: "28", name: "القصص" },
  { number: "29", name: "العنكبوت" },
  { number: "30", name: "الروم" },
  { number: "31", name: "لقمان" },
  { number: "32", name: "السجدة" },
  { number: "33", name: "الأحزاب" },
  { number: "34", name: "سبأ" },
  { number: "35", name: "فاطر" },
  { number: "36", name: "يس" },
  { number: "37", name: "الصافات" },
  { number: "38", name: "ص" },
  { number: "39", name: "الزمر" },
  { number: "40", name: "غافر" },
  { number: "41", name: "فصلت" },
  { number: "42", name: "الشورى" },
  { number: "43", name: "الزخرف" },
  { number: "44", name: "الدخان" },
  { number: "45", name: "الجاثية" },
  { number: "46", name: "الأحقاف" },
  { number: "47", name: "محمد" },
  { number: "48", name: "الفتح" },
  { number: "49", name: "الحجرات" },
  { number: "50", name: "ق" },
  { number: "51", name: "الذاريات" },
  { number: "52", name: "الطور" },
  { number: "53", name: "النجم" },
  { number: "54", name: "القمر" },
  { number: "55", name: "الرحمن" },
  { number: "56", name: "الواقعة" },
  { number: "57", name: "الحديد" },
  { number: "58", name: "المجادلة" },
  { number: "59", name: "الحشر" },
  { number: "60", name: "الممتحنة" },
  { number: "61", name: "الصف" },
  { number: "62", name: "الجمعة" },
  { number: "63", name: "المنافقون" },
  { number: "64", name: "التغابن" },
  { number: "65", name: "الطلاق" },
  { number: "66", name: "التحريم" },
  { number: "67", name: "الملك" },
  { number: "68", name: "القلم" },
  { number: "69", name: "الحاقة" },
  { number: "70", name: "المعارج" },
  { number: "71", name: "نوح" },
  { number: "72", name: "الجن" },
  { number: "73", name: "المزمل" },
  { number: "74", name: "المدثر" },
  { number: "75", name: "القيامة" },
  { number: "76", name: "الإنسان" },
  { number: "77", name: "المرسلات" },
  { number: "78", name: "النبأ" },
  { number: "79", name: "النازعات" },
  { number: "80", name: "عبس" },
  { number: "81", name: "التكوير" },
  { number: "82", name: "الانفطار" },
  { number: "83", name: "المطففين" },
  { number: "84", name: "الانشقاق" },
  { number: "85", name: "البروج" },
  { number: "86", name: "الطارق" },
  { number: "87", name: "الأعلى" },
  { number: "88", name: "الغاشية" },
  { number: "89", name: "الفجر" },
  { number: "90", name: "البلد" },
  { number: "91", name: "الشمس" },
  { number: "92", name: "الليل" },
  { number: "93", name: "الضحى" },
  { number: "94", name: "الشرح" },
  { number: "95", name: "التين" },
  { number: "96", name: "العلق" },
  { number: "97", name: "القدر" },
  { number: "98", name: "البينة" },
  { number: "99", name: "الزلزلة" },
  { number: "100", name: "العاديات" },
  { number: "101", name: "القارعة" },
  { number: "102", name: "التكاثر" },
  { number: "103", name: "العصر" },
  { number: "104", name: "الهمزة" },
  { number: "105", name: "الفيل" },
  { number: "106", name: "قريش" },
  { number: "107", name: "الماعون" },
  { number: "108", name: "الكوثر" },
  { number: "109", name: "الكافرون" },
  { number: "110", name: "النصر" },
  { number: "111", name: "المسد" },
  { number: "112", name: "الإخلاص" },
  { number: "113", name: "الفلق" },
  { number: "114", name: "الناس" }
];

function Quran() {
  const [recitersState, setRecitersState] = useState([]);
  const [moshafs, setMoshafs] = useState([]);
  const [selectedReciter, setSelectedReciter] = useState(null);
  const [selectedMoshaf, setSelectedMoshaf] = useState(null);
  const [selectedSurah, setSelectedSurah] = useState('');
  const [audioSrc, setAudioSrc] = useState('');

  // Fetch reciters
  const getReciters = useCallback(async () => {
    try {
      const response = await axios.get("https://mp3quran.net/api/v3/reciters?language=ar");
      setRecitersState(response.data.reciters);
    } catch (error) {
      console.error("Error fetching reciters:", error);
    }
  }, []);

  useEffect(() => {
    getReciters();
  }, [getReciters]);

  const handleReciterChange = (event) => {
    const reciterId = event.target.value;
    const selected = recitersState.find((reciter) => reciter.id === parseInt(reciterId));
    setSelectedReciter(selected);
    setMoshafs(selected?.moshaf || []);
    setSelectedMoshaf(null);
    setSelectedSurah('');
    setAudioSrc('');
  };

  const handleMoshafChange = (event) => {
    const moshafId = event.target.value;
    const selectedMoshaf = moshafs.find((moshaf) => moshaf.id === parseInt(moshafId));
    setSelectedMoshaf(selectedMoshaf);
    setSelectedSurah('');
    setAudioSrc('');
  };

  const handleSurahChange = (event) => {
    const surahId = event.target.value;
    setSelectedSurah(surahId);

    // Build the URL based on reciter, moshaf, and surah
    const server = selectedReciter?.moshaf.find(moshaf => moshaf.id === parseInt(selectedMoshaf?.id))?.server || '';
    const url = `${server}${surahId.padStart(3, '0')}.mp3`; // Ensure URL format is correct

    // Update audio source
    setAudioSrc(url);
  };

  useEffect(() => {
    const audioElement = document.getElementById('audioPlayer');
    if (audioElement) {
      audioElement.load(); // Reload audio element when source changes
    }
  }, [audioSrc]);

  return (
    <div style={{ width: "100%", padding: "50px 0", textAlign: "center" }}>
      <div className="main-banner change-name">
        <div className="header-text" style={{ color: "white", textShadow: "2px 3px black", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "35px", paddingBottom: "10px" }}>مع متعة من القراء و المشايخ</h2>
          <h2>قال تعالى : <em>* وَإِذَا قُرِئَ الْقُرْآنُ فَاسْتَمِعُوا لَهُ وَأَنْصِتُوا لَعَلَّكُمْ تُرْحَمُونَ *</em> صدق الله العظيم</h2>
        </div>
      </div>
      <div className="search-form" style={{ padding: "30px" }}>
        <form id="search-form" name="gs" method="submit" role="search" action="#">
          <div className="row">
            <div className="select-icons">
              <label htmlFor="chooseReciter" className="form-label">اختر القارئ</label>
              <select
                name="Reciter"
                className="form-select"
                id="chooseReciter"
                onChange={handleReciterChange}
              >
                <option value="">اختر القارئ</option>
                {recitersState.map((reciter) => (
                  <option key={reciter.id} value={reciter.id}>{reciter.name}</option>
                ))}
              </select>
            </div>

            <div className="select-icons">
              <label htmlFor="chooseMoshaf" className="form-label">اختر الرواية</label>
              <select
                name="Moshaf"
                className="form-select"
                id="chooseMoshaf"
                onChange={handleMoshafChange}
                disabled={!selectedReciter}
              >
                <option value="">اختر الرواية</option>
                {moshafs.map((moshaf) => (
                  <option key={moshaf.id} value={moshaf.id}>{moshaf.name}</option>
                ))}
              </select>
            </div>

            <div className="select-icons">
              <label htmlFor="chooseSurah" className="form-label">اختر السورة</label>
              <select
                name="Surah"
                className="form-select"
                id="chooseSurah"
                onChange={handleSurahChange}
                disabled={!selectedMoshaf}
              >
                <option value="">اختر السورة</option>
                {surahNames.map((surah) => (
                  <option key={surah.number} value={surah.number}>سورة {surah.name}</option>
                ))}
              </select>
            </div>
          </div>
          <audio id="audioPlayer" controls  style={{ width: "80%", marginBottom: "20px" }}>
              {audioSrc && <source src={audioSrc} type="audio/mpeg" />}
          </audio>
        </form>
      </div>
    </div>
  );
}

export default Quran;
