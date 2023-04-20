import "./styles.css";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function PersonInformation({
  name,
  role,
  email,
  img,
  education,
}: {
  name: string;
  role: string;
  email: string;
  img: string;
  education?: string;
}) {
  const width = 170;

  return (
    <Card sx={{ width: width, borderRadius: "5px" , marginRight:"50px"}}>
      <CardActionArea>
        <CardMedia
          sx={{
            height: width,
            width: width,
            objectFit: "fit",
            borderRadius: "5px",
          }}
          component="img"
          image={img}
          alt={`${role} ${name}`}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography className="role" gutterBottom component="div">
            {role}
          </Typography>
          <Typography className="person-name" gutterBottom component="div">
            {name}
          </Typography>
          <div style={{ textAlign: "start" }}>
            <Typography className="person-email" gutterBottom component="div">
              {`Email: ${email}`}
            </Typography>

            <Typography
              className="person-education"
              gutterBottom
              component="div"
            >
              {`Học vị: ${education}`}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PersonInformation;
