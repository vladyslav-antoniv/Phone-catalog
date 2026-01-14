import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/4-shared/i18n/request.tsx");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);

