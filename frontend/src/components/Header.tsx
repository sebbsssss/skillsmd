import { BookOpen, Search, PenTool, Github } from 'lucide-react'

interface HeaderProps {
  activeTab: 'home' | 'browse' | 'contribute'
  setActiveTab: (tab: 'home' | 'browse' | 'contribute') => void
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-dark-900/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 hover:opacity-80 transition"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              skills<span className="text-accent-purple">.md</span>
            </span>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavButton 
              active={activeTab === 'home'} 
              onClick={() => setActiveTab('home')}
              icon={<BookOpen className="w-4 h-4" />}
            >
              Home
            </NavButton>
            <NavButton 
              active={activeTab === 'browse'} 
              onClick={() => setActiveTab('browse')}
              icon={<Search className="w-4 h-4" />}
            >
              Browse
            </NavButton>
            <NavButton 
              active={activeTab === 'contribute'} 
              onClick={() => setActiveTab('contribute')}
              icon={<PenTool className="w-4 h-4" />}
            >
              Contribute
            </NavButton>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/sebbsssss/skillsmd" 
              target="_blank"
              className="p-2 rounded-lg hover:bg-white/5 transition"
            >
              <Github className="w-5 h-5" />
            </a>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-accent-purple to-accent-blue text-white font-medium hover:opacity-90 transition">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function NavButton({ 
  children, 
  active, 
  onClick,
  icon 
}: { 
  children: React.ReactNode
  active: boolean
  onClick: () => void
  icon: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
        active 
          ? 'bg-white/10 text-white' 
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      {children}
    </button>
  )
}
