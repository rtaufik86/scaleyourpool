# ⚡ Quick Setup Checklist

## Before You Start
- [ ] Node.js installed (v18 or higher)
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

## 1️⃣ OpenAI API Setup (5 minutes)

```bash
# Get your API key from:
https://platform.openai.com/api-keys
```

- [ ] Create OpenAI account
- [ ] Generate API key (starts with `sk-...`)
- [ ] Save the key somewhere safe

**Cost**: ~$5-15/month for typical usage

---

## 2️⃣ Supabase Setup (10 minutes)

```bash
# Create project at:
https://supabase.com
```

- [ ] Create Supabase account
- [ ] Create new project
- [ ] Copy Project URL
- [ ] Copy anon/public key
- [ ] Copy service_role key
- [ ] Run SQL from `supabase-schema.sql` in SQL Editor

**Cost**: FREE (up to 500MB database)

---

## 3️⃣ Environment Variables Setup (2 minutes)

Create `.env.local` file in project root:

```env
OPENAI_API_KEY=sk-your-key-here
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

- [ ] Create `.env.local` file
- [ ] Add all 4 environment variables
- [ ] Save file

---

## 4️⃣ Install & Run (3 minutes)

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000

---

## 5️⃣ Test Everything (5 minutes)

### Test Chat Widget:
- [ ] Click orange chat button (bottom-right)
- [ ] Send a message
- [ ] Receive AI response

### Test Lead Capture:
- [ ] Provide email in chat
- [ ] Check Supabase → `leads` table
- [ ] See new lead entry

### Test Application Form:
- [ ] Go to http://localhost:3000/apply
- [ ] Fill out form
- [ ] Submit
- [ ] Check Supabase → `applications` table

---

## ✅ You're Done!

**Total Setup Time**: ~25 minutes
**Monthly Cost**: ~$5-20 (mostly OpenAI API)

---

## 🚨 Common Issues

**Chat not working?**
```bash
# Check if .env.local exists
ls -la .env.local

# Restart server
# Press Ctrl+C, then:
npm run dev
```

**Database not saving?**
- Check Supabase credentials
- Verify tables exist (run schema SQL)

**Still stuck?**
- Check `API-SETUP-GUIDE.md` for detailed troubleshooting
- Check browser console (F12) for errors
- Check terminal for server errors

---

## 📚 Files Reference

- `API-SETUP-GUIDE.md` - Detailed setup instructions
- `supabase-schema.sql` - Database schema
- `env.example` - Environment variables template
- `README.md` - Project overview

---

## 🚀 Next: Deploy to Production

When ready to go live:

1. Push to GitHub
2. Deploy to Vercel (free)
3. Add environment variables in Vercel
4. Connect custom domain
5. Start getting leads! 🎉

**Deployment guide**: See `API-SETUP-GUIDE.md` section "Deployment"
