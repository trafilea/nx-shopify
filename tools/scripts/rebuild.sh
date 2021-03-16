#!/bin/bash
nx build $1 --skip-nx-cache
rm -rf tmp/nx-e2e/proj/node_modules/@trafilea/$1/src
mkdir -p tmp/nx-e2e/proj/node_modules/@trafilea/$1/src
cp -r dist/packages/$1/src/* tmp/nx-e2e/proj/node_modules/@trafilea/$1/src
