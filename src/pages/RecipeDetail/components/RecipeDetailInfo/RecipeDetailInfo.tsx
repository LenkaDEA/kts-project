import React from "react";

import Text from "components/Text";
import styles from "./RecipeDetailInfo.module.scss"
import { useRecipeInfoContext } from "pages/RecipeDetail/RecipeDetail";

type InfoItemType = {
    title: string;
    value: number | undefined;
    unit?: string;
};

const RecipeDetailInfo: React.FC = () => {
    const recipeInfoContext = useRecipeInfoContext();

    const InfoItem: InfoItemType[] = [
        { title: "Preparation", value: recipeInfoContext.recipeCont.preparationTime, unit: " minutes" },
        { title: "Cooking", value: recipeInfoContext.recipeCont.cookingTime, unit: " minutes" },
        { title: "Total", value: recipeInfoContext.recipeCont.totalTime, unit: " minutes" },
        { title: "Likes", value: recipeInfoContext.recipeCont.likes },
        { title: "Servings", value: recipeInfoContext.recipeCont.servings, unit: " servings" },
        { title: "Ratings", value: recipeInfoContext.recipeCont.rating },
    ];

    return (<div className={styles[`info-grid`]}>
        {InfoItem.map(item =>
            <div key={item.title} className={styles[`info-grid__info-box`]}>
                <Text view='p-16'>{item.title}</Text>
                <Text view='p-16' color='accent' weight='bold'>{`${item.value} ${item.unit ?? ''}`}</Text>
            </div>
        )}
    </div>)
};

export default RecipeDetailInfo;