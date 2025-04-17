import { reaction } from "mobx";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import rootStore from "stores/global";

export const useConnector = (): void => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        reaction(() => ({
            page: rootStore.pagination.page,
            search: rootStore.searchText.searchText,
            categories: rootStore.categories.categories.join(',')
        }), (params) => {

            const newSearchParams = new URLSearchParams(location.search);

            if (params.search) {
                newSearchParams.set('search', params.search);
            }
            else {
                newSearchParams.delete('search');
            }

            if (params.categories.length !== 0) {
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