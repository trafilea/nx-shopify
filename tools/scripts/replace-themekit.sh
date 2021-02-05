#!/bin/bash
rm -f tmp/nx-e2e/proj/node_modules/@shopify/themekit/bin/theme
wget https://shopify-themekit.s3.amazonaws.com/v$1/linux-amd64/theme -O tmp/nx-e2e/proj/node_modules/@shopify/themekit/bin/theme
chmod 755 tmp/nx-e2e/proj/node_modules/@shopify/themekit/bin/theme
