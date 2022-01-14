const getLastInputIndex = function (index, currentPageBlocks) {
  let lastInputIndex = index - 1;
  let lastBlcok = currentPageBlocks[lastInputIndex];
  while (lastBlcok.type === "image") {
    // TODO：這裏需要改動，現在只是測試
    lastInputIndex -= 1;
    lastBlcok = currentPageBlocks[lastInputIndex];
  }
  return lastInputIndex;
};
const getNextInputIndex = function (index, currentPageBlocks) {
  let nextInputIndex = index + 1;
  let nextBlcok = currentPageBlocks[nextInputIndex];
  while (nextBlcok.type === "image") {
    // TODO：這裏需要改動，現在只是測試
    nextInputIndex += 1;
    nextBlcok = currentPageBlocks[nextInputIndex];
  }
  return nextInputIndex;
};

export { getLastInputIndex, getNextInputIndex };
