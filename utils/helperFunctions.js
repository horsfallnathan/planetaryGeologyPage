const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

const checkForUndefined = input => {
  return input ? true : false;
};

// modified from StackOverflow and included count to ensure there is no stack overflow in objects with circular references.
// count has a default initial and final values which you can pass while calling the function or use defaults
function findVal(object, key, count = 0, finalCount = 200) {
  let value;
  if (count !== finalCount) {
    Object.keys(object).some(function(k) {
      if (k === key) {
        value = object[k];
        return true;
      }
      if (object[k] && typeof object[k] === "object") {
        value = findVal(object[k], key, (count += 1));
        return value !== undefined;
      }
    });
    return value;
  } else {
    console.error(
      "Check for circular references or pass higher finalCount value"
    );
  }
}
export { getUniqueID, checkForUndefined, findVal };
