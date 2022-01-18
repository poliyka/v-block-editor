const state = {
  isShowDragMenu: false,
  dragBlockActionArray: [
    {
      name: "dragMenu.name.delete",
      cmd: "Del",
      type: "button",
      action: "delete",
      iconClass: "el-icon-delete",
      color: "block",
    },
    {
      name: "dragMenu.name.duplicate",
      cmd: "Ctrl + D",
      type: "button",
      action: "duplicate",
      iconClass: "el-icon-copy-document",
      color: "red",
    },
    {
      name: "dragMenu.name.turnInto",
      cmd: null,
      type: "list",
      action: "turnInto",
      iconClass: "el-icon-connection",
      color: "red",
    },
    {
      name: "dragMenu.name.color",
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
