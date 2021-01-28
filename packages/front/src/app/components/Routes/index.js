import React, { Suspense } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import Home from '~screens/Home';
import Login from '~screens/Login';
import Playground from '~screens/Playground';
import { history } from '~redux/store';
import { ROUTES } from '~constants/routes';

import styles from './styles.module.scss';

const AppRoutesContainer = () => (
  <ConnectedRouter history={history}>
    <div className={`column center ${styles.container} ${styles.containerAlgo}`}>
      <Suspense>
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.HOME} component={Home} exact />
        {process.env.NODE_ENV === 'development' && <Route path={ROUTES.PLAYGROUND} component={Playground} />}
      </Suspense>
    </div>
  </ConnectedRouter>
);

export default AppRoutesContainer;
