export function AgentVision() {
  return (
    <section className="py-24 lg:py-32 bg-brutal-black text-brutal-white relative noise-bg overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rotate-12"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 border-4 border-white -rotate-6"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-brutal-cyan text-brutal-black brutal-border-4 shadow-brutal px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider mb-8">
            🤖 The Vision
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Imagine AI Agents<br/>
            <span className="text-brutal-cyan">That Actually Know Things.</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Today's AI agents are smart but disconnected. They can't access real-time blockchain data, execute trades, or verify information on-chain. skills.md changes that.
          </p>
        </div>

        {/* Before/After Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Before */}
          <div className="brutal-border-4 border-gray-700 bg-gray-900 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brutal-pink brutal-border-2 flex items-center justify-center">
                <span className="text-2xl">😕</span>
              </div>
              <div>
                <h3 className="font-black text-xl text-brutal-pink">WITHOUT skills.md</h3>
                <p className="text-xs font-mono text-gray-500">Current State of AI Agents</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="brutal-border-2 border-gray-700 bg-gray-800 p-4">
                <div className="text-xs font-mono text-gray-500 mb-2">User asks:</div>
                <p className="text-gray-300">"What's the price of BONK token?"</p>
              </div>
              <div className="brutal-border-2 border-gray-700 bg-gray-800 p-4">
                <div className="text-xs font-mono text-brutal-pink mb-2">Agent responds:</div>
                <p className="text-gray-400 italic">"I don't have access to real-time cryptocurrency prices. My knowledge was last updated in [date]. Please check a cryptocurrency exchange for current prices."</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-brutal-pink/20 text-brutal-pink brutal-border px-2 py-1 text-xs font-bold">❌ No real-time data</span>
                <span className="bg-brutal-pink/20 text-brutal-pink brutal-border px-2 py-1 text-xs font-bold">❌ Can't execute</span>
                <span className="bg-brutal-pink/20 text-brutal-pink brutal-border px-2 py-1 text-xs font-bold">❌ Outdated info</span>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="brutal-border-4 border-brutal-green bg-gray-900 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brutal-green brutal-border-2 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h3 className="font-black text-xl text-brutal-green">WITH skills.md</h3>
                <p className="text-xs font-mono text-gray-500">The Future of AI Agents</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="brutal-border-2 border-gray-700 bg-gray-800 p-4">
                <div className="text-xs font-mono text-gray-500 mb-2">User asks:</div>
                <p className="text-gray-300">"What's the price of BONK token?"</p>
              </div>
              <div className="brutal-border-2 border-brutal-green bg-gray-800 p-4">
                <div className="text-xs font-mono text-brutal-green mb-2">Agent responds (using skills.md):</div>
                <p className="text-white">"BONK is currently trading at <span className="text-brutal-green font-bold">$0.00001847</span>, up <span className="text-brutal-green">+5.2%</span> in the last 24 hours. 24h volume is $12.4M across Jupiter and Raydium."</p>
                <div className="mt-2 text-xs font-mono text-gray-500">
                  ⚡ Queried via skills.md • Verified by 7 stakers • 0.001 SOL fee
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-brutal-green/20 text-brutal-green brutal-border px-2 py-1 text-xs font-bold">✅ Real-time data</span>
                <span className="bg-brutal-green/20 text-brutal-green brutal-border px-2 py-1 text-xs font-bold">✅ Verified on-chain</span>
                <span className="bg-brutal-green/20 text-brutal-green brutal-border px-2 py-1 text-xs font-bold">✅ Paid via x402</span>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h3 className="text-2xl font-black text-center mb-12">What Agents Can Do With skills.md</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="brutal-border-4 border-gray-700 bg-gray-900 p-6 hover:border-brutal-purple transition-colors">
              <div className="text-4xl mb-4">💱</div>
              <h4 className="font-black mb-2">DeFi Trading</h4>
              <p className="text-sm text-gray-400">Query token prices, execute swaps, check LP positions, and manage DeFi portfolios autonomously.</p>
            </div>
            <div className="brutal-border-4 border-gray-700 bg-gray-900 p-6 hover:border-brutal-purple transition-colors">
              <div className="text-4xl mb-4">🖼️</div>
              <h4 className="font-black mb-2">NFT Intelligence</h4>
              <p className="text-sm text-gray-400">Track floor prices, analyze rarity, monitor listings, and even bid on NFTs based on criteria.</p>
            </div>
            <div className="brutal-border-4 border-gray-700 bg-gray-900 p-6 hover:border-brutal-purple transition-colors">
              <div className="text-4xl mb-4">🏛️</div>
              <h4 className="font-black mb-2">DAO Participation</h4>
              <p className="text-sm text-gray-400">Monitor proposals, summarize governance activity, and help users make informed voting decisions.</p>
            </div>
            <div className="brutal-border-4 border-gray-700 bg-gray-900 p-6 hover:border-brutal-purple transition-colors">
              <div className="text-4xl mb-4">🔐</div>
              <h4 className="font-black mb-2">Security Analysis</h4>
              <p className="text-sm text-gray-400">Audit smart contracts, check wallet risks, and verify transaction safety before signing.</p>
            </div>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="brutal-border-4 border-brutal-purple bg-gray-900 p-8 lg:p-12">
          <h3 className="text-xl font-black text-center mb-8 text-brutal-purple">How It Works: Agent → skills.md → Solana</h3>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
            {/* Step 1: User */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-brutal-blue brutal-border-4 flex items-center justify-center mb-3">
                <span className="text-3xl">👤</span>
              </div>
              <div className="font-black text-sm">User</div>
              <div className="text-xs text-gray-500 font-mono">"Get BONK price"</div>
            </div>

            <div className="text-brutal-purple text-2xl lg:rotate-0 rotate-90">→</div>

            {/* Step 2: AI Agent */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-brutal-purple brutal-border-4 flex items-center justify-center mb-3">
                <span className="text-3xl">🤖</span>
              </div>
              <div className="font-black text-sm">AI Agent</div>
              <div className="text-xs text-gray-500 font-mono">Interprets intent</div>
            </div>

            <div className="text-brutal-purple text-2xl lg:rotate-0 rotate-90">→</div>

            {/* Step 3: skills.md */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-brutal-yellow brutal-border-4 flex items-center justify-center mb-3">
                <span className="text-3xl text-brutal-black">📚</span>
              </div>
              <div className="font-black text-sm">skills.md</div>
              <div className="text-xs text-gray-500 font-mono">Finds verified skill</div>
            </div>

            <div className="text-brutal-purple text-2xl lg:rotate-0 rotate-90">→</div>

            {/* Step 4: Solana */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto solana-gradient brutal-border-4 flex items-center justify-center mb-3">
                <span className="text-3xl">◎</span>
              </div>
              <div className="font-black text-sm">Solana</div>
              <div className="text-xs text-gray-500 font-mono">Executes + pays</div>
            </div>

            <div className="text-brutal-purple text-2xl lg:rotate-0 rotate-90">→</div>

            {/* Step 5: Response */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-brutal-green brutal-border-4 flex items-center justify-center mb-3">
                <span className="text-3xl">✅</span>
              </div>
              <div className="font-black text-sm">Response</div>
              <div className="text-xs text-gray-500 font-mono">Verified answer</div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Every query is paid via <span className="text-brutal-cyan font-bold">x402 micropayments</span>. 
              Skill contributors earn automatically. No invoices, no delays.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Be part of the knowledge layer that powers the next generation of AI agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-brutal-purple text-white font-black text-lg brutal-border-4 shadow-brutal-white brutal-btn">
              Contribute a Skill →
            </button>
            <button className="px-8 py-4 bg-brutal-cyan text-brutal-black font-black text-lg brutal-border-4 shadow-brutal-white brutal-btn">
              Browse Existing Skills
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
