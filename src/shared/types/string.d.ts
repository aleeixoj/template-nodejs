/* eslint-disable no-extend-native */
declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface String {
    replaceAll(input: string, output: string): string;
  }
}

String.replaceAll = (search, replace) => {
  // return this.split(search).join(replace);
  const strRegex = `/(${search})/g`;
  return this.replace(strRegex, replace);
};

String.prototype.replaceAll = (search: string, replace: string) => {
  const strRegex = `/(${search})/g`;
  return this.replace(strRegex, replace);
};
