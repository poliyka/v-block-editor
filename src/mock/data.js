const currentPageBlocks = [
  {
    type: "heading1",
    data: {
      text: "v-block-editor 是什麼",
    },
  },
  {
    type: "image",
    data: {
      // "text": "asas",
      src:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      height: "200px",
      // "width": "200px",
    },
  },
  {
    type: "text",
    data: {
      text:
        "v-block-editor 是一個開源的模塊化內容構建編輯器，它不同於古早的文本編輯器，所有的內容都是以模塊的概念來打造。靈感來自Notion",
    },
  },
  {
    type: "heading2",
    data: {
      text: "靈活的插拔",
    },
  },
  {
    type: "text",
    data: {
      text:
        "所有的模塊都以VUE組件的形式編寫，可以靈活插拔。你可以用v-block-editor編輯器構建一個模塊化的內容平臺，可以在一個頁麵裏插入任何其他模塊，就像Notion一樣",
    },
  },
  {
    type: "heading3",
    data: {
      text: "純淨的輸出",
    },
  },
  {
    type: "text",
    data: {
      text: "所有組件保存的數據，都以Json的形式存儲在Vuex裏供不同組件調用",
    },
  },
  {
    type: "text",
    data: {
      text: "",
    },
  },
  {
    type: "hint",
    data: {
      text:
        "🐞目前由於不是用WYSIWYG的編輯器進行二次開發，目前在文本編輯方麵有一些不能解決的Bug",
    },
  },
  {
    type: "text",
    data: {
      text: "",
    },
  },
  {
    type: "BulletedList",
    data: {
      text:
        "當輸入行大於等於2行時，鍵盤的上下按鍵冇有辦法處理遊標在同組件的文本內容裏上下移動",
    },
  },
  {
    type: "BulletedList",
    data: {
      text: "內容無法跨模塊複製",
    },
  },
  {
    type: "BulletedList",
    data: {
      text: "其他一些小的問題",
    },
  },
  {
    type: "text",
    data: {
      text: "",
    },
  },
  {
    type: "hint",
    data: {
      text: "👏 已實現的模塊",
    },
  },
  {
    type: "text",
    data: {
      text: "",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: true,
      text: "純文本",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: true,
      text: "待辦清單",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: true,
      text: "標題1",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: true,
      text: "標題2",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: true,
      text: "標題3",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: true,
      text: "符號列錶",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: true,
      text: "提示欄",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: true,
      text: "組件的拖動排序",
    },
  },
  {
    type: "text",
    data: {
      text: "",
    },
  },
  {
    type: "hint",
    data: {
      text: "🧑‍💻待開發的功能清單",
    },
  },
  {
    type: "text",
    data: {
      text: "",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "將 textarea 改為 WYSIWYG",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "圖片上載組件",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "事件節點組件",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "錶格組件",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "看闆組件",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "redo and undo",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "右鍵新建block組件",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "重構",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "有序列錶",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "插入錶情",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "封裝成組件PO",
    },
  },
];
export default currentPageBlocks;
