import { useLocation } from 'react-router-dom';

import rootStore from '../instance';
import { useEffect } from 'react';

export const useQueryParamsStoreInit = (): void => {
    const { search } = useLocation();
    useEffect(() => {
        rootStore.query.setSearch(search);
    }, [search]);
};