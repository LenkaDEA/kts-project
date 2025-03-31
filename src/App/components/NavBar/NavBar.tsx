import React from "react";
import styles from './NavBar.module.scss'

import Text from "components/Text";
import LikeIcon from "components/icons/LikeIcon";
import UserIcon from "components/icons/UserIcon";

const NavBar: React.FC = () => {
    return (<div className={styles.navbar}>

        <div className={styles.navbar__logo}>
            <img src='src/assets/food-logo.svg' />
            <Text view="p-20" color="primary" weight="bold">Food Client</Text>
        </div>

        <div className={styles.navbar__conteiner}>
            <Text view="p-16" color="accent" maxLines={1}>Recipes</Text>
            <Text view="p-16" color="primary" maxLines={1}>Meals Categories</Text>
            <Text view="p-16" color="primary" maxLines={1}>Menu Items</Text>
            <Text view="p-16" color="primary" maxLines={1}>Meal Planning</Text>
        </div>

        <div className={styles['navbar__users-icons']}>
            <LikeIcon color="accent" />
            <UserIcon color="accent" />

        </div>
    </div>);
}

export default NavBar;