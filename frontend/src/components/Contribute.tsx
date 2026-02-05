import { useState } from 'react'

export function Contribute() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [stakeAmount, setStakeAmount] = useState('0.1')
  const [isConnected, setIsConnected] = useState(false)

  const CATEGORIES = ['APIs', 'Blockchain', 'Utilities', 'AI/ML', 'Development', 'Data', 'Security', 'Other']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual submission
    alert('Wallet connection and submission coming soon!')
  }

  return (
    <section className="min-h-screen pt-32 lg:pt-28 pb-20 noise-bg grid-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-brutal-green text-brutal-black brutal-border-4 shadow-brutal px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider mb-6">
            ✏️ Contribute
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
            Share Your <span className="text-brutal-purple">Knowledge</span>
          </h1>
          <p className="text-lg text-gray-600">
            Create a skill, stake SOL to signal quality, and earn when agents use it.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="brutal-border-4 shadow-brutal bg-white p-6">
                <label className="block font-black text-sm uppercase tracking-wider mb-3">
                  Skill Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Weather API Integration"
                  className="w-full px-4 py-3 brutal-border-2 font-medium bg-gray-50 focus:bg-white transition-colors"
                  required
                />
                <p className="mt-2 font-mono text-xs text-gray-400">
                  A clear, descriptive title for your skill
                </p>
              </div>

              {/* Category */}
              <div className="brutal-border-4 shadow-brutal bg-white p-6">
                <label className="block font-black text-sm uppercase tracking-wider mb-3">
                  Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-3 font-bold text-sm brutal-border-2 shadow-brutal brutal-btn transition-colors ${
                        category === cat
                          ? 'bg-brutal-purple text-white'
                          : 'bg-white hover:bg-brutal-yellow'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="brutal-border-4 shadow-brutal bg-white p-6">
                <label className="block font-black text-sm uppercase tracking-wider mb-3">
                  Skill Content (Markdown) *
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={`# My Skill

## Description
Describe what your skill does...

## Usage
\`\`\`
Example query and response
\`\`\`

## Parameters
- param1: description
- param2: description

## Examples
Provide concrete examples...`}
                  rows={15}
                  className="w-full px-4 py-3 brutal-border-2 font-mono text-sm bg-gray-50 focus:bg-white transition-colors resize-none"
                  required
                />
                <p className="mt-2 font-mono text-xs text-gray-400">
                  Write in Markdown format. Include description, usage, parameters, and examples.
                </p>
              </div>

              {/* Stake Amount */}
              <div className="brutal-border-4 shadow-brutal bg-white p-6">
                <label className="block font-black text-sm uppercase tracking-wider mb-3">
                  Stake Amount (SOL) *
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      min="0.1"
                      step="0.1"
                      className="w-full px-4 py-3 brutal-border-2 font-mono text-xl font-bold bg-gray-50 focus:bg-white transition-colors"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-gray-400">SOL</span>
                  </div>
                  <div className="flex gap-2">
                    {['0.1', '0.5', '1.0', '2.0'].map(amount => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setStakeAmount(amount)}
                        className={`px-4 py-3 font-mono font-bold text-sm brutal-border-2 brutal-btn ${
                          stakeAmount === amount
                            ? 'bg-brutal-yellow shadow-brutal'
                            : 'bg-white shadow-brutal hover:bg-brutal-yellow'
                        }`}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="mt-2 font-mono text-xs text-gray-400">
                  Higher stakes signal more confidence and earn better placement
                </p>
              </div>

              {/* Submit */}
              <div className="space-y-4">
                {!isConnected ? (
                  <button
                    type="button"
                    onClick={() => setIsConnected(true)}
                    className="w-full px-8 py-4 bg-brutal-purple text-white font-black text-lg brutal-border-4 shadow-brutal-lg brutal-btn flex items-center justify-center gap-3"
                  >
                    <span>🔗</span>
                    Connect Wallet to Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-brutal-green text-white font-black text-lg brutal-border-4 shadow-brutal-lg brutal-btn flex items-center justify-center gap-3"
                  >
                    <span>🚀</span>
                    Submit Skill ({stakeAmount} SOL)
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            <div className="brutal-border-4 shadow-brutal-lg bg-white overflow-hidden sticky top-28">
              <div className="bg-brutal-purple px-4 py-3">
                <h3 className="font-black text-white text-sm uppercase tracking-wider">Preview</h3>
              </div>
              <div className="p-4">
                {title || category || content ? (
                  <div className="space-y-3">
                    {category && (
                      <span className="inline-block bg-brutal-purple/10 text-brutal-purple brutal-border-2 px-2 py-1 text-xs font-bold">
                        {category}
                      </span>
                    )}
                    <h4 className="text-lg font-black">{title || 'Untitled Skill'}</h4>
                    <div className="brutal-border-2 bg-gray-50 p-3 font-mono text-xs max-h-48 overflow-y-auto">
                      <pre className="whitespace-pre-wrap">{content || 'No content yet...'}</pre>
                    </div>
                    <div className="brutal-border-2 bg-brutal-yellow p-3">
                      <div className="font-mono text-xs font-bold">Stake: {stakeAmount} SOL</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-gray-400 text-sm">Fill out the form to see preview</p>
                  </div>
                )}
              </div>
            </div>

            {/* Guidelines */}
            <div className="brutal-border-4 shadow-brutal bg-white p-6">
              <h3 className="font-black text-sm uppercase tracking-wider mb-4">📋 Guidelines</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-brutal-green font-bold">✓</span>
                  <span>Be specific and actionable</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-green font-bold">✓</span>
                  <span>Include working examples</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-green font-bold">✓</span>
                  <span>Document all parameters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-green font-bold">✓</span>
                  <span>Use proper Markdown formatting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-pink font-bold">✗</span>
                  <span>No copyrighted content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brutal-pink font-bold">✗</span>
                  <span>No malicious instructions</span>
                </li>
              </ul>
            </div>

            {/* Info Box */}
            <div className="brutal-border-4 shadow-brutal bg-brutal-yellow p-6">
              <h3 className="font-black text-sm uppercase tracking-wider mb-3">💡 How Staking Works</h3>
              <p className="text-sm leading-relaxed">
                Your stake is locked until your skill is verified by the community. If challenged and found invalid, you may lose your stake. Verified skills earn a portion of query fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
