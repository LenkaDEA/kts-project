import React from "react";

import Text from "components/Text";
import styles from "./RecipeDetailInfo.module.scss"

import RecipeDetailStore from "store/RecipeDetailStore";

type InfoItemType = {
    title: string;
    value: number | undefined;
    unit?: string;
};

export type RecipeDetailInfoParams = {
    recipeDetailStore: RecipeDetailStore;
};

const RecipeDetailInfo: React.FC<RecipeDetailInfoParams> = ({ recipeDetailStore }) => {

    const InfoItem: InfoItemType[] = [
        { title: "Preparation", value: recipeDetailStore.list.data.preparationTime, unit: " minutes" },
        { title: "Cooking", value: recipeDetailStore.list.data.cookingTime, unit: " minutes" },
        { title: "Total", value: recipeDetailStore.list.data.totalTime, unit: " minutes" },
        { title: "Likes", value: recipeDetailStore.list.data.likes },
        { title: "Servings", value: recipeDetailStore.list.data.servings, unit: " servings" },
        { title: "Ratings", value: recipeDetailStore.list.data.rating },
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