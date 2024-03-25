import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <ul>
          <li><Link to='/landing'>LandingPage</Link></li>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/verification'>Verification</Link></li>
        </ul>
        <Outlet />
    </>
  )
}

export default Layout