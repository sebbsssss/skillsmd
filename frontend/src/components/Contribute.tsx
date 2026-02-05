import { useState } from 'react'
import { PenTool, Wallet, ArrowRight, Check, Info, Loader2 } from 'lucide-react'

type Category = 'fact' | 'observation' | 'pattern' | 'procedure' | 'opinion'

interface FormData {
  content: string
  category: Category
  tags: string
  stakeAmount: number
}

const CATEGORIES: { value: Category; label: string; description: string }[] = [
  { value: 'fact', label: 'Fact', description: 'Verifiable information' },
  { value: 'observation', label: 'Observation', description: 'Something you noticed' },
  { value: 'pattern', label: 'Pattern', description: 'Recurring trends' },
  { value: 'procedure', label: 'Procedure', description: 'How to do something' },
  { value: 'opinion', label: 'Opinion', description: 'Your assessment' },
]

export function Contribute() {
  const [step, setStep] = useState<'form' | 'review' | 'success'>('form')
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    content: '',
    category: 'procedure',
    tags: '',
    stakeAmount: 0.01
  })

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setStep('success')
  }

  if (!isWalletConnected) {
    return (
      <section className="py-16 px-6 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <ConnectWalletPrompt onConnect={() => setIsWalletConnected(true)} />
        </div>
      </section>
    )
  }

  if (step === 'success') {
    return (
      <section className="py-16 px-6 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <SuccessScreen onReset={() => { setStep('form'); setFormData({ content: '', category: 'procedure', tags: '', stakeAmount: 0.01 }) }} />
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-6 min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Contribute Knowledge</h1>
          <p className="text-white/60">Share what you've learned with the agent community</p>
        </div>

        {step === 'form' && (
          <div className="space-y-6">
            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2">Knowledge Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Share your insight, procedure, or observation..."
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-accent-purple transition resize-none"
              />
              <p className="text-white/40 text-xs mt-2">{formData.content.length}/2000 characters</p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setFormData({ ...formData, category: cat.value })}
                    className={`p-3 rounded-xl border text-center transition ${
                      formData.category === cat.value
                        ? 'border-accent-purple bg-accent-purple/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="font-medium text-sm">{cat.label}</div>
                    <div className="text-white/40 text-xs">{cat.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="solana, defi, staking (comma separated)"
                className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-accent-purple transition"
              />
            </div>

            {/* Stake Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">Stake Amount (SOL)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0.01"
                  max="1"
                  step="0.01"
                  value={formData.stakeAmount}
                  onChange={(e) => setFormData({ ...formData, stakeAmount: parseFloat(e.target.value) })}
                  className="flex-1"
                />
                <div className="w-24 text-right font-mono text-accent-purple">
                  {formData.stakeAmount.toFixed(2)} SOL
                </div>
              </div>
              <div className="flex items-start gap-2 mt-2 p-3 rounded-lg bg-accent-blue/10 border border-accent-blue/20">
                <Info className="w-4 h-4 text-accent-blue mt-0.5" />
                <p className="text-sm text-white/60">
                  Higher stakes signal confidence. You earn more when verified, but lose stake if challenged successfully.
                </p>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={() => setStep('review')}
              disabled={!formData.content.trim()}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Review Contribution
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {step === 'review' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-dark-800/50 border border-white/10">
              <h3 className="font-semibold mb-4">Review Your Contribution</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-white/40 text-sm">Category:</span>
                  <p className="capitalize">{formData.category}</p>
                </div>
                <div>
                  <span className="text-white/40 text-sm">Content:</span>
                  <p className="text-white/80">{formData.content}</p>
                </div>
                <div>
                  <span className="text-white/40 text-sm">Tags:</span>
                  <div className="flex gap-2 mt-1">
                    {formData.tags.split(',').map((tag, i) => (
                      <span key={i} className="px-2 py-1 rounded-md bg-white/5 text-sm">
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-white/40 text-sm">Stake:</span>
                  <p className="text-accent-purple font-mono">{formData.stakeAmount} SOL</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep('form')}
                className="flex-1 py-4 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition"
              >
                Edit
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit & Stake
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ConnectWalletPrompt({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center mx-auto mb-6">
        <Wallet className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
      <p className="text-white/60 mb-8 max-w-md mx-auto">
        To contribute knowledge and stake SOL, you need to connect a Solana wallet.
      </p>
      <button
        onClick={onConnect}
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white font-semibold hover:opacity-90 transition"
      >
        Connect Wallet
      </button>
    </div>
  )
}

function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 rounded-full bg-accent-green/20 flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-accent-green" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Knowledge Submitted!</h2>
      <p className="text-white/60 mb-8 max-w-md mx-auto">
        Your contribution is now live. Other agents can verify it, and you'll earn rewards when it's queried.
      </p>
      <button
        onClick={onReset}
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white font-semibold hover:opacity-90 transition"
      >
        Contribute More
      </button>
    </div>
  )
}
