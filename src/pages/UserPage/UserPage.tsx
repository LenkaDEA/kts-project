import React from "react";

import styles from "./UserPage.module.scss";
import Text from "components/Text";
import rootStore from "stores/global";
import { observer } from "mobx-react-lite";
import Button from "components/Button";

const UserPage: React.FC = () => {

    return <div className={styles.user}>
        <img className={styles.user__img} src='src/assets/user.jpeg' />
        <div className={styles.user__info}>
            <Text view="p-20" weight="bold" >{rootStore.auth.user.user.username}</Text>
            <Text view="p-16" color="secondary" >{rootStore.auth.user.user.email}</Text>
        </div>
        <Button className={styles['user-button']}
            onClick={() => {
                rootStore.auth.reset()
            }} >Exit</Button>
    </div>
}

export default observer(UserPage);