import styles from './App.module.scss';
import NavBar from 'App/components/NavBar';
import { Outlet } from 'react-router-dom';

import 'styles/styles.scss'
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';
import { useRecipesStore } from 'store/RootStore/hooks/useRecipesStore'

const App: React.FC = () => {
  useQueryParamsStoreInit();
  useRecipesStore();

  return (
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

  );
};

export default App;