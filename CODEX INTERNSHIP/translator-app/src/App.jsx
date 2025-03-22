import { useState } from 'react'
import TranslatorForm from './components/TranslatorForm'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <div className="app-container">
      <ThemeToggle />
      <div className="content-container">
        <TranslatorForm />
      </div>
      <Footer />
    </div>
  )
}

export default App
