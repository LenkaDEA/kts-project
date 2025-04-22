import { action, computed, makeObservable, observable } from "mobx";

type PrivateFields = '_searchText' | '_isActive';

export default class SearchFilterStore {
    private _searchText: string = '';

    private _isActive: boolean = false;

    constructor() {
        makeObservable<SearchFilterStore, PrivateFields>(this, {
            _searchText: observable.ref,
            _isActive: observable,
            searchText: computed,
            isActive: computed,
            setSearchText: action
        });

        const urlParam = new URLSearchParams(window.location.search);
        this._searchText = urlParam.get('search') || '';
    };

    setSearchText(text: string) {
        this._searchText = text;
    };

    get searchText(): string {
        return this._searchText;
    }

    setActive(state: boolean) {
        this._isActive = state;
    }

    get isActive(): boolean {
        return this._isActive;
    }
};