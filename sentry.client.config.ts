import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://d62bb75ee572a25f854620e585c6a694@o4510040059740160.ingest.us.sentry.io/4510040067407872",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});