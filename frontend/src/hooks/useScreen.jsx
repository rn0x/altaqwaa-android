import { useContext } from 'react';
import { ScreenContext } from '../contexts/ScreenContext';

const useScreen = () => useContext(ScreenContext);

export default useScreen;
