import eBayApi from 'ebay-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const itemId = searchParams.get('itemId')?.trim();
  const legacy_item_id = searchParams.get('legacyId')?.trim();
  
  const eBay = new eBayApi({
    appId: process.env.EBAY_APP_ID || '',
    certId: process.env.EBAY_CERT_ID || '',
    sandbox: false
  });

  const legacy_params = {
    legacy_item_id: legacy_item_id || '',
  }

  try {
    let response;
    if (itemId) {
      response = await eBay.buy.browse.api({
        headers: {
          'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=5339048923'
      }
      }).getItem(itemId || '');
    } else if (legacy_item_id) {
      response = await eBay.buy.browse.api({
        headers: {
          'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=5339048923'
      }
      }).getItemByLegacyId(legacy_params);
    }

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