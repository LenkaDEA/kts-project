import React from "react";
import classNames from "classnames";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';

import styles from './RecipeListContainer.module.scss';
import Button from "components/Button";
import RecipeListActions from "pages/RecipesList/components/RecipeListActions";
import Card from "components/Card";
import TimerIcon from "components/icons/TimerIcon";
import Text from "components/Text";
import Pagination from "components/Pagination";

import { observer } from 'mobx-react-lite';
import rootStore from "store/RootStore";

const RecipeListContainer: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        const categories = searchParams.get('categories');
        setCategoriesValue(categories ? categories.split(',') : []);

        const page = searchParams.get('page');
        if (page) setCurrentPage(Number(page));
    }, [location.search]);

    const handleSearchChange = (newValue: string) => {
        setCurrentPage(1);
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('search', newValue);
        if (!newValue) {
            newSearchParams.delete('search');
        }
        navigate({ search: newSearchParams.toString() });
    };

    const [categoriesValue, setCategoriesValue] = useState<string[]>([]);

    const handleCategoriesChange = (newCategories: string[]) => {
        setCurrentPage(1);

        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set('categories', newCategories.join(','));

        if (newCategories.length === 0) {
            newSearchParams.delete('categories');
        }

        navigate({ search: newSearchParams.toString() });
        setCategoriesValue(newCategories);
    };


    useEffect(() => {
        const newSearchParams = new URLSearchParams(location.search);

        newSearchParams.set('page', `${currentPage}`);

        if (!currentPage) {
            newSearchParams.delete('page');
        }
        navigate({ search: newSearchParams.toString() });

        rootStore.query.setSearch(`page=${currentPage}`);
    }, [currentPage]);

    console.log('searchQuery', rootStore.query.getParam('search'))
    console.log('RecipeList', rootStore.recipesList.list);
    return (
        <div className={classNames(styles[`recipe-box`])}>
            <RecipeListActions
                onChangeSearch={handleSearchChange}
                onChangeCategories={handleCategoriesChange}
                categoriesKeys={categoriesValue} />

            <div className={styles[`recipe-box__recipes-list`]}>
                {rootStore.recipesList.list.data.map(item =>
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

            <Pagination
                currentPage={currentPage}
                pageCount={rootStore.recipesList.list.meta.pagination.pageCount}
                onPageChange={(page) => setCurrentPage(page)}
            />

        </div >);
}

export default observer(RecipeListContainer);