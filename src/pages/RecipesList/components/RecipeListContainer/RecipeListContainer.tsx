import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';

import styles from './RecipeListContainer.module.scss';
import Button from "components/Button";
import RecipeListActions from "./components/RecipeListActions";
import Card from "components/Card";
import TimerIcon from "components/icons/TimerIcon";
import Text from "components/Text";
import Pagination from "components/Pagination";

import { observer } from 'mobx-react-lite';
import rootStore from "stores/global";
import { Meta } from "utils/meta";
import Loader from "components/Loader";

const RecipeListContainer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className={classNames(styles[`recipe-box`])}>
            <RecipeListActions />

            {rootStore.recipesList.meta === Meta.loading ? <Loader /> : <div className={styles[`recipe-box__recipes-list`]}>
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
            </div>}

            {(rootStore.recipesList.meta === Meta.success || rootStore.recipesList.meta === Meta.initial)
                && <Pagination
                    currentPage={rootStore.pagination.getCurrentPage()}
                    pageCount={rootStore.recipesList.list.meta.pagination.pageCount}
                    onPageChange={(page) => {
                        rootStore.pagination.setCurrentPage(page);
                        rootStore.recipesList.setMeta(Meta.loading);
                    }}
                />}

        </div >);
}

export default observer(RecipeListContainer);