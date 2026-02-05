export function Footer() {
  return (
    <footer className="bg-brutal-black brutal-border-4 border-b-0 border-l-0 border-r-0 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-brutal-purple brutal-border-2 shadow-brutal flex items-center justify-center">
                <span className="text-brutal-white font-black text-xl">S</span>
              </div>
              <span className="font-black text-xl tracking-tight">skills.md</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              The world's first on-chain knowledge library for AI agents. Contribute, verify, and earn.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://twitter.com/sebbsssss" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 brutal-border-2 bg-gray-800 shadow-brutal brutal-btn flex items-center justify-center hover:bg-brutal-purple transition-colors"
              >
                <span className="font-black text-sm">𝕏</span>
              </a>
              <a 
                href="https://github.com/sebbsssss/skillsmd" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 brutal-border-2 bg-gray-800 shadow-brutal brutal-btn flex items-center justify-center hover:bg-brutal-purple transition-colors"
              >
                <span className="font-black text-sm">GH</span>
              </a>
              <a 
                href="https://t.me/sebbssss" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 brutal-border-2 bg-gray-800 shadow-brutal brutal-btn flex items-center justify-center hover:bg-brutal-purple transition-colors"
              >
                <span className="font-black text-sm">TG</span>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider mb-4 text-brutal-yellow">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-brutal-white transition-colors font-medium">Browse Skills</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-brutal-white transition-colors font-medium">Contribute</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-brutal-white transition-colors font-medium">API Docs</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-brutal-white transition-colors font-medium">Pricing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-black text-sm uppercase tracking-wider mb-4 text-brutal-yellow">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://github.com/sebbsssss/skillsmd" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-brutal-white transition-colors font-medium"
                >
                  GitHub
                </a>
              </li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-brutal-white transition-colors font-medium">Documentation</a></li>
              <li>
                <a 
                  href="https://solana.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-brutal-white transition-colors font-medium"
                >
                  Solana
                </a>
              </li>
              <li>
                <a 
                  href="https://colosseum.com/agent-hackathon/projects/skills-md" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-brutal-white transition-colors font-medium"
                >
                  Hackathon
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 font-medium">
            © 2026 skills.md — Built for the Colosseum Agent Hackathon
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 font-mono">Powered by</span>
            <div className="flex items-center gap-2">
              <span className="text-brutal-purple text-lg">◎</span>
              <span className="text-sm text-gray-400 font-bold">Solana</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
