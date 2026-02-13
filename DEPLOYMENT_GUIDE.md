# 🚀 Shopify Backend API - Deployment Guide

This guide will help you deploy the Shopify order lookup API to Vercel in under 10 minutes.

---

## 📋 Prerequisites

Before you start, make sure you have:

1. ✅ **Shopify Admin API Access Token** (from your Shopify custom app)
2. ✅ **Your Shopify store URL** (e.g., `missha-us.myshopify.com`)
3. ✅ A GitHub account (free) - or you can upload files directly to Vercel

---

## 🎯 Deployment Steps

### **Option 1: Deploy via Vercel Dashboard (Easiest - No GitHub needed)**

#### Step 1: Sign Up for Vercel
1. Go to https://vercel.com
2. Click **"Sign Up"**
3. You can sign up with:
   - Email
   - GitHub (recommended)
   - GitLab
   - Bitbucket

#### Step 2: Create New Project
1. Once logged in, click **"Add New..."** → **"Project"**
2. Choose **"Browse All Templates"** or **"Deploy from a Git repository"**
3. If you don't want to use Git, scroll down and look for **"Deploy with CLI"** or use the manual upload method below

#### Step 3: Manual Upload Method (No Git Required)
1. Download all the files in this `shopify-backend` folder to your computer
2. In Vercel dashboard, click **"Add New..."** → **"Project"**
3. Look for an option to upload files or use Vercel CLI
4. Or follow the GitHub method below for easier deployment

---

### **Option 2: Deploy via GitHub (Recommended)**

#### Step 1: Create GitHub Repository
1. Go to https://github.com
2. Sign in or create an account
3. Click **"New repository"** (green button)
4. Name it: `missha-shopify-api`
5. Set to **"Public"** or **"Private"**
6. Click **"Create repository"**

#### Step 2: Upload Files to GitHub
1. Click **"uploading an existing file"** link
2. Drag and drop ALL files from the `shopify-backend` folder:
   - `api/shopify-lookup.js`
   - `package.json`
   - `vercel.json`
   - `.env.example`
3. Click **"Commit changes"**

#### Step 3: Import to Vercel
1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your `missha-shopify-api` repository
4. Click **"Import"**

#### Step 4: Configure Environment Variables ⚠️ **CRITICAL STEP**
Before deploying, you MUST add your Shopify credentials:

1. In the Vercel project setup page, scroll down to **"Environment Variables"**
2. Add these three variables:

   **Variable 1:**
   - Key: `SHOPIFY_STORE`
   - Value: `missha-us.myshopify.com` (your actual store URL without https://)

   **Variable 2:**
   - Key: `SHOPIFY_ACCESS_TOKEN`
   - Value: `shpat_xxxxxxxxxxxxx` (your actual Shopify Admin API token)

   **Variable 3:**
   - Key: `SHOPIFY_API_VERSION`
   - Value: `2025-04`

3. Click **"Add"** after each variable

#### Step 5: Deploy
1. After adding all environment variables, click **"Deploy"**
2. Wait 1-2 minutes for deployment to complete
3. You'll see a success screen with confetti! 🎉

#### Step 6: Get Your API URL
1. After deployment, click **"Continue to Dashboard"**
2. At the top of the page, you'll see your project URL:
   ```
   https://your-project-name.vercel.app
   ```
3. Your API endpoint will be:
   ```
   https://your-project-name.vercel.app/api/shopify-lookup
   ```
4. **COPY THIS URL** - you'll need it for Retell AI!

---

## 🧪 Testing Your API

### Test with cURL (Command Line):

```bash
curl -X POST https://your-project-name.vercel.app/api/shopify-lookup \
  -H "Content-Type: application/json" \
  -d '{"email": "customer@example.com"}'
```

### Test with Postman or Thunder Client:
- Method: **POST**
- URL: `https://your-project-name.vercel.app/api/shopify-lookup`
- Headers: `Content-Type: application/json`
- Body (JSON):
  ```json
  {
    "email": "customer@example.com"
  }
  ```

### Expected Response (Success):
```json
{
  "success": true,
  "order_number": "#1234",
  "order_date": "2025-02-01T10:30:00Z",
  "financial_status": "paid",
  "fulfillment_status": "fulfilled",
  "tracking_number": "1Z999AA10123456784",
  "tracking_url": "https://...",
  "carrier": "USPS"
}
```

### Expected Response (No Order Found):
```json
{
  "success": false,
  "message": "No order found with the provided information."
}
```

---

## 🔧 Adding API URL to Retell AI

Once your API is deployed:

1. Go back to your Retell AI dashboard
2. Open your custom function configuration
3. In the **"API Endpoint"** field, paste:
   ```
   https://your-project-name.vercel.app/api/shopify-lookup
   ```
4. Keep method as **POST**
5. Click **"Save"**

---

## 🔒 Security Best Practices

1. **Never commit your .env file to GitHub**
   - The `.env.example` is safe to commit
   - Your actual `.env` with real credentials should NEVER be in Git

2. **Use Vercel Environment Variables**
   - Always add credentials through Vercel dashboard
   - Never hardcode them in your code

3. **Monitor Your Logs**
   - Check Vercel dashboard → Your Project → Logs
   - Watch for any errors or unusual activity

---

## 🐛 Troubleshooting

### Issue: "Missing Shopify credentials"
**Solution:** Check that all 3 environment variables are set in Vercel:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify `SHOPIFY_STORE`, `SHOPIFY_ACCESS_TOKEN`, and `SHOPIFY_API_VERSION` are all present
3. If missing, add them and redeploy

### Issue: "401 Unauthorized" from Shopify
**Solution:** 
- Verify your `SHOPIFY_ACCESS_TOKEN` is correct
- Make sure your custom app in Shopify has the right scopes:
  - `read_orders`
  - `read_customers`
  - `read_fulfillments`

### Issue: "No order found" for valid orders
**Solution:**
- Verify the email/order number matches exactly what's in Shopify
- Check that the order status isn't archived
- Make sure your API scopes include `read_orders`

### Issue: Vercel deployment fails
**Solution:**
- Check that all files are uploaded correctly
- Verify `package.json` and `vercel.json` are in the root folder
- Ensure `shopify-lookup.js` is inside the `api/` folder

---

## 📞 Support

If you encounter any issues:
1. Check Vercel deployment logs
2. Check Shopify API scopes
3. Verify environment variables are set correctly
4. Test the API endpoint directly before connecting to Retell AI

---

## 🎉 Success Checklist

- ✅ Deployed to Vercel
- ✅ Environment variables configured
- ✅ API responding to test requests
- ✅ URL copied and ready for Retell AI
- ✅ Tested with a real email/order number

---

## 📝 Files Included

- `api/shopify-lookup.js` - Main API handler
- `package.json` - Project configuration
- `vercel.json` - Vercel deployment settings
- `.env.example` - Environment variables template
- `DEPLOYMENT_GUIDE.md` - This file

---

**Once deployed, your API URL will be:**
```
https://[your-project-name].vercel.app/api/shopify-lookup
```

**Use this URL in Retell AI's custom function "API Endpoint" field!**
