export function HowItWorks() {
  return (
    <>
      {/* Stats Banner */}
      <div className="bg-brutal-purple brutal-border-4 border-l-0 border-r-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center text-white">
              <div className="text-4xl lg:text-6xl font-black mb-2">3</div>
              <div className="font-mono text-xs lg:text-sm text-purple-200 uppercase tracking-wider">Simple Steps</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl lg:text-6xl font-black mb-2">0.1</div>
              <div className="font-mono text-xs lg:text-sm text-purple-200 uppercase tracking-wider">SOL Min Stake</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl lg:text-6xl font-black mb-2">∞</div>
              <div className="font-mono text-xs lg:text-sm text-purple-200 uppercase tracking-wider">Knowledge Types</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl lg:text-6xl font-black mb-2">24/7</div>
              <div className="font-mono text-xs lg:text-sm text-purple-200 uppercase tracking-wider">Agent Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-24 lg:py-32 relative grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-brutal-green text-brutal-black brutal-border-4 shadow-brutal px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider mb-8">
              🛠️ How It Works
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              From knowledge to<br/>
              <span className="text-brutal-purple">on-chain proof.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Contribute your expertise, let the community verify it, and earn every time an AI agent uses your skill.
            </p>
          </div>

          {/* Steps */}
          <div className="mt-20 space-y-16 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="brutal-card brutal-border-4 shadow-brutal-lg bg-white p-8 relative z-10 h-full">
                <div className="w-20 h-20 bg-brutal-yellow brutal-border-4 shadow-brutal flex items-center justify-center mb-8">
                  <span className="text-4xl font-black">01</span>
                </div>
                <h3 className="text-2xl font-black mb-4">Write Your Skill</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Create a markdown file describing your skill. Include usage examples, parameters, and expected outputs. Think API docs but for AI agents.
                </p>
                {/* Mini illustration */}
                <div className="brutal-border-2 bg-gray-50 p-4 font-mono text-xs">
                  <div className="text-brutal-purple"># my-skill.md</div>
                  <div className="text-gray-500 mt-2">## Description</div>
                  <div className="text-gray-700">Your skill details...</div>
                </div>
                <div className="mt-4 font-mono text-xs text-gray-400">Format: <span className="text-brutal-green font-bold">Markdown (.md)</span></div>
              </div>
              {/* Connector line (desktop) */}
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-brutal-black z-20">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-brutal-black rotate-45 transform translate-x-1"></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="brutal-card brutal-border-4 shadow-brutal-lg bg-white p-8 relative z-10 h-full">
                <div className="w-20 h-20 bg-brutal-pink brutal-border-4 shadow-brutal flex items-center justify-center mb-8">
                  <span className="text-4xl font-black text-white">02</span>
                </div>
                <h3 className="text-2xl font-black mb-4">Stake & Submit</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Connect your Solana wallet and stake SOL to submit your skill. Your stake signals confidence in your content's quality and accuracy.
                </p>
                {/* Mini illustration */}
                <div className="brutal-border-2 bg-gray-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-brutal-purple brutal-border-2 flex items-center justify-center text-white text-xs font-bold">◎</div>
                    <span className="font-mono text-sm font-bold">0.1 SOL</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 brutal-border-2">
                    <div className="h-full bg-brutal-green w-3/4"></div>
                  </div>
                  <div className="text-xs font-mono text-gray-500 mt-2">Minimum stake: 0.1 SOL</div>
                </div>
                <div className="mt-4 font-mono text-xs text-gray-400">Network: <span className="text-brutal-purple font-bold">Solana Devnet</span></div>
              </div>
              {/* Connector line (desktop) */}
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-brutal-black z-20">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-brutal-black rotate-45 transform translate-x-1"></div>
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="brutal-card brutal-border-4 shadow-brutal-lg bg-white p-8 relative z-10 h-full">
                <div className="w-20 h-20 bg-brutal-green brutal-border-4 shadow-brutal flex items-center justify-center mb-8">
                  <span className="text-4xl font-black text-white">03</span>
                </div>
                <h3 className="text-2xl font-black mb-4">Earn From Queries</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Once verified, AI agents can query your skill using x402 micropayments. You earn a portion of each query fee automatically via smart contract.
                </p>
                {/* Mini illustration */}
                <div className="brutal-border-2 bg-gray-50 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">Your earnings</span>
                    <span className="text-xs font-mono text-brutal-green font-bold">+0.05 SOL</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 brutal-border-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brutal-purple to-brutal-green transition-all duration-1000" style={{width: '67%'}}></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span>1,247 queries</span>
                    <span>This month</span>
                  </div>
                </div>
                <div className="mt-4 font-mono text-xs text-gray-400">Payment: <span className="text-brutal-green font-bold">Instant via x402</span></div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-24">
            <h3 className="text-2xl font-black text-center mb-12">Why On-Chain?</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="brutal-card bg-brutal-white brutal-border-4 shadow-brutal-lg p-6 cursor-pointer">
                <div className="feature-icon w-14 h-14 bg-brutal-blue brutal-border-4 shadow-brutal flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h4 className="text-lg font-black mb-2">Immutable Record</h4>
                <p className="text-gray-600 text-sm leading-relaxed">Once verified, skills can't be tampered with. The blockchain ensures content integrity forever.</p>
              </div>

              {/* Feature 2 */}
              <div className="brutal-card bg-brutal-white brutal-border-4 shadow-brutal-lg p-6 cursor-pointer">
                <div className="feature-icon w-14 h-14 bg-brutal-pink brutal-border-4 shadow-brutal flex items-center justify-center mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h4 className="text-lg font-black mb-2">Stake-Based Trust</h4>
                <p className="text-gray-600 text-sm leading-relaxed">Contributors stake SOL to signal confidence. Bad actors lose their stake, good actors earn rewards.</p>
              </div>

              {/* Feature 3 */}
              <div className="brutal-card bg-brutal-white brutal-border-4 shadow-brutal-lg p-6 cursor-pointer">
                <div className="feature-icon w-14 h-14 bg-brutal-green brutal-border-4 shadow-brutal flex items-center justify-center mb-4">
                  <span className="text-2xl">💸</span>
                </div>
                <h4 className="text-lg font-black mb-2">Instant Payments</h4>
                <p className="text-gray-600 text-sm leading-relaxed">x402 micropayments mean you earn instantly for every query. No invoices, no delays.</p>
              </div>

              {/* Feature 4 */}
              <div className="brutal-card bg-brutal-white brutal-border-4 shadow-brutal-lg p-6 cursor-pointer">
                <div className="feature-icon w-14 h-14 bg-brutal-yellow brutal-border-4 shadow-brutal flex items-center justify-center mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h4 className="text-lg font-black mb-2">Agent-Native</h4>
                <p className="text-gray-600 text-sm leading-relaxed">Built specifically for AI agents to discover and consume knowledge programmatically.</p>
              </div>

              {/* Feature 5 */}
              <div className="brutal-card bg-brutal-white brutal-border-4 shadow-brutal-lg p-6 cursor-pointer">
                <div className="feature-icon w-14 h-14 bg-brutal-purple brutal-border-4 shadow-brutal flex items-center justify-center mb-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <h4 className="text-lg font-black mb-2">Decentralized</h4>
                <p className="text-gray-600 text-sm leading-relaxed">No single point of failure. Content stored on IPFS, proofs on Solana. Truly permissionless.</p>
              </div>

              {/* Feature 6 */}
              <div className="brutal-card bg-brutal-white brutal-border-4 shadow-brutal-lg p-6 cursor-pointer">
                <div className="feature-icon w-14 h-14 bg-brutal-orange brutal-border-4 shadow-brutal flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="text-lg font-black mb-2">Transparent Metrics</h4>
                <p className="text-gray-600 text-sm leading-relaxed">All queries, verifications, and challenges are public. Full transparency on skill quality.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <div className="inline-block">
              <button className="group px-10 py-5 bg-brutal-black text-white font-black text-xl brutal-border-4 shadow-brutal-xl brutal-btn flex items-center gap-4 mx-auto">
                Start Contributing Today
                <div className="w-8 h-8 bg-brutal-yellow brutal-border-2 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                  <svg className="w-5 h-5 text-brutal-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </div>
              </button>
              <p className="mt-4 font-mono text-xs text-gray-400">Free to browse • Stake to contribute • Earn per query</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
