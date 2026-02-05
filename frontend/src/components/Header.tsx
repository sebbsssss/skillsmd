import { WalletButton } from './WalletButton'

interface HeaderProps {
  activeTab: 'home' | 'browse' | 'contribute'
  setActiveTab: (tab: 'home' | 'browse' | 'contribute') => void
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brutal-white/95 backdrop-blur-sm brutal-border-2 border-t-0 border-l-0 border-r-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-brutal-purple brutal-border-2 shadow-brutal flex items-center justify-center group-hover:bg-brutal-yellow transition-colors group-hover:rotate-12 duration-300">
              <span className="text-brutal-white font-black text-lg lg:text-xl group-hover:text-brutal-black transition-colors">S</span>
            </div>
            <span className="font-black text-lg lg:text-xl tracking-tight">skills.md</span>
            <span className="hidden sm:inline-block text-[10px] font-mono font-bold bg-brutal-green text-brutal-white brutal-border-2 px-1.5 py-0.5 -mt-3 ml-1">DEVNET</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 font-semibold text-sm brutal-btn rounded-none transition-colors ${
                activeTab === 'home' ? 'bg-brutal-yellow' : 'hover:bg-brutal-yellow'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-2 font-semibold text-sm brutal-btn rounded-none transition-colors ${
                activeTab === 'browse' ? 'bg-brutal-yellow' : 'hover:bg-brutal-yellow'
              }`}
            >
              Browse Skills
            </button>
            <button 
              onClick={() => setActiveTab('contribute')}
              className={`px-4 py-2 font-semibold text-sm brutal-btn rounded-none transition-colors ${
                activeTab === 'contribute' ? 'bg-brutal-yellow' : 'hover:bg-brutal-yellow'
              }`}
            >
              Contribute
            </button>
            <a 
              href="https://github.com/sebbsssss/skillsmd" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 font-semibold text-sm hover:bg-brutal-yellow brutal-btn rounded-none transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Wallet Button */}
          <div className="flex items-center gap-2 lg:gap-3">
            <WalletButton />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden brutal-border-2 border-l-0 border-r-0 border-t-0 bg-brutal-white">
        <div className="px-4 py-2 flex gap-2 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('home')}
            className={`px-4 py-2 font-bold text-xs brutal-border-2 shadow-brutal brutal-btn whitespace-nowrap ${
              activeTab === 'home' ? 'bg-brutal-yellow' : 'bg-brutal-white'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 font-bold text-xs brutal-border-2 shadow-brutal brutal-btn whitespace-nowrap ${
              activeTab === 'browse' ? 'bg-brutal-yellow' : 'bg-brutal-white'
            }`}
          >
            Browse
          </button>
          <button 
            onClick={() => setActiveTab('contribute')}
            className={`px-4 py-2 font-bold text-xs brutal-border-2 shadow-brutal brutal-btn whitespace-nowrap ${
              activeTab === 'contribute' ? 'bg-brutal-yellow' : 'bg-brutal-white'
            }`}
          >
            Contribute
          </button>
        </div>
      </div>
    </nav>
  )
}
