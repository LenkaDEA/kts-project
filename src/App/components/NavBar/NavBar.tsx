import React, { useState } from "react";
import styles from './NavBar.module.scss'

import Text from "components/Text";
import LikeIcon from "components/icons/LikeIcon";
import UserIcon from "components/icons/UserIcon";
import TitleLinks from "./config";
import logo from "assets/food-logo.svg";
import { useMediaQuery } from "utils/styles";
import MenuIcon from "components/icons/MenuIcon";

const NavBar: React.FC = () => {

    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    const handleClickMenu = () => {
        isMenuOpen ? setMenuOpen(false) : setMenuOpen(true);
    }

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

            <div className={styles.navbar__logo}>
                <img src={logo} />
                <Text view="p-20" color="primary" weight="bold">Food Client</Text>
            </div>
            {isDesktop && <div className={styles.navbar__conteiner}>
                {TitleLinks.map(item =>
                    <Text
                        key={item.link}
                        view="p-16"
                        color={item.link === '/' ? "accent" : "primary"} //TODO: add links
                        maxLines={1}>{item.title}
                    </Text>)}
            </div>}


            {isDesktop && <div className={styles['navbar__users-icons']}>
                <LikeIcon color="accent" />
                <UserIcon color="accent" />

            </div>}

            {!isDesktop && <MenuIcon color="accent" onMouseDown={(e) => {
                e.stopPropagation();
                handleClickMenu();
            }} />}

            {isMenuOpen && <div ref={wrapperRef} className={styles['navbar__menu']}>
                <div className={styles['navbar__users-icons']}>
                    <LikeIcon color="accent" />
                    <UserIcon color="accent" />

                </div >
                {TitleLinks.map(item =>
                    <Text
                        key={item.link}
                        view="p-16"
                        color={item.link === '/' ? "accent" : "primary"} //TODO: add links
                        maxLines={1}>{item.title}
                    </Text>)}
            </div>}

        </div>
    );
}

export default NavBar;