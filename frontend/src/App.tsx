import { useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { AgentVision } from './components/AgentVision'
import { StakingEconomics } from './components/StakingEconomics'
import { HowItWorks } from './components/HowItWorks'
import { Browse } from './components/Browse'
import { Contribute } from './components/Contribute'
import { Footer } from './components/Footer'

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'browse' | 'contribute'>('home')

  return (
    <div className="min-h-screen bg-brutal-white overflow-x-hidden">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'home' && (
        <>
          <Hero onGetStarted={() => setActiveTab('contribute')} />
          <AgentVision />
          <StakingEconomics />
          <HowItWorks />
        </>
      )}
      
      {activeTab === 'browse' && <Browse />}
      {activeTab === 'contribute' && <Contribute />}
      
      <Footer />
    </div>
  )
}

export default App
