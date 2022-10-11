export default {
  replaceAll: (value: string, search: string, replace: string) => {
    // const strRegex = `/(${search})/g`;
    // return value.replace(strRegex, replace);
    return value.split(search).join(replace);
  },
};
