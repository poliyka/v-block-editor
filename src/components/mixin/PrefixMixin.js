const PrefixMixin = {
  methods: {
    joinBlockIdPrefix(blocksIndex) {
      return `__vne_block_${blocksIndex}`;
    },
    joinClassPrefix(classDict) {
      if (!_.isPlainObject(classDict)) {
        console.error("🚀 ~ file: PrefixMixin.js ~ line 8 ~ joinClassPrefix ~ classDict", `"${classDict}"`, "Not a dictionary")
        return "";
      } else if (_.isEmpty(classDict)) {
        return "";
      }

      // 將 class key 替換成　__vne_xxx
      classDict = _.mapKeys(classDict, function (value, key) {
        if (value?.join === true) {
          return `__vne_${key}`;
        }
        return key
      });

      // 由 value.show 來決定是否要顯示該 class
      classDict = _.mapValues(classDict, function (value, key) {
        if (value?.show === true || value?.show === undefined){
          return true;
        }
        return false
      });
      return classDict
    },
  },
};
export default PrefixMixin;
