import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/authcontext'
import Home from './pages/home'
import Auth from './pages/auth'
import Food from './pages/food'
import CreateFood from './food/createfood'
import MyPosts from './pages/myposts'
import Profile from './pages/profile'
import UserProfile from './pages/userprofile'
import NotFound from './pages/notfound'
import PrivateRoute from './components/privateroute'
import Header from './components/header'
import Footer from './components/footer'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<PrivateRoute />}>
            <Route path="/food" element={<Food />} />
            <Route path="/createfood" element={<CreateFood />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/userprofile/:id" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App
