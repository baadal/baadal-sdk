import path from 'node:path';
import fsa from 'node:fs/promises';
import { encode, decode } from 'js-base64';
import { sha256Hash } from './crypto';
import { CustomError } from '../common/error';

export const assertPath = (p: string) => {
  if (!p || p.startsWith('/')) return p;
  return path.resolve(process.cwd(), p);
};

export const fileHash = async (file: string) => {
  if (!file) return null;
  let contents: Buffer | null = null;

  try {
    // get buffer (instead of utf8 string) to support binary data
    contents = await fsa.readFile(file);
  } catch (e) {
    throw new CustomError('Error reading file contents', { cause: e });
  }

  return sha256Hash(contents);
};

/**
 * base64-encode given data
 * @param data data string to be base64-encoded
 * @returns base64-encoded string
 */
export const base64Encode = (data: string) => {
  // return Buffer.from(data, 'utf-8').toString('base64');
  return encode(data);
};

/**
 * decode base64-encoded data
 * @param base64 base64 string to be decoded
 * @returns base64-decoded string
 */
export const base64Decode = (base64: string) => {
  // return Buffer.from(base64, 'base64').toString();
  return decode(base64);
};

/**
 * Create a Map from a given Array based on some field
 * Note that the items of the array should generally be of type `object`
 * so that the `key` property exists on the object item. However, if the
 * `key` parameter is not provided, then the items of the array must be of
 * a primitive data type (string or number) which will be treated as key.
 * @param arr given Array to be converted to Map
 * @param key [optional] a string field from Array items
 * @returns a map created from the array items
 */
export const arrayToMap = <T = any>(arr: T[] | null, key?: string) => {
  if (!arr || !Array.isArray(arr)) return null;

  const map = new Map<string, T>();
  if (!arr.length) return map;

  if (!key && typeof arr[0] !== 'string' && typeof arr[0] !== 'number') return null;
  arr.forEach((item: any) => {
    if (!key) {
      map.set(`${item}`, true as unknown as T);
    } else if (typeof item === 'object') {
      const itemKey = item[key];
      if (itemKey && typeof itemKey === 'string') {
        map.set(itemKey, item);
      }
    }
  });
  return map.size ? map : null;
};

/**
 * Convert an array into an array of chunks of array
 * @param arr a given array
 * @param chunkSize maximum number of items in a chunk
 * @returns array of chunks of the given array
 */
export const chunkifyArray = <T = any>(arr: T[], chunkSize: number) => {
  const chunkedItems = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    chunkedItems.push(chunk);
  }
  return chunkedItems;
};
