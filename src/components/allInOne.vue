<template>
  <div class="container-870">
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
        <div class="line-right">
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
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
// 引入vuedraggable拖拽组件
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

export default {
  //import引入的组件需要注入到对象中才能使用
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
  },
  props: {
    readOnly: {
      type: Boolean,
      required: false,
      default: function () {
        return false;
      },
    },
  },
  data() {
    return {
      dragging: false,
    };
  },
  computed: {
    isShowAddMenu() {
      return this.$store.state.isShowAddMenu;
    },
    getCurrentPageBlocks: {
      get() {
        return this.$store.getters.getterCurrentPageBlocks;
      },
      set(value) {
        this.$store.commit("mutationUpdateCurrentPageBlocks", value);
      },
    },
    getterAddMenuContentLayerXY() {
      return this.$store.getters.getterAddMenuContentLayerXY;
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
      width: 100%;
    }
  }
  .line-wrap:hover {
    .line-left {
      visibility: visible;
    }
  }
  .line-wrap:focus {
    visibility: hidden;
  }
}
</style>