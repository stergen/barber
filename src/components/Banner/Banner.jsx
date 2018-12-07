import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import "./banner.css";

const styles = {
  title: {
    padding: 30,
    background: "rgba(0, 0, 0, 0.7)"
  }
};

function Banner({ classes }) {
  return (
    <div className="banner">
      <div className="banner-content">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          className={classes.title}
          gutterBottom
        >
          Barber
        </Typography>
      </div>
    </div>
  );
}

Banner.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Banner);
