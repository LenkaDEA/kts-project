export const BASE_URL = 'https://front-school-strapi.ktsdev.ru/api/';

export const RECIPE_ENDPOINT = 'recipes';
export const CATEGORIES_ENDPOINT = 'meal-categories';
export const AUTH_ENDPOINT = 'auth/local'
export const REGISTER_ENDPOINT = 'auth/local/register'
export const VALIDATE_ENDPOINT = 'users/me'

export type PRIVATE_FIELDS_LIST = '_list' | '_meta' | '_listView';
export type PRIVATE_FIELDS_CATEGORIES = '_list' | '_meta';
export type PRIVATE_FIELDS_RECIPE = '_recipe' | '_meta';
export type PRIVATE_FIELDS_AUTH = '_user' | '_meta' | '_initialization' | '_isAuthCheckComplete';