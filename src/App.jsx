import {Routes , Route} from 'react-router-dom';

import Home from './routes/Home'
import Login from './routes/Login';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';

const App = () => {
  return (
    <>
      <Navbar/>
      <h1>App</h1>
      
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home/>
          </RequireAuth>
        } />

        <Route path='/Login' element={ <Login/> } />
      </Routes>
    </>
  );
};

export default App;
