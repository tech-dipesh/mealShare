import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Container } from '@mui/material'
import Header from './components/common/header'
import Footer from './components/common/footer'
import {Home} from "./pages/home"
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <Container maxWidth="lg" className="py-8">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

export default App