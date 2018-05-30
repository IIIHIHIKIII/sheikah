import * as crypto from "crypto"
import * as _ from "lodash"

/**
 * HMAC
 * @param {Buffer} data to hash
 * @param {Buffer} key to hash the data
 * @param {number} shaBits number of bits of the hash function e.g. "sha512"
 * @param {(bytes: Buffer) => Buffer} hash function
 * @returns {Buffer} hmac hashed data
 */
const hmac = (key: Buffer, data: Buffer, shaBits: number, hash: (buffer: Buffer) => Buffer) => {
  const blockSize = shaBits / 8
  let newKey = _.clone(key)
  if (newKey.length > blockSize) {
    newKey = hash(newKey)
  } else if (newKey.length < blockSize) {
    const fill = Buffer.alloc(blockSize)
    fill.fill(0)
    newKey.copy(fill)
    newKey = fill
  }
  const outerPadding = Buffer.alloc(blockSize).fill(0x5C)

  const innerPadding = Buffer.alloc(blockSize).fill(0x36)

  const outerKey = Buffer.alloc(blockSize)
  const innerKey = Buffer.alloc(blockSize)

  _.range(blockSize).forEach(i => {
    outerKey[i] = outerPadding[i] ^ newKey[i]
    innerKey[i] = innerPadding[i] ^ newKey[i]
  })

  const innerHash = hash(Buffer.concat([innerKey, data]))
  const outerHash = hash(Buffer.concat([outerKey, innerHash]))

  return outerHash
}

/**
 *  Create sha function for the indicated number of bits
 * @param {string} shaBits number of bits for the sha function
 * @returns {(buf: Buffer) => Buffer} sha function
 */
const shaFunction = (shaBits: string) => {
  return (buf: Buffer) => crypto.createHash(shaBits).update(buf).digest()
}
/**
 * sha512mac
 * @param {Buffer} data to be hashed
 * @param {Buffer} key to hash the data
 * @returns {Buffer}
 */
export const sha512hmac = (key: Buffer, data: Buffer) => {

  return hmac(key, data, 512, shaFunction("sha512"))
}
