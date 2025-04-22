import styles from './App.module.scss';
import NavBar from 'App/components/NavBar';
import { Outlet } from 'react-router-dom';
import React, { useState, createContext, Dispatch, SetStateAction } from 'react';

import 'styles/styles.scss'

export interface Recipe {
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
  recipes: Recipe[];
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
}

export const ApiContext = createContext<ApiContextType>({
  recipes: [],
  setRecipes: () => { }
});

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
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