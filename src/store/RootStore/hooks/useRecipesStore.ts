import rootStore from '../instance';

import { reaction } from 'mobx';
import { useEffect } from 'react';

export const useRecipesStore = (): void => {
    useEffect(() => {
        const disposeReaction = reaction(
            () => ({
                search: rootStore.query.getParam('search'),
                categories: rootStore.query.getParam('categories'),
                page: rootStore.query.getParam('page')
            }),
            (params) => {
                rootStore.recipesList.getRecipesList({
                    project: "recipes",
                    perPage: 9,
                    page: Number(params.page) || 1,
                    search: params.search?.toString() || '',
                    categories: params.categories?.toString().split(',') || []
                });
            },
            { fireImmediately: true }
        );
        return () => disposeReaction();
    }, [])
};