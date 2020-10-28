const getLastInputIndex = function (index, currentPageBlocks) {
  let lastInputIndex = index - 1
  let lastBlcok = currentPageBlocks[lastInputIndex]
  while (lastBlcok.type === "image") { // TODO：这里需要改动，现在只是测试
    lastInputIndex -= 1
    lastBlcok = currentPageBlocks[lastInputIndex]
  }
  return lastInputIndex
}
const getNextInputIndex = function (index, currentPageBlocks) {
  let nextInputIndex = index + 1
  let nextBlcok = currentPageBlocks[nextInputIndex]
  while (nextBlcok.type === "image") { // TODO：这里需要改动，现在只是测试
    nextInputIndex += 1
    nextBlcok = currentPageBlocks[nextInputIndex]
  }
  return nextInputIndex
}

export {
  getLastInputIndex,
  getNextInputIndex
}