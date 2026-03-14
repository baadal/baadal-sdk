import * as db from './db';
import * as s3 from './s3';

// Ref: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html
// Types: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_types.html

const { init: dbInit, status: dbStatus } = db;
const { init: s3Init, status: s3Status } = s3;

/**
 * @deprecated explicit init deprecated!
 */
export const init = async (region: string) => {
  console.warn('[@baadal-sdk/dapi] aws explicit init deprecated!');
  if (!region) {
    console.error(`AWS initialization error! Missing region: ${region}`);
    return false;
  }

  const cond1 = await dbInit(region);
  const cond2 = await s3Init(region);
  return cond1 && cond2;
};

export const status = () => {
  return {
    db: dbStatus(),
    s3: s3Status(),
  };
};

export { db, s3 }; // named exports
