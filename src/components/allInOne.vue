<template>
  <div class="container-870" id="blockEditor">
    <!-- 添加组件的弹窗 -->
    <AddBlockContent></AddBlockContent>
    <draggable
      tag="div"
      v-model="getCurrentPageBlocks"
      class="list-group"
      handle=".handle"
    >
      <div
        class="line-wrap list-group-item"
        v-for="(item, index) in getCurrentPageBlocks"
        :key="index"
        ref="block"
      >
        <div class="line-left" v-if="readOnly == false">
          <!-- 弹出添加组件的弹窗+号按钮 -->
          <AddBlockBtn :BlocksIndex="index"></AddBlockBtn>
          <!-- 拖拽组件 -->
          <a class="drag-btn handle">
            <i class="iconfont icondrag"></i>
          </a>
        </div>
        <div class="line-medium">
          <TextBlock
            v-model="item.data"
            :BlocksIndex="index"
            v-if="item.type == 'text'"
            class="block"
          ></TextBlock>
          <TodoBlock
            v-model="item.data"
            :BlocksIndex="index"
            v-if="item.type == 'todo'"
            class="block"
          ></TodoBlock>
          <Heading1
            v-model="item.data"
            :BlocksIndex="index"
            v-if="item.type == 'heading1'"
            class="block"
          ></Heading1>
          <Heading2
            v-model="item.data"
            :BlocksIndex="index"
            v-if="item.type == 'heading2'"
            class="block"
          ></Heading2>
          <Heading3
            v-model="item.data"
            :BlocksIndex="index"
            v-if="item.type == 'heading3'"
            class="block"
          ></Heading3>
          <BulletedList
            v-model="item.data"
            :BlocksIndex="index"
            v-if="item.type == 'BulletedList'"
            class="block"
          ></BulletedList>
          <Hint
            v-model="item.data"
            :BlocksIndex="index"
            v-if="item.type == 'hint'"
            class="block"
          ></Hint>
          <BaseImage
            v-model="item.data"
            :BlocksIndex="index"
            v-if="item.type == 'image'"
            class="block"
          ></BaseImage>
        </div>
        <div class="line-right">
          <a class="drag-btn handle" @click="setVisibleData(index)">
            <i class="el-icon-menu"></i>
          </a>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
// TODO:添加addBlock,deleteBlock,moveBlock,changeBlock等事件
// TODO:图片的上传设置
// TODO:emoji的添加组件
// TODO:将BulletedList作为一个组件，内部添加多个无序列表
// TODO:添加代码框以及高亮功能
// TODO:添加撤销redo,undo功能
// TODO:添加全局快捷键
import draggable from "vuedraggable";
// 编写的模块组件
import AddBlockBtn from "@/components/AddBlockBtn";
import AddBlockContent from "@/components/AddBlockContent";
import TextBlock from "@/components/basicBlockComponents/TextBlock";
import TodoBlock from "@/components/basicBlockComponents/TodoBlock";
import Heading1 from "@/components/basicBlockComponents/Heading1";
import Heading2 from "@/components/basicBlockComponents/Heading2";
import Heading3 from "@/components/basicBlockComponents/Heading3";
import BulletedList from "@/components/basicBlockComponents/BulletedList";
import Hint from "@/components/basicBlockComponents/Hint";
import BaseImage from "@/components/basicBlockComponents/Image";
import store from "@/vuex/store.js";
import Vue from "vue";
// import { set } from "vue/types/umd";
export default {
  name: "AllInOne",
  components: {
    draggable,
    AddBlockBtn,
    AddBlockContent,
    TextBlock,
    TodoBlock,
    Heading1,
    Heading2,
    Heading3,
    BulletedList,
    Hint,
    BaseImage,
  },
  props: {
    readOnly: {
      type: Boolean,
      required: false,
      default: function () {
        return false;
      },
    },
    maxStack: {
      type: Number,
      default: function () {
        return 100;
      },
    },
    delay: {
      type: Number,
      default: function () {
        return 3000;
      },
    },
  },
  data() {
    return {
      historicalRecord: "",
    };
  },
  mounted() {
    class HistoryRecord {
      constructor(maxStack = 100, delay = 3000) {
        this.actionPoints = []; // 快照数组
        this.step = 0; // 当前位置
        this.maxStack = maxStack; // 最大容量
        this.delay = delay; //延迟时间，默认3000毫秒
        this.updateTime = 0; // 上次的操作时间
        this.init();
      }

      init() {
        this._event_bind(); // 快捷键绑定
        this.actionPoints.push(
          Vue.lodash.cloneDeep(store.state.currentPageBlocks)
        ); // push首次数据
      }

      push(type, data) {
        const curTime = Date.now();
        // const isChange = diff(data, this.actionPoints[this.step]);
        // if (!isChange) return; // 数据没变直接返回
        // 对应前面说的 原理C， 3s一次
        if (curTime - this.updateTime < this.delay) {
          this.actionPoints[this.step] = data;
          return;
        }

        // 对应前面说的 原理B， 发现撤销过又有新的操作
        if (this.actionPoints.length - 1 > this.step) {
          this.actionPoints.splice(this.step + 1);
        }

        this.actionPoints.push(data);
        this.step++;

        // 对应前面说的 原理D， 长度超出了
        if (this.actionPoints.length > this.maxStack) {
          this.actionPoints.shift();
          this.step--;
        }
        this.updateTime = curTime;
      }
      undo() {
        if (this.step <= 0) return;
        this.step--;
        this.reset();
      }
      redo() {
        if (this.step + 1 >= this.actionPoints.length) return;
        this.step++;
        this.reset();
      }
      reset() {
        this.updateTime = Date.now();
        let data = this.actionPoints[this.step];
        store.commit("mutationUpdateCurrentPageBlocks", data);
      }
      _event_bind() {
        document.addEventListener("keydown", e => {
          if ((e.metaKey || e.ctrlKey) && e.keyCode === 90) {
            this.undo();
          }
          if ((e.metaKey || e.ctrlKey) && e.keyCode === 89) {
            this.redo();
          }
        });
      }
    }
    this.historicalRecord = new HistoryRecord();
    this.subscribe();
  },
  computed: {
    isShowAddMenu() {
      return this.$store.state.isShowAddMenu;
    },
    getCurrentPageBlocks: {
      get() {
        return this.$store.state.currentPageBlocks;
      },
      set(value) {
        this.$store.commit("mutationUpdateCurrentPageBlocks", value);
      },
    },
    getterAddMenuContentLayerXY() {
      return this.$store.getters.getterAddMenuContentLayerXY;
    },
    dialogFormVisible: {
      get() {
        return this.$store.state.dialogFormVisible;
      },
      set(value) {
        this.$store.commit("mutationUpdateDialogFormVisible", value);
      },
    },
  },
  watch: {
    readOnly(val) {
      let textareaDom = document.getElementsByTagName("textarea");
      if (val == true) {
        for (let index = 0; index < textareaDom.length; index++) {
          const element = textareaDom[index];
          element.readOnly = true;
        }
      }
      if (val == false) {
        for (let index = 0; index < textareaDom.length; index++) {
          const element = textareaDom[index];
          element.readOnly = false;
        }
      }
    },
  },
  methods: {
    setVisibleData(index) {
      this.dialogFormVisible = true;
      this.$store.commit("mutationCurrentBlockIndex", index);
    },
    subscribe() {
      // 需要监控的 mutation
      let allowMutationSet = new Set([
        "mutationAddCurrentPageBlocks",
        "mutationDeletePageBlock",
        "mutationUpdateOneBlock",
        "mutationUpdateInputBlockText",
        "mutationUpdateCurrentPageBlocks",
      ]);
      this.$store.subscribe(({ type }, state) => {
        if (allowMutationSet.has(type)) {
          const data = this.lodash.cloneDeep(state.currentPageBlocks);
          this.historicalRecord.push(type, data);
        }
      });
    },
  },
};
</script>
<style lang="less">
.container-870 {
  padding-top: 100px;
  max-width: 870px;
  margin-left: auto;
  margin-right: auto;
  padding: 70px 70px 70px 30px;
  border: 1px solid #dddddd;
  border-radius: 2px;
  box-shadow: 0 8px 42px -8px rgba(82, 94, 102, 0.15);
  margin-bottom: 100px;
  .drag-btn {
    padding: 2px 5px;
    border-radius: 2px;
    color: #999999;
    .icondrag {
      font-size: 14px;
    }
  }
  .drag-btn:hover {
    background: #eeeeee;
    cursor: pointer;
  }

  .line-wrap {
    display: flex;
    align-items: center;
    line-height: 20px;
    .line-left {
      width: 40px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      visibility: hidden;
    }
    .line-right {
      width: 40px;
      display: flex;
      align-items: center;
      margin-right: 20px;
      visibility: hidden;
    }
    .line-medium {
      width: 100%;
    }
  }
  .line-wrap:hover {
    .line-left {
      visibility: visible;
    }
    .line-right {
      visibility: visible;
    }
  }
  .line-wrap:focus {
    visibility: hidden;
  }
}
</style>