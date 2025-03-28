import styles from './App.module.scss';
import NavBar from 'App/components/NavBar';
import { Outlet } from 'react-router-dom';
import { useState, createContext, Dispatch, SetStateAction } from 'react';

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

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  return (
    <ApiContext.Provider value={{ recipes, setRecipes }}>
      <div className={styles.main_app}>
        <div className={styles.bgpicture_div}>
          <img
            className={styles.bgpicture}
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