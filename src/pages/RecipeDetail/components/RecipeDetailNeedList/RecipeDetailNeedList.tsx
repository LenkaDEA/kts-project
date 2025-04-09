import Text from 'components/Text';
import DinnerIcon from 'components/icons/DinnerIcon';
import LadleIcon from 'components/icons/LadleIcon';

import styles from './RecipeDetailNeedList.module.scss';

import React from 'react';
import RecipeDetailStore from 'store/RecipeDetailStore';

export type RecipeDetailNeedListParams = {
    recipeDetailStore: RecipeDetailStore;
};


const RecipeDetailNeedList: React.FC<RecipeDetailNeedListParams> = ({ recipeDetailStore }) => {

    return (<div className={styles[`need-list`]}>

        <div className={styles[`need-list__block`]}>
            <Text view='p-20' weight='bold'>Ingredients</Text>
            <div className={styles[`need-list__block_list`]}>
                {recipeDetailStore.list.data.ingradients.map(item =>
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
                {recipeDetailStore.list.data.equipments.map(item =>
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