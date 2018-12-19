import React from "react";
// import axios from "axios";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import User from "../../API/User";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class RegistUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      phone: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  // passValid = event => {
  //   const { value, name } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  //   if (
  //     this.state.password !== this.state.confirmPassword &&
  //     this.state.confirmPassword.length < 6
  //   ) {
  //     console.log("badNews");
  //   } else {
  //     console.log(value, name);
  //     console.log(
  //       "state",
  //       this.state.password,
  //       "state confirm",
  //       this.state.confirmPassword
  //     );
  //   }
  // };

  handleSubmit = event => {
    event.preventDefault();
    this.createUser();
  };

  createUser = () => {
    const { firstName, phone, password, confirmPassword } = this.state;

    if (password !== confirmPassword && confirmPassword.length < 6) {
      alert("bad pass");
    } else {
      User.create(firstName, phone, password)
        .then(res => {
          console.log("all is good", res);
        })
        .catch(err => {
          alert("bad(", err);
        });
    }
  };

  render() {
    const { firstName, phone, password, confirmPassword } = this.state;
    return (
      <main className={this.main}>
        <CssBaseline />
        <Paper className={this.paper}>
          <Avatar className={this.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={this.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                placeholder="Name"
                type="text"
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Input
                placeholder="Phone"
                type="text"
                name="phone"
                value={phone}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                placeholder="******"
                type="text"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="confirmPassword">Password</InputLabel>
              <Input
                placeholder="******"
                type="text"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
              />
            </FormControl>
            <p id="typeErr" />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.submit}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

RegistUser.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(RegistUser);
