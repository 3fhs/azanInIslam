import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';


function Carts({name, time , image }) {

  return (
    <div style={{boxShadow: "0 0 8px 4px #333"}}>
        <Card sx={{ width: 150 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                    style={{objectFit: "fill"}}
                />
                <CardContent>
                    <h3 style={{textAlign:"center", fontSize:"25px", marginBottom:"10px"}}>
                        {name}
                    </h3>
                    <h1 style={{textAlign:"center", fontSize:"35px", color:"#999"}}>
                        {time}
                    </h1>
                </CardContent>
            </CardActionArea>
        </Card>
    </div>
  )
}

export default Carts