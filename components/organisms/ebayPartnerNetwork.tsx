import { useEffect } from 'react';

declare global {
  interface Window {
    _epn: { campaign: number };
  }
}

interface EbayPartnerNetworkProps {
  campaignId: number;
}

const EbayPartnerNetwork: React.FC<EbayPartnerNetworkProps> = ({ campaignId }) => {
  useEffect(() => {
    window._epn = { campaign: campaignId };

    const script = document.createElement('script');
    script.src = 'https://epnt.ebay.com/static/epn-smart-tools.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [campaignId]);

  return null;
};

export default EbayPartnerNetwork;
