import * as path from 'path';
import * as os from 'os';
import { existsSync, readFileSync } from 'fs';

export interface SslKeyCert {
  key: Buffer;
  cert: Buffer;
}

export function getSslKeyCert(): SslKeyCert {
  const key = readFileSync(getSSLKeyPath());
  const cert = readFileSync(getSSLCertPath());

  return { key, cert };
}

export function getSSLKeyPath(): string {
  const key = path.resolve(os.homedir(), '.localhost_ssl/server.key');
  return existsSync(key) ? key : path.join(__dirname, './server.pem');
}

export function getSSLCertPath(): string {
  const cert = path.resolve(os.homedir(), '.localhost_ssl/server.crt');
  return existsSync(cert) ? cert : path.join(__dirname, './server.pem');
}
