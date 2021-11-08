import React from "react";
import { slide as Menu } from 'react-burger-menu';


const HamburgerMenu = () => {

    return (
        <Menu>
            <a className="menu-item" href="/shop">
                Boutique
            </a>
            <a className="menu-item" href="/promotions">
                Promotions
            </a>
            <a className="menu-item" href="/wishlist">
                Ma liste d'envies
            </a>
            <a className="menu-item" href="/notification">
                Notifications
            </a>
        </Menu>
    );

}

export default HamburgerMenu;