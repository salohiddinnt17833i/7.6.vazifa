import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Login from './components/Login'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Register from './components/Register'
import Home from './components/Home'
import { useEffect, useState } from 'react'


function App() {
  const navigate = useNavigate()
  const token = useSelector(state => state.token.value)
  const location = useLocation()
  useEffect(() => {
    if(!token && location.pathname != '/register') {
      navigate('/login')
    }
  },[navigate, token])

  function ProtectedRoute({children,  isAuthenticated, redirectTo = '/login'}) {
    if(!isAuthenticated) {
      navigate(redirectTo)
    }
    return children
  }

  const [theme, setTheme] = useState('light')
  {
    theme == 'light' ? document.body.style.background = '#fff' : document.body.style.background = '#272935'
}
  return (
    <>
\
      <Routes>
        <Route path='/register' element = {<Login  theme={theme} setTheme={setTheme}></Login>}></Route>
        <Route path='/login' element = {<Register theme={theme} setTheme={setTheme}></Register>}></Route>

        <Route path='/' element= {<ProtectedRoute isAuthenticated={token ? true : false}>
          <Home></Home>
        </ProtectedRoute>}></Route>
      </Routes>
    </>
  )
}

export default App
