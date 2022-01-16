<template>
  <div
    class="container-870"
    id="blockEditor"
  >
    <!-- 添加組件的彈窗 -->
    <AddBlockInfoContent></AddBlockInfoContent>
    <DragBlockActionContent></DragBlockActionContent>
    <draggable
      tag="div"
      v-model="getCurrentPageBlocks"
      class="list-group"
      handle=".handle"
      :ghost-class="dragGhostClass"
      animation="300"
    >
      <div
        class="line-wrap list-group-item"
        v-for="(item, index) in getCurrentPageBlocks"
        :key="index"
        ref="block"
      >
        <div
          class="line-left"
          v-if="readonly == false"
        >
          <!-- 彈出添加組件的彈窗+號按鈕 -->
          <AddBlockBtn :BlocksIndex="index"></AddBlockBtn>
          <!-- 拖拽組件 -->
          <DragBlockBtn :BlocksIndex="index"></DragBlockBtn>
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
          <PrismCodeEditor
            v-model="item.data"
            :BlocksIndex="index"
            v-if="item.type == 'PrismCodeEditor'"
            class="block"
            :readonly="readonly"
          ></PrismCodeEditor>
          <BaseImage
            v-model="item.data"
            :BlocksIndex="index"
            v-if="item.type == 'image'"
            class="block"
          ></BaseImage>
        </div>
        <div class="line-right">
          <a
            class="drag-btn handle"
            @click="setVisibleData(index)"
          >
            <i class="el-icon-menu"></i>
          </a>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
// TODO:添加addBlock,deleteBlock,moveBlock,changeBlock等事件
// TODO:圖片的上載設定
// TODO:emoji的添加組件
// TODO:將BulletedList作為一個組件，內部添加多個無序列表
// TODO:添加代碼框以及高亮功能
// TODO:添加全局快捷鍵
import draggable from "vuedraggable";
// 編寫的模塊組件
import AddBlockBtn from "@/components/AddBlockBtn";
import DragBlockBtn from "@/components/DragBlockBtn";
import AddBlockInfoContent from "@/components/AddBlockInfoContent";
import DragBlockActionContent from "@/components/DragBlockActionContent";
import TextBlock from "@/components/basicBlockComponents/TextBlock";
import TodoBlock from "@/components/basicBlockComponents/TodoBlock";
import Heading1 from "@/components/basicBlockComponents/Heading1";
import Heading2 from "@/components/basicBlockComponents/Heading2";
import Heading3 from "@/components/basicBlockComponents/Heading3";
import BulletedList from "@/components/basicBlockComponents/BulletedList";
import Hint from "@/components/basicBlockComponents/Hint";
import PrismCodeEditor from "@/components/basicBlockComponents/PrismCodeEditor";
import BaseImage from "@/components/basicBlockComponents/Image";
import store from "@/vuex/store.js";
import Vue from "vue";

export default {
  name: "blockEditor",
  store,
  components: {
    draggable,
    AddBlockBtn,
    DragBlockBtn,
    AddBlockInfoContent,
    DragBlockActionContent,
    TextBlock,
    TodoBlock,
    Heading1,
    Heading2,
    Heading3,
    BulletedList,
    Hint,
    PrismCodeEditor,
    BaseImage,
  },
  props: {
    readonly: {
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
        return 2000;
      },
    },
    currentPageBlocks: {
      type: Array,
      default: function () {
        return [];
      },
    },
    dragGhostClass: {
      type: String,
      default: function () {
        return "default-ghost-bg-color";
      },
    },
  },
  data() {
    return {
      historicalRecord: "",
    };
  },
  mounted() {
    this.$store.dispatch("mainStore/setUpdateCurrentPageBlocks", this.currentPageBlocks);
    class HistoryRecord {
      constructor(maxStack = 100, delay = 2000) {
        this.actionPoints = []; // 快照數組
        this.step = 0; // 當前位置
        this.maxStack = maxStack; // 最大容量
        this.delay = delay; //延遲時間，預設3000毫秒
        this.updateTime = 0; // 上次的操作時間
        this.init();
      }

      init() {
        this._event_bind(); // 快捷鍵綁定
        this.actionPoints.push(
          Vue.lodash.cloneDeep(store.state.currentPageBlocks)
        ); // push首次數據
      }

      push(type, data) {
        const curTime = Date.now();
        // const isChange = diff(data, this.actionPoints[this.step]);
        // if (!isChange) return; // 數據冇變直接返回
        // 對應前面說的 原理C， 3s一次
        if (curTime - this.updateTime < this.delay) {
          this.actionPoints[this.step] = data;
          return;
        }

        // 對應前面說的 原理B， 發現撤銷過又有新的操作
        if (this.actionPoints.length - 1 > this.step) {
          this.actionPoints.splice(this.step + 1);
        }

        this.actionPoints.push(data);
        this.step++;

        // 對應前面說的 原理D， 長度超出了
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
        this.$store.dispatch("mainStore/setUpdateCurrentPageBlocks", data);
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
    this.historicalRecord = new HistoryRecord(this.maxStack, this.delay);
    this.subscribe();
  },
  computed: {
    isShowAddMenu() {
      return this.$store.state.addMenuStore.isShowAddMenu;
    },
    getCurrentPageBlocks: {
      get() {
        return this.$store.state.mainStore.currentPageBlocks;
      },
      set(value) {
        this.$store.dispatch("mainStore/setUpdateCurrentPageBlocks", value);
      },
    },
    dialogFormVisible: {
      get() {
        return this.$store.state.mainStore.dialogFormVisible;
      },
      set(value) {
        this.$store.dispatch("mainStore/setUpdateDialogFormVisible", value);
      },
    },
  },
  watch: {
    readonly(val) {
      let textareaDom = document.getElementsByTagName("textarea");
      if (val == true) {
        for (let index = 0; index < textareaDom.length; index++) {
          const element = textareaDom[index];
          element.readonly = true;
        }
      }
      if (val == false) {
        for (let index = 0; index < textareaDom.length; index++) {
          const element = textareaDom[index];
          element.readonly = false;
        }
      }
    },
  },
  methods: {
    setVisibleData(index) {
      this.dialogFormVisible = true;
      this.$store.dispatch("mainStore/setCurrentBlockIndex", index);
    },
    subscribe() {
      // 需要監控的 mutation
      let allowMutationSet = new Set([
        "mainStore/mutationAddCurrentPageBlocks",
        "mainStore/mutationDeletePageBlock",
        "mainStore/mutationUpdateOneBlock",
        "mainStore/mutationUpdateInputBlockText",
        "mainStore/mutationUpdateCurrentPageBlocks",
      ]);
      this.$store.subscribe(({ type }, state) => {
        if (allowMutationSet.has(type)) {
          // TODO:還需要返回type，比如有 add, delete, drabbagle, textChangeds
          this.$emit("change", state.mainStore.currentPageBlocks);
          const data = this.lodash.cloneDeep(state.mainStore.currentPageBlocks);
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
.default-ghost-bg-color {
  background: hsla(196, 85%, 63%, 0.123);
}
</style>
