import React from 'react'

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
    Object.keys(object).some(function (k) {
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

const filterForObject = (rawObject, queryKey, queryValue) => {
  const filteredObject = rawObject.filter(
    item => item[queryKey] === queryValue
  );
  return filteredObject[0];
};

const cropText = (fullText, classN = "") => {
  const text = fullText
    .split(" ")
    .map((txt, i) => {
      if (i === 14) {
        return `${txt}...`;
      } else if (i >= 15) {
        return null;
      } else {
        return txt;
      }
    })
    .join(" ");

  return React.createElement('p', { className: classN }, text)
};

const getSummaryText = (itemObject, classN = '') => {
  const stopSum = itemObject.stopSummary || "";
  const adhocSum = itemObject.stopContent[0].textBlock;
  // const summaryText = stopSum !== "" ? cropText('lfkjhggs') : cropText('ksjhfgjrt');
  const summaryText = stopSum !== "" ? cropText(stopSum, classN) : cropText(adhocSum, classN);
  return summaryText;
};

export {
  getUniqueID,
  checkForUndefined,
  findVal,
  getSummaryText,
  filterForObject,
  cropText
};
