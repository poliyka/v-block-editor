const currentPageBlocks = [
  {
    type: "heading1",
    data: {
      text: "vne-block-editor 是什麼",
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
        "vne-block-editor 是一個開源的模塊化內容構建編輯器，它不同於古早的文本編輯器，所有的內容都是以模組的概念來打造。靈感來自Notion",
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
        "所有的模組都以VUE組件的形式編寫，可以靈活插拔。你可以用vne-block-editor編輯器構建一個模組化的內容平臺，可以在一個頁面裏插入任何其他模組，就像Notion一樣",
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
        "🐞目前由於不是用WYSIWYG的編輯器進行二次開發，目前在文本編輯方面有一些不能解決的Bug",
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
        "當輸入行大於等於2行時，鍵盤的上下按鍵沒有辦法處理光標在同組件的文本內容裡上下移動",
    },
  },
  {
    type: "BulletedList",
    data: {
      text: "內容無法跨模組複製",
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
    type: "heading3",
    data: {
      text: "使用 Prismjs 建構的編輯器",
    },
  },
  {
    type: "code",
    data: {
      text: "class Python:\n    \"\"\" Amazing prismjs! 😎 \"\"\"\n    \n    text=\"Hello World\"\n    print(text)",
      language: "py",
      tabSize: 4,
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
      text: "👏 已實現的模組",
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
      text: "符號列表",
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
    type: "todo",
    data: {
      isChecked: true,
      text: "程式碼編輯器",
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
      text: "表格組件",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "看板組件",
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
      text: "Alt新增組件改為 '/' 新增組件",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "有序列表",
    },
  },
  {
    type: "todo",
    data: {
      isChecked: false,
      text: "插入emoji",
    },
  },
];
export default currentPageBlocks;
