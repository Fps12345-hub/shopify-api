# Missha US - Shopify Order Lookup API

Backend API to connect Retell AI voice agent with Shopify for order status lookups.

## 🚀 Quick Start

1. **Read the deployment guide:** Open `DEPLOYMENT_GUIDE.md` for complete step-by-step instructions
2. **Deploy to Vercel:** Follow the guide to deploy in under 10 minutes
3. **Configure environment variables:** Add your Shopify credentials in Vercel
4. **Get your API URL:** Copy the URL and add it to Retell AI

## 📦 What's Included

- `api/shopify-lookup.js` - Serverless function that queries Shopify
- `package.json` - Node.js project configuration
- `vercel.json` - Vercel deployment configuration
- `.env.example` - Template for environment variables
- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions

## 🔑 Required Environment Variables

You need to set these in Vercel:

- `SHOPIFY_STORE` - Your store URL (e.g., `missha-us.myshopify.com`)
- `SHOPIFY_ACCESS_TOKEN` - Your Admin API access token (starts with `shpat_`)
- `SHOPIFY_API_VERSION` - Shopify API version (e.g., `2025-04`)

## 🧪 Testing

Once deployed, test with:

```bash
curl -X POST https://your-project.vercel.app/api/shopify-lookup \
  -H "Content-Type: application/json" \
  -d '{"email": "customer@example.com"}'
```

## 📖 API Documentation

### Endpoint
`POST /api/shopify-lookup`

### Request Body
```json
{
  "email": "customer@example.com",
  "order_number": "#1234"
}
```

Provide either `email` OR `order_number` (or both).

### Success Response
```json
{
  "success": true,
  "order_number": "#1234",
  "financial_status": "paid",
  "fulfillment_status": "fulfilled",
  "tracking_number": "1Z999AA10123456784",
  "tracking_url": "https://...",
  "carrier": "USPS"
}
```

### Error Response
```json
{
  "success": false,
  "message": "No order found with the provided information."
}
```

## 🔒 Security

- Never commit `.env` files to Git
- Always use environment variables in Vercel
- API credentials are only stored server-side
- CORS is configured for security

## 📞 Support

For issues or questions:
1. Check the `DEPLOYMENT_GUIDE.md`
2. Review Vercel deployment logs
3. Verify Shopify API scopes and credentials

## 📄 License

MIT License - Created for Missha US AI Voice Agent
