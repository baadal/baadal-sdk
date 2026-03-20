import * as fs from '../src/fs';

(async () => {
  // Test `existsFileSync`
  (() => {
    const filepath = 'demo/sandbox/sample.txt';
    console.log('A1:', fs.existsFileSync(filepath));
    console.log('A2:', fs.existsFileSync(filepath + 'x'));
  })();

  // Test `existsDirSync`
  void (() => {
    const dirpath = 'demo/sandbox';
    console.log('B1:', fs.existsDirSync(dirpath));
    console.log('B2:', fs.existsDirSync(dirpath + 'x'));
  })();

  // Test `createDir`
  await (async () => {
    const newdirpath = 'demo/sandbox/xyz';
    const success = await fs.createDir(newdirpath);
    console.log('C1:', success);
  })();

  // Test `writeFile`
  await (async () => {
    const filepath = 'demo/sandbox/01/02/hello.txt';
    const success = await fs.writeFile(filepath, 'hello world');
    console.log('D1:', success);
  })();

  // Test `readDir`
  await (async () => {
    const dirpath = 'demo/sandbox';
    const output = await fs.readDir(dirpath);
    console.log('E1:', output);
  })();

  // Test `readDirFiles`
  await (async () => {
    const dirpath = 'demo/sandbox';
    const output = await fs.readDirFiles(dirpath);
    console.log('F1:', output);
  })();

  // Test `readDirDirs`
  await (async () => {
    const dirpath = 'demo/sandbox';
    const output = await fs.readDirDirs(dirpath);
    console.log('G1:', output);
  })();

  // Test `readDirFilesRec`
  await (async () => {
    const dirpath = 'demo/sandbox';
    const output = await fs.readDirFilesRec(dirpath);
    console.log('H1:', output);
  })();
})()
