#!/usr/bin/env node
const program = require('commander');
const StellarSdk = require('stellar-sdk');
const pkg = require('./package.json');

program
  .version(pkg.version)
  .option('-p, --prefix', 'Find address that begins with the words specified')
  .option('-s, --suffix', 'Find address that end with the words specified')
  .parse(process.argv);

program.suffix = program.suffix || (!program.prefix && !program.suffix);

const searchLocation = [program.prefix && 'beginning', program.suffix && 'ending'].filter(w => w).join('/');
const ignoreFlags = w => w !== '-p' && w !== '--prefix' && w !== '-s' && w !== '--suffix';

const words = process.argv.slice(2).filter(ignoreFlags).map(w => w.toUpperCase());
// console.log(`Finding address ${searchLocation} in ${words.join(' or ')}`);

do {
  const pair = StellarSdk.Keypair.random();
  const publicKey = pair.publicKey();
  if (program.prefix && words.some(w => publicKey.startsWith(w, 1))) {
    console.log('Public: ', pair.publicKey());
    console.log('Secret: ', pair.secret());
    break;
  }

  if (program.suffix && words.some(w => publicKey.endsWith(w))) {
    console.log('Public: ', pair.publicKey());
    console.log('Secret: ', pair.secret());
    break;
  }
} while (true); // eslint-disable-line no-constant-condition
