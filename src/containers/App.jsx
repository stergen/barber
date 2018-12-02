import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Routes from "./Routes";
import store, { history } from "../store";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.theme = createMuiTheme({
      palette: {
        type: "dark"
      },
      typography: {
        useNextVariants: true
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={this.theme}>
            <Routes />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
