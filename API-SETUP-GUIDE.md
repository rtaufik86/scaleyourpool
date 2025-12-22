# Scale Your Pool - API Setup Guide

## 🔑 Required API Keys

You need to set up the following services:

### 1. OpenAI API (Required for Chat Widget)
### 2. Supabase (Required for Lead Storage)

---

## 📋 Step-by-Step Setup

### Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Name it "Scale Your Pool - Production"
5. Copy the key (starts with `sk-...`)
6. **Important**: Save it immediately - you won't see it again!

**Recommended Model**: `gpt-4o-mini` (already configured)
- Cost-effective: ~$0.15 per 1M input tokens
- Fast response times
- Good quality for sales conversations

---

### Step 2: Get Supabase Credentials

1. Go to https://supabase.com
2. Create a new project or use existing one
3. Go to Project Settings → API
4. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`)

---

### Step 3: Create Database Tables

1. In Supabase Dashboard, go to SQL Editor
2. Run the SQL script from `supabase-schema.sql`
3. This creates:
   - `leads` table (for chat widget leads)
   - `applications` table (for Founding Builder Program)

---

### Step 4: Setup Environment Variables

1. In the project root, create a file named `.env.local` (NOT `.env.example`)
2. Copy the content below and replace with your actual keys:

```env
# OpenAI API Configuration
OPENAI_API_KEY=sk-your-actual-openai-key-here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key-here
```

3. Save the file
4. **IMPORTANT**: Never commit `.env.local` to git (it's already in `.gitignore`)

---

### Step 5: Restart Development Server

After adding environment variables:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## ✅ Testing the Setup

### Test Chat Widget:
1. Open http://localhost:3000
2. Click the orange chat button (bottom-right)
3. Type a message
4. You should get an AI response

**If it works**: ✅ OpenAI API is configured correctly

**If you get an error**:
- Check browser console for error messages
- Verify your OpenAI API key is correct
- Make sure you have credits in your OpenAI account

### Test Lead Capture:
1. In the chat, provide email or phone number
2. Check Supabase Dashboard → Table Editor → `leads`
3. You should see a new row with your conversation

**If it works**: ✅ Supabase is configured correctly

---

## 💰 Cost Estimates

### OpenAI API (gpt-4o-mini):
- **Per conversation**: ~$0.001 - $0.003 (very cheap!)
- **100 conversations/day**: ~$0.10 - $0.30/day
- **Monthly (3000 conversations)**: ~$3 - $9/month

### Supabase:
- **Free tier**: Up to 500MB database, 2GB bandwidth
- **Sufficient for**: ~10,000 leads
- **Upgrade needed**: Only if you get massive traffic

**Total estimated cost for starting**: **$5-15/month**

---

## 🔒 Security Best Practices

1. ✅ **Never expose API keys in frontend code**
   - All API calls go through `/api/chat` route (server-side)
   - Keys are only in `.env.local` (server-side)

2. ✅ **Use environment variables**
   - Different keys for development/production
   - Never hardcode keys in code

3. ✅ **Supabase Row Level Security (RLS)**
   - Already enabled in schema
   - Service role bypasses RLS (for backend only)

4. ✅ **Rate limiting** (Optional but recommended)
   - Consider adding rate limiting to prevent abuse
   - Can use Vercel's built-in rate limiting

---

## 🚀 Deployment (Vercel)

When deploying to production:

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel Dashboard:
   - Project Settings → Environment Variables
   - Add all 4 variables from `.env.local`
4. Deploy!

**Important**: Use different API keys for production vs development

---

## 🆘 Troubleshooting

### "OpenAI API error: 401 Unauthorized"
- Your API key is invalid or expired
- Check if you copied the full key (starts with `sk-`)
- Verify you have credits in OpenAI account

### "Failed to save lead to database"
- Check Supabase credentials
- Verify database tables exist (run schema SQL)
- Check Supabase logs in dashboard

### "Chat widget not responding"
- Open browser console (F12)
- Look for error messages
- Check if `/api/chat` endpoint is working

### "Environment variables not loading"
- File must be named `.env.local` (not `.env`)
- Must be in project root directory
- Restart dev server after adding variables

---

## 📞 Support

If you need help:
1. Check error messages in browser console
2. Check server logs in terminal
3. Verify all environment variables are set correctly
4. Make sure database tables are created

---

## 🎯 Next Steps After Setup

1. ✅ Test chat widget thoroughly
2. ✅ Customize AI prompt in `src/app/api/chat/route.ts`
3. ✅ Test lead capture in Supabase
4. ✅ Test application form submission
5. ✅ Deploy to production (Vercel)
6. ✅ Set up custom domain
7. ✅ Monitor usage and costs

---

**Setup Complete!** 🎉

Your AI Sales Concierge is now ready to qualify leads 24/7!
