/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "popn-assets.surge.sh",
        port: "",
        pathname: "/kc_*.png",
      },
    ],
  },
  reactStrictMode: true,
}
