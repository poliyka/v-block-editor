const state = {
  isShowAddMenu: false,
  addBlockInfoArray: [
    {
      name: "addMenu.name.text",
      tip: "addMenu.tip.text",
      type: "text",
      data: {
        text: "",
      },
    },
    {
      name: "addMenu.name.todo",
      tip: "addMenu.tip.todo",
      type: "todo",
      data: {
        text: "",
      },
    },
    {
      name: "addMenu.name.heading1",
      tip: "addMenu.tip.heading1",
      type: "heading1",
      data: {
        text: "",
      },
    },
    {
      name: "addMenu.name.heading2",
      tip: "addMenu.tip.heading2",
      type: "heading2",
      data: {
        text: "",
      },
    },
    {
      name: "addMenu.name.heading3",
      tip: "addMenu.tip.heading3",
      type: "heading3",
      data: {
        text: "",
      },
    },
    {
      name: "addMenu.name.BulletedList",
      tip: "addMenu.tip.BulletedList",
      type: "BulletedList",
      data: {
        text: "",
      },
    },
    {
      name: "addMenu.name.hint",
      tip: "addMenu.tip.hint",
      type: "hint",
      data: {
        text: "",
        color: "#409eff",
      },
    },
    {
      name: "addMenu.name.code",
      tip: "addMenu.tip.code",
      type: "code",
      data: {
        text: "",
        language: "js",
        tabSize: 2,
      },
    },
    {
      name: "addMenu.name.image",
      tip: "addMenu.tip.image",
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
