<template>
  <div class="home">
    <div class="header">
      <h1>vne-block-editor</h1>
      <p>模組化內容構建編輯器，基於 Vue 和 element 的打造</p>
      <p>以 JSON 格式輸出，靈感來自Notion</p>
      <el-link
        :underline="false"
        href="https://github.com/poliyka/vne-block-editor"
        class="el-link-btn"
        target="_blank"
      >
        <i>
          <img
            src="../assets/img/github.svg"
            width="18px"
          />
        </i>
        GitHub
      </el-link>
    </div>
    <div class="readonly-switch">
      <el-switch
        v-model="readonly"
        active-text="只讀模式"
        inactive-text="編輯模式"
      ></el-switch>
    </div>
    <div class="readonly-switch">
      <el-radio-group v-model="locale">
        <el-radio label="en">English</el-radio>
        <el-radio label="zh-tw">繁體中文</el-radio>
        <el-radio label="zh-cn">简体中文</el-radio>
      </el-radio-group>
    </div>
    <div>
      <blockEditor
        :readonly="readonly"
        :currentPageBlocks="currentPageBlocks"
        @change="change"
        :maxStack="100"
        :delay="2000"
        :locale="locale"
      ></blockEditor>
    </div>
  </div>
</template>


<script>
import blockEditor from "@/components/blockEditor";
import currentPageBlocks from "@/mock/data.js";

export default {
  name: "Home",
  components: { blockEditor },
  data() {
    return {
      readonly: false,
      currentPageBlocks: currentPageBlocks,
      locale: "en",
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    change(value) {
      console.log("blockChange", value);
    },
  },
};
</script>


<style lang="less">
.home {
  .header {
    h1 {
      font-size: 50px;
    }
    text-align: center;
    height: 300px;
    .el-link-btn {
      padding: 10px 20px;
      border: 1px solid #dddddd;
      border-radius: 4px;
      font-size: 20px;
    }
    .el-link-btn:hover {
      border-color: #c6e2ff;
      background-color: #ecf5ff;
      color: #303133;
    }
  }
  .readonly-switch {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
