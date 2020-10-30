<template>
  <div class="hint">
    <div class="hint-bg" :id="BlocksIndex" :style="customStyle">
      <BaseTextBlock
        :value="value"
        :BlocksIndex="BlocksIndex"
        placeholder="输入需要提示的内容"
        @keypress.enter.capture.stop.native
      ></BaseTextBlock>
    </div>
    <el-dialog title="编辑" :visible.sync="visible">
      <el-form :model="mValue">
        <el-form-item label="颜色" label-width="120px">
          <el-select
            v-model="mValue.color"
            filterable
            allow-create
            placeholder="请选择颜色"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span
                style="float: right; font-size: 13px"
                :style="{ color: item.value }"
                >{{ item.value }}</span
              >
            </el-option>
          </el-select>
          <el-tag style="margin-left: 5px">支持 hex 色码</el-tag>
        </el-form-item>
        <el-form-item label="文字" label-width="120px">
          <el-input v-model="mValue.text"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// TODO:支持自定义默认值以及颜色选择器
import BaseTextBlock from "@/components/basicBlockComponents/BaseTextBlock";
export default {
  name: "hint",
  props: ["value", "BlocksIndex"],
  components: {
    BaseTextBlock,
  },
  data() {
    return {
      formLabelWidth: "120px",
      mValue: this.value,
      options: [
        {
          value: "#409eff",
          label: "提示色",
        },
        {
          value: "#FF0000",
          label: "警告色",
        },
        {
          value: "#dfe2e5",
          label: "灰色",
        },
      ],
    };
  },
  watch: {
    mValue: {
      handler(newVal, oldVal) {
        let blockInfo = {
          index: this.BlocksIndex,
          blockItem: {
            type: this.$options.name,
            data: {
              text: newVal.text,
              color: newVal.color,
            },
          },
        };
        this.$store.commit("mutationUpdateOneBlock", blockInfo);
      },
      deep: true,
    },
  },
  methods: {},
  computed: {
    customStyle() {
      let color = "#409eff";
      if (this.mValue.color) {
        color = this.mValue.color;
      }
      return {
        borderColor: color,
      };
    },
    dialogFormVisible() {
      return this.$store.state.dialogFormVisible;
    },
    currentBlockIndex() {
      return this.$store.state.currentBlockIndex;
    },
    visible: {
      get() {
        if (
          this.currentBlockIndex === this.BlocksIndex &&
          this.dialogFormVisible === true
        ) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {
        this.$store.commit("mutationUpdateDialogFormVisible", value);
      },
    },
  },
};
</script>

<style lang="less">
.hint {
  display: flex;
  align-items: center;
  margin: 10px;
  .hint-bg {
    padding: 20px;
    background: #f2f6fc;
    width: 100%;
    border-radius: 2px;
    border-left: 3px solid #409eff;
  }

  .el-textarea__inner {
    border: none;
    outline: none;
    font-size: 16px;
    width: 100%;
    resize: none;
    padding: 5px 0;
    color: #303133;
    background: #f2f6fc;
  }
  textarea::-webkit-input-placeholder {
    color: #f2f6fc;
  }
  textarea:focus::-webkit-input-placeholder {
    color: #999999;
  }
}
</style>