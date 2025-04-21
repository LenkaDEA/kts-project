import Loader from 'components/Loader';
import { observer } from 'mobx-react-lite';
import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import rootStore from 'stores/global';
import styles from './ProtectedRoute.module.scss';

export interface ProtectedRouteProps {
    children: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();

    if (!rootStore.auth.isAuthCheckComplete && localStorage.getItem('token')) {
        return <div className={styles.loader} ><Loader /></div>;
    }

    if (!rootStore.auth.initialization) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default observer(ProtectedRoute);