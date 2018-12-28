import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import User from "../../API/User";

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personInfo: {}
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
    const { personInfo } = this.state;
    console.log("personInfo[0]", personInfo[0].name);
    return (
      <div>
        <p>sad</p>
        <p>іфв</p>
      </div>
    );
  }
}
export default UserPage;
