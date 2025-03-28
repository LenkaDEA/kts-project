import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import parse from 'html-react-parser';

import styles from './RecipeBox.module.scss';
import Input from "components/Input";
import Button from "components/Button";
import SearchIcon from "components/icons/SearchIcon";
import MultiDropdown, { Option } from "components/MultiDropdown";
import Card from "../Card";
import { ApiContext, Recipe } from "App/App";
import TimerIcon from "components/icons/TimerIcon";
import Text from "components/Text";
import NaviIcon from "components/icons/NaviIcon";
import Pagination from "components/Pagination";

export type RecipeBox = {
    recipes?: any[];
};

const RecipeBox: React.FC<RecipeBox> = () => {
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
        <div className={classNames(styles.container)}>
            <div className={styles.search_container}>
                <Input
                    className={styles.input}
                    value="Enter dishes"
                    onChange={() => console.log("onChange: Input recipe")}
                >
                </Input>
                <Button><SearchIcon /></Button>
            </div>

            <div className={styles.categories}>
                <MultiDropdown
                    options={[
                        { key: 'first', value: 'Завтраки' },
                        { key: 'second', value: 'Обеды' },
                        { key: 'thrird', value: 'Ужины' }
                    ]}
                    value={[{ key: 'first', value: 'Зактраки' }]}
                    onChange={(value: Option[]) => console.log('Выбрано:', value)}
                    getTitle={() => 'Categories'}
                />
            </div>

            <div className={styles.recipe_list}>
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
                            <div className={styles.total_time}>
                                <TimerIcon color="accent" />
                                <Text view="p-14" weight="bold">{item.totalTime} minutes</Text>
                            </div>}
                    />
                )}
            </div>

            <div className={styles.pagination_container}>

                <button className={styles.button_pag}
                    onClick={() => setCurrentPage(p => p - 1)}
                    disabled={currentPage === 1}
                >
                    <NaviIcon color={currentPage === 1 ? "secondary" : "dark"}
                    />
                </button>

                <div className={styles.page_numbers}>
                    <Pagination
                        currentPage={currentPage}
                        pageCount={pageCount}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>

                <button className={styles.button_pag}
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={currentPage >= pageCount}
                >
                    <NaviIcon
                        color={currentPage >= pageCount ? "secondary" : "dark"}
                        className={styles.icon_rotate} />
                </button>
            </div>

        </div>);
}

export default RecipeBox;