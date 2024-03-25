import './App.css';
import { BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Register from './pages/Authentication/Register'
import Login from './pages/Authentication/Login';
import Layout from './components/Layout';
import RequireAuth from './authentication/roles/RequireAuth';
import PersistLogin from './pages/Authentication/PersistLogin';
import Verification from './pages/Authentication/Verification';
import ResetPassword from './pages/Authentication/ResetPassword';
import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'>

          <Route path='/' element={<PersistLogin/>} >
            <Route path='/' element={<Layout/>}>

              {/* public routes */}
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/verification' element={<Verification/>}/>
              <Route path='/resetpassword' element={<ResetPassword/>}/>

              {/* private to admin  */}
              <Route element={<RequireAuth allowedRoles={['admin']}/>}>
                <Route path='/admin' element={<Admin/>} />
              </Route>

              {/* private to user  */}
              <Route element={<RequireAuth allowedRoles={['user']} />}>
                <Route path='/landing' element={<LandingPage/>}/>
              </Route>

            </Route>
          </Route>

          <Route path='*' element={<ErrorPage/>}/>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;