import React from 'react';

import {
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import LandingPage from './components/LandingPage';
import Questionnaire from './components/Questionnaire';

import theme from './theme';

const App = () => (
  // Props here...
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Switch>
      <Route
        exact
        path="/"
        render={({ history }) => (
          <LandingPage history={history} />
        )}
      />
      <Route
        exact
        path="/:key"
        render={({ match, history }) => (
          <Questionnaire testkey={match.params.key} history={history} />
        )}
      />

    </Switch>
  </MuiThemeProvider>
);

export default withRouter(App);
