const state = {
  isShowDragMenu: false,
  dragBlockActionArray: [
    {
      name: "刪除",
      cmd: "Del",
      type: "button",
      action: "delete",
      iconClass: "el-icon-delete",
      color: "block",
    },
    {
      name: "複製",
      cmd: "Ctrl + D",
      type: "button",
      action: "duplicate",
      iconClass: "el-icon-copy-document",
      color: "red",
    },
    {
      name: "轉換",
      cmd: null,
      type: "list",
      action: "turnInto",
      iconClass: "el-icon-connection",
      color: "red",
    },
    {
      name: "顏色",
      cmd: null,
      type: "list",
      action: "color",
      iconClass: "el-icon-orange",
      color: "red",
    },
  ],
};

const getters = {
  getterDragBlockActionObject(state) {
    let blockObject = {};
    for (let blockAction of state.dragBlockActionArray) {
      blockObject[blockAction.type] = blockAction;
    }
    return blockObject;
  },
};

const actions = {
  setIsShowDragMenu({ commit, state }, data) {
    commit("mutationIsShowDragMenu", data);
  },
};

const mutations = {
  mutationIsShowDragMenu(state, isShowDragMenu) {
    state.isShowDragMenu = isShowDragMenu;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
