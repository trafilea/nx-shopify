interface ExtractedStyle {
  file: string;
  query: string;
}

export function getExtractedStyles(
  stylesChunkBaseName: string,
  extractedStyles: ExtractedStyle[]
) {
  return extractedStyles
    .filter(
      (extractedStyle) =>
        [...extractedStyle.file.split('/')].pop().split('-')[0] ===
        stylesChunkBaseName
    )
    .map((extractedStyle) => {
      const extractedStyleName = [...extractedStyle.file.split('/')].pop();
      const shopifyAssetExpression = `{{ '${extractedStyleName}' | asset_url }}`;

      return {
        ...extractedStyle,
        file: shopifyAssetExpression,
      };
    });
}
