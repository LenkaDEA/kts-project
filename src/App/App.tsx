import styles from './App.module.scss';
import NavBar from 'App/components/NavBar';
import { Outlet } from 'react-router-dom';

import 'styles/styles.scss';
import bgrecipe from 'assets/bgrecipe.svg';
import { useQueryParamsStoreInit } from 'stores/global/hooks/useQueryParamsStoreInit';
import { useRecipesStore } from 'stores/global/hooks/useRecipesStore';
import { useSearchFilterText } from 'stores/global/hooks/useSearchFilterText';
import { useCategoriesChooseStore } from 'stores/global/hooks/useCategoriesChooseStore';
import { useConnector } from 'stores/global/hooks/useConnector';
import { useAuthStore } from 'stores/global/hooks/useAuthStore';
import { DEVICE_BREAKPOINTS } from 'config/deviceBreakpoints';


const App: React.FC = () => {
  useQueryParamsStoreInit();
  useRecipesStore();
  useSearchFilterText();
  useCategoriesChooseStore();
  useConnector();
  useAuthStore();

  const mediaQuery = window.matchMedia(DEVICE_BREAKPOINTS.DESKTOP);

  return (
    <div className={styles.app}>
      {mediaQuery.matches && <div className={styles[`app__background--container`]}>
        <img
          className={styles.app__background}
          src={bgrecipe}
        />
      </div>}
      <NavBar />
      <Outlet />
    </div>

  );
};

export default App;