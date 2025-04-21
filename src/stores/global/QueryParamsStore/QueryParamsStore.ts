import { action, computed, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

type PrivateFields = '_params' | '_search';

export default class QueryParamsStore {
    private _params: qs.ParsedQs = {};
    private _search: string = '';


    constructor() {
        makeObservable<QueryParamsStore, PrivateFields>(this, {
            _params: observable.ref,
            _search: observable,
            search: computed,
            setSearch: action,
        });
    }

    get search(): string {
        return this._search;
    }

    getParam(
        key: string
    ): undefined | string | qs.ParsedQs | (string | qs.ParsedQs)[] {
        return this._params[key];
    }

    setSearch(search: string) {
        search = search.startsWith('?') ? search.slice(1) : search;

        if (this._search !== search) {
            this._search = search;
            this._params = qs.parse(search);
        }
    }
}