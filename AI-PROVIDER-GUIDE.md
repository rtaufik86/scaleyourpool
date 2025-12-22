# 🤖 AI Provider Configuration Guide

## Overview

Scale Your Pool supports **two AI providers**:
1. **OpenAI** (GPT-4o-mini) - Default, cost-effective
2. **Claude** (Anthropic) - Alternative, high quality

You can switch between them using environment variables.

---

## 🔄 Switching AI Providers

### Option 1: OpenAI (Default - Recommended)

**Model**: `gpt-4o-mini`
**Cost**: ~$0.15 per 1M input tokens
**Speed**: Very fast
**Quality**: Excellent for sales conversations

**Setup**:
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-proj-your-key-here
```

**Get API Key**: https://platform.openai.com/api-keys

---

### Option 2: Claude (Anthropic)

**Model**: `claude-3-5-sonnet-20241022`
**Cost**: ~$3 per 1M input tokens
**Speed**: Fast
**Quality**: Exceptional reasoning and conversation

**Setup**:
```env
AI_PROVIDER=claude
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Get API Key**: https://console.anthropic.com/settings/keys

---

## 📊 Comparison

| Feature | OpenAI (gpt-4o-mini) | Claude (Sonnet 3.5) |
|---------|---------------------|---------------------|
| **Cost per 1M tokens** | $0.15 | $3.00 |
| **Speed** | ⚡⚡⚡ Very Fast | ⚡⚡ Fast |
| **Quality** | ⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐⭐ Exceptional |
| **Best for** | High volume, cost-sensitive | Premium quality |
| **Recommended** | ✅ Yes (default) | For specific use cases |

---

## 💰 Cost Estimates

### OpenAI (gpt-4o-mini):
- **Per conversation**: $0.001 - $0.003
- **100 conversations/day**: $0.10 - $0.30/day
- **Monthly (3000 conversations)**: **$3 - $9/month**

### Claude (Sonnet 3.5):
- **Per conversation**: $0.02 - $0.06
- **100 conversations/day**: $2 - $6/day
- **Monthly (3000 conversations)**: **$60 - $180/month**

**Recommendation**: Start with OpenAI for cost-effectiveness

---

## 🔧 Setup Instructions

### Step 1: Choose Your Provider

Edit `.env.local`:

```env
# Choose: "openai" or "claude"
AI_PROVIDER=openai
```

### Step 2: Add API Keys

**For OpenAI**:
```env
OPENAI_API_KEY=sk-proj-xxxxx
```

**For Claude**:
```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

**Pro Tip**: You can add BOTH keys and switch between them anytime!

### Step 3: Restart Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

---

## 🧪 Testing

### Test OpenAI:
1. Set `AI_PROVIDER=openai` in `.env.local`
2. Restart server
3. Open chat widget
4. Send a message
5. Check response quality and speed

### Test Claude:
1. Set `AI_PROVIDER=claude` in `.env.local`
2. Restart server
3. Open chat widget
4. Send a message
5. Compare response quality

---

## 🎯 Which Provider Should You Use?

### Use **OpenAI** if:
- ✅ You want the most cost-effective solution
- ✅ You expect high conversation volume
- ✅ Speed is important
- ✅ Quality is "good enough" (it's excellent!)

### Use **Claude** if:
- ✅ You want the absolute best conversation quality
- ✅ Budget is not a primary concern
- ✅ You're handling complex, nuanced conversations
- ✅ You want exceptional reasoning capabilities

**Our Recommendation**: Start with **OpenAI (gpt-4o-mini)**
- It's 20x cheaper
- Quality is excellent for sales conversations
- Very fast response times
- You can always switch to Claude later if needed

---

## 🔒 Security Notes

1. **Never expose API keys in frontend**
   - All API calls go through `/api/chat` (server-side)
   - Keys stay in `.env.local`

2. **Use different keys for dev/prod**
   - Development: Test keys with limits
   - Production: Production keys with monitoring

3. **Monitor usage**
   - OpenAI: https://platform.openai.com/usage
   - Anthropic: https://console.anthropic.com/settings/billing

---

## 🚨 Troubleshooting

### "AI_PROVIDER not recognized"
- Check `.env.local` has `AI_PROVIDER=openai` or `AI_PROVIDER=claude`
- Restart dev server

### "OpenAI API error: 401"
- Invalid API key
- Check you copied the full key
- Verify you have credits

### "Anthropic API error: 401"
- Invalid API key
- Check key starts with `sk-ant-`
- Verify account has credits

### "Module '@anthropic-ai/sdk' not found"
- Run: `npm install @anthropic-ai/sdk`
- Restart server

---

## 📈 Monitoring & Optimization

### Track Costs:
1. **OpenAI Dashboard**: https://platform.openai.com/usage
2. **Anthropic Console**: https://console.anthropic.com/settings/billing

### Optimize Costs:
- Use OpenAI for most conversations
- Switch to Claude only for complex cases
- Monitor token usage
- Set up usage alerts

### A/B Testing:
- Run OpenAI for 1 week
- Run Claude for 1 week
- Compare:
  - Lead quality
  - Conversion rates
  - User satisfaction
  - Cost per lead

---

## 🎓 Best Practices

1. **Start with OpenAI**
   - Lower cost, excellent quality
   - Scale up first

2. **Monitor Performance**
   - Track conversation quality
   - Measure lead conversion
   - Calculate cost per lead

3. **Switch if Needed**
   - If quality isn't meeting expectations
   - If you need better reasoning
   - If budget allows

4. **Keep Both Keys**
   - Easy to switch
   - Can A/B test
   - Fallback option

---

## 🚀 Production Deployment

When deploying to Vercel:

1. Add environment variables:
   ```
   AI_PROVIDER=openai
   OPENAI_API_KEY=sk-proj-xxxxx
   ANTHROPIC_API_KEY=sk-ant-xxxxx (optional)
   ```

2. Deploy and test

3. Monitor usage and costs

4. Optimize based on data

---

**Setup Complete!** 🎉

You now have the flexibility to use either OpenAI or Claude for your AI Sales Concierge!
