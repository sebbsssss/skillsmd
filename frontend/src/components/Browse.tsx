import { useState, useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'

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
    title: 'Weather Forecast API',
    description: 'Get current weather and 7-day forecasts for any location worldwide using Open-Meteo.',
    fullDescription: `Fetches weather data from Open-Meteo, a free and open-source weather API that requires no API key.

**API Endpoint:** https://api.open-meteo.com/v1/forecast

**Features:**
- Current conditions (temp, humidity, wind, UV index)
- Hourly forecasts up to 16 days
- Daily min/max temperatures
- Precipitation probability
- Sunrise/sunset times

**Rate Limits:** Unlimited for non-commercial use

Supports coordinates or can be combined with geocoding for city names.`,
    category: 'Data',
    author: 'CJta...H1s8',
    stake: 0.3,
    queries: 4521,
    verifications: 12,
    status: 'verified',
    usage: 'Provide latitude/longitude or city name to get weather forecast.',
    parameters: [
      { name: 'latitude', type: 'number', description: 'Location latitude (e.g., 40.7128 for NYC)' },
      { name: 'longitude', type: 'number', description: 'Location longitude (e.g., -74.0060 for NYC)' },
      { name: 'daily', type: 'string', description: 'Daily variables: temperature_2m_max, precipitation_sum, etc.' },
      { name: 'timezone', type: 'string', description: 'Timezone for times (e.g., "America/New_York")' }
    ],
    example: {
      query: 'GET https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min&timezone=America/New_York',
      response: `{
  "current": {
    "temperature_2m": 18.5,
    "weathercode": 2
  },
  "daily": {
    "temperature_2m_max": [22, 24, 19, 21, 23, 20, 18],
    "temperature_2m_min": [14, 16, 12, 13, 15, 12, 11]
  }
}`
    },
    createdAt: '2026-01-15'
  },
  {
    id: '2',
    title: 'Web Page Summarizer',
    description: 'Extract and summarize the main content from any URL into concise bullet points.',
    fullDescription: `Fetches a webpage, extracts the main article content (removing ads, navigation, footers), and generates a structured summary.

**Process:**
1. Fetch URL with proper headers
2. Parse HTML and extract main content using readability algorithms
3. Clean and normalize text
4. Generate summary with key points

**Handles:**
- News articles, blog posts, documentation
- Paywalled content (when accessible)
- Dynamic content (with JS rendering option)

Returns title, author, publish date, reading time, and bullet-point summary.`,
    category: 'Text',
    author: '7Kv2...9xMn',
    stake: 0.5,
    queries: 3892,
    verifications: 8,
    status: 'verified',
    usage: 'Provide any URL to get extracted content and summary.',
    parameters: [
      { name: 'url', type: 'string', description: 'Full URL of the page to summarize' },
      { name: 'maxPoints', type: 'number', description: 'Maximum bullet points in summary (default: 5)' },
      { name: 'includeQuotes', type: 'boolean', description: 'Include key quotes from the article' }
    ],
    example: {
      query: 'Summarize: https://example.com/article/ai-advances-2026',
      response: `{
  "title": "Major AI Advances in 2026",
  "author": "Jane Smith",
  "publishDate": "2026-01-20",
  "readingTime": "8 min",
  "summary": [
    "Multimodal AI models now process text, images, and video simultaneously",
    "Agent frameworks have become the dominant paradigm for AI applications", 
    "On-device AI runs complex models without cloud connectivity",
    "AI coding assistants now write 40% of production code",
    "Regulatory frameworks established in 45 countries"
  ]
}`
    },
    createdAt: '2026-01-18'
  },
  {
    id: '3',
    title: 'Timezone Converter',
    description: 'Convert times between any timezones with DST awareness and natural language support.',
    fullDescription: `Handles all timezone conversions with full daylight saving time awareness.

**Features:**
- Convert between any IANA timezones
- Natural language input ("3pm Tokyo time in London")
- DST-aware calculations
- Business hours checker
- Meeting time optimizer for multiple zones

**Supports:**
- All IANA timezone identifiers
- Common abbreviations (PST, EST, GMT, JST)
- City names for major cities
- UTC offsets`,
    category: 'Utilities',
    author: '3Pq1...kL4j',
    stake: 0.2,
    queries: 6234,
    verifications: 15,
    status: 'verified',
    usage: 'Provide time, source timezone, and target timezone.',
    parameters: [
      { name: 'time', type: 'string', description: 'Time to convert (ISO 8601 or natural language)' },
      { name: 'from', type: 'string', description: 'Source timezone (e.g., "America/New_York", "PST", "Tokyo")' },
      { name: 'to', type: 'string', description: 'Target timezone or array of timezones' }
    ],
    example: {
      query: 'Convert "2026-02-05 15:00" from America/New_York to Europe/London, Asia/Tokyo',
      response: `{
  "input": "2026-02-05T15:00:00-05:00",
  "conversions": [
    {"timezone": "Europe/London", "time": "2026-02-05T20:00:00+00:00", "label": "8:00 PM GMT"},
    {"timezone": "Asia/Tokyo", "time": "2026-02-06T05:00:00+09:00", "label": "5:00 AM JST (+1 day)"}
  ],
  "isDST": {"America/New_York": false, "Europe/London": false}
}`
    },
    createdAt: '2026-01-20'
  },
  {
    id: '4',
    title: 'JSON Schema Validator',
    description: 'Validate JSON data against schemas with detailed error messages and auto-fix suggestions.',
    fullDescription: `Validates JSON documents against JSON Schema (draft-07 and later) with comprehensive error reporting.

**Features:**
- Full JSON Schema draft-07, 2019-09, 2020-12 support
- Detailed error messages with JSON paths
- Auto-fix suggestions for common issues
- Schema inference from sample data
- Multiple output formats (simple, detailed, annotated)

**Use Cases:**
- API request/response validation
- Configuration file validation
- Data pipeline quality checks`,
    category: 'Utilities',
    author: '9Abc...Def1',
    stake: 0.25,
    queries: 2847,
    verifications: 10,
    status: 'verified',
    usage: 'Provide JSON data and schema to validate.',
    parameters: [
      { name: 'data', type: 'object', description: 'JSON data to validate' },
      { name: 'schema', type: 'object', description: 'JSON Schema to validate against' },
      { name: 'options', type: 'object', description: 'Optional: allErrors, coerceTypes, removeAdditional' }
    ],
    example: {
      query: `Validate: {"name": "John", "age": "25"} against schema requiring name (string) and age (integer)`,
      response: `{
  "valid": false,
  "errors": [
    {
      "path": "/age",
      "message": "must be integer",
      "actual": "string",
      "expected": "integer"
    }
  ],
  "suggestions": [
    {"path": "/age", "fix": "Convert string '25' to integer 25"}
  ]
}`
    },
    createdAt: '2026-01-22'
  },
  {
    id: '5',
    title: 'Language Translator',
    description: 'Translate text between 100+ languages with context awareness and formality options.',
    fullDescription: `High-quality translation using multiple providers with automatic fallback.

**Supported Languages:** 100+ including all major languages and many regional ones

**Features:**
- Context-aware translation (formal/informal)
- Technical terminology handling
- Preserve formatting (markdown, HTML)
- Batch translation support
- Language detection
- Transliteration for non-Latin scripts

**Quality:** Uses ensemble of translation models for best results.`,
    category: 'Text',
    author: '2Xyz...Uvw3',
    stake: 0.4,
    queries: 5621,
    verifications: 9,
    status: 'verified',
    usage: 'Provide text and target language for translation.',
    parameters: [
      { name: 'text', type: 'string', description: 'Text to translate' },
      { name: 'from', type: 'string', description: 'Source language code or "auto" for detection' },
      { name: 'to', type: 'string', description: 'Target language code (e.g., "es", "ja", "de")' },
      { name: 'formality', type: 'string', description: 'Optional: "formal", "informal", or "auto"' }
    ],
    example: {
      query: 'Translate "Hello, how can I help you today?" to Japanese (formal)',
      response: `{
  "translation": "こんにちは、本日はどのようなご用件でしょうか？",
  "transliteration": "Konnichiwa, honjitsu wa dono yō na go-yōken deshō ka?",
  "detectedLanguage": "en",
  "confidence": 0.98,
  "formality": "formal"
}`
    },
    createdAt: '2026-01-25'
  },
  {
    id: '6',
    title: 'Code Syntax Explainer',
    description: 'Explain code snippets in plain English with line-by-line breakdowns.',
    fullDescription: `Analyzes code in 50+ programming languages and provides clear explanations.

**Supported Languages:** Python, JavaScript, TypeScript, Rust, Go, Java, C++, Ruby, SQL, and 40+ more

**Explanation Levels:**
- Beginner: Explains basic concepts
- Intermediate: Focuses on logic flow
- Expert: Discusses performance and patterns

**Features:**
- Line-by-line annotations
- Complexity analysis (Big O)
- Security issue detection
- Best practice suggestions
- Alternative implementations`,
    category: 'Development',
    author: '5Mno...Pqr7',
    stake: 0.5,
    queries: 3156,
    verifications: 7,
    status: 'verified',
    usage: 'Provide code snippet and optionally specify language and explanation level.',
    parameters: [
      { name: 'code', type: 'string', description: 'Code snippet to explain' },
      { name: 'language', type: 'string', description: 'Programming language (auto-detected if not provided)' },
      { name: 'level', type: 'string', description: 'Explanation level: "beginner", "intermediate", "expert"' }
    ],
    example: {
      query: `Explain: const debounce = (fn, ms) => { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => fn(...args), ms); }; };`,
      response: `{
  "language": "JavaScript",
  "summary": "A debounce function that delays execution until after a pause in calls",
  "explanation": [
    "Creates a closure that stores a timeout reference",
    "Returns a new function that can accept any arguments",
    "Clears any pending timeout on each call",
    "Sets a new timeout to call the original function after 'ms' milliseconds",
    "Only the last call within the delay period will execute"
  ],
  "useCase": "Commonly used for search inputs, window resize handlers, and API calls",
  "complexity": "O(1) per call"
}`
    },
    createdAt: '2026-01-28'
  },
  {
    id: '7',
    title: 'Unit Converter',
    description: 'Convert between any units of measurement including length, weight, temperature, and currency.',
    fullDescription: `Comprehensive unit conversion supporting 1000+ units across all measurement systems.

**Categories:**
- Length, Area, Volume
- Weight, Mass
- Temperature
- Time, Speed
- Digital storage
- Currency (real-time rates)
- Cooking measurements
- Scientific units

**Features:**
- Real-time currency rates
- Precision control
- Unit aliases (lb/pound, kg/kilogram)
- Compound units (mph, km/h)`,
    category: 'Utilities',
    author: '8Rst...Xyz9',
    stake: 0.2,
    queries: 4892,
    verifications: 14,
    status: 'verified',
    usage: 'Provide value, source unit, and target unit.',
    parameters: [
      { name: 'value', type: 'number', description: 'Numeric value to convert' },
      { name: 'from', type: 'string', description: 'Source unit (e.g., "kg", "miles", "celsius")' },
      { name: 'to', type: 'string', description: 'Target unit' },
      { name: 'precision', type: 'number', description: 'Decimal places (default: 4)' }
    ],
    example: {
      query: 'Convert 72 fahrenheit to celsius',
      response: `{
  "input": {"value": 72, "unit": "fahrenheit"},
  "output": {"value": 22.2222, "unit": "celsius"},
  "formula": "(72°F − 32) × 5/9 = 22.22°C",
  "formatted": "72°F = 22.22°C"
}`
    },
    createdAt: '2026-01-30'
  },
  {
    id: '8',
    title: 'Regular Expression Builder',
    description: 'Generate and explain regex patterns from natural language descriptions.',
    fullDescription: `Creates regular expressions from plain English descriptions and explains existing patterns.

**Features:**
- Natural language to regex conversion
- Regex to plain English explanation
- Test against sample strings
- Multiple regex flavors (JS, Python, PCRE)
- Common pattern library
- Optimization suggestions

**Includes:**
- Email, URL, phone validation patterns
- Date/time formats
- IP addresses, credit cards
- Custom pattern generation`,
    category: 'Development',
    author: '4Def...Ghi2',
    stake: 0.35,
    queries: 2341,
    verifications: 6,
    status: 'verified',
    usage: 'Describe the pattern you need or provide a regex to explain.',
    parameters: [
      { name: 'description', type: 'string', description: 'Natural language description of pattern needed' },
      { name: 'testStrings', type: 'array', description: 'Optional: strings to test the pattern against' },
      { name: 'flavor', type: 'string', description: 'Regex flavor: "javascript", "python", "pcre"' }
    ],
    example: {
      query: 'Create regex for US phone numbers with optional country code',
      response: `{
  "pattern": "^(\\\\+1[-.\\\\s]?)?\\\\(?[0-9]{3}\\\\)?[-.\\\\s]?[0-9]{3}[-.\\\\s]?[0-9]{4}$",
  "explanation": "Matches: +1-555-123-4567, (555) 123-4567, 555.123.4567, 5551234567",
  "breakdown": [
    "(\\\\+1[-.\\\\s]?)? - Optional +1 country code with separator",
    "\\\\(?[0-9]{3}\\\\)? - Area code with optional parentheses",
    "[-.\\\\s]? - Optional separator",
    "[0-9]{3}[-.\\\\s]?[0-9]{4} - 7-digit local number"
  ],
  "flags": "i"
}`
    },
    createdAt: '2026-02-01'
  },
]

const CATEGORIES = ['All', 'Data', 'Text', 'Utilities', 'Development']

export function Browse() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)
  const [queryModal, setQueryModal] = useState<Skill | null>(null)
  const [queryResult, setQueryResult] = useState<string | null>(null)
  const [isQuerying, setIsQuerying] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  
  const { publicKey, connected } = useWallet()
  const { setVisible } = useWalletModal()

  const showNotification = useCallback((message: string) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }, [])

  const handleQuery = useCallback((skill: Skill) => {
    setQueryModal(skill)
    setQueryResult(null)
  }, [])

  const executeQuery = useCallback(async () => {
    if (!queryModal) return
    
    setIsQuerying(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setQueryResult(queryModal.example.response)
    setIsQuerying(false)
  }, [queryModal])

  const handleVerify = useCallback((skill: Skill) => {
    if (!connected) {
      setVisible(true)
      showNotification('Connect wallet to verify skills')
      return
    }
    // Simulate verification
    showNotification(`✅ Verification submitted for "${skill.title}" (0.1 SOL staked)`)
  }, [connected, setVisible, showNotification])

  const handleCopyId = useCallback((skill: Skill) => {
    navigator.clipboard.writeText(skill.id)
    showNotification(`📋 Copied skill ID: ${skill.id}`)
  }, [showNotification])

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
            Practical, verified knowledge for AI agents — from web scraping to code analysis.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="brutal-border-4 shadow-brutal bg-white p-2 flex items-center gap-2">
            <span className="text-2xl px-2">🔍</span>
            <input
              type="text"
              placeholder="Search skills... (e.g., 'translate', 'weather', 'regex')"
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
                      <button 
                        onClick={() => handleQuery(skill)}
                        className="px-6 py-3 bg-brutal-green font-bold brutal-border-4 shadow-brutal brutal-btn"
                      >
                        🔗 Query This Skill
                      </button>
                      <button 
                        onClick={() => handleVerify(skill)}
                        className="px-6 py-3 bg-brutal-purple text-white font-bold brutal-border-4 shadow-brutal brutal-btn"
                      >
                        ✅ Verify (Stake 0.1 SOL)
                      </button>
                      <button 
                        onClick={() => handleCopyId(skill)}
                        className="px-6 py-3 bg-white font-bold brutal-border-4 shadow-brutal brutal-btn"
                      >
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

      {/* Query Modal */}
      {queryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="brutal-border-4 shadow-brutal-xl bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-brutal-green p-4 brutal-border-4 border-t-0 border-l-0 border-r-0 flex items-center justify-between">
              <h3 className="font-black text-lg">🔗 Query: {queryModal.title}</h3>
              <button 
                onClick={() => setQueryModal(null)}
                className="w-8 h-8 bg-white brutal-border-2 font-black brutal-btn"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="font-bold text-sm block mb-2">Example Query</label>
                <div className="brutal-border-2 bg-gray-100 p-3 font-mono text-sm overflow-x-auto">
                  {queryModal.example.query}
                </div>
              </div>

              {!queryResult ? (
                <button
                  onClick={executeQuery}
                  disabled={isQuerying}
                  className={`w-full py-4 font-black text-lg brutal-border-4 shadow-brutal brutal-btn ${
                    isQuerying 
                      ? 'bg-brutal-yellow cursor-wait' 
                      : 'bg-brutal-purple text-white'
                  }`}
                >
                  {isQuerying ? '⏳ Querying...' : '⚡ Execute Query (0.001 SOL)'}
                </button>
              ) : (
                <div>
                  <label className="font-bold text-sm block mb-2">✅ Response</label>
                  <div className="brutal-border-4 bg-brutal-black p-4 overflow-x-auto">
                    <pre className="text-brutal-green font-mono text-sm whitespace-pre-wrap">{queryResult}</pre>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(queryResult)
                        showNotification('📋 Response copied!')
                      }}
                      className="flex-1 py-3 font-bold brutal-border-4 shadow-brutal brutal-btn bg-white"
                    >
                      📋 Copy Response
                    </button>
                    <button
                      onClick={() => setQueryResult(null)}
                      className="flex-1 py-3 font-bold brutal-border-4 shadow-brutal brutal-btn bg-brutal-yellow"
                    >
                      🔄 Query Again
                    </button>
                  </div>
                </div>
              )}

              <p className="text-xs font-mono text-gray-500 text-center">
                {connected 
                  ? `Connected: ${publicKey?.toBase58().slice(0,8)}...` 
                  : 'Demo mode — connect wallet for real queries'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="brutal-border-4 shadow-brutal-lg bg-brutal-yellow px-6 py-4 font-bold">
            {notification}
          </div>
        </div>
      )}
    </section>
  )
}
