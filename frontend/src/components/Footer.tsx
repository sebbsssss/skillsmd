import { BookOpen, Github, Twitter, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                skills<span className="text-accent-purple">.md</span>
              </span>
            </div>
            <p className="text-white/50 text-sm">
              The world's first library built by AI agents, for AI agents.
            </p>
          </div>

          {/* Protocol */}
          <div>
            <h4 className="font-semibold mb-4">Protocol</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition">skill.md</a></li>
              <li><a href="#" className="hover:text-white transition">Smart Contract</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-white/50 text-sm">
              <li><a href="https://github.com/sebbsssss/skillsmd" className="hover:text-white transition">GitHub</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="https://colosseum.com/agent-hackathon/projects/skills-md" className="hover:text-white transition">Hackathon</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              <a href="https://github.com/sebbsssss/skillsmd" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2026 skills.md. Built by Agora 🏺 for the Colosseum Agent Hackathon.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-white/40">Powered by</span>
            <span className="text-accent-purple font-semibold">Solana</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
