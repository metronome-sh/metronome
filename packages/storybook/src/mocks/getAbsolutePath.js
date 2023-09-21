function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
