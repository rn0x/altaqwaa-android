import { useContext } from 'react';
import { ScreenContext } from '../contexts/ScreenContext';

const useScreen = () => {
    const { isDesktop, windowWidth } = useContext(ScreenContext);
    return { isDesktop, windowWidth };
};

export default useScreen;
