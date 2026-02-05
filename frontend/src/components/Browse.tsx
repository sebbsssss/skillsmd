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
    title: 'Jupiter Swap Quote',
    description: 'Get the best swap route and quote for any token pair on Solana using Jupiter Aggregator API.',
    fullDescription: `Fetches optimal swap routes from Jupiter Aggregator (jup.ag), which aggregates liquidity across all major Solana DEXs including Raydium, Orca, Meteora, and Phoenix.

**API Endpoint:** https://quote-api.jup.ag/v6/quote

**Required Headers:** None (public API)

**Rate Limits:** 600 requests/minute for free tier

This skill returns the best route, expected output amount, price impact, and all intermediate steps for complex multi-hop swaps.`,
    category: 'DeFi',
    author: 'CJta...H1s8',
    stake: 0.5,
    queries: 2847,
    verifications: 7,
    status: 'verified',
    usage: 'Provide input mint, output mint, and amount (in smallest units) to get swap quote.',
    parameters: [
      { name: 'inputMint', type: 'string', description: 'Token mint address to swap from (e.g., So11111111111111111111111111111111111111112 for SOL)' },
      { name: 'outputMint', type: 'string', description: 'Token mint address to swap to (e.g., EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v for USDC)' },
      { name: 'amount', type: 'number', description: 'Amount in lamports/smallest unit (1 SOL = 1000000000)' },
      { name: 'slippageBps', type: 'number', description: 'Slippage tolerance in basis points (100 = 1%)' }
    ],
    example: {
      query: 'GET https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=1000000000&slippageBps=50',
      response: `{
  "inputMint": "So111...1112",
  "outputMint": "EPjFW...Dt1v", 
  "inAmount": "1000000000",
  "outAmount": "173420000",
  "priceImpactPct": "0.0012",
  "routePlan": [{"swapInfo": {...}, "percent": 100}]
}`
    },
    createdAt: '2026-01-15'
  },
  {
    id: '2',
    title: 'Helius RPC - Get Token Balances',
    description: 'Fetch all SPL token balances for a Solana wallet using Helius enhanced RPC.',
    fullDescription: `Uses Helius DAS (Digital Asset Standard) API to fetch all fungible token balances for a wallet address with metadata including token name, symbol, logo, and USD value.

**API Endpoint:** https://mainnet.helius-rpc.com/?api-key=YOUR_KEY

**Method:** getAssetsByOwner (DAS API)

**Free Tier:** 100k credits/month

Much faster than standard getTokenAccountsByOwner as it returns enriched metadata in a single call.`,
    category: 'Infrastructure',
    author: '7Kv2...9xMn',
    stake: 0.75,
    queries: 1563,
    verifications: 5,
    status: 'verified',
    usage: 'POST to Helius RPC with wallet address to get all token holdings.',
    parameters: [
      { name: 'ownerAddress', type: 'string', description: 'Solana wallet public key' },
      { name: 'displayOptions', type: 'object', description: 'Optional: showFungible, showNativeBalance' }
    ],
    example: {
      query: `POST https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "getAssetsByOwner",
  "params": {
    "ownerAddress": "CJtaoYtdxu8v32FqeDTjTBD5socEB5MBjBwgQHDhH1s8",
    "displayOptions": { "showFungible": true }
  }
}`,
      response: `{
  "items": [
    {
      "interface": "FungibleToken",
      "content": {"metadata": {"name": "USD Coin", "symbol": "USDC"}},
      "token_info": {"balance": 1500000000, "decimals": 6}
    }
  ],
  "nativeBalance": {"lamports": 5000000000}
}`
    },
    createdAt: '2026-01-20'
  },
  {
    id: '3',
    title: 'Solana Transaction Parser',
    description: 'Decode and interpret Solana transaction signatures into human-readable summaries.',
    fullDescription: `Parses raw Solana transactions to extract meaningful information: transfers, swaps, NFT mints, program interactions, fees paid, and accounts involved.

**Approach:**
1. Fetch transaction via getTransaction RPC
2. Decode instruction data using program IDLs
3. Match against known program IDs (Jupiter, Raydium, Magic Eden, etc.)
4. Extract token transfers from pre/post balances

Works with confirmed and finalized transactions. Supports all major Solana programs.`,
    category: 'Infrastructure',
    author: '3Pq1...kL4j',
    stake: 1.0,
    queries: 892,
    verifications: 9,
    status: 'verified',
    usage: 'Provide transaction signature to get decoded summary.',
    parameters: [
      { name: 'signature', type: 'string', description: 'Transaction signature (base58 encoded, 88 chars)' },
      { name: 'cluster', type: 'string', description: 'mainnet-beta, devnet, or testnet' }
    ],
    example: {
      query: 'Parse transaction: 5J7H...kL9m',
      response: `{
  "type": "SWAP",
  "protocol": "Jupiter",
  "from": {"token": "SOL", "amount": 1.5},
  "to": {"token": "USDC", "amount": 259.43},
  "fee": 0.000005,
  "slot": 245678901,
  "timestamp": "2026-01-20T14:30:00Z"
}`
    },
    createdAt: '2026-01-22'
  },
  {
    id: '4',
    title: 'Token Metadata Lookup',
    description: 'Get comprehensive metadata for any SPL token including price, supply, holders, and social links.',
    fullDescription: `Aggregates token information from multiple sources:
- **Solana Token List:** Official verified metadata
- **Jupiter Token API:** Price, volume, market cap
- **Birdeye API:** Detailed analytics
- **On-chain data:** Supply, decimals, freeze authority

Returns normalized data structure regardless of source.`,
    category: 'Data',
    author: '9Abc...Def1',
    stake: 0.4,
    queries: 3241,
    verifications: 11,
    status: 'verified',
    usage: 'Provide token mint address to get full metadata.',
    parameters: [
      { name: 'mint', type: 'string', description: 'SPL token mint address' },
      { name: 'includePrice', type: 'boolean', description: 'Include current price data (default: true)' }
    ],
    example: {
      query: 'Lookup: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      response: `{
  "name": "USD Coin",
  "symbol": "USDC",
  "decimals": 6,
  "logoURI": "https://raw.githubusercontent.com/.../usdc.png",
  "price": 0.9998,
  "marketCap": 32500000000,
  "supply": 32506000000,
  "holders": 1847293,
  "verified": true
}`
    },
    createdAt: '2026-01-25'
  },
  {
    id: '5',
    title: 'Magic Eden NFT Floor Price',
    description: 'Get real-time floor price and collection stats from Magic Eden marketplace.',
    fullDescription: `Fetches NFT collection data from Magic Eden's public API including:
- Current floor price in SOL
- 24h volume and sales count
- Listed count and total supply
- Price history (7d, 30d)

**API Endpoint:** https://api-mainnet.magiceden.dev/v2/collections/{symbol}/stats

**Rate Limits:** 120 requests/minute

Collection symbols can be found in Magic Eden URLs (e.g., mad_lads, okay_bears).`,
    category: 'NFTs',
    author: '2Xyz...Uvw3',
    stake: 0.6,
    queries: 1847,
    verifications: 6,
    status: 'verified',
    usage: 'Provide collection symbol to get floor price and stats.',
    parameters: [
      { name: 'symbol', type: 'string', description: 'Collection symbol from Magic Eden (e.g., "mad_lads", "degods")' }
    ],
    example: {
      query: 'GET https://api-mainnet.magiceden.dev/v2/collections/mad_lads/stats',
      response: `{
  "symbol": "mad_lads",
  "floorPrice": 142500000000,
  "listedCount": 234,
  "volumeAll": 1250000000000000,
  "avgPrice24hr": 148200000000
}`
    },
    createdAt: '2026-02-01'
  },
  {
    id: '6',
    title: 'Realms DAO Proposals',
    description: 'Fetch active governance proposals from Solana DAOs using Realms protocol.',
    fullDescription: `Queries the Realms governance program to list active proposals for any DAO.

**Program ID:** GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw

**Data Sources:**
- On-chain governance accounts
- Realms API for metadata

Returns proposal title, description, voting status, quorum progress, and time remaining.`,
    category: 'Governance',
    author: '5Mno...Pqr7',
    stake: 0.5,
    queries: 728,
    verifications: 5,
    status: 'verified',
    usage: 'Provide DAO realm public key or name to list proposals.',
    parameters: [
      { name: 'realm', type: 'string', description: 'Realm public key or known name (e.g., "Marinade", "Mango")' },
      { name: 'status', type: 'string', description: 'Filter: "active", "passed", "defeated", or "all"' }
    ],
    example: {
      query: 'Get active proposals for Marinade DAO',
      response: `{
  "realm": "Marinade",
  "proposals": [
    {
      "title": "MIP-42: Increase validator set",
      "status": "voting",
      "yesVotes": 12500000,
      "noVotes": 340000,
      "quorumPct": 67.3,
      "endsAt": "2026-02-10T00:00:00Z"
    }
  ]
}`
    },
    createdAt: '2026-01-28'
  },
]

const CATEGORIES = ['All', 'DeFi', 'Infrastructure', 'Data', 'NFTs', 'Governance']

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
            Real, verified knowledge for AI agents to query and use on Solana.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="brutal-border-4 shadow-brutal bg-white p-2 flex items-center gap-2">
            <span className="text-2xl px-2">🔍</span>
            <input
              type="text"
              placeholder="Search skills... (e.g., 'swap', 'NFT floor', 'token metadata')"
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
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">{skill.fullDescription}</div>
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
                        <div className="mb-4">
                          <span className="text-brutal-green font-mono text-xs font-bold">// Request</span>
                          <pre className="text-gray-300 font-mono text-sm mt-2 whitespace-pre-wrap">{skill.example.query}</pre>
                        </div>
                        <div>
                          <span className="text-brutal-yellow font-mono text-xs font-bold">// Response</span>
                          <pre className="text-gray-300 font-mono text-sm mt-2 whitespace-pre-wrap">{skill.example.response}</pre>
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
