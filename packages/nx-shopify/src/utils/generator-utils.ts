import { getThemeLiquidFiles, LiquidFileType } from './shopify';

export function assertValidGeneratorNameOption(
  name: string,
  directory: string,
  generatorName: string
) {
  const slashes = ['/', '\\'];
  slashes.forEach((slash) => {
    if (name.indexOf(slash) !== -1) {
      const [nameSuggestion, ...rest] = name.split(slash).reverse();
      let directorySuggestion = rest.map((x) => x.toLowerCase()).join(slash);
      if (directory) {
        directorySuggestion = `${directory}${slash}${directorySuggestion}`;
      }
      throw new Error(
        `Found "${slash}" in the ${generatorName} name. ` +
          `Did you mean to use the --directory option (e.g. \`nx g ${generatorName} ${nameSuggestion} --directory ${directorySuggestion}\`)?`
      );
    }
  });
}

export function assertUniqueLiquidFileNameOption(
  liquidFileBaseName: string,
  liquidFileType: LiquidFileType,
  themeBaseDirectory: string
) {
  const liquidFiles = getThemeLiquidFiles(
    liquidFileBaseName,
    liquidFileType,
    themeBaseDirectory
  );

  if (liquidFiles.length > 0) {
    const liquidFileTypeSuggestion = liquidFileType.endsWith('s')
      ? liquidFileType.slice(0, -1)
      : liquidFileType;

    throw new Error(
      `A ${liquidFileBaseName}.liquid ${liquidFileTypeSuggestion} already exists in your theme ` +
        `(${liquidFiles[0]}). ` +
        `A ${liquidFileTypeSuggestion} name should be unique.`
    );
  }
}
