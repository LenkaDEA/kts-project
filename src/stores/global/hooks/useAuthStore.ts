import { useEffect } from "react"
import rootStore from "stores/global";

export const useAuthStore = (): void => {
    useEffect(() => {
        rootStore.auth.initializeAuth();
    }, []);
}