import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isShowAddMenu: false,
  addMenuContentLayerXY: {
    x: 0,
    y: 0
  },
  currentBlockIndex: 0,
  currentPageBlocks: [{
    "type": "heading1",
    "data": {
      "text": "All-in-one 是什么"
    }
  }, {
    "type": "image",
    "data": {
      // "text": "asas",
      "src": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      "height": "200px",
      // "width": "200px",
    }
  }, {
    "type": "text",
    "data": {
      "text": "All-in-one 是一个开源的模块化内容构建编辑器，它不同于传统的文本编辑器，所有的内容都是以模块的概念来打造。灵感来自Notion"
    }
  }, {
    "type": "heading2",
    "data": {
      "text": "灵活的插拔"
    }
  }, {
    "type": "text",
    "data": {
      "text": "所有的模块都以VUE组件的形式编写，可以灵活插拔。你可以用All-in-one编辑器构建一个模块化的内容平台，可以在一个页面里插入任何其他模块，就像Notion一样"
    }
  }, {
    "type": "heading3",
    "data": {
      "text": "纯净的输出"
    }
  }, {
    "type": "text",
    "data": {
      "text": "所有组件保存的数据，都以Json的形式存储在Vuex里供不同组件调用"
    }
  }, {
    "type": "text",
    "data": {
      "text": ""
    }
  }, {
    "type": "hint",
    "data": {
      "text": "🐞由于不是用WYSIWYG的编辑器进行二次开发，目前在文本编辑方面有一些不能解决的Bug"
    }
  }, {
    "type": "text",
    "data": {
      "text": ""
    }
  }, {
    "type": "BulletedList",
    "data": {
      "text": "当输入行大于等于2行时，键盘的上下按键没有办法处理光标在同组件的文本内容里上下移动"
    }
  }, {
    "type": "BulletedList",
    "data": {
      "text": "内容无法跨模块复制"
    }
  }, {
    "type": "BulletedList",
    "data": {
      "text": "其他一些小的问题"
    }
  }, {
    "type": "text",
    "data": {
      "text": ""
    }
  }, {
    "type": "hint",
    "data": {
      "text": "👏 已实现的模块"
    }
  }, {
    "type": "text",
    "data": {
      "text": ""
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": true,
      "text": "纯文本"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": true,
      "text": "待办清单"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": true,
      "text": "标题1"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": true,
      "text": "标题2"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": true,
      "text": "标题3"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": true,
      "text": "符号列表"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": true,
      "text": "提示栏"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": true,
      "text": "组件的拖动排序"
    }
  }, {
    "type": "text",
    "data": {
      "text": ""
    }
  }, {
    "type": "hint",
    "data": {
      "text": "🧑‍💻待开发的功能清单"
    }
  }, {
    "type": "text",
    "data": {
      "text": ""
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": false,
      "text": "图片上传组件"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": false,
      "text": "事件节点组件"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": false,
      "text": "表格组件"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": false,
      "text": "看板组件"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": false,
      "text": "redo and undo"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": false,
      "text": "右键新建block组件"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": false,
      "text": "重构"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": false,
      "text": "有序列表"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": false,
      "text": "插入表情"
    }
  }, {
    "type": "todo",
    "data": {
      "isChecked": false,
      "text": "封装成组件发布"
    }
  }],
  addBlockInfoArray: [{
      name: "纯文本",
      tip: "用纯文本开始写内容",
      type: "text",
      data: {
        text: "",
      },
    },
    {
      name: "待办清单",
      tip: "用待办清单去追踪任务",
      type: "todo",
      data: {
        text: "",
      },
    },
    {
      name: "标题1",
      tip: "大字号标题",
      type: "heading1",
      data: {
        text: "",
      },
    },
    {
      name: "标题2",
      tip: "中字号标题",
      type: "heading2",
      data: {
        text: "",
      },
    },
    {
      name: "标题3",
      tip: "小字号标题",
      type: "heading3",
      data: {
        text: "",
      },
    },
    {
      name: "符号列表",
      tip: "大字号标题",
      type: "BulletedList",
      data: {
        text: "",
      },
    },
    {
      name: "提示栏",
      tip: "用于提示比较重要的信息",
      type: "hint",
      data: {
        text: "",
        color: "#409eff",
      },
    },
    {
      name: "图片",
      tip: "用于提示比较重要的信息",
      type: "image",
      data: {
        src: "",
        height: "200px",
      },
    },
  ],
  dialogFormVisible: false
}

const mutations = {
  mutationIsShowAddMenu(state, isShowAddMenu) {
    state.isShowAddMenu = isShowAddMenu
  },
  mutationCurrentBlockIndex(state, index) {
    state.currentBlockIndex = index
  },
  mutationAddMenuContentLayerXY(state, addMenuContentLayerXY) {
    state.addMenuContentLayerXY = addMenuContentLayerXY
  },
  mutationAddCurrentPageBlocks(state, addBlockInfo) {
    let index = addBlockInfo.index + 1
    state.currentPageBlocks.splice(index, 0, addBlockInfo.blockItem)
  },
  mutationDeletePageBlock(state, index) {
    state.currentPageBlocks.splice(index, 1)
  },
  mutationUpdateCurrentPageBlocks(state, blocks) {
    state.currentPageBlocks = blocks
  },
  mutationUpdateOneBlock(state, block) {
    let index = block.index
    state.currentPageBlocks[index] = state.blockItem
  },
  mutationUpdateDialogFormVisible(state, status) {
    state.dialogFormVisible = status
  }
}


const getters = {
  getterAddMenuContentLayerXY(state) {
    let a = state.addMenuContentLayerXY
    let clientHeight = window.innerHeight

    if (a.y > (clientHeight / 2)) {
      a.y = a.y - 380
    }
    a.y = `${a.y + 20}px`
    a.x = `${a.x + 48}px`

    // 当前浏览器的高度
    return a
  },
  getterAddBlockInfoObject(state) {
    let blockObject = {}
    for (let blockInfo of state.addBlockInfoArray) {
      blockObject[blockInfo.type] = blockInfo
    }
    return blockObject
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters
})