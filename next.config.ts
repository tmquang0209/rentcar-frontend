import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [new URL("https://dichvuthuexe.com.vn/**"), new URL("https://img.pikbest.com/**"), new URL("https://duyngantravel.com/**")],
	},
};

export default nextConfig;
