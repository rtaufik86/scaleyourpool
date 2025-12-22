# 🚀 Vercel Deployment Guide - Scale Your Pool

## ✅ Pre-Deployment Checklist

- [x] Git repository initialized
- [x] All files committed
- [x] .gitignore configured
- [ ] Environment variables ready
- [ ] Vercel account created

---

## 📋 Step-by-Step Deployment

### **Option A: Deploy via Vercel CLI (Recommended)**

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → scaleyourpool (or your choice)
- **Directory?** → ./ (current directory)
- **Override settings?** → No

#### 4. Deploy to Production
```bash
vercel --prod
```

---

### **Option B: Deploy via Vercel Dashboard (Easier)**

#### 1. Push to GitHub
```bash
# Create new repository on GitHub first
git remote add origin https://github.com/YOUR_USERNAME/scaleyourpool.git
git branch -M main
git push -u origin main
```

#### 2. Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Click **"Deploy"**

---

## 🔑 Environment Variables Setup

### **CRITICAL: Add These in Vercel Dashboard**

After deployment, go to:
**Project Settings → Environment Variables**

Add the following:

```env
# AI Provider
AI_PROVIDER=claude

# Claude API (Recommended)
ANTHROPIC_API_KEY=sk-ant-your-key-here

# OpenAI API (Alternative)
OPENAI_API_KEY=sk-proj-your-key-here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Important**: 
- Add to **Production**, **Preview**, and **Development** environments
- Click **"Save"** after each variable
- Redeploy after adding variables

---

## 🔧 Vercel Configuration

### **Build Settings** (Auto-detected)

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### **Root Directory**
```
./
```

---

## 📊 Post-Deployment Checklist

### 1. **Verify Deployment**
- [ ] Visit your Vercel URL (e.g., `scaleyourpool.vercel.app`)
- [ ] Check homepage loads correctly
- [ ] Test AI chat widget
- [ ] Verify all pages (Privacy, Terms, Contact, Apply)
- [ ] Test on mobile

### 2. **Test AI Chat**
- [ ] Open chat widget
- [ ] Send test message
- [ ] Verify AI responds
- [ ] Check conversation flow
- [ ] Test contact info capture

### 3. **Check Environment Variables**
- [ ] Go to Vercel Dashboard → Settings → Environment Variables
- [ ] Verify all 5 variables are set
- [ ] Check they're enabled for Production

### 4. **Monitor Logs**
- [ ] Go to Vercel Dashboard → Deployments
- [ ] Click on latest deployment
- [ ] Check "Functions" tab for API logs
- [ ] Look for any errors

---

## 🌐 Custom Domain Setup (Optional)

### **Add Custom Domain**

1. Go to **Project Settings → Domains**
2. Click **"Add Domain"**
3. Enter your domain: `scaleyourpool.com`
4. Follow DNS configuration instructions

### **DNS Settings** (Example for Namecheap/GoDaddy)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21
```

---

## 🐛 Troubleshooting

### **Issue: Build Failed**
```bash
# Check build locally first
npm run build
```

### **Issue: AI Chat Not Working**
1. Check environment variables are set
2. Verify API keys are valid
3. Check Function logs in Vercel Dashboard

### **Issue: 404 on Pages**
- Ensure all files are committed
- Check file names match routes
- Redeploy

### **Issue: Slow Performance**
- Enable Edge Runtime (already configured)
- Check image optimization
- Monitor Function execution time

---

## 📈 Monitoring & Analytics

### **Vercel Analytics** (Free)
1. Go to **Analytics** tab
2. Enable Web Analytics
3. Monitor:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### **Function Logs**
1. Go to **Deployments** → Latest
2. Click **"Functions"** tab
3. Monitor API calls
4. Check for errors

---

## 💰 Cost Estimation

### **Vercel Free Tier**
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Edge Network
- ✅ Analytics

**Enough for**: ~10,000 visitors/month

### **If You Exceed Free Tier**
- **Pro Plan**: $20/month
- **Enterprise**: Custom pricing

### **AI API Costs** (Separate)
- **Claude Sonnet 4**: ~$3 per 1M tokens
- **GPT-4o**: ~$2.50 per 1M tokens

**Estimated**: $60-90/month for 3000 conversations

---

## 🎯 Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm scaleyourpool
```

---

## ✅ Success Checklist

After deployment, verify:

- [ ] ✅ Homepage loads at `your-domain.vercel.app`
- [ ] ✅ AI chat widget appears
- [ ] ✅ Chat responds to messages
- [ ] ✅ All pages accessible (Privacy, Terms, Contact, Apply)
- [ ] ✅ Logo displays correctly
- [ ] ✅ Countdown timer works
- [ ] ✅ Application form submits
- [ ] ✅ Mobile responsive
- [ ] ✅ HTTPS enabled
- [ ] ✅ Custom domain configured (if applicable)

---

## 🚀 You're Live!

Your Scale Your Pool website is now live on Vercel! 🎉

**Next Steps:**
1. Share your URL
2. Monitor analytics
3. Collect leads
4. Iterate based on feedback

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Next.js Docs: https://nextjs.org/docs
