import Text from "components/Text";

import styles from "./InfoGrid.module.scss"

import { useRecipeInfoContext } from "pages/Recipe/Recipe";

function InfoGrid() {
    const recipeInfoContext = useRecipeInfoContext();

    return (<div className={styles.grid_info}>
        <div className={styles.info_box}>
            <Text view='p-16'>Preparation</Text>
            <Text view='p-16' color='accent' weight='bold'>{`${recipeInfoContext.recipeCont.preparationTime} minutes`}</Text>
        </div>
        <div className={styles.info_box}>
            <Text view='p-16'>Cooking</Text>
            <Text view='p-16' color='accent' weight='bold'>{`${recipeInfoContext.recipeCont.cookingTime} minutes`}</Text>
        </div>
        <div className={styles.info_box}>
            <Text view='p-16'>Total</Text>
            <Text view='p-16' color='accent' weight='bold'>{`${recipeInfoContext.recipeCont.totalTime} minutes`}</Text>
        </div>
        <div className={styles.info_box}>
            <Text view='p-16'>Likes</Text>
            <Text view='p-16' color='accent' weight='bold'>{recipeInfoContext.recipeCont.likes}</Text>
        </div>
        <div className={styles.info_box}>
            <Text view='p-16'>Servings</Text>
            <Text view='p-16' color='accent' weight='bold'>{`${recipeInfoContext.recipeCont.servings} servings`}</Text>
        </div>
        <div className={styles.info_box}>
            <Text view='p-16'>Ratings</Text>
            <Text view='p-16' color='accent' weight='bold'>{recipeInfoContext.recipeCont.rating}</Text>
        </div>
    </div>)
};

export default InfoGrid;