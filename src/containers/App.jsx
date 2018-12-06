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
        type: "dark",
        primary: {
          light: "#b1b1b1",
          main: "#232323",
          dark: "#000",
          contrastText: "#fff"
        },
        secondary: {
          light: "#808080",
          main: "#181818",
          contrastText: "#fff"
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
