# 🚀 QUICK START CHECKLIST

Follow these steps in order to deploy your Shopify API:

## ✅ Step 1: Get Your Shopify Credentials

You need these THREE pieces of information from Shopify:

1. **Store URL:** `missha-us.myshopify.com`
   - Found in: Shopify Admin → Settings → General

2. **Admin API Access Token:** `shpat_xxxxxxxxxxxxx`
   - Found in: Shopify Admin → Settings → Apps and sales channels → Develop apps → Your App → API credentials
   - ⚠️ Only shows once! Copy immediately!

3. **API Version:** `2025-04`
   - Use the latest version from your app settings

---

## ✅ Step 2: Sign Up for Vercel

1. Go to: https://vercel.com
2. Click "Sign Up"
3. Use GitHub, GitLab, Email, or Bitbucket
4. Free plan is perfect for this!

---

## ✅ Step 3: Upload Files to GitHub (Optional but Recommended)

1. Go to: https://github.com/new
2. Create repository: `missha-shopify-api`
3. Upload ALL files from `shopify-backend` folder
4. Commit changes

---

## ✅ Step 4: Import to Vercel

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `missha-shopify-api` repo
4. Click "Import"

---

## ✅ Step 5: Add Environment Variables ⚠️ CRITICAL!

Before clicking "Deploy", add these variables:

**Variable 1:**
```
Key: SHOPIFY_STORE
Value: missha-us.myshopify.com
```

**Variable 2:**
```
Key: SHOPIFY_ACCESS_TOKEN
Value: shpat_your_actual_token_here
```

**Variable 3:**
```
Key: SHOPIFY_API_VERSION
Value: 2025-04
```

Click "Add" after each one!

---

## ✅ Step 6: Deploy

1. Click "Deploy" button
2. Wait 1-2 minutes
3. Success! 🎉

---

## ✅ Step 7: Get Your API URL

After deployment:

1. Copy your project URL (looks like: `https://missha-shopify-api.vercel.app`)
2. Your API endpoint is: `https://missha-shopify-api.vercel.app/api/shopify-lookup`
3. **SAVE THIS URL!**

---

## ✅ Step 8: Test Your API

Test in browser or terminal:

```bash
curl -X POST https://your-project.vercel.app/api/shopify-lookup \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

Should return order data or "No order found"

---

## ✅ Step 9: Add to Retell AI

1. Go back to Retell AI custom function
2. Paste your URL in "API Endpoint" field:
   ```
   https://your-project.vercel.app/api/shopify-lookup
   ```
3. Click "Save"
4. Done! 🎊

---

## 🐛 Troubleshooting

**Issue: "Missing Shopify credentials"**
→ Check environment variables in Vercel Settings

**Issue: "401 Unauthorized"**
→ Verify your Shopify access token is correct

**Issue: "No order found" for valid orders**
→ Check email/order number matches exactly

---

## 📞 Need Help?

Read the full `DEPLOYMENT_GUIDE.md` for detailed instructions and screenshots!

---

**Estimated Time: 10-15 minutes**
**Difficulty: Easy**
**Cost: Free (Vercel free tier)**
