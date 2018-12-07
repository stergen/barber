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
          light: "#949494",
          main: "#383838",
          dark: "#1d1d1d",
          contrastText: "#fff"
        },
        secondary: {
          main: "#E30501"
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
