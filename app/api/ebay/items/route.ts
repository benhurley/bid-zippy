import eBayApi from 'ebay-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keywords = searchParams.get('keywords')?.trim();
  
  const eBay = new eBayApi({
    appId: process.env.EBAY_APP_ID || '',
    certId: process.env.EBAY_CERT_ID || '',
    sandbox: false,
  });

  const params = {
    keywords: keywords || '',
    itemFilter: [
      { name: 'MinBids', value: '1' },
    ],
    paginationInput: {
      entriesPerPage: 100 // Adjust number of entries per page if needed
    },
    sortOrder: 'EndTimeSoonest',
    headers: {
        'X-EBAY-C-ENDUSERCTX': 'affiliateCampaignId=5339048923'
    }
  };

  try {
    const response = await eBay.finding.findItemsAdvanced(params);

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
