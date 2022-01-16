# Demo

[Demo](https://v-block-editor.poliyka.xyz)

# 介紹

這是一個 fork 自經由 `renmu123` 將 `CedarXi` [All-in-one](https://github.com/CedarXi/All-in-one) 項目

代碼重構後發布的 [v-block-editor](https://github.com/renmu123/v-block-editor) 項目的分支

由於 `CedarXi` 與 `renmu123` 都長時間無維護此項目，我將它重新撿起來維護

# 使用

```
git clone https://github.com/poliyka/v-block-editor.git
cd v-block-editor

npm install
npm run serve
```

# v-block-editor 是什麼

v-block-editor 是一個開源的模塊化內容構建編輯器，它不同於古早的文本編輯器，所有的內容都是以模塊的概念來打造。靈感來自 Notion

# 與原版的差異

1. 對 draggable 組件進行重構，單擊 drag 物件可以打開 action 菜單
2. 使用 `koca` [vue-prism-editor](https://github.com/koca/vue-prism-editor) 作為程式碼編輯器

## 靈活的插拔

所有的模塊都以 Vue 組件的形式編寫，可以靈活插拔。你可以用 v-block-editor 編輯器構建一個模塊化的內容平臺，可以在一個頁麵裏插入任何其他模塊，就像 Notion 一樣

## 純淨的輸出

所有組件保存的數據，都以對象的的形式存儲在 Vuex 裏供不同組件調用

## TODO

### 👏 已實現的模塊

- [x] 純文本
- [x] 待辦清單
- [x] 標題 1
- [x] 標題 2
- [x] 標題 3
- [x] 符號列錶
- [x] 提示欄
- [x] 組件的拖拽移動
- [x] 允許使用 Ctrl+Z 和 Ctrl+Y 來執行撤銷和重做
- [x] 圖片模塊（可以調整大小，通過黏貼事件載入剪切闆中的圖片）
- [x] 程式碼編輯器

### 🧑‍💻 待開發的模塊

- [ ] 事件節點組件
- [ ] 圖片上載
- [ ] 表格組件
- [ ] 看板組件
- [ ] emoji 組件
- [ ] 插件化開發設定

# API

```
    <blockEditor
    :currentPageBlocks="currentPageBlocks"
    @change="change"
    maxStack="100"  //最大曆史記錄
    delay="2000" // 兩秒保存一次曆史記錄
    ></blockEditor>
```
