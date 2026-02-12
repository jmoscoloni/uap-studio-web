"use client";

import { useEffect } from 'react';

const TRACKING_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'fbclid',
  'gclid'
];

const StripQueryParams = () => {
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const { pathname, search, hash } = window.location;
      if (!search) return;

      const params = new URLSearchParams(search);
      let removed = false;

      TRACKING_PARAMS.forEach((p) => {
        if (params.has(p)) {
          params.delete(p);
          removed = true;
        }
      });

      if (removed) {
        const newSearch = params.toString();
        const newUrl = pathname + (newSearch ? `?${newSearch}` : '') + (hash || '');
        // Replace state so the address bar no longer shows tracking params
        window.history.replaceState(null, '', newUrl);
      }
    } catch (e) {
      // noop
    }
  }, []);

  return null;
};

export default StripQueryParams;
