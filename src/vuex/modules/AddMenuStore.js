const state = {
  isShowAddMenu: false,
  addBlockInfoArray: [
    {
      name: "純文本",
      tip: "用純文本開始寫內容",
      type: "text",
      data: {
        text: "",
      },
    },
    {
      name: "待辦清單",
      tip: "用待辦清單去追蹤任務",
      type: "todo",
      data: {
        text: "",
      },
    },
    {
      name: "標題1",
      tip: "大字號標題",
      type: "heading1",
      data: {
        text: "",
      },
    },
    {
      name: "標題2",
      tip: "中字號標題",
      type: "heading2",
      data: {
        text: "",
      },
    },
    {
      name: "標題3",
      tip: "小字號標題",
      type: "heading3",
      data: {
        text: "",
      },
    },
    {
      name: "符號列表",
      tip: "大字號標題",
      type: "BulletedList",
      data: {
        text: "",
      },
    },
    {
      name: "提示欄",
      tip: "用於提示比較重要的信息",
      type: "hint",
      data: {
        text: "",
        color: "#409eff",
      },
    },
    {
      name: "圖片",
      tip: "用於提示比較重要的信息",
      type: "image",
      data: {
        src: "",
        height: "200px",
      },
    },
  ],
};

const getters = {
  getterAddBlockInfoObject(state) {
    let blockObject = {};
    for (let blockInfo of state.addBlockInfoArray) {
      blockObject[blockInfo.type] = blockInfo;
    }
    return blockObject;
  },
};

const actions = {
  setIsShowAddMenu({ commit, state }, data) {
    commit("mutationIsShowAddMenu", data);
  },
};

const mutations = {
  mutationIsShowAddMenu(state, isShowAddMenu) {
    state.isShowAddMenu = isShowAddMenu;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
