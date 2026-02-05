import { useState } from 'react'

interface Skill {
  id: string
  title: string
  description: string
  category: string
  author: string
  stake: number
  queries: number
  verifications: number
  status: 'verified' | 'pending' | 'challenged'
}

const MOCK_SKILLS: Skill[] = [
  {
    id: '1',
    title: 'Weather API Integration',
    description: 'Get current weather and forecasts for any location worldwide using multiple data sources.',
    category: 'APIs',
    author: 'CJta...H1s8',
    stake: 0.5,
    queries: 1247,
    verifications: 5,
    status: 'verified'
  },
  {
    id: '2',
    title: 'Solana Transaction Parser',
    description: 'Parse and decode Solana transaction data including program instructions and account changes.',
    category: 'Blockchain',
    author: '7Kv2...9xMn',
    stake: 1.0,
    queries: 892,
    verifications: 8,
    status: 'verified'
  },
  {
    id: '3',
    title: 'JSON Schema Validator',
    description: 'Validate JSON data against schemas with detailed error reporting and suggestions.',
    category: 'Utilities',
    author: '3Pq1...kL4j',
    stake: 0.25,
    queries: 2341,
    verifications: 12,
    status: 'verified'
  },
  {
    id: '4',
    title: 'Text Summarization',
    description: 'Summarize long-form content into concise bullet points or paragraphs.',
    category: 'AI/ML',
    author: '9Abc...Def1',
    stake: 0.75,
    queries: 456,
    verifications: 3,
    status: 'pending'
  },
  {
    id: '5',
    title: 'Code Review Assistant',
    description: 'Analyze code for best practices, security issues, and performance improvements.',
    category: 'Development',
    author: '2Xyz...Uvw3',
    stake: 2.0,
    queries: 0,
    verifications: 1,
    status: 'challenged'
  },
]

const CATEGORIES = ['All', 'APIs', 'Blockchain', 'Utilities', 'AI/ML', 'Development']

export function Browse() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredSkills = MOCK_SKILLS.filter(skill => {
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
            Discover verified knowledge that AI agents can query and use.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="brutal-border-4 shadow-brutal bg-white p-2 flex items-center gap-2">
            <span className="text-2xl px-2">🔍</span>
            <input
              type="text"
              placeholder="Search skills..."
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

        {/* Skills Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map(skill => (
            <div
              key={skill.id}
              className="brutal-card brutal-border-4 shadow-brutal-lg bg-white overflow-hidden cursor-pointer"
            >
              {/* Card Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="bg-brutal-purple/10 text-brutal-purple brutal-border-2 px-2 py-1 text-xs font-bold">
                    {skill.category}
                  </span>
                  {getStatusBadge(skill.status)}
                </div>
                <h3 className="text-xl font-black mb-2">{skill.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{skill.description}</p>
              </div>

              {/* Card Stats */}
              <div className="px-6 pb-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="brutal-border-2 bg-gray-50 p-2 text-center">
                    <div className="text-lg font-black text-brutal-purple">{skill.stake}</div>
                    <div className="text-[10px] font-mono text-gray-500">SOL Staked</div>
                  </div>
                  <div className="brutal-border-2 bg-gray-50 p-2 text-center">
                    <div className="text-lg font-black text-brutal-blue">{skill.queries.toLocaleString()}</div>
                    <div className="text-[10px] font-mono text-gray-500">Queries</div>
                  </div>
                  <div className="brutal-border-2 bg-gray-50 p-2 text-center">
                    <div className="text-lg font-black text-brutal-green">{skill.verifications}</div>
                    <div className="text-[10px] font-mono text-gray-500">Verified</div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="brutal-border-2 border-l-0 border-r-0 border-b-0 bg-gray-50 px-6 py-3 flex items-center justify-between">
                <div className="font-mono text-xs text-gray-500">
                  by <span className="font-bold text-brutal-black">{skill.author}</span>
                </div>
                <button className="px-4 py-2 bg-brutal-purple text-white font-bold text-xs brutal-border-2 shadow-brutal brutal-btn">
                  View →
                </button>
              </div>
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

        {/* Load More */}
        {filteredSkills.length > 0 && (
          <div className="mt-12 text-center">
            <button className="px-8 py-4 bg-brutal-black text-white font-bold brutal-border-4 shadow-brutal-lg brutal-btn">
              Load More Skills
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
