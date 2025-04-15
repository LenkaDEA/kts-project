import { useEffect } from 'react';
import rootStore from '../instance';

import { reaction } from 'mobx';

export const useRecipesStore = (): void => {
    useEffect(() => {
        reaction(() => ({
            search: rootStore.searchText.getSearchText(),
            categories: rootStore.categories.getCategoriesChoose(),
            page: rootStore.pagination.getCurrentPage()
        }),
            (params) => {
                rootStore.recipesList.getRecipesListDebounced({
                    perPage: 9,
                    page: Number(params.page) || 1,
                    search: params.search?.toString() || '',
                    categories: params.categories || []
                });
            },
            { fireImmediately: true, delay: 100 }
        );
    }, []);
};