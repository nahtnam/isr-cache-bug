import {join} from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheHandler: join(process.cwd(), './cache-handler.mjs'),
  cacheMaxMemorySize: 0,
};

export default nextConfig;
