import eBayApi from 'ebay-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')?.trim();
  
  const eBay = new eBayApi({
    appId: process.env.EBAY_APP_ID || '',
    certId: process.env.EBAY_CERT_ID || '',
    sandbox: false
  });

  try {
    const params = {
      maxResults: 50,
      categoryId: undefined,
    }

    if (!!query && query.length > 0) {
      const categorySuggestionResponse = await eBay.commerce.taxonomy.getCategorySuggestions('0', query);
      const categoryId = categorySuggestionResponse.categorySuggestions[0].category.categoryId;
      params.categoryId = categoryId;
    }

    const response = await eBay.merchandising.getMostWatchedItems(params)

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