import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import parse from 'html-react-parser';

import styles from './RecipeListContainer.module.scss';
import Button from "components/Button";
import RecipeListActions from "pages/RecipesList/components/RecipeListActions";
import Card from "components/Card";
import { ApiContext, Recipe } from "App/App";
import TimerIcon from "components/icons/TimerIcon";
import Text from "components/Text";
import NaviIcon from "components/icons/NaviIcon";
import Pagination from "components/Pagination";

const RecipeListContainer: React.FC = () => {
    const apiContext = useContext(ApiContext);
    const navigate = useNavigate();

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const fetch = async () => {
            try {
                const params = {
                    populate: ['images'],
                    pagination: {
                        page: currentPage,
                        pageSize: 9
                    }
                };

                const result = await axios({
                    method: 'get',
                    url: 'https://front-school-strapi.ktsdev.ru/api/recipes',
                    params: params,
                    paramsSerializer: (params) => {
                        return qs.stringify(params, {
                        })
                    }
                });

                const rawData = result.data.data;
                apiContext.setRecipes(rawData.map((raw: Recipe) => ({
                    documentId: raw.documentId,
                    name: raw.name,
                    calories: raw.calories,
                    summary: raw.summary,
                    images: raw.images,
                    totalTime: raw.totalTime
                })))

                setPageCount(result.data.meta.pagination.pageCount);

            } catch (error) {
                console.error('Ошибка при загрузке рецептов:', error);
            };
        }
        fetch();
    }, [currentPage]);

    return (
        <div className={classNames(styles[`recipe-box`])}>

            <RecipeListActions />

            <div className={styles[`recipe-box__recipes-list`]}>
                {apiContext.recipes.map(item =>
                    <Card
                        key={item.documentId}
                        image={item.images[0].url || 'src/assets/defaultfood.png'}
                        title={item.name}
                        subtitle={parse(item.summary)}
                        contentSlot={`${item.calories}kcal`}
                        actionSlot={<Button>Save</Button>}
                        onClick={() => navigate(`/recipe/${item.documentId}`)}
                        captionSlot={
                            <div className={styles[`recipe-box__recipes-list_total-time`]}>
                                <TimerIcon color="accent" />
                                <Text view="p-14" weight="bold">{item.totalTime} minutes</Text>
                            </div>}
                    />
                )}
            </div>

            <div className={styles[`recipe-box__pagination-container`]}>

                <button className={styles[`recipe-box__pagination-container_button-pag`]}
                    onClick={() => setCurrentPage(p => p - 1)}
                    disabled={currentPage === 1}
                >
                    <NaviIcon color={currentPage === 1 ? "secondary" : "dark"}
                    />
                </button>

                <div>
                    <Pagination
                        currentPage={currentPage}
                        pageCount={pageCount}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>

                <button className={styles[`recipe-box__pagination-container_button-pag`]}
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={currentPage >= pageCount}
                >
                    <NaviIcon
                        color={currentPage >= pageCount ? "secondary" : "dark"}
                        className={styles[`recipe-box__pagination-container_button-pag_icon-rotate`]} />
                </button>
            </div>

        </div >);
}

export default RecipeListContainer;