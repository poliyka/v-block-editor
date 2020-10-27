<template>
  <div class="image" @keyup="nextFocus($event, BlocksIndex)">
    <img :src="url" style="width: 100px; height: 100px" />
  </div>
</template>

<script>
import ImageBlockFocusMixin from "@/components/mixin/ImageBlockFocusMixin";
export default {
  name: "BaseImage",
  props: ["value", "BlocksIndex"],
  mixins: [ImageBlockFocusMixin],
  components: {},
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      mValue: this.value,
    };
  },
  mounted: function () {
    // console.log(this.mValue);
  },
  watch: {},
  methods: {},
  computed: {
    currentPageBlocks() {
      return this.$store.state.currentPageBlocks;
    },
  },
};
</script>

<style lang="less">
.image:focus {
  border: none;
  outline: none;
}
</style>