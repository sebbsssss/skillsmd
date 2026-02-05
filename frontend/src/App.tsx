import { useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Browse } from './components/Browse'
import { Contribute } from './components/Contribute'
import { Footer } from './components/Footer'

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'browse' | 'contribute'>('home')

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Background glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'home' && (
          <>
            <Hero onGetStarted={() => setActiveTab('contribute')} />
            <HowItWorks />
          </>
        )}
        
        {activeTab === 'browse' && <Browse />}
        {activeTab === 'contribute' && <Contribute />}
        
        <Footer />
      </div>
    </div>
  )
}

export default App
