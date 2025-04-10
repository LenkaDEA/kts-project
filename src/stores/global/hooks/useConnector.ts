import { reaction } from "mobx";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import rootStore from "stores/global";

export const useConnector = (): void => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        reaction(() => ({
            page: rootStore.pagination.getCurrentPage(),
            search: rootStore.searchText.getSearchText(),
            categories: rootStore.categories.getCategoriesChoose().join(',')
        }), (params) => {

            const newSearchParams = new URLSearchParams(location.search);

            newSearchParams.set('page', `${params.page}`);
            if (!params.page) {
                newSearchParams.delete('page');
            }

            if (params.search) {
                if (newSearchParams.get('search') !== params.search) {
                    newSearchParams.set('page', '1');
                }
                newSearchParams.set('search', params.search);
            }
            else {
                newSearchParams.delete('search');
            }

            if (params.categories.length !== 0) {
                if (newSearchParams.get('categories') !== params.categories) {
                    newSearchParams.set('page', '1');
                }
                newSearchParams.set('categories', params.categories);
            } else {
                newSearchParams.delete('categories');
            }

            navigate({ search: newSearchParams.toString() });

        },
            { fireImmediately: true }
        );
    }, []);

};