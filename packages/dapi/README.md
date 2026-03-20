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

## fs (file system)

```js
import { fs } from '@baadal-sdk/dapi'

const filepath = 'demo/sandbox/01/02/hello.txt'
await fs.writeFile(filepath, 'hello world')
```

```
> tree demo/sandbox

demo/sandbox
├── 01
│   └── 02
│       └── hello.txt
├── sample.txt
└── xyz
```

```js
const dirpath = 'demo/sandbox'
const output = await fs.readDir(dirpath)
console.log(output)
// { dirs: [ '01', 'xyz' ], files: [ 'sample.txt' ] }
```
