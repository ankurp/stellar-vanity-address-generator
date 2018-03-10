#!/usr/bin/env node
const StellarSdk = require('stellar-sdk');

const suffix = process.argv[2].toUpperCase();
console.log(`Finding address ending in ${suffix}`)

do {
  const pair = StellarSdk.Keypair.random();
  if (pair.publicKey().endsWith(suffix)) {
    console.log('Public: ', pair.publicKey());
    console.log('Secret: ', pair.secret());
    break;
  }
} while (true)
