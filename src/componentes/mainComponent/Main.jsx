import React, { useEffect, useState, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Carts from '../sliceProject/Carts';
import fagr from "../../image/fagr.jpg";
import zohr from "../../image/الطهر.png";
import asr from "../../image/العصر.webp";
import mghrep from "../../image/المغرب.webp";
import esha from "../../image/العشاء.jpg";
import axios from 'axios';
import moment from 'moment';
import "../../../node_modules/moment/locale/ar-dz";
import GridTimer from '../sliceProject/GridTimer';
import BtnSelect from '../sliceProject/BtnSelect';
moment.locale("ar-dz");

function Main() {
  const [timing, setTiming] = useState({});
  const [country, setCountry] = useState("Cairo");
  const [today, setToday] = useState("");
  const [nextPrayerName, setNextPrayerName] = useState("");
  const [nextPrayerTime, setNextPrayerTime] = useState("");
  const [timer, setTimer] = useState();

  const arrayCountry = [
    { nameArb: "الوادى الجديد", nameEng: "New Valley" },
    { nameArb: "مطروح", nameEng: "Matruh" },
    { nameArb: "البحر الأحمر", nameEng: "Red Sea" },
    { nameArb: "الجيزة", nameEng: "Giza" },
    { nameArb: "جنوب سيناء", nameEng: "South Sinai" },
    { nameArb: "شمال سيناء", nameEng: "North Sinai" },
    { nameArb: "السويس", nameEng: "Suez" },
    { nameArb: "البحيرة", nameEng: "Beheira" },
    { nameArb: "حلوان", nameEng: "Helwan" },
    { nameArb: "الشرقية", nameEng: "Sharqia" },
    { nameArb: "الدقهلية", nameEng: "Dakahlia" },
    { nameArb: "كفر الشيخ", nameEng: "Kafr el-Sheikh" },
    { nameArb: "الإسكندرية", nameEng: "Alexandria" },
    { nameArb: "المنوفية", nameEng: "Monufia" },
    { nameArb: "المنيا", nameEng: "Minya" },
    { nameArb: "الغربية", nameEng: "Gharbia" },
    { nameArb: "الفيوم", nameEng: "Faiyum" },
    { nameArb: "قنا", nameEng: "Qena" },
    { nameArb: "أسيوط", nameEng: "Asyut" },
    { nameArb: "سوهاج", nameEng: "Sohag" },
    { nameArb: "الإسماعيلية", nameEng: "Ismailia" },
    { nameArb: "بني سويف", nameEng: "Beni Suef" },
    { nameArb: "القليوبية", nameEng: "Qalyubia" },
    { nameArb: "أسوان", nameEng: "Aswan" },
    { nameArb: "دمياط", nameEng: "Damietta" },
    { nameArb: "القاهرة", nameEng: "Cairo" },
    { nameArb: "بورسعيد", nameEng: "Port Said" },
    { nameArb: "الأقصر", nameEng: "Luxor" },
    { nameArb: "6 أكتوبر", nameEng: "6th of October" }
  ];

  const getTiming = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?country=EG&city=${country}`);
      setTiming(response.data.data.timings);
    } catch (error) {
      console.error("Error fetching timings:", error);
    }
  }, [country]);

  useEffect(() => {
    getTiming();
  }, [getTiming]);

  useEffect(() => {
    const setupCountDownTimer = () => {
      const momentNow = moment();
      let nextPrayerTime = null;
      let nextPrayerName = "";

      const prayerTimes = {
        Fajr: moment(timing["Fajr"], "HH:mm"),
        Dhuhr: moment(timing["Dhuhr"], "HH:mm"),
        Asr: moment(timing["Asr"], "HH:mm"),
        Maghrib: moment(timing["Maghrib"], "HH:mm"),
        Isha: moment(timing["Isha"], "HH:mm"),
      };

      if (momentNow.isBefore(prayerTimes.Fajr)) {
        nextPrayerTime = prayerTimes.Fajr;
        nextPrayerName = "الفجر";
      } else if (momentNow.isBefore(prayerTimes.Dhuhr)) {
        nextPrayerTime = prayerTimes.Dhuhr;
        nextPrayerName = "الظهر";
      } else if (momentNow.isBefore(prayerTimes.Asr)) {
        nextPrayerTime = prayerTimes.Asr;
        nextPrayerName = "العصر";
      } else if (momentNow.isBefore(prayerTimes.Maghrib)) {
        nextPrayerTime = prayerTimes.Maghrib;
        nextPrayerName = "المغرب";
      } else if (momentNow.isBefore(prayerTimes.Isha)) {
        nextPrayerTime = prayerTimes.Isha;
        nextPrayerName = "العشاء";
      } else {
        // تحديد وقت صلاة الفجر في اليوم التالي
        nextPrayerTime = prayerTimes.Fajr.add(1, "days");
        nextPrayerName = "الفجر";
      }

      // حساب الوقت المتبقي
      const timeRemaining = moment.duration(nextPrayerTime.diff(momentNow));
      const formattedTimeRemaining = `${String(Math.floor(timeRemaining.asHours())).padStart(2, '0')}:${String(Math.floor(timeRemaining.minutes())).padStart(2, '0')}:${String(Math.floor(timeRemaining.seconds())).padStart(2, '0')}`;

      setNextPrayerName(nextPrayerName);
      setNextPrayerTime(formattedTimeRemaining);
      setTimer(timeRemaining);
    };

    setupCountDownTimer();
    const interval = setInterval(setupCountDownTimer, 1000);
    setToday(moment().format("LLLL"));

    return () => clearInterval(interval);
  }, [timing]);

  const handleChange = (event) => {
    const citySelect = event.target.value;
    setCountry(citySelect);
  };

  return (
    <>
      <h1 style={{textAlign: "center",
                  color: "white",
                  textShadow: "5px 1px black",
                  textDecoration: "underline",
                }}> مواقيت الصلاة </h1>
          <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              flexWrap: "wrap",
              padding: "0",
            }}>

            <GridTimer country={country} arrayCountry={arrayCountry} nextPrayerName={nextPrayerName} nextPrayerTime={nextPrayerTime} />

            <BtnSelect arrayCountry={arrayCountry} handleChange={handleChange} country={country} />

            <Stack direction="row" justifyContent={"space-around"} flexWrap={"wrap"} style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              width: "100%",
              justifyItems: "center",
              gap: "20px",
              marginBottom: "20px",
            }}>
              <Carts name=" الفجر " time={timing.Fajr} image={fagr} />
              <Carts name=" الظهر " time={timing.Dhuhr} image={zohr} />
              <Carts name=" العصر " time={timing.Asr} image={asr} />
              <Carts name=" المغرب " time={timing.Maghrib} image={mghrep} />
              <Carts name=" العشاء " time={timing.Isha} image={esha} />
            </Stack>

          </div>
    </>
  );
}

export default Main;
