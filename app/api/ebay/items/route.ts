import eBayApi from 'ebay-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keywords = searchParams.get('keywords')?.trim();
  const bidThreshold = searchParams.get('bidCount');
  
  const eBay = new eBayApi({
    appId: process.env.EBAY_APP_ID || '',
    certId: process.env.EBAY_CERT_ID || '',
    sandbox: false
  });

  try {
    const response = await eBay.buy.browse.api({
      headers: {
        'Content-Type': 'application/json'
      }
    }).search({
      q: keywords || '', // Search query parameter
      sort: 'endingSoonest',     // Sorting order
      filter: `buyingOptions:{AUCTION},bidCount:[${bidThreshold}]`,
      limit: '200',
      fieldgroups: 'FULL'
    });

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message, stack: error.stack }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      return new Response(JSON.stringify({ error: 'An unknown error occurred' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
}

