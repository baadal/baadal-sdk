# @baadal-sdk/dapi

Dead-simple API wrappers for AWS, GitHub, and common utils

## AWS
```bash
brew install awscli
aws --version
aws configure  # creates `~/.aws/credentials` and `~/.aws/config`
```

```js
import { aws } from '@baadal-sdk/dapi'

await aws.db.writeItem({
  table: 'greetings',
  { msg: 'hello world' },  // data
})

await aws.s3.putObject(
  'mybucket',
  'greetings/msg.txt', // s3 path
  'hello world', // contents
)
```
