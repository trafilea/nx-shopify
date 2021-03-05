import { getLiveThemeId } from '../shopify';
import { ThemekitEnvironmentConfig } from './themekit-config-utils';

export async function isLiveTheme(
  themekitEnvConfig: ThemekitEnvironmentConfig
): Promise<boolean> {
  const { store, password, themeId } = themekitEnvConfig;
  const liveThemeId = await getLiveThemeId(store, password);
  return themeId === liveThemeId.toString();
}
