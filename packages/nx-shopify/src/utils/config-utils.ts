import { resolve } from 'path';

export function getProxyConfig(root: string, proxyConfigPath: string) {
  const proxyPath = resolve(root, proxyConfigPath);
  return require(proxyPath);
}
