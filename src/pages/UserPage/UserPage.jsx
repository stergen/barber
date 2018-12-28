import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardMedia from "@material-ui/core/CardMedia";
import User from "../../API/User";

const styles = theme => ({
  avatar: {
    margin: 10,
    width: "70px",
    height: "70px",
    backgroundImage: "url(/images/avatar.png)",
    backgroundSize: "100%"
  },
  background: {
    height: "300px",
    width: "100%",
    display: "flex",
    objectFit: "cover",
    backgroundImage: "url(/images/bg_profile.jpg)"
  },
  nameTage: {
    textAlign: "center",
    color: "white",
    fontSize: "16px"
  },
  cardBox: {
    margin: "15px",
    marginTop: "0px",
    position: "relative",
    bottom: "30px",
    height: 700
  },
  info: {
    textAlign: "center",
    color: "white"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  accordion: {
    margin: "auto",
    marginTop: 25,
    width: "100%"
  }
});

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personInfo: []
    };
  }

  componentDidMount() {
    User.get()
      .then(result => {
        this.setState({ personInfo: result.data });
        console.log("all fine", result.data);
      })
      .catch(console.log("Error"));
  }

  render() {
    const { classes } = this.props;
    const { personInfo } = this.state;
    if (personInfo.length === 0) return null;
    return (
      <div>
        <div className={classes.background} />
        <Card className={(classes.card, classes.cardBox)}>
          <div>
            <CardContent>
              <Grid container justify="center" alignItems="center">
                <Avatar alt="Remy Sharp" className={classes.avatar} />
              </Grid>
              <Typography
                className={(classes.title, classes.nameTage)}
                color="textSecondary"
                gutterBottom
              >
                {personInfo[2].name.first}
              </Typography>
            </CardContent>
            <Typography
              className={(classes.title, classes.info)}
              color="textSecondary"
              gutterBottom
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Similique, excepturi.
            </Typography>
          </div>
          <Grid item xs={8}>
            <div className={classes.accordion}>
              <ExpansionPanel style={{ border: "solid 1px silver" }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    Expansion Panel 1
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel style={{ border: "solid 1px silver" }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    Expansion Panel 2
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel style={{ border: "solid 1px silver" }}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    Disabled Expansion Panel
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          </Grid>
        </Card>
      </div>
    );
  }
}

UserPage.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(UserPage);
