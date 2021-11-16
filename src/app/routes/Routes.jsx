import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { customHistory } from '../shared/services/historyServices';
import { ROLE_ADMIN } from '../shared/constants/rolesConstant';
import { PrivateRoute } from '../shared/components/utils-components/PrivateRoute';
import { URL_HOME, URL_LOGIN, URL_ADMIN_HOME, URL_PRODUCTS_DETAILS, URL_PRODUCT } from '../shared/constants/urls/urlConstants';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import AdminHomeView from '../views/AdminHomeView';
import ProductView from '../views/ProductView';
import ProductDetailView from "../views/ProductDetailView";


/**
 * Routes of the application
 * with public and private route
 * 
 * @author Peter Mollet
 */
const Routes = () => {
    return (
        <Switch history={customHistory}>
            {/*<PrivateRoute exact path={URL_HOME} component={HomeView} />*/}
            <Route exact path={URL_HOME} component={HomeView} />
            <Route path={URL_LOGIN} component={LoginView} />
            <PrivateRoute path={URL_ADMIN_HOME} component={AdminHomeView} roles={[ROLE_ADMIN]} />
            {/*<PrivateRoute path={URL_ADMIN_HOME} component={AdminHomeView} roles={[ROLE_ADMIN]} />*/}
            <Route exact path={URL_PRODUCT} component={ProductView} />
            <Route path={URL_PRODUCTS_DETAILS} component={ProductDetailView} />
        </Switch>
    );
};

export default Routes;