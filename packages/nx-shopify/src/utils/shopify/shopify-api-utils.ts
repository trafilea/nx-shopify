import * as https from 'https';
import { ShopifyThemesResponse } from './shopify-api-models';

/**
 * Fetch the live theme ID from Shopify
 *
 * @param themekitEnvConfig String  The themekit environment to get the live theme ID from
 * @return                  Promise Reason for abort or the live theme ID
 */
export function getLiveThemeId(
  storeHost: string,
  password: string
): Promise<number> {
  return new Promise((resolve, reject) => {
    https.get(
      {
        hostname: storeHost,
        path: '/admin/themes.json',
        auth: `:${password}`,
        agent: false,
        headers: {
          'X-Shopify-Access-Token': password,
        },
      },
      (res) => {
        let rawResponseBody = '';

        res.on('data', (chunk) => (rawResponseBody += chunk));

        res.on('end', () => {
          const responseBody: ShopifyThemesResponse = JSON.parse(
            rawResponseBody
          );

          if (responseBody.errors) {
            reject(
              new Error(
                `API request to fetch main theme ID failed: \n${JSON.stringify(
                  responseBody.errors,
                  null,
                  '\t'
                )}`
              )
            );
            return;
          }

          if (!Array.isArray(responseBody.themes)) {
            reject(
              new Error(
                `Shopify response for /admin/themes.json is not an array. ${JSON.stringify(
                  responseBody,
                  null,
                  '\t'
                )}`
              )
            );
            return;
          }

          const liveTheme = responseBody.themes.find(
            (theme) => theme.role === 'main'
          );

          if (!liveTheme) {
            reject(
              new Error(
                `No main theme in response. ${JSON.stringify(
                  responseBody.themes,
                  null,
                  '\t'
                )}`
              )
            );
            return;
          }

          resolve(liveTheme.id);
        });
      }
    );
  });
}
