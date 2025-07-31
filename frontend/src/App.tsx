import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authcontext'
import { FoodProvider } from './context/foodprovider'
import Home from './pages/home'
import Auth from './pages/auth'
import Food from './pages/food'
import MyPosts from './pages/myposts'
import Profile from './pages/profile'
import UserProfile from './pages/userprofile'
import NotFound from './pages/notfound'
import Header from './components/header'
import Footer from './components/footer'

function App() {
  return (
    <Router>
      <AuthProvider>
        <FoodProvider>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/food' element={<Food />} />
            <Route path='/myposts' element={<MyPosts />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/userprofile/:id' element={<UserProfile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </FoodProvider>
      </AuthProvider>
    </Router>
  )
}

export default App