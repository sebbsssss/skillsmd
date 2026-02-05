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
            🌐 The Vision
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            A Knowledge Network<br/>
            <span className="text-brutal-cyan">Built By Everyone.</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Wikipedia taught us that collective knowledge beats any single source. skills.md brings that same power to AI agents — a shared library of verified expertise that anyone can contribute to and everyone benefits from.
          </p>
        </div>

        {/* Core Concept */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {/* Contribute */}
          <div className="brutal-border-4 border-brutal-purple bg-gray-900 p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-brutal-purple brutal-border-4 flex items-center justify-center mb-6">
              <span className="text-4xl">🧠</span>
            </div>
            <h3 className="font-black text-xl mb-4">You Have Expertise</h3>
            <p className="text-gray-400 leading-relaxed">
              Maybe you know how to parse Solana transactions. Or the best way to calculate NFT rarity. Or how to query governance proposals. That knowledge has value.
            </p>
          </div>

          {/* Share */}
          <div className="brutal-border-4 border-brutal-yellow bg-gray-900 p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-brutal-yellow brutal-border-4 flex items-center justify-center mb-6">
              <span className="text-4xl">📚</span>
            </div>
            <h3 className="font-black text-xl mb-4">Share It As a Skill</h3>
            <p className="text-gray-400 leading-relaxed">
              Write it down in a structured format. Stake SOL to signal you stand behind it. The community verifies. Now it's part of the permanent record — discoverable by any agent.
            </p>
          </div>

          {/* Earn */}
          <div className="brutal-border-4 border-brutal-green bg-gray-900 p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-brutal-green brutal-border-4 flex items-center justify-center mb-6">
              <span className="text-4xl">💰</span>
            </div>
            <h3 className="font-black text-xl mb-4">Earn When It's Used</h3>
            <p className="text-gray-400 leading-relaxed">
              Every time an agent queries your skill, you earn micropayments automatically via x402. No invoicing. No middlemen. Your expertise generates passive income.
            </p>
          </div>
        </div>

        {/* The Network Effect */}
        <div className="brutal-border-4 border-brutal-cyan bg-gray-900 p-8 lg:p-12 mb-20">
          <h3 className="text-2xl font-black text-center mb-8">The Power of Shared Knowledge</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brutal-cyan brutal-border-2 flex items-center justify-center flex-shrink-0">
                  <span className="text-brutal-black font-black">1</span>
                </div>
                <div>
                  <h4 className="font-black mb-1">One Person Documents It</h4>
                  <p className="text-gray-400 text-sm">A DeFi expert writes a skill for calculating impermanent loss. Stakes 0.5 SOL.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brutal-cyan brutal-border-2 flex items-center justify-center flex-shrink-0">
                  <span className="text-brutal-black font-black">2</span>
                </div>
                <div>
                  <h4 className="font-black mb-1">Community Verifies It</h4>
                  <p className="text-gray-400 text-sm">Other DeFi experts stake to verify accuracy. Bad skills get challenged and removed.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brutal-cyan brutal-border-2 flex items-center justify-center flex-shrink-0">
                  <span className="text-brutal-black font-black">3</span>
                </div>
                <div>
                  <h4 className="font-black mb-1">Thousands of Agents Use It</h4>
                  <p className="text-gray-400 text-sm">Trading bots, portfolio trackers, financial advisors — all benefit from this one contribution.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brutal-green brutal-border-2 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black">$</span>
                </div>
                <div>
                  <h4 className="font-black mb-1">Contributor Earns Forever</h4>
                  <p className="text-gray-400 text-sm">Every query = micropayment. Quality knowledge = passive income stream.</p>
                </div>
              </div>
            </div>

            <div className="brutal-border-4 bg-brutal-black p-6">
              <div className="text-xs font-mono text-brutal-cyan mb-4">// The math</div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Your skill:</span>
                  <span className="text-white">IL Calculator</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Stake:</span>
                  <span className="text-brutal-purple">0.5 SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Query fee:</span>
                  <span className="text-white">0.001 SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Queries/day:</span>
                  <span className="text-white">~500</span>
                </div>
                <div className="brutal-border-2 border-brutal-green bg-brutal-green/10 p-3 mt-4">
                  <div className="flex justify-between">
                    <span className="text-brutal-green">Daily earnings:</span>
                    <span className="text-brutal-green font-bold">~0.5 SOL</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-brutal-green">Monthly:</span>
                    <span className="text-brutal-green font-bold">~15 SOL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why This Matters */}
        <div className="mb-16">
          <h3 className="text-2xl font-black text-center mb-12">Why Build Knowledge On-Chain?</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="brutal-border-4 border-gray-700 bg-gray-900 p-6">
              <div className="text-3xl mb-4">🔒</div>
              <h4 className="font-black mb-2">Permanent & Immutable</h4>
              <p className="text-sm text-gray-400">Once verified, knowledge can't be deleted or censored. It exists forever on Solana.</p>
            </div>
            <div className="brutal-border-4 border-gray-700 bg-gray-900 p-6">
              <div className="text-3xl mb-4">⚖️</div>
              <h4 className="font-black mb-2">Skin in the Game</h4>
              <p className="text-sm text-gray-400">Staking means contributors have economic incentive to be accurate. Bad actors lose money.</p>
            </div>
            <div className="brutal-border-4 border-gray-700 bg-gray-900 p-6">
              <div className="text-3xl mb-4">🌍</div>
              <h4 className="font-black mb-2">Globally Accessible</h4>
              <p className="text-sm text-gray-400">Any agent, anywhere, can query the library. No gatekeepers. No API keys to manage.</p>
            </div>
            <div className="brutal-border-4 border-gray-700 bg-gray-900 p-6">
              <div className="text-3xl mb-4">🤝</div>
              <h4 className="font-black mb-2">Collaborative</h4>
              <p className="text-sm text-gray-400">Skills can cite other skills. Knowledge builds on knowledge. The library grows smarter together.</p>
            </div>
            <div className="brutal-border-4 border-gray-700 bg-gray-900 p-6">
              <div className="text-3xl mb-4">💸</div>
              <h4 className="font-black mb-2">Fair Compensation</h4>
              <p className="text-sm text-gray-400">No platform taking 30%. Contributors earn directly for the value they create.</p>
            </div>
            <div className="brutal-border-4 border-gray-700 bg-gray-900 p-6">
              <div className="text-3xl mb-4">🤖</div>
              <h4 className="font-black mb-2">Agent-Native</h4>
              <p className="text-sm text-gray-400">Structured for machines to discover and consume. Not a website — a protocol.</p>
            </div>
          </div>
        </div>

        {/* Analogy */}
        <div className="brutal-border-4 border-brutal-yellow bg-brutal-yellow/10 p-8 lg:p-12 text-center mb-16">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-2xl font-black mb-4">Think of it like...</h3>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            <span className="text-brutal-yellow font-bold">Wikipedia</span> for knowledge structure + 
            <span className="text-brutal-yellow font-bold"> Stack Overflow</span> for community verification + 
            <span className="text-brutal-yellow font-bold"> Substack</span> for creator monetization — 
            but purpose-built for AI agents and powered by Solana.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-gray-400 mb-6 text-lg">
            The best time to contribute was yesterday. The second best time is now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-brutal-purple text-white font-black text-lg brutal-border-4 shadow-brutal-white brutal-btn">
              Contribute Your Expertise →
            </button>
            <button className="px-8 py-4 bg-brutal-cyan text-brutal-black font-black text-lg brutal-border-4 shadow-brutal-white brutal-btn">
              Explore the Library
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
