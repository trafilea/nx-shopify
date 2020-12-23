#!/bin/bash
nx build $1 --skip-nx-cache
rm -rf tmp/nx-e2e/proj/node_modules/@trafilea/$1
mkdir -p tmp/nx-e2e/proj/node_modules/@trafilea/$1
cp -r dist/packages/$1/* tmp/nx-e2e/proj/node_modules/@trafilea/$1
