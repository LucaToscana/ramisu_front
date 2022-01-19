import React from "react";
import { Switch, Route } from "react-router-dom";
import {
    URL_HOME,
    URL_ACCOUNT,
    URL_LOGIN,
    URL_ADMIN_HOME,
    URL_PRODUCTS_DETAILS,
    URL_PRODUCT,
    URL_CART,
    URL_PROFILE,
    URL_ORDERS,
    URL_INSCRIPTION,
    URL_PAIEMENT
} from "../shared/constants/urls/urlConstants";
import { customHistory } from "../shared/services/historyServices";
import { ROLE_ADMIN, ROLE_USER } from "../shared/constants/rolesConstant";
import { PrivateRoute } from "../shared/components/utils-components/PrivateRoute";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import AccountView from "../views/AccountView";
import AdminHomeView from "../views/AdminHomeView";
import ProductView from "../views/ProductView";
import ProductDetailView from "../views/ProductDetailView";
import CartsView from "../views/CartsView";
import ProfileView from "../views/ProfileView";
import OrdersView from "../views/OrdersView";
import InscriptionView from "../views/InscriptionView";
import PaiementView from "../views/PaiementView";

/**
 * Routes of the application
 * with public and private route
 *
 * @author Peter Mollet
 */
const Routes = () => {
    return (
        <Switch history={customHistory}>
            <Route exact path={URL_HOME} component={HomeView} />
            <Route path={URL_LOGIN} component={LoginView} />
            <PrivateRoute path={URL_ACCOUNT} component={AccountView} roles={[ROLE_USER]} />
            <PrivateRoute path={URL_PROFILE} component={ProfileView} roles={[ROLE_USER]} />
            <PrivateRoute
                path={URL_ADMIN_HOME}
                component={AdminHomeView}
                roles={[ROLE_ADMIN]}
            />
            <PrivateRoute path={URL_ORDERS} component={OrdersView} roles={[ROLE_USER]} />
            <Route exact path={URL_PRODUCT} component={ProductView} />
            <Route path={URL_PRODUCTS_DETAILS} component={ProductDetailView} />
            <Route path={URL_CART} component={CartsView} />
            <Route path={URL_INSCRIPTION} component={InscriptionView} />
            <Route path={URL_PAIEMENT} component={PaiementView}/>
        </Switch>
    );
};

export default Routes;
