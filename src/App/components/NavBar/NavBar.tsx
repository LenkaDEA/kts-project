import React from "react";
import styles from './NavBar.module.scss'

import Text from "components/Text";
import LikeIcon from "components/icons/LikeIcon";
import UserIcon from "components/icons/UserIcon";
import TitleLinks from "./config";
import logo from "assets/food-logo.svg";

const NavBar: React.FC = () => {
    return (<div className={styles.navbar}>

        <div className={styles.navbar__logo}>
            <img src={logo} />
            <Text view="p-20" color="primary" weight="bold">Food Client</Text>
        </div>

        <div className={styles.navbar__conteiner}>
            {TitleLinks.map(item =>
                <Text
                    key={item.link}
                    view="p-16"
                    color={item.link === '/' ? "accent" : "primary"} //TODO: add links
                    maxLines={1}>{item.title}
                </Text>)}
        </div>

        <div className={styles['navbar__users-icons']}>
            <LikeIcon color="accent" />
            <UserIcon color="accent" />

        </div>
    </div>);
}

export default NavBar;