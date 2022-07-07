import Analytics from 'analytics'
import React from 'react'
import { Router } from 'next/router'
import dynamic from 'next/dynamic'
import mixpanelPlugin from "@analytics/mixpanel";

const IS_BROWSER = typeof window !== "undefined";

const plugins = [
  mixpanelPlugin({
    token: "43069624f58c08ff045c157b0cfd3edb",
  }),
];

const analytics = Analytics({
  app: "butterfly",
  version: "100",
  plugins: [...(IS_BROWSER ? plugins : [])],
});


export const useAnalytics = () => {
  React.useEffect(() => {
    // Fire initial page view
    analytics.page()
    // Fire page views on routing
    const handleRouteChange = (url) => {
      // We need to wrap it in a rAF to ensure the correct data is sent to Segment
      // https://github.com/zeit/next.js/issues/6025
      requestAnimationFrame(() => {
        analytics.page()
      })
    }

    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => Router.events.off('routeChangeComplete', handleRouteChange)
  }, [])

  return analytics
}