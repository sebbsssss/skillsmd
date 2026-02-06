export function StakingEconomics() {
  return (
    <section className="py-24 lg:py-32 bg-brutal-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.1) 40px,
            rgba(255,255,255,0.1) 41px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.1) 40px,
            rgba(255,255,255,0.1) 41px
          )`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-brutal-yellow text-brutal-black border-4 border-white px-6 py-3 font-mono text-sm font-black uppercase tracking-wider mb-8 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            ⚖️ Economic Accountability
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            No mods.<br/>
            <span className="text-brutal-yellow">Just skin in the game.</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Every action requires staking SOL. Bad actors lose money. Good actors earn rewards. 
            The system polices itself economically.
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="grid lg:grid-cols-4 gap-6 mb-16">
          {/* Step 1: Contribute */}
          <div className="bg-brutal-purple border-4 border-white p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            <div className="w-16 h-16 bg-white border-4 border-brutal-purple flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(124,58,237,1)]">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-xl font-black mb-2">1. Contribute</h3>
            <p className="text-purple-200 text-sm mb-4">
              Submit a skill and stake SOL as your guarantee of quality.
            </p>
            <div className="bg-white/10 border-2 border-white/30 p-3 font-mono text-xs">
              <span className="text-brutal-yellow">Stake:</span> 0.1+ SOL
            </div>
          </div>

          {/* Step 2: Verify */}
          <div className="bg-brutal-green border-4 border-white p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            <div className="w-16 h-16 bg-white border-4 border-brutal-green flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(0,204,136,1)]">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-xl font-black mb-2 text-brutal-black">2. Verify</h3>
            <p className="text-green-900 text-sm mb-4">
              Others stake to vouch for your skill. More stake = more trust.
            </p>
            <div className="bg-white/20 border-2 border-white/50 p-3 font-mono text-xs text-brutal-black">
              <span className="font-bold">Risk:</span> Stake if wrong
            </div>
          </div>

          {/* Step 3: Challenge */}
          <div className="bg-brutal-pink border-4 border-white p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            <div className="w-16 h-16 bg-white border-4 border-brutal-pink flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(255,51,102,1)]">
              <span className="text-3xl">⚔️</span>
            </div>
            <h3 className="text-xl font-black mb-2">3. Challenge</h3>
            <p className="text-pink-100 text-sm mb-4">
              Spot garbage? Challenge it by staking. If you're right, you win their stake.
            </p>
            <div className="bg-white/10 border-2 border-white/30 p-3 font-mono text-xs">
              <span className="text-brutal-yellow">Reward:</span> Loser's stake
            </div>
          </div>

          {/* Step 4: Earn */}
          <div className="bg-brutal-yellow border-4 border-white p-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            <div className="w-16 h-16 bg-brutal-black border-4 border-white flex items-center justify-center mb-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-xl font-black mb-2 text-brutal-black">4. Earn</h3>
            <p className="text-yellow-800 text-sm mb-4">
              Verified skills earn micropayments from every agent query. Forever.
            </p>
            <div className="bg-brutal-black/20 border-2 border-brutal-black/30 p-3 font-mono text-xs text-brutal-black">
              <span className="font-bold">Income:</span> Per query
            </div>
          </div>
        </div>

        {/* Outcome Scenarios */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Good Actor */}
          <div className="bg-white text-brutal-black border-4 border-white p-8 shadow-[8px_8px_0px_0px_rgba(0,204,136,1)]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brutal-green border-4 border-brutal-black flex items-center justify-center">
                <span className="text-2xl">😇</span>
              </div>
              <h3 className="text-2xl font-black">Good Contributor</h3>
            </div>
            <ul className="space-y-3 font-mono text-sm">
              <li className="flex items-start gap-3">
                <span className="text-brutal-green font-black">→</span>
                <span>Submits accurate, useful skill</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brutal-green font-black">→</span>
                <span>Gets verified by community stakers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brutal-green font-black">→</span>
                <span>Survives any challenges (wins challenger's stake)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brutal-green font-black">→</span>
                <span><strong className="text-brutal-green">Earns forever</strong> from query fees</span>
              </li>
            </ul>
          </div>

          {/* Bad Actor */}
          <div className="bg-white text-brutal-black border-4 border-white p-8 shadow-[8px_8px_0px_0px_rgba(255,51,102,1)]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-brutal-pink border-4 border-brutal-black flex items-center justify-center">
                <span className="text-2xl">😈</span>
              </div>
              <h3 className="text-2xl font-black">Bad Contributor</h3>
            </div>
            <ul className="space-y-3 font-mono text-sm">
              <li className="flex items-start gap-3">
                <span className="text-brutal-pink font-black">→</span>
                <span>Submits garbage / malicious skill</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brutal-pink font-black">→</span>
                <span>Someone challenges with stake</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brutal-pink font-black">→</span>
                <span>Challenge succeeds (skill was bad)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brutal-pink font-black">→</span>
                <span><strong className="text-brutal-pink">Loses entire stake</strong> to challenger</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white text-brutal-black border-4 border-white p-8 shadow-[8px_8px_0px_0px_rgba(255,229,0,1)] max-w-2xl">
            <p className="text-xl font-black mb-2">
              💡 The Bottom Line
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you're confident in your knowledge, you make money. 
              If you're not, you lose money. No moderators needed — 
              <span className="font-black text-brutal-purple"> economics does the work.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
