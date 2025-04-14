import { RouteObject } from "react-router-dom";
import App from "../App";
import RecipeDetail from "../pages/RecipeDetail";
import RecipesList from "../pages/RecipesList/RecipesList";


export const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <RecipesList />
            },
            {
                path: '/recipe',
                element: <RecipeDetail />
            },
            {
                path: '/recipe/:documentId',
                element: <RecipeDetail />
            }
        ]
    }
];