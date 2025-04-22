import { useEffect } from 'react';
import rootStore from '../instance';

import { reaction } from 'mobx';

export const useRecipesStore = (): void => {
    useEffect(() => {
        reaction(() => ({
            search: rootStore.searchText.searchText,
        }),
            () => {
                rootStore.pagination.setCurrentPage(1);
                rootStore.recipesList.setListView([]);
                rootStore.searchText.setActive(true);

            },
            { fireImmediately: true, delay: 100 }
        );
    }, [])


    useEffect(() => {
        const disposer = reaction(
            () => rootStore.categories.categories.slice(),
            (newCategories, prevCategories) => {
                if (rootStore.categories.areArraysEqual(newCategories, prevCategories as string[])) return;

                rootStore.pagination.setCurrentPage(1);
                rootStore.recipesList.setListView([]);
                rootStore.categories.setActive(true);
            },
            {
                fireImmediately: true, delay: 100
            }
        );

        return () => disposer();
    }, []);

    useEffect(() => {
        reaction(() => ({
            search: rootStore.searchText.searchText,
            categories: rootStore.categories.categories,
            page: rootStore.pagination.page
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