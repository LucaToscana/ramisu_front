import React from "react";
import { Switch, Route , useLocation} from "react-router-dom";
import {
            URL_HOME,
            URL_ACCOUNT,
            URL_LOGIN,
            URL_PASSWORD_RESET_START,
            URL_PASSWORD_RESET_END,
            URL_ADMIN_HOME,
            URL_PRODUCTS_DETAILS,
            URL_PRODUCT,
            URL_CART,
            URL_PROFILE,
            URL_ORDERS,
            URL_REGISTRATION,
            URL_PAIEMENT,
            URL_PAIEMENT_2,
            URL_PRODUCT_LIBRAIRIE,
            URL_PRODUCT_PEINTURES,
            URL_PRODUCT_FIGURINES,
            URL_CONTACT_US,
            URL_ORDER_DETAILS,
            URL_COMM_HOME,
            URL_ORDER_RETURN
        } from "../shared/constants/urls/urlConstants";
import { customHistory } from "../shared/services/historyServices";
import { ROLE_ADMIN, ROLE_SALESMAN, ROLE_USER } from "../shared/constants/rolesConstant";
import { PrivateRoute } from "../shared/components/utils-components/PrivateRoute";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import PasswordResetStartView from "../views/PasswordResetStartView";
import PasswordResetEndView from "../views/PasswordResetEndView";
import AccountView from "../views/AccountView";
import AdminHomeView from "../views/AdminHomeView";
import ProductView from "../views/ProductView";
import ProductDetailView from "../views/ProductDetailView";
import CartsView from "../views/CartsView";
import ProfileView from "../views/ProfileView";
import OrdersView from "../views/OrdersView";
import RegisterView from "../views/RegisterView";
import PaiementLivraisonView from "../views/PaiementLivraisonView";
import PaiementPayerView from "../views/PaiementPayerView";
import ProductFigurinesView from "../views/ProductFigurinesView";
import ProductPeinturesView from "../views/ProductPeinturesView";
import ProductLibrairieView from "../views/ProductLibrairieView";
import ContactView from "../views/ContactView";
import OrderDetailView from "../views/OrderDetailView";
import BackOffice from "../views/BackOffice"
import RetourView from "../views/RetourView";

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
            <Route exact path={URL_PASSWORD_RESET_START} component={PasswordResetStartView}/>
            <Route path={URL_PASSWORD_RESET_END} component={PasswordResetEndView}/>
            <PrivateRoute path={URL_ACCOUNT} component={AccountView} roles={[ROLE_USER]} />
            <PrivateRoute path={URL_PROFILE} component={ProfileView} roles={[ROLE_USER]} />
            <PrivateRoute
                path={URL_ADMIN_HOME}
                component={AdminHomeView}
                roles={[ROLE_ADMIN]}
            />
            <PrivateRoute path={URL_COMM_HOME} roles={[ROLE_SALESMAN]}  component={BackOffice}/>
            <PrivateRoute path={URL_ORDERS} component={OrdersView} roles={[ROLE_USER]} />
            <PrivateRoute path={URL_ORDER_DETAILS} component={OrderDetailView} roles={[ROLE_USER]} />
            <PrivateRoute path={URL_ORDER_RETURN} component={RetourView} roles={[ROLE_USER]} />




            
            <Route exact path={URL_PRODUCT} component={ProductView} />
            <Route exact path={URL_PRODUCT_FIGURINES} component={ProductFigurinesView} />
            <Route exact path={URL_PRODUCT_PEINTURES} component={ProductPeinturesView} />
            <Route exact path={URL_PRODUCT_LIBRAIRIE} component={ProductLibrairieView} />

            <Route path={URL_PRODUCTS_DETAILS} component={ProductDetailView} />
            <Route path={URL_CART} component={CartsView} />
            <Route path={URL_REGISTRATION} component={RegisterView} />
            <Route path={URL_CONTACT_US} roles={[ROLE_USER]}  component={ContactView} />
            <PrivateRoute path={URL_PAIEMENT}  roles={[ROLE_USER]}    component={PaiementLivraisonView}/>
            <PrivateRoute path={URL_PAIEMENT_2}roles={[ROLE_USER]}  component={PaiementPayerView}/>
            <Route path="*">
                <Route404 />
            </Route>
            

        </Switch>
    );
};

export default Routes;

const Route404 = ()=> {

  let location = useLocation();
  
    return (
      <div>
        <h2 className="font-bold text-center mt-20">
       
          <span className="mt-5 block text-4xl">Page non trouvé !</span>
        </h2>
      </div>
    );
  }