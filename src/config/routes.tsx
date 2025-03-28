import { RouteObject } from "react-router-dom";
import App from "../App";
import Recipe from "../pages/Recipe";
import RecipesList from "../pages/RecipesList/RecipesList";


export const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true, //означает, что данный маршрут рендерится по умолчанию, когда URL совпадает с родительским маршрутом
                element: <RecipesList />
            },
            {
                path: '/recipe',
                element: <Recipe />
            },
            {
                path: '/recipe/:documentId',
                element: <Recipe />
            }
        ]
    }
];