import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack } from '@mui/material';
import "./sliceProject.css";

function BtnSelect({ country, handleChange, arrayCountry }) {
  return (
    <Stack direction="row" justifyContent={"space-around "} style={{ width: "100%", marginBottom: "50px" }}>
        <Box sx={{ minWidth: 120 }} mx={{ width: "30%" }}>
          <FormControl style={{ width: "100%", backgroundColor:"#7777", border:"1px solid #777", borderRadius:"5px"}}>
            <InputLabel id="demo-simple-select-label" style={{color:"white", fontSize:"16px"}}> المدينة </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="City"
              onChange={handleChange}
              style={{color:"white", fontSize:"18px", fontWeight:"bold"}}
            >
              {arrayCountry.map((city, index) => (
                <MenuItem value={city.nameEng} key={index}>{city.nameArb}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
  )
}

export default BtnSelect