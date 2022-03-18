/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs')

const sentryWebpackPluginOptions = {
  silent: true
};

const nextConfig = {
  reactStrictMode: true,
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)