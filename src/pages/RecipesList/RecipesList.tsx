import Text from "components/Text";
import RecipeListContainer from "./components/RecipeListContainer";
import styles from './RecipesList.module.scss';
import React from "react";

const RecipesList: React.FC = () => {
    return <div>
        <img className={styles[`recipes-list__baner`]} src='src/assets/baner.png' />
        <Text className={styles[`recipes-list__description`]} tag='p' view='p-20' color='primary'>
            Find the perfect food and <u>drink ideas</u> for every occasion, from <u>weeknight dinners</u> to <u>holiday feasts</u>.
        </Text>
        <RecipeListContainer />
    </div>
}

export default RecipesList;