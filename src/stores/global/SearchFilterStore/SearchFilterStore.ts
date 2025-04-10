import { action, makeObservable, observable } from "mobx";
type PrivateFields = '_searchText';

export default class SearchFilterStore {
    private _searchText: string = '';

    constructor() {
        makeObservable<SearchFilterStore, PrivateFields>(this, {
            _searchText: observable.ref,
            setSearchText: action
        });

        const urlParam = new URLSearchParams(window.location.search);
        this._searchText = urlParam.get('search') || '';
    };

    setSearchText(text: string) {
        this._searchText = text;
    };

    getSearchText(): string {
        return this._searchText;
    }
};