import { useEffect, useRef } from 'react';
import { trackEvent, EventCategories, EventActions } from '../lib/analytics';

export function useEngagementTracking(pageName: string) {
  const scrollMarks = useRef({
    25: false,
    50: false,
    75: false,
    90: false,
  });

  const timeMarks = useRef({
    30: false,
    60: false,
    120: false,
  });

  useEffect(() => {
    // Scroll depth tracking
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent >= 25 && !scrollMarks.current[25]) {
        scrollMarks.current[25] = true;
        trackEvent(EventCategories.SCROLL, EventActions.SCROLL_25, pageName);
      }
      if (scrollPercent >= 50 && !scrollMarks.current[50]) {
        scrollMarks.current[50] = true;
        trackEvent(EventCategories.SCROLL, EventActions.SCROLL_50, pageName);
      }
      if (scrollPercent >= 75 && !scrollMarks.current[75]) {
        scrollMarks.current[75] = true;
        trackEvent(EventCategories.SCROLL, EventActions.SCROLL_75, pageName);
      }
      if (scrollPercent >= 90 && !scrollMarks.current[90]) {
        scrollMarks.current[90] = true;
        trackEvent(EventCategories.SCROLL, EventActions.SCROLL_90, pageName);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Time on page tracking
    const timers: ReturnType<typeof setTimeout>[] = [];

    const t30 = setTimeout(() => {
      if (!timeMarks.current[30]) {
        timeMarks.current[30] = true;
        trackEvent(EventCategories.TIME, EventActions.TIME_30S, pageName);
      }
    }, 30000);
    timers.push(t30);

    const t60 = setTimeout(() => {
      if (!timeMarks.current[60]) {
        timeMarks.current[60] = true;
        trackEvent(EventCategories.TIME, EventActions.TIME_60S, pageName);
      }
    }, 60000);
    timers.push(t60);

    const t120 = setTimeout(() => {
      if (!timeMarks.current[120]) {
        timeMarks.current[120] = true;
        trackEvent(EventCategories.TIME, EventActions.TIME_120S, pageName);
      }
    }, 120000);
    timers.push(t120);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [pageName]);
}
