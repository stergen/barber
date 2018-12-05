import React from "react";
import Typography from "@material-ui/core/Typography";

import "./banner.css";

function Banner() {
  return (
    <div className="banner">
      <div className="banner-content">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="inherit"
          gutterBottom
        >
          Barber
        </Typography>
      </div>
    </div>
  );
}

export default Banner;
