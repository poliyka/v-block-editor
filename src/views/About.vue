<template>
  <div class="about">
    <el-button @click="test123()">aaa</el-button>
    <el-select v-model="value" placeholder="請選擇">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      options: [
        {
          value: "選項1",
          label: "黃金糕",
        },
        {
          value: "選項2",
          label: "雙皮奶",
        },
        {
          value: "選項3",
          label: "蚵仔煎",
        },
        {
          value: "選項4",
          label: "龍須麵",
        },
        {
          value: "選項5",
          label: "北京烤鴨",
        },
      ],
      value: "",
    };
  },
  methods: {
    test123: function () {
      // this.$refs.messageDrop.dropdown.visible = true
      console.log("111");
    },
  },
  mounted() {
    // this.$refs.messageDrop.show();
  },
};
</script>
