import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/authcontext'
import Home from './pages/home'
import Auth from './pages/auth'
import Food from './pages/food'
import CreateFood from './components/food/createfood'
import MyPosts from './pages/myposts'
import Profile from './pages/profile'
import NotFound from './pages/notfound'
import PrivateRoute from './components/common/privateroute'
import Header from './components/common/header'
import Footer from './components/common/footer'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Toaster 
              position="top-center" 
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route element={<PrivateRoute />}>
                <Route path="/food" element={<Food />} />
                <Route path="/create-food" element={<CreateFood />} />
                <Route path="/my-posts" element={<MyPosts />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App;