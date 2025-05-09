import React, { useState } from "react";
import styles from './NavBar.module.scss'

import Text from "components/Text";
import UserIcon from "components/icons/UserIcon";
import TitleLinks from "./config";
import logo from "assets/food-logo.svg";
import { useMediaQuery } from "utils/styles";
import MenuIcon from "components/icons/MenuIcon";
import { Link, useLocation } from "react-router-dom";
import rootStore from "stores/global";
import { observer } from "mobx-react-lite";
import { DEVICE_BREAKPOINTS } from "config/deviceBreakpoints";

const NavBar: React.FC = () => {

    const isDesktop = useMediaQuery(DEVICE_BREAKPOINTS.DESKTOP);
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const location = useLocation();
    const urlSearch = rootStore.query.search;

    const handleClickMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleLogoClick = () => {
        rootStore.searchText.setSearchText('');
        rootStore.categories.setCategoriesChoose([]);
        window.location.replace(import.meta.env.BASE_URL);
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className={styles.navbar}>

            <div
                className={styles.navbar__logo}

                onClick={handleLogoClick}>

                <img src={logo} />
                <Text view="p-20" color="primary" weight="bold">Food Client</Text>

            </div>

            {isDesktop && <div className={styles.navbar__conteiner}>
                {TitleLinks.map(item =>
                    <Link
                        key={item.link}
                        className={styles.navbar__conteiner_text}
                        to={{ pathname: item.link, search: urlSearch }}

                    >
                        <Text
                            key={item.link}
                            view="p-16"
                            color={location.pathname === item.link ? "accent" : "primary"}
                            maxLines={1}>{item.title}
                        </Text>
                    </Link>
                )}
            </div>}


            <div className={styles.navbar__actions}>
                <Link className={styles.navbar__actions_link} to='/my'>
                    <UserIcon color="accent" />
                </Link>

                {!isDesktop && <MenuIcon color="accent" onMouseDown={(e) => {
                    e.stopPropagation();
                    handleClickMenu();
                }} />}
            </div>


            {isMenuOpen && <div ref={wrapperRef} className={styles['navbar__menu']}>
                {TitleLinks.map(item =>
                    <Link
                        key={item.link}
                        className={styles.navbar__conteiner_text}
                        to={{ pathname: item.link, search: urlSearch }}
                        onClick={() => { handleClickMenu() }}>
                        <Text
                            key={item.link}
                            view="p-16"
                            color={location.pathname === item.link ? "accent" : "primary"}
                            maxLines={1}>{item.title}
                        </Text>
                    </Link>)}
            </div>}

        </div>
    );
}

export default observer(NavBar);