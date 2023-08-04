export const pickGreatest = (arr, count) => {
  var result = [];

  for (var i = 0; i < arr.length; i++) {
    result.push(arr[i]);

    if (result.length > count) {
      result.sort((a, b) => {
        return b.count - a.count;
      });

      result.pop();
    }
  }

  return result;
};
