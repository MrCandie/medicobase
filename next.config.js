/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongoDB_username: "candie",
    mongodb_password: "MM0tqGI5WJw4VQLY",
    mongodb_database: "hospital",
  },
};

module.exports = nextConfig;
