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
    <Stack direction="row" justifyContent={"space-around"} style={{ width: "100%", marginBottom: "20px" }}>
        <Box sx={{ minWidth: 120 }} mx={{ width: "30%" }}>
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label"> المدينة </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="City"
              onChange={handleChange}
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