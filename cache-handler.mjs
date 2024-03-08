import {existsSync, readFileSync, writeFileSync} from 'fs'
import {join} from 'path'

export default class CacheHandler {
  constructor(options) {
    this.options = options
    this.file = join(process.cwd(), 'cache.json')
    if (!existsSync(this.file)) {
      writeFileSync(this.file, '{}')
    }
    this.cache = JSON.parse(readFileSync(this.file, 'utf-8'))
  }

  async get(key) {
    console.log('getting', key)
    // This could be stored anywhere, like durable storage
    return this.cache[key]
  }

  async set(key, data, ctx) {
    console.log('setting', key)
    // This could be stored anywhere, like durable storage
    this.cache[key] = {
      value: data,
      lastModified: Date.now(),
      tags: ctx.tags,
    }

    // Write the cache to disk
    writeFileSync(this.file, JSON.stringify(this.cache))
  }

  async revalidateTag(tag) {
    console.log('CALLING REVALIDATE', tag)
  }
}
