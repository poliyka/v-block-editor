# 介绍
这是一个 fork 自 [All-in-one](https://github.com/CedarXi/All-in-one) 项目的分支

我维护这个项目初衷和 CedarXi 这位老哥的想法类似，也是要做一个类似 notion 的编辑器，在 github 上搜索的时候发现了这个项目，看到作者停更了就想着我来维护一下，懒得重新开一个轮子。 

但是在维护项目的时候发现原代码可维护性和拓展性是比较差的，各种代码都是复制黏贴一梭子，完全都没有进行抽象，虽然说利用了 vuex 来进行数据维护，但是并没有通过 Mutation 来进行数据维护，而是直接修改 object 的数据。导致了有些数据的更改无法进行追踪。

之后我大刀阔斧进行了重构，虽然说现在的 UI 与原版的 UI 没什么太大差别，但是后面的代码却是差别比较多的。

# 使用
```
git clone git@github.com:renmu123/v-block-editor.git
cd v-block-editor

npm install 
npm run serve
```


# v-block-editor 是什么
v-block-editor 是一个开源的模块化内容构建编辑器，它不同于传统的文本编辑器，所有的内容都是以模块的概念来打造。灵感来自Notion

# 与原版的差异
1. 对组件的代码进行了大幅度重构和内部组建的抽象，现在底层的一些模块复用同一个模块
2. 每次的数据的变更利用 vuex 的 Mutation 进行操作而不是利用 js 的 object 的浅复制完成数据更改
3. 将整个组件从 Home.vue 从拿出来，而不是硬耦合在一起，方便之后直接上传到 npm 上
4. 对原项目中的一些光标进行了处理更加人性化的处理，比如方向左右键可以跨组件，去除了方向上下键的 300ms 延迟
5. 增加了 Ctrl+Z 和 Ctrl+Y 的撤销重做
6. 增加了图片组件
7. Hint 组件可以修改左侧的 borderColor

## 灵活的插拔
所有的模块都以 Vue 组件的形式编写，可以灵活插拔。你可以用 v-block-editor 编辑器构建一个模块化的内容平台，可以在一个页面里插入任何其他模块，就像 Notion 一样

## 纯净的输出
所有组件保存的数据，都以对象的的形式存储在 Vuex 里供不同组件调用


## TODO
### 👏 已实现的模块
- [x] 纯文本
- [x] 待办清单
- [x] 标题1
- [x] 标题2
- [x] 标题3
- [x] 符号列表
- [x] 提示栏
- [x] 组件的拖拽移动
- [x] 允许使用 Ctrl+Z 和 Ctrl+Y 来执行撤销和重做
- [x] 图片模块（可以调整大小，通过黏贴事件载入剪切板中的图片）


### 🧑‍💻 待开发的模块
- [ ] 事件节点组件
- [ ] 图片上传requeset
- [ ] 表格组件
- [ ] 看板组件
- [ ] emoji组件
- [ ] 插件化开发设置


# API
```
    <blockEditor
    :currentPageBlocks="currentPageBlocks"
    @change="change"
    maxStack="100"  //最大历史记录
    delay="2000" // 两秒保存一次历史记录
    ></blockEditor>
```