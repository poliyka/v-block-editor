<template>
  <el-input
    type="textarea"
    autosize
    v-model="mValue.text"
    :placeholder="placeholder"
    @keyup.native="nextFocus($event, BlocksIndex)"
  ></el-input>
</template>

<script>
import NextFoucsMixin from "@/components/mixin/NextFoucsMixin";

export default {
  name: "BaseTextBlock",
  props: {
    value: Object,
    BlocksIndex: Number,
    placeholder: String,
  },
  mixins: [NextFoucsMixin],
  data() {
    return {
      mValue: this.value,
    };
  },
  watch: {
    "mValue.text": {
      handler(val) {
        //本地值改变传给父组件
        this.$emit("input", val);

        let blockInfo = {
          index: this.BlocksIndex,
          text: val,
        };
        this.$store.commit("mutationUpdateInputBlockText", blockInfo);
      },
    },
    value(val) {
      this.mValue = val;
    },
  },
  methods: {},
  computed: {},
};
</script>
