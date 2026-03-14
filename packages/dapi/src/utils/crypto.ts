import crypto from 'node:crypto';

/**
 * Generate SHA1 hash from given data
 * @param input data string for which SHA1 hash has to be generated
 * @returns SHA1 hash of the given data
 */
export function sha1Hash(input: string): string {
  const hash = crypto.createHash('sha1')
    .update(input, 'utf8')
    .digest('hex');
  return hash;
}

/**
 * Generate SHA256 hash from given data
 * @param input data string for which SHA256 hash has to be generated
 * @returns SHA256 hash of the given data
 */
export function sha256Hash(input: string | Buffer) {
  if (!input) return null;
  const hashSum = crypto.createHash('sha256');
  hashSum.update(input); // defaults to 'utf8' encoding
  return hashSum.digest('hex');
};
