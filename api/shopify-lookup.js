// Shopify Order Lookup API for Retell AI
// This function connects Retell AI to your Shopify store

export default async function handler(req, res) {
  // Enable CORS for Retell AI
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get Shopify credentials from environment variables
  const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
  const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
  const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2026-01';

  // Validate environment variables
  if (!SHOPIFY_STORE || !SHOPIFY_ACCESS_TOKEN) {
    console.error('Missing Shopify credentials in environment variables');
    return res.status(500).json({
      success: false,
      error: 'Server configuration error. Please contact support.'
    });
  }

  try {
    const { email, order_number } = req.body;

    // Validate input
    if (!email && !order_number) {
      return res.status(400).json({
        success: false,
        error: 'Please provide either email or order_number'
      });
    }

    console.log('Looking up order for:', email || order_number);

    // Build query parameters for Shopify API
    let params = new URLSearchParams({ 
      status: 'any',
      limit: '10'
    });
    
    if (email) {
      params.append('email', email);
    }
    if (order_number) {
      // Clean up order number (remove # if present)
      const cleanOrderNumber = order_number.replace('#', '');
      params.append('name', `#${cleanOrderNumber}`);
    }

    // Call Shopify Admin API
    const shopifyUrl = `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_API_VERSION}/orders.json?${params}`;
    
    console.log('Calling Shopify API...');
    
    const response = await fetch(shopifyUrl, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('Shopify API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      
      return res.status(500).json({
        success: false,
        error: 'Unable to connect to Shopify. Please try again.'
      });
    }

    const data = await response.json();
    const orders = data.orders || [];

    console.log(`Found ${orders.length} orders`);

    // No orders found
    if (orders.length === 0) {
      return res.json({
        success: false,
        message: 'No order found with the provided information. Please verify your email or order number.'
      });
    }

    // Get the most recent order
    const order = orders[0];

    // Extract tracking information from fulfillments
    let tracking_number = null;
    let tracking_url = null;
    let carrier = null;
    let estimated_delivery = null;

    if (order.fulfillments && order.fulfillments.length > 0) {
      const fulfillment = order.fulfillments[0];
      tracking_number = fulfillment.tracking_number || null;
      tracking_url = fulfillment.tracking_url || null;
      carrier = fulfillment.tracking_company || null;
      estimated_delivery = fulfillment.estimated_delivery_at || null;
    }

    // Format the response for Retell AI
    const orderResponse = {
      success: true,
      order_number: order.name,
      order_date: order.created_at,
      financial_status: order.financial_status,
      fulfillment_status: order.fulfillment_status || 'unfulfilled',
      total_price: order.total_price,
      currency: order.currency,
      tracking_number: tracking_number,
      tracking_url: tracking_url,
      carrier: carrier,
      estimated_delivery: estimated_delivery,
      customer_email: order.email,
      customer_name: order.customer ? 
        `${order.customer.first_name || ''} ${order.customer.last_name || ''}`.trim() : 
        null
    };

    console.log('Order lookup successful:', order.name);

    return res.json(orderResponse);

  } catch (error) {
    console.error('Error processing request:', error);
    
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    });
  }
}
