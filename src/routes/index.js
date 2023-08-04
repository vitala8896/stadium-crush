import PrivateRoutes from './privateRoutes';
import PublicRoutes from './publicRoutes';
import { tokenVerify } from '../utils/tokenVerify';

const isLogin = tokenVerify(); 

const AppRoutes = () => {
  return isLogin ? <PrivateRoutes /> : <PublicRoutes />;
};

export default AppRoutes;