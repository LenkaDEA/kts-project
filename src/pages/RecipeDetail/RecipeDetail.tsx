import styles from './RecipeDetail.module.scss';
import Text from 'components/Text';
import NaviIcon from 'components/icons/NaviIcon'
import RecipeDetailInfo from './components/RecipeDetailInfo';
import RecipeDetailNeedList from './components/RecipeDetailNeedList';

import { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import React, { createContext, useContext } from 'react';
import parse from 'html-react-parser';

import { useLocalStore } from "utils/useLocalStore";
import RecipeDetailStore from "store/RecipeDetailStore/RecipeDetailStore";
import { observer } from 'mobx-react-lite';

import { RecipeInfo } from 'store/RecipeDetailStore/RecipeDetailStore';


export const RecipeInfoContext = createContext<RecipeInfoContextType>({
    recipeCont: {
        name: '',
        summary: '',
        ingradients: [],
        equipments: [],
        directions: [],
        images: []
    }
});

export const useRecipeInfoContext = () => useContext(RecipeInfoContext);

const RecipeDetail: React.FC = () => {

    const { documentId } = useParams();

    const recipeDetailStore = useLocalStore(() => new RecipeDetailStore());

    useEffect(() => {
        recipeDetailStore.getRecipeDetail({ documentID: documentId as string });
    }, [recipeDetailStore, documentId]);

    return (
        <RecipeInfoContext.Provider value={{
            recipeCont: recipeDetailStore.list.data,
        }}>
            <div className={styles[`recipe`]}>

                <div className={styles[`recipe__title`]}>
                    <Link to='/'>
                        <NaviIcon color='accent' />
                    </Link>
                    <Text view='title' maxLines={1} >{recipeDetailStore.list.data.name}</Text>
                </div>

                <div className={styles[`recipe__brief-info`]}>
                    <img
                        className={styles[`recipe__brief-info_picture`]}
                        src={recipeDetailStore.list.data.images?.[0]?.url || 'src/assets/defaultrecipe.png'}
                    />
                    <RecipeDetailInfo />
                </div>

                <div className={styles[`recipe__about`]}>
                    <Text view='p-16'>{parse(recipeDetailStore.list.data.summary)}</Text>
                </div>

                <RecipeDetailNeedList />

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
        </RecipeInfoContext.Provider>)
};

export default observer(RecipeDetail);