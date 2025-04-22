import Text from 'components/Text';
import DinnerIcon from 'components/icons/DinnerIcon';
import LadleIcon from 'components/icons/LadleIcon';

import styles from './RecipeDetailNeedList.module.scss';
import { useRecipeInfoContext } from 'pages/RecipeDetail/RecipeDetail';

import React from 'react';

const RecipeDetailNeedList: React.FC = () => {
    const recipeInfoContext = useRecipeInfoContext();

    return (<div className={styles[`need-list`]}>

        <div className={styles[`need-list__block`]}>
            <Text view='p-20' weight='bold'>Ingredients</Text>
            <div className={styles[`need-list__block_list`]}>
                {recipeInfoContext.recipeCont.ingradients.map(item =>
                    <div className={styles[`need-list__block_list_line`]} key={item.id}>
                        <DinnerIcon color='accent' />
                        <Text view='p-16'>{`${item.amount} ${item.unit} ${item.name}`}</Text>
                    </div>
                )}
            </div>

        </div>

        <div className={styles[`need-list__separator`]}>
            <div className={styles[`need-list__separator_point`]} />
            <div className={styles[`need-list__separator_create-line`]}></div>
        </div>

        <div className={styles[`need-list__block`]}>
            <Text view='p-20' weight='bold'>Equipment</Text>
            <div className={styles[`need-list__block_list`]}>
                {recipeInfoContext.recipeCont.equipments.map(item =>
                    <div key={item.id} className={styles[`need-list__block_list_line`]}>
                        <LadleIcon color='accent' />
                        <Text>{item.name}</Text>
                    </div>
                )}
            </div>
        </div>

    </div>);
}

export default RecipeDetailNeedList;