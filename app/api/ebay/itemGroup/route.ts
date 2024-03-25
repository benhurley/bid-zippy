import eBayApi from 'ebay-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const itemGroupId = searchParams.get('itemGroupId')?.trim();
  
  const eBay = new eBayApi({
    appId: process.env.EBAY_APP_ID || '',
    certId: process.env.EBAY_CERT_ID || '',
    sandbox: false
  });

  try {
    const response = await eBay.buy.browse.api({
      headers: {
        'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=5339048923'
    }
    }).getItemsByItemGroup(itemGroupId || '');

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: unknown) {
    // Assert that error is an instance of Error
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message, stack: error.stack }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      // Handle the case where the error is not an Error instance
      return new Response(JSON.stringify({ error: 'An unknown error occurred' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }
}