import React from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './RecipeListContainer.module.scss';
import RecipeListActions from "./components/RecipeListActions";
import Card from "components/Card";
import TimerIcon from "components/icons/TimerIcon";
import Text from "components/Text";

import { observer, useLocalObservable } from 'mobx-react-lite';
import rootStore from "stores/global";
import { Meta } from "utils/meta";
import Loader from "components/Loader";

const RecipeListContainer: React.FC = () => {
    const navigate = useNavigate();

    const scrollState = useLocalObservable(() => ({
        get hasMore(): boolean {
            return ((rootStore.pagination.page <= rootStore.recipesList.list.meta.pagination.pageCount)
                && rootStore.recipesList.meta !== Meta.loading);
        },
        loadMore() {
            if (!rootStore.searchText.isActive && !rootStore.categories.isActive) {
                const nextPage = rootStore.pagination.page + 1;
                if (nextPage === 1 || nextPage <= rootStore.recipesList.list.meta.pagination.pageCount)
                    rootStore.pagination.setCurrentPage(nextPage);
                rootStore.recipesList.setMeta(Meta.loading);
            }
        }
    }));

    return (
        <div className={classNames(styles[`recipe-box`])}>
            <RecipeListActions />

            <InfiniteScroll
                pageStart={1}
                loadMore={scrollState.loadMore}
                hasMore={scrollState.hasMore}
                threshold={300}
                loader={
                    <Loader className={styles['recipe-box__loader']} key={Date.now()} />
                }
            >
                <div className={styles[`recipe-box__recipes-list`]}>
                    {rootStore.recipesList.listView.map(item =>
                        <Card
                            key={item.documentId}
                            image={item.images[0].url || 'src/assets/defaultfood.png'}
                            title={item.name}
                            subtitle={parse(item.summary)}
                            contentSlot={`${item.calories}kcal`}
                            onClick={() => navigate(`/recipe/${item.documentId}`)}
                            captionSlot={
                                <div className={styles[`recipe-box__recipes-list_total-time`]}>
                                    <TimerIcon color="accent" />
                                    <Text view="p-14" weight="bold">{item.totalTime} minutes</Text>
                                </div>}
                        />
                    )}
                </div>
            </InfiniteScroll>

        </div >);
}

export default observer(RecipeListContainer);