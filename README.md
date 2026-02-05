# skills.md 📚

**The on-chain knowledge library for AI agents.**

> Wikipedia taught us that collective knowledge beats any single source. skills.md brings that power to AI agents.

🌐 **Live Demo:** [skillsmd.ai](https://www.skillsmd.ai)  
🏆 **Hackathon:** [Colosseum Agent Hackathon](https://colosseum.com/agent-hackathon/projects/skills-md)  
📖 **Docs:** Coming soon

---

## What is skills.md?

A shared knowledge commons where:

- 🧠 **Anyone contributes** — Share your expertise as structured "skills" (markdown)
- 💰 **Stake to signal quality** — Put SOL behind your knowledge
- ✅ **Community verifies** — Stake-weighted voting ensures accuracy
- 🤖 **Agents query & pay** — x402 micropayments per query
- 📈 **Contributors earn** — Passive income from your expertise

Think **Wikipedia + Stack Overflow + Substack** — but purpose-built for AI agents.

---

## Why On-Chain?

| Feature | Benefit |
|---------|---------|
| 🔒 **Immutable** | Knowledge can't be deleted or censored |
| ⚖️ **Skin in the game** | Economic incentives for accuracy |
| 🌍 **Globally accessible** | Any agent, anywhere, no API keys |
| 💸 **Fair compensation** | No platform taking 30% |
| 🤝 **Composable** | Skills can cite other skills |

---

## Example Skills

Real, practical knowledge AI agents actually need:

- 🌤️ **Weather Forecast API** — Open-Meteo integration
- 🌍 **Language Translator** — 100+ languages
- ⏰ **Timezone Converter** — DST-aware
- ✅ **JSON Schema Validator** — With auto-fix suggestions
- 💻 **Code Explainer** — 50+ languages
- 🔤 **Regex Builder** — Natural language to regex

---

## Quick Start

### For Contributors

1. Visit [skillsmd.ai](https://www.skillsmd.ai)
2. Connect your Phantom wallet
3. Write your skill in markdown
4. Stake SOL and submit
5. Earn when agents query your skill

### For Agents

```bash
# Query a skill (coming soon)
curl -X POST https://api.skillsmd.ai/query \
  -H "x-402-payment: <payment-token>" \
  -d '{"skill": "weather-forecast", "params": {"city": "Tokyo"}}'
```

---

## Tech Stack

- **Blockchain:** Solana (devnet)
- **Smart Contracts:** Anchor
- **Storage:** IPFS
- **Payments:** x402 micropayments
- **Frontend:** React + Vite + Tailwind
- **Design:** Neobrutalist 🎨

---

## Project Structure

```
skillsmd/
├── programs/           # Anchor smart contracts
│   └── skillsmd/       # Main program (contribute, verify, query)
├── app/                # Express API backend
├── frontend/           # React frontend
└── skill.md            # Meta: skill.md as a skill
```

---

## Roadmap

- [x] Frontend with wallet integration
- [x] Skill registry UI
- [x] Contribute flow
- [ ] Deploy Anchor program to devnet
- [ ] IPFS content storage
- [ ] x402 payment integration
- [ ] Agent SDK
- [ ] Mainnet launch

---

## Contributing

We welcome contributions! Whether it's:

- 🐛 Bug reports
- 💡 Feature suggestions
- 📝 Documentation improvements
- 🔧 Code contributions

---

## Links

- 🐦 Twitter: [@sebbsssss](https://twitter.com/sebbsssss)
- 💬 Telegram: [@sebbssss](https://t.me/sebbssss)
- 🏆 Hackathon: [Colosseum Agent Hackathon](https://colosseum.com/agent-hackathon)

---

## License

MIT

---

**Built for the [Colosseum Agent Hackathon](https://colosseum.com/agent-hackathon)** 🏛️

*The best time to contribute was yesterday. The second best time is now.*
