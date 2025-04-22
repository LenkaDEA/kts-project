import styles from './RecipeDetail.module.scss';
import Text from 'components/Text';
import NaviIcon from 'components/icons/NaviIcon'
import RecipeDetailInfo from './components/RecipeDetailInfo';
import RecipeDetailNeedList from './components/RecipeDetailNeedList';

import { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useParams, Link } from "react-router-dom";
import React, { createContext, Dispatch, SetStateAction, useContext } from 'react';
import parse from 'html-react-parser';
import { Images } from 'App/App';

export interface Ingradients {
    id: number,
    name: string,
    amount: number,
    unit: string
}

export interface Equipments {
    id: number,
    name: string
}

interface Directions {
    id: number,
    description: string
}

export interface RecipeInfo {
    name: string,
    preparationTime?: number,
    cookingTime?: number,
    totalTime?: number,
    likes?: number,
    servings?: number,
    rating?: number,
    summary: string,
    ingradients: Ingradients[],
    equipments: Equipments[],
    directions: Directions[]
}

export interface RecipeInfoContextType {
    recipeCont: RecipeInfo;
    setRecipeInfo: Dispatch<SetStateAction<RecipeInfo>>;
}

export const RecipeInfoContext = createContext<RecipeInfoContextType>({
    recipeCont: {
        name: '',
        summary: '',
        ingradients: [],
        equipments: [],
        directions: []
    },
    setRecipeInfo: () => { }
});

export const useRecipeInfoContext = () => useContext(RecipeInfoContext);

const POPULATE_ITEMS = ['ingradients', 'equipments', 'directions.image', 'images', 'category'];

const RecipeDetail: React.FC = () => {

    const { documentId } = useParams();

    const [recipe, setRecipe] = useState<RecipeInfo>(
        {
            name: '',
            summary: '',
            ingradients: [],
            equipments: [],
            directions: []
        });

    const [imgRecipe, setImgRecipe] = useState<Images>();

    useEffect(() => {
        const fetch = async () => {
            try {
                const params = {
                    populate: POPULATE_ITEMS
                }

                const result = await axios({
                    method: 'get',
                    url: `https://front-school-strapi.ktsdev.ru/api/recipes/${documentId}`,
                    params: params,
                    paramsSerializer: (params) => {
                        return qs.stringify(params, {

                        })
                    }
                });

                const rawData = result.data.data;
                setRecipe({
                    name: rawData.name,
                    preparationTime: rawData.preparationTime,
                    cookingTime: rawData.cookingTime,
                    totalTime: rawData.totalTime,
                    likes: rawData.likes,
                    servings: rawData.servings,
                    rating: rawData.rating,
                    summary: rawData.summary,
                    ingradients: rawData.ingradients,
                    equipments: rawData.equipments,
                    directions: rawData.directions,
                });
                setImgRecipe({ url: rawData.images[0].url })

            } catch (error) {
                console.error('Ошибка при загрузке рецепта:', error);
            };
        }
        fetch();
    }, [documentId]);

    return (
        <RecipeInfoContext.Provider value={{
            recipeCont: recipe,
            setRecipeInfo: setRecipe
        }}>
            <div className={styles[`recipe`]}>

                <div className={styles[`recipe__title`]}>
                    <Link to='/'>
                        <NaviIcon color='accent' />
                    </Link>
                    <Text view='title' maxLines={1} >{recipe?.name}</Text>
                </div>

                <div className={styles[`recipe__brief-info`]}>
                    <img className={styles[`recipe__brief-info_picture`]} src={imgRecipe?.url} />
                    <RecipeDetailInfo />
                </div>

                <div className={styles[`recipe__about`]}>
                    <Text view='p-16'>{parse(recipe.summary)}</Text>
                </div>

                <RecipeDetailNeedList />

                <div className={styles[`recipe__directions`]}>
                    <Text className={styles[`recipe__directions_title`]} view='p-20' weight='bold'>Directions</Text>
                    {recipe.directions.map((item, index) =>
                        <div key={item.id} className={styles[`recipe__directions_step`]}>
                            <Text view='p-16' weight='bold'>Step {index + 1}</Text>
                            <Text view='p-14'>{item.description}</Text>
                        </div>

                    )}
                </div>
            </div>
        </RecipeInfoContext.Provider>);
}

export default RecipeDetail