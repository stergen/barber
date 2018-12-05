import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Main from "./Main";
import store, { history } from "../store";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.theme = createMuiTheme({
      palette: {
        primary: {
          main: "#232323"
        },
        secondary: {
          light: "#808080",
          main: "#181818",
          contrastText: "#ffffff"
        }
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
            <Main />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
