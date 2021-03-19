export function isHotUpdateFile(filePath) {
  return (
    /\.hot-update\.json$/.test(filePath) ||
    /\.hot-update\.js(.map)?$/.test(filePath)
  );
}
