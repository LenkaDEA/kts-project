import styles from './App.module.scss';
import NavBar from 'App/components/NavBar';
import { Outlet } from 'react-router-dom';
import React, { useState, createContext, Dispatch, SetStateAction } from 'react';

import 'styles/styles.scss'
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';

export interface RecipeItem {
  documentId: number,
  name: string,
  calories: number,
  summary: string,
  images: Images[],
  totalTime: number
}

export interface Images {
  url: string
}

export interface ApiContextType {
  recipes: RecipeItem[];
  setRecipes: Dispatch<SetStateAction<RecipeItem[]>>;
}

export const ApiContext = createContext<ApiContextType>({
  recipes: [],
  setRecipes: () => { }
});

const App: React.FC = () => {
  useQueryParamsStoreInit();

  const [recipes, setRecipes] = useState<RecipeItem[]>([]);

  return (
    <ApiContext.Provider value={{ recipes, setRecipes }}>
      <div className={styles.app}>
        <div className={styles[`app__background--container`]}>
          <img
            className={styles.app__background}
            src='src/assets/bgrecipe.svg'
          />
        </div>
        <NavBar />
        <Outlet />
      </div>
    </ApiContext.Provider>

  );
};

export default App;