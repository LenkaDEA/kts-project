import { RouteObject } from "react-router-dom";
import App from "../App";
import RecipeDetail from "../pages/RecipeDetail";
import RecipesList from "../pages/RecipesList/RecipesList";
import LoginForm from "pages/LoginForm";
import UserPage from "pages/UserPage";
import ProtectedRoute from "components/ProtectedRoute";
import MealsCategories from "pages/MealsCategories";
import RegForm from "pages/RegForm";


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
            },
            {
                path: '/meals-categories',
                element: <MealsCategories />
            },
            {
                path: '/login',
                element: <LoginForm />
            },
            {
                path: '/registration',
                element: <RegForm />
            },
            {
                path: '/my',
                element: (
                    <ProtectedRoute>
                        <UserPage />
                    </ProtectedRoute>
                )
            }
        ]
    }
];