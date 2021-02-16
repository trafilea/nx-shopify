import { promisify } from 'util';
import * as portscanner from 'portscanner';
import * as ip from 'ip';

const findAPortInUse = promisify(portscanner.findAPortInUse);

export function getAvailablePortSeries(start, quantity, increment = 1) {
  const startPort = start;
  const endPort = start + (quantity - 1);

  return findAPortInUse(startPort, endPort, '127.0.0.1').then((port) => {
    if (typeof port === 'number') {
      return getAvailablePortSeries(port + increment, quantity);
    }

    return [...Array(quantity).keys()].map((i) => i + start);
  });
}

export function getIpAddress(ipAddressValue = 'private') {
  if (ip.isV4Format(ipAddressValue) || ip.isV6Format(ipAddressValue)) {
    return ipAddressValue;
  }

  return ip.address(ipAddressValue);
}
