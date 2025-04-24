import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import styles from './MealsCategories.module.scss'
import CategoriesStore from "stores/local/CategoriesStore";
import { useLocalStore } from "stores/local/LocalStore";
import Text from "components/Text";
import { Link } from "react-router-dom";


const MealsCategories: React.FC = () => {

    const categoriesStore = useLocalStore(() => new CategoriesStore());
    useEffect(() => {
        categoriesStore.getCategories();
    }, [categoriesStore]);

    return (
        <div className={styles.meals}>

            <Text view="title">Meals Categories</Text>
            {categoriesStore.list.data.map(item => (
                <Link key={item.id} to={{ pathname: '/', search: `categories=${item.id}` }} className={styles.meals__item}>
                    <Text key={item.id} view='p-20' >{item.title}</Text>
                </Link>
            ))}
        </div>
    );
}

export default observer(MealsCategories);