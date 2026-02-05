import { useState } from 'react'

interface Skill {
  id: string
  title: string
  description: string
  fullDescription: string
  category: string
  author: string
  stake: number
  queries: number
  verifications: number
  status: 'verified' | 'pending' | 'challenged'
  usage: string
  parameters: { name: string; type: string; description: string }[]
  example: { query: string; response: string }
  createdAt: string
}

const REAL_SKILLS: Skill[] = [
  {
    id: '1',
    title: 'Solana Token Price Lookup',
    description: 'Get real-time price data for any SPL token on Solana using Jupiter aggregator.',
    fullDescription: 'This skill allows AI agents to fetch current market prices for any SPL token on the Solana blockchain. It uses Jupiter\'s price API to aggregate prices across all major Solana DEXs, ensuring the most accurate and up-to-date pricing data. Supports both token mint addresses and common symbols.',
    category: 'DeFi',
    author: 'CJta...H1s8',
    stake: 0.5,
    queries: 2847,
    verifications: 7,
    status: 'verified',
    usage: 'Query with a token mint address or symbol to get USD price, 24h change, and volume.',
    parameters: [
      { name: 'token', type: 'string', description: 'Token mint address or symbol (e.g., "SOL", "BONK")' },
      { name: 'currency', type: 'string', description: 'Output currency (default: USD)' }
    ],
    example: {
      query: 'Get price of BONK token',
      response: '{ "token": "BONK", "price": 0.00001847, "change24h": "+5.2%", "volume24h": "$12.4M" }'
    },
    createdAt: '2026-01-15'
  },
  {
    id: '2',
    title: 'NFT Collection Floor Price',
    description: 'Fetch floor prices and stats for Solana NFT collections from Magic Eden and Tensor.',
    fullDescription: 'Retrieve comprehensive NFT collection data including floor price, listed count, total volume, and holder statistics. Aggregates data from Magic Eden and Tensor marketplaces to provide the most accurate floor prices. Essential for NFT trading bots and portfolio trackers.',
    category: 'NFTs',
    author: '7Kv2...9xMn',
    stake: 0.75,
    queries: 1563,
    verifications: 5,
    status: 'verified',
    usage: 'Provide collection name or symbol to retrieve floor price and collection statistics.',
    parameters: [
      { name: 'collection', type: 'string', description: 'Collection symbol or name (e.g., "mad_lads", "tensorians")' },
      { name: 'marketplace', type: 'string', description: 'Specific marketplace or "all" for aggregated (default: all)' }
    ],
    example: {
      query: 'Get Mad Lads floor price',
      response: '{ "collection": "Mad Lads", "floor": 142.5, "listed": 234, "volume24h": 1250.5, "holders": 5847 }'
    },
    createdAt: '2026-01-20'
  },
  {
    id: '3',
    title: 'Transaction Intent Parser',
    description: 'Parse natural language into Solana transaction intents for swaps, transfers, and staking.',
    fullDescription: 'Converts human-readable instructions into structured transaction intents that can be executed on Solana. Supports token swaps via Jupiter, SOL transfers, SPL token transfers, and liquid staking operations. Returns structured data ready for transaction building.',
    category: 'Infrastructure',
    author: '3Pq1...kL4j',
    stake: 1.0,
    queries: 892,
    verifications: 9,
    status: 'verified',
    usage: 'Send a natural language instruction describing the desired transaction.',
    parameters: [
      { name: 'instruction', type: 'string', description: 'Natural language transaction description' },
      { name: 'wallet', type: 'string', description: 'Source wallet address for context' }
    ],
    example: {
      query: 'Swap 10 SOL for USDC with 1% slippage',
      response: '{ "type": "swap", "inputToken": "SOL", "outputToken": "USDC", "amount": 10, "slippage": 0.01 }'
    },
    createdAt: '2026-01-22'
  },
  {
    id: '4',
    title: 'Wallet Portfolio Analyzer',
    description: 'Analyze any Solana wallet\'s holdings, PnL, and transaction history.',
    fullDescription: 'Comprehensive wallet analysis including token holdings with current values, NFT collections owned, DeFi positions (staking, lending, LP), historical PnL calculation, and recent transaction summary. Perfect for portfolio tracking agents and wealth management tools.',
    category: 'Analytics',
    author: '9Abc...Def1',
    stake: 0.8,
    queries: 2156,
    verifications: 6,
    status: 'verified',
    usage: 'Provide a wallet address to get complete portfolio breakdown and analytics.',
    parameters: [
      { name: 'wallet', type: 'string', description: 'Solana wallet address to analyze' },
      { name: 'includeNFTs', type: 'boolean', description: 'Include NFT holdings (default: true)' },
      { name: 'includeDeFi', type: 'boolean', description: 'Include DeFi positions (default: true)' }
    ],
    example: {
      query: 'Analyze wallet CJta...H1s8',
      response: '{ "totalValue": "$12,450", "tokens": [...], "nfts": 12, "defiPositions": 3, "pnl30d": "+15.2%" }'
    },
    createdAt: '2026-01-25'
  },
  {
    id: '5',
    title: 'Smart Contract Auditor',
    description: 'Analyze Solana programs for common vulnerabilities and security issues.',
    fullDescription: 'Automated security analysis for Solana programs. Checks for common vulnerabilities including missing signer checks, improper PDA validation, integer overflow risks, reentrancy patterns, and unchecked account ownership. Returns severity-rated findings with remediation suggestions.',
    category: 'Security',
    author: '2Xyz...Uvw3',
    stake: 2.0,
    queries: 341,
    verifications: 4,
    status: 'pending',
    usage: 'Provide program ID or source code for security analysis.',
    parameters: [
      { name: 'programId', type: 'string', description: 'Deployed program address on mainnet/devnet' },
      { name: 'source', type: 'string', description: 'Optional: Anchor IDL or source code URL' }
    ],
    example: {
      query: 'Audit program 4Dt5...1AmV',
      response: '{ "risk": "medium", "findings": 3, "critical": 0, "high": 1, "medium": 2, "details": [...] }'
    },
    createdAt: '2026-02-01'
  },
  {
    id: '6',
    title: 'DAO Governance Tracker',
    description: 'Monitor proposals, votes, and treasury activity across Solana DAOs.',
    fullDescription: 'Track governance activity across major Solana DAOs using Realms and custom governance programs. Get active proposals, voting status, treasury balances, and member statistics. Supports notifications for new proposals and vote deadlines.',
    category: 'Governance',
    author: '5Mno...Pqr7',
    stake: 0.6,
    queries: 728,
    verifications: 5,
    status: 'verified',
    usage: 'Query DAO name or governance address for proposals and treasury data.',
    parameters: [
      { name: 'dao', type: 'string', description: 'DAO name or Realms governance address' },
      { name: 'filter', type: 'string', description: 'Filter: "active", "passed", "failed", or "all"' }
    ],
    example: {
      query: 'Get active proposals for Marinade DAO',
      response: '{ "dao": "Marinade", "activeProposals": 2, "treasury": "$4.2M", "proposals": [...] }'
    },
    createdAt: '2026-01-28'
  },
]

const CATEGORIES = ['All', 'DeFi', 'NFTs', 'Infrastructure', 'Analytics', 'Security', 'Governance']

export function Browse() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  const filteredSkills = REAL_SKILLS.filter(skill => {
    const matchesSearch = skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: Skill['status']) => {
    switch (status) {
      case 'verified':
        return <span className="bg-brutal-green text-white brutal-border-2 px-2 py-1 text-xs font-bold">✅ VERIFIED</span>
      case 'pending':
        return <span className="bg-brutal-yellow text-brutal-black brutal-border-2 px-2 py-1 text-xs font-bold">⏳ PENDING</span>
      case 'challenged':
        return <span className="bg-brutal-pink text-white brutal-border-2 px-2 py-1 text-xs font-bold">⚠️ CHALLENGED</span>
    }
  }

  return (
    <section className="min-h-screen pt-32 lg:pt-28 pb-20 noise-bg grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-brutal-blue text-white brutal-border-4 shadow-brutal px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider mb-6">
            📚 Skill Registry
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
            Browse <span className="text-brutal-purple">Skills</span>
          </h1>
          <p className="text-lg text-gray-600">
            Discover verified knowledge that AI agents can query and use on Solana.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="brutal-border-4 shadow-brutal bg-white p-2 flex items-center gap-2">
            <span className="text-2xl px-2">🔍</span>
            <input
              type="text"
              placeholder="Search skills... (e.g., 'token price', 'NFT', 'swap')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 font-medium text-lg bg-transparent outline-none"
            />
            <button className="px-6 py-3 bg-brutal-purple text-white font-bold brutal-border-2 shadow-brutal brutal-btn">
              Search
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-bold text-sm brutal-border-2 shadow-brutal brutal-btn transition-colors ${
                  selectedCategory === category
                    ? 'bg-brutal-yellow'
                    : 'bg-white hover:bg-brutal-yellow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="font-mono text-sm text-gray-500">
            Showing <span className="font-bold text-brutal-black">{filteredSkills.length}</span> skills
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-gray-400">Sort by:</span>
            <button className="px-3 py-1 font-mono text-xs brutal-border-2 bg-white shadow-brutal-hover brutal-btn">
              Queries ↓
            </button>
          </div>
        </div>

        {/* Skills List */}
        <div className="space-y-4">
          {filteredSkills.map(skill => (
            <div
              key={skill.id}
              className="brutal-border-4 shadow-brutal-lg bg-white overflow-hidden"
            >
              {/* Card Header - Always Visible */}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="bg-brutal-purple/10 text-brutal-purple brutal-border-2 px-2 py-1 text-xs font-bold">
                        {skill.category}
                      </span>
                      {getStatusBadge(skill.status)}
                      <span className="font-mono text-xs text-gray-400">
                        Added {skill.createdAt}
                      </span>
                    </div>
                    <h3 className="text-xl font-black mb-2">{skill.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{skill.description}</p>
                  </div>
                  
                  {/* Stats */}
                  <div className="flex gap-2 lg:gap-3">
                    <div className="brutal-border-2 bg-gray-50 p-3 text-center min-w-[80px]">
                      <div className="text-lg font-black text-brutal-purple">{skill.stake}</div>
                      <div className="text-[10px] font-mono text-gray-500">SOL Staked</div>
                    </div>
                    <div className="brutal-border-2 bg-gray-50 p-3 text-center min-w-[80px]">
                      <div className="text-lg font-black text-brutal-blue">{skill.queries.toLocaleString()}</div>
                      <div className="text-[10px] font-mono text-gray-500">Queries</div>
                    </div>
                    <div className="brutal-border-2 bg-gray-50 p-3 text-center min-w-[80px]">
                      <div className="text-lg font-black text-brutal-green">{skill.verifications}</div>
                      <div className="text-[10px] font-mono text-gray-500">Verified</div>
                    </div>
                  </div>
                </div>

                {/* Footer with Author and View Button */}
                <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200 flex items-center justify-between">
                  <div className="font-mono text-xs text-gray-500">
                    by <span className="font-bold text-brutal-black">{skill.author}</span>
                  </div>
                  <button 
                    onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
                    className={`px-4 py-2 font-bold text-xs brutal-border-2 shadow-brutal brutal-btn flex items-center gap-2 ${
                      expandedSkill === skill.id 
                        ? 'bg-brutal-yellow' 
                        : 'bg-brutal-purple text-white'
                    }`}
                  >
                    {expandedSkill === skill.id ? 'Close ↑' : 'View Details →'}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedSkill === skill.id && (
                <div className="brutal-border-2 border-l-0 border-r-0 border-b-0 bg-gray-50">
                  <div className="p-6 space-y-6">
                    {/* Full Description */}
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-wider mb-2">📖 Full Description</h4>
                      <p className="text-gray-700 leading-relaxed">{skill.fullDescription}</p>
                    </div>

                    {/* Usage */}
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-wider mb-2">🎯 Usage</h4>
                      <p className="text-gray-700">{skill.usage}</p>
                    </div>

                    {/* Parameters */}
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-wider mb-3">⚙️ Parameters</h4>
                      <div className="space-y-2">
                        {skill.parameters.map((param, idx) => (
                          <div key={idx} className="brutal-border-2 bg-white p-3 flex flex-col sm:flex-row sm:items-center gap-2">
                            <code className="font-mono text-sm font-bold text-brutal-purple">{param.name}</code>
                            <span className="text-xs bg-brutal-blue/10 text-brutal-blue brutal-border px-2 py-0.5 font-mono">
                              {param.type}
                            </span>
                            <span className="text-sm text-gray-600 sm:ml-auto">{param.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Example */}
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-wider mb-3">💡 Example</h4>
                      <div className="brutal-border-4 bg-brutal-black p-4 overflow-x-auto">
                        <div className="mb-2">
                          <span className="text-brutal-green font-mono text-xs font-bold">// Query</span>
                          <pre className="text-white font-mono text-sm mt-1">{skill.example.query}</pre>
                        </div>
                        <div className="mt-4">
                          <span className="text-brutal-yellow font-mono text-xs font-bold">// Response</span>
                          <pre className="text-gray-300 font-mono text-sm mt-1 whitespace-pre-wrap">{skill.example.response}</pre>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      <button className="px-6 py-3 bg-brutal-green text-white font-bold brutal-border-4 shadow-brutal brutal-btn">
                        🔗 Query This Skill
                      </button>
                      <button className="px-6 py-3 bg-brutal-purple text-white font-bold brutal-border-4 shadow-brutal brutal-btn">
                        ✅ Verify (Stake 0.1 SOL)
                      </button>
                      <button className="px-6 py-3 bg-white font-bold brutal-border-4 shadow-brutal brutal-btn">
                        📋 Copy Skill ID
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="brutal-border-4 shadow-brutal-lg bg-white p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-black mb-2">No skills found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="px-6 py-3 bg-brutal-yellow font-bold brutal-border-4 shadow-brutal brutal-btn"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
