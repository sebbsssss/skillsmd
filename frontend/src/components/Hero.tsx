interface HeroProps {
  onGetStarted: () => void
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="min-h-screen pt-32 lg:pt-24 relative noise-bg grid-bg">
      {/* Floating decorative elements */}
      <div className="absolute top-32 left-8 w-16 h-16 bg-brutal-yellow brutal-border-2 animate-float opacity-60 hidden lg:block"></div>
      <div className="absolute top-48 right-12 w-12 h-12 bg-brutal-pink brutal-border-2 animate-float-delayed opacity-60 rotate-12 hidden lg:block"></div>
      <div className="absolute bottom-32 left-16 w-20 h-20 bg-brutal-green brutal-border-2 animate-float opacity-40 rotate-45 hidden lg:block"></div>
      <div className="absolute top-64 right-1/4 w-8 h-8 bg-brutal-purple brutal-border-2 animate-spin-slow opacity-40 hidden lg:block"></div>

      {/* Badge Ticker */}
      <div className="ticker-wrap brutal-border-2 border-l-0 border-r-0 bg-brutal-purple py-2 mt-0 relative z-10">
        <div className="ticker text-brutal-white">
          <span className="inline-block mx-8 font-bold text-sm">⛓️ Powered by Solana</span>
          <span className="inline-block mx-8 font-bold text-sm">🤖 Built for AI Agents</span>
          <span className="inline-block mx-8 font-bold text-sm">📚 On-Chain Knowledge Library</span>
          <span className="inline-block mx-8 font-bold text-sm">⚡ x402 Micropayments</span>
          <span className="inline-block mx-8 font-bold text-sm">✅ Stake-Verified Content</span>
          <span className="inline-block mx-8 font-bold text-sm">🔒 Immutable & Trustless</span>
          <span className="inline-block mx-8 font-bold text-sm">⛓️ Powered by Solana</span>
          <span className="inline-block mx-8 font-bold text-sm">🤖 Built for AI Agents</span>
          <span className="inline-block mx-8 font-bold text-sm">📚 On-Chain Knowledge Library</span>
          <span className="inline-block mx-8 font-bold text-sm">⚡ x402 Micropayments</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8 relative z-10">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-brutal-white brutal-border-2 shadow-brutal px-4 py-2">
              <span className="w-2 h-2 bg-brutal-green rounded-full animate-pulse"></span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider">Devnet Live</span>
              <span className="font-mono text-xs text-gray-500">|</span>
              <span className="font-mono text-xs font-bold">Solana</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight">
              The<br/>
              <span className="gradient-text">Knowledge</span><br/>
              Library<span className="text-brutal-purple">.</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg lg:text-xl text-gray-700 max-w-lg leading-relaxed font-medium">
              The world's first on-chain skill registry for AI agents. Contribute knowledge, stake to verify, and get paid when agents query your skills.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onGetStarted}
                className="group px-8 py-4 bg-brutal-purple text-white font-black text-lg brutal-border-4 shadow-brutal-lg brutal-btn flex items-center justify-center gap-3"
              >
                Start Contributing
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </button>
              <a 
                href="https://github.com/sebbsssss/skillsmd"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-brutal-white font-bold text-lg brutal-border-4 shadow-brutal-lg brutal-btn flex items-center justify-center gap-3"
              >
                <div className="w-8 h-8 bg-brutal-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                View on GitHub
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 pt-4">
              <div className="brutal-border-4 bg-brutal-yellow px-4 py-2 shadow-brutal">
                <div className="text-2xl font-black">0</div>
                <div className="text-xs font-mono font-bold">Skills</div>
              </div>
              <div className="brutal-border-4 bg-brutal-green px-4 py-2 shadow-brutal">
                <div className="text-2xl font-black">0</div>
                <div className="text-xs font-mono font-bold">Verified</div>
              </div>
              <div className="brutal-border-4 bg-brutal-blue px-4 py-2 shadow-brutal">
                <div className="text-2xl font-black text-white">0</div>
                <div className="text-xs font-mono font-bold text-white">Queries</div>
              </div>
            </div>
          </div>

          {/* Right: Code Preview */}
          <div className="relative">
            {/* Main Code Window */}
            <div className="brutal-border-4 shadow-brutal-xl bg-white relative z-10 overflow-hidden">
              {/* Window Chrome */}
              <div className="bg-brutal-black px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brutal-pink"></div>
                  <div className="w-3 h-3 rounded-full bg-brutal-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-brutal-green"></div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-800 rounded-sm px-3 py-1 text-center">
                    <span className="text-gray-400 font-mono text-xs">weather-api.skill.md</span>
                  </div>
                </div>
              </div>
              
              {/* Code Content */}
              <div className="p-6 bg-gray-50 font-mono text-sm">
                <pre className="text-gray-700 overflow-x-auto">
<code>{`# Weather API Skill

## Description
Get current weather and forecasts
for any location worldwide.

## Usage
\`\`\`
Query: "weather in Tokyo"
Response: { temp: 22, condition: "sunny" }
\`\`\`

## Stake: 0.5 SOL
## Queries: 1,247
## Rating: ⭐⭐⭐⭐⭐ (98%)`}</code>
                </pre>
              </div>
            </div>

            {/* Floating verification card */}
            <div className="absolute -top-4 -right-4 lg:-right-8 z-20 animate-float">
              <div className="bg-brutal-green brutal-border-4 shadow-brutal-lg p-3 max-w-[200px]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <div>
                    <div className="text-xs font-black text-white">Verified on-chain</div>
                    <div className="text-[10px] font-mono text-green-100">5 validators staked</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating payment card */}
            <div className="absolute -bottom-6 -left-4 lg:-left-8 z-20 animate-float-delayed">
              <div className="bg-brutal-purple brutal-border-4 shadow-brutal-lg p-3 max-w-[220px]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💰</span>
                  <div>
                    <div className="text-xs font-black text-white">Query Payment</div>
                    <div className="text-[10px] font-mono text-purple-200">+0.001 SOL earned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-20 lg:mt-32">
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 font-bold">Built With</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="brutal-border-2 p-4 flex items-center justify-center bg-white hover:bg-brutal-purple hover:text-white transition-colors brutal-card cursor-pointer">
              <span className="font-black text-lg">Solana</span>
            </div>
            <div className="brutal-border-2 p-4 flex items-center justify-center bg-white hover:bg-brutal-purple hover:text-white transition-colors brutal-card cursor-pointer">
              <span className="font-black text-lg">Anchor</span>
            </div>
            <div className="brutal-border-2 p-4 flex items-center justify-center bg-white hover:bg-brutal-purple hover:text-white transition-colors brutal-card cursor-pointer">
              <span className="font-black text-lg">IPFS</span>
            </div>
            <div className="brutal-border-2 p-4 flex items-center justify-center bg-white hover:bg-brutal-purple hover:text-white transition-colors brutal-card cursor-pointer">
              <span className="font-black text-lg">x402</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
