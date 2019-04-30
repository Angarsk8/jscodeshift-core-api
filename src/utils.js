function intersection (arrays) {
  const result = new Set(arrays[0]);
  let resultSize = result.length;

  let i, value, valuesToCheck;
  for (i = 1; i < arrays.length; i++) {
    valuesToCheck = new Set(arrays[i]);
    for (value of result) {
      if (!valuesToCheck.has(value)) {
        result.delete(value);
        resultSize -= 1;
      }
      if (resultSize === 0) {
        return [];
      }
    }
  }

  return Array.from(result);
}

function once(func) {
  let called = false;
  let result;
  return function (...args) {
    if (called) {
      return result;
    }
    called = true;
    return result = func.apply(this, args);
  };
}

function union(func) {
  let called = false;
  let result;
  return function (...args) {
    if (called) {
      return result;
    }
    called = true;
    return result = func.apply(this, args);
  };
}

exports.intersection = intersection;
exports.once = once;
exports.union = union;
