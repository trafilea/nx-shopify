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
        `Found "${slash}" in the ${generatorName} name. Did you mean to use the --directory option (e.g. \`nx g ${generatorName} ${nameSuggestion} --directory ${directorySuggestion}\`)?`
      );
    }
  });
}
