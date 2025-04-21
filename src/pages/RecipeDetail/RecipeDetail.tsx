import styles from './RecipeDetail.module.scss';
import Text from 'components/Text';
import NaviIcon from 'components/icons/NaviIcon'
import RecipeDetailInfo from './components/RecipeDetailInfo';
import RecipeDetailNeedList from './components/RecipeDetailNeedList';

import { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import React from 'react';
import parse from 'html-react-parser';

import { useLocalStore } from "stores/local/LocalStore";
import RecipeDetailStore from "stores/local/RecipeDetailStore";
import { observer } from 'mobx-react-lite';
import RecipeActions from './components/RecipeActions';
import { Meta } from 'utils/meta';
import Loader from 'components/Loader';

const RecipeDetail: React.FC = () => {

    const { documentId } = useParams();

    const recipeDetailStore = useLocalStore(() => new RecipeDetailStore());

    useEffect(() => {
        recipeDetailStore.getRecipeDetail({ documentID: documentId as string });
    }, [recipeDetailStore, documentId]);

    const recipeList = (<div>
        <div className={styles[`recipe__title`]}>
            <div className={styles[`recipe__title_icon`]}>
                <Link
                    to='#'
                    onClick={(e) => {
                        e.preventDefault();
                        window.history.back();
                    }}>
                    <NaviIcon color='accent' />
                </Link>
            </div>

            <Text view='title' maxLines={1} >{recipeDetailStore.list.data.name}</Text>
        </div>

        <div className={styles[`recipe__brief-info`]}>
            <img
                className={styles[`recipe__brief-info_picture`]}
                src={recipeDetailStore.list.data.images?.[0]?.url || 'src/assets/defaultrecipe.png'}
            />
            <div className={styles['recipe__brief-info-conteiner']}>
                <RecipeDetailInfo recipeDetailStore={recipeDetailStore} />
                <RecipeActions />
            </div>

        </div>

        <div className={styles[`recipe__about`]}>
            <Text view='p-16'>{parse(recipeDetailStore.list.data.summary)}</Text>
        </div>

        <RecipeDetailNeedList recipeDetailStore={recipeDetailStore} />

        <div className={styles[`recipe__directions`]}>
            <Text className={styles[`recipe__directions_title`]} view='p-20' weight='bold'>Directions</Text>
            {recipeDetailStore.list.data.directions.map((item, index) =>
                <div key={item.id} className={styles[`recipe__directions_step`]}>
                    <Text view='p-16' weight='bold'>Step {index + 1}</Text>
                    <Text view='p-14'>{item.description}</Text>
                </div>

            )}
        </div>
    </div>
    );

    return (
        <div className={styles[`recipe`]}>
            {recipeDetailStore.meta === Meta.success ? recipeList : <Loader />}
        </div>)
};

export default observer(RecipeDetail);