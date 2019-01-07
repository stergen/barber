import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  inputButton: {
    marginRight: -12,
    marginLeft: 20
  },
  appBar: {
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${
      theme.palette.primary.dark
    });`
  },
  transparentAppBar: {
    background: "transparent",
    boxShadow: "none"
  }
});

class Header extends React.Component {
  getPathname = () => {
    const { router } = this.context;
    return router.route.location.pathname;
  };

  render() {
    const { classes } = this.props;

    let position = "sticky";
    let className = classes.appBar;

    if (this.getPathname() === "/") {
      position = "fixed";
      className = classes.transparentAppBar;
    }

    return (
      <AppBar position={position} className={className}>
        <Toolbar>
          <IconButton className={classes.menuButton} aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <div className={classes.grow}>
            <Button component={Link} to="">
              Home
            </Button>
          </div>
          <IconButton
            className={classes.inputButton}
            component={Link}
            to="login"
            aria-label="Login"
          >
            <InputIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

Header.contextTypes = {
  router: PropTypes.shape({})
};

export default withStyles(styles)(Header);
