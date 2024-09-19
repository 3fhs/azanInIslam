import Grid from '@mui/material/Grid'; // استخدام Grid بشكل صحيح
import moment from 'moment';
import React from 'react';
import "./sliceProject.css";

function GridTimer({ country, arrayCountry , nextPrayerName , nextPrayerTime }) {
  return (
    <Grid container style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%", padding: "20px", color:"white", textShadow: "3px 2px BLACK"}}>
      <Grid item xs={6} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px", marginBottom: "20px", minWidth: "250px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}>
          <h2>{moment().format("dddd ، D MMMM YYYY")}</h2>
          <h2>{moment().format(" الوقت /  HH : mm : ss")}</h2>
        </div>
        <h1> المدينة : {arrayCountry.find((city) => city.nameEng === country)?.nameArb || "غير محدد"}</h1>
      </Grid>
      <Grid item xs={6} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px", marginBottom: "20px", minWidth: "250px" }}>
        <h2>متبقى حتى صلاة {nextPrayerName}</h2>
        <h1>{nextPrayerTime}</h1>
      </Grid>
      <div style={{backgroundColor:"transparent", position:"relative", height:"10px", width:"80%"}}>
        <hr className='rounded' style={{ border: "none", width: "100%",height:"2px"}} />
      </div>
    </Grid>
  )
}

export default GridTimer;
