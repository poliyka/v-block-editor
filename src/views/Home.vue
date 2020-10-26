<template>
  <div class="home">
    <div class="header">
      <h1>All-in-one</h1>
      <p>模块化内容构建编辑器，基于 Vue 和 element 的打造</p>
      <p>以 JSON 格式输出，灵感来自Notion</p>
      <el-link
        :underline="false"
        href="https://github.com/renmu123/All-in-one"
        class="el-link-btn"
        target="_blank"
      >
        <i>
          <img src="../assets/github.svg" width="18px" />
        </i>
        GitHub
      </el-link>
    </div>
    <div class="readOnly-switch">
      <el-switch
        v-model="readOnly"
        active-text="只读模式"
        inactive-text="编辑模式"
      ></el-switch>
    </div>
    <div>
      <allInOne :readOnly="readOnly"></allInOne>
    </div>
  </div>
</template>

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
  .readOnly-switch {
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>


<script>
import allInOne from "@/components/allInOne";
export default {
  name: "Home",
  components: { allInOne },
  data() {
    return { readOnly: false };
  },
  computed: {},
  watch: {},
  mounted() {},
};
</script>


