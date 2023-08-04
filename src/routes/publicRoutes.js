import { Route, Routes } from 'react-router-dom';

import Login from '../views/login';
import SignUp from '../views/signup';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default PublicRoutes;
