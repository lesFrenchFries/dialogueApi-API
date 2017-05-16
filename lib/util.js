exports.filterKeys = function filterKeys(validKeys, obj) {
  return validKeys.reduce((newObj, key) => {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
    return newObj;
  }, {});
};