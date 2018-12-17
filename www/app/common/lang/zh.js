/**
 * Created by SudeshNT on 11/4/2016.
 */
angular.module("lang_zh", ["pascalprecht.translate", "ngSanitize"]).config([
  "$translateProvider",
  function($translateProvider) {
    $translateProvider.translations("zh", {
      SIGN_IN_WITH: "登陆使用",
      SIGN_UP_WITH: "注册",
      ALREADY_REGISTERED: "已经注册 ?",
      USE_EMAIL: "使用电邮",
      SIGN_IN: "签到",
      SIGN_UP: "注册",
      REGISTER: "寄存器",
      EMAIL_ADDRESS: "电子邮件地址",
      PASSWORD: "密码",
      NO_ACCOUNT: "没有账号 ",
      FORGET_PASSWORD: "忘记密码 ?",
      I_AM_SHOPPING_FOR: "搜索..",
      WHAT_S_NEW: "什么是新的",
      JUST_FOR_YOU: "只为你",
      MOST_TRENDING: "最热门",
      DISCOVER: "发现",
      ALL_CATEGORIES: "所有类别",
      WISH_LIST: "愿望清单",
      ADD_TO_WISH_LIST: "添加到心愿单",
      ADDED_TO_WISH_LIST: "添加到愿望清单",
      ADD_TO_CART: "添加到购物车",
      SEARCH_AN_ITEM: "搜索项目...",
      BILLING_DETAILS: "结算明细",
      YOUR_ORDER: "你的订单",
      SELECT_A_PAYMENT_METHOD: "选择一种付款方式",
      SIZE: "尺寸",
      SHIPPING_AND_HANDLING: "邮寄方式",
      PAYMENT_METHOD: "付款方法",
      ORDER_TOTAL: "合计订单",
      DESCRIPTION: "描述",
      REVIEWS: "评测",
      SHIPPING_INFORMATION: "货运信息",
      SHIPPING_ADDRESS: "邮寄地址",
      BILLING_ADDRESS: "帐单地址",
      RETURN_POLICY: "退货政策",
      BUYER_PROTECTION: "Buyer Protection",
      LOG_OUT: "买家保护",
      ORDER_HISTORY: "订单历史",
      NEW: "新",
      OUTLETS: "网点",
      WHOLESALE: "批发",
      HOME: "家",
      COMPANY_NAME: "公司名",
      FIRST_NAME: "名字",
      LAST_NAME: "姓",
      CONFIRM_PASSWORD: "确认密码",
      PLEASE_SELECT_ACCOUNT_ROLE: "请为您的帐户选择角色",
      I_AM_BUYER: "我是买方",
      I_AM_SELLER: "我是卖家",
      SERVER_ERROR: "服务器错误",
      ADD_ITEM: "新增项目",
      MY_PRODUCTS: "我的产品",
      WHAT_IS_YOUR_PRODUCT_NAME: "产品名称",
      TELL_US_ABOUT_YOUR_ITEM: "商品描述",
      WHAT_IS_THE_MODEL_OF_YOUR_PRODUCT: "你的产品的型号是什么？",
      WHAT_IS_THE_PRICE_OF_YOUR_PRODUCT: "价钱",
      WHAT_IS_THE_HEIGHT_OF_YOUR_PRODUCT: "高度",
      WHAT_IS_THE_WEIGHT_OF_YOUR_PRODUCT: "重量",
      PLEASE_SELECT_TYPE_OF_ITEM: "选择货币 *",
      PLEASE_SELECT_MAIN_CATEGORY: "请选择一个主要类别",
      PLEASE_SELECT_SUB_CATEGORY: "请选择一个子类别",
      CURRENCY: "~ 选择货币",
      MEASURE_UNIT: "选择单位 *",
      CHECKOUT: "查看",
      LENGTH: "长度",
      WIDTH: "宽度",
      QUANTITY_AVAILABLE: "数量可用",
      QUANTITY: "数量",
      SAVE_ITEM: "保存项目",
      MY_PROFILE: "我的简历",
      CHANGE_PASSWORD: "更改密码",
      MOBILE: "手机号码",
      EMAIL: "电子邮件地址",
      ORDER_ID: "订单ID",
      CHECKOUT_STEP_ONE: "结帐 - 步骤1",
      CHECKOUT_STEP_TWO: "结帐 - 第2步",
      CHECKOUT_STEP_THREE: "结帐 - 第3步",
      COMMENTS: "注释",
      NEW_ARRIVALS: "新来港定居人士",
      FEATURED_BRANDS: "推荐品牌",
      FEATURED_STORES: "特色商店",
      ITEMS_TO_LOVE: "项目要爱!",
      HERE_ARE_THE_BEST_SELLING_WHOLESALE_ITEMS: "这里是最畅销的批发商品",
      PURCHASE_IN_BULK:
        "如果您想在我们的网站上批量购买物品，请与我们联系。我们会协助您购买！",
      YOUR_NAME: "你的名字",
      ITEM_URL: "商品网址",
      SETTINGS: "设置",
      LANGUAGE: "语言",
      ENG_US: "英语 (US)",
      CHINESE_SIMPLIFIED: "简体中文",
      SELECT_OPTION: "~ 选择选项",
      REQUIRED: "需要",
      SUBSTRACT_QUANTITY: "减去数量 ",
      SPECIFY_QUANTITY: "指定数量 *",
      SPECIFY_PRICE_RANGE: "指定价格范围",
      CHOOSE: "~ 选择",
      NEXT: "下一个 >",
      ADD_OPTION: "添加选项",
      PLEASE_VALIDATE: "請輸入所有必填字段",
      ENG_US: "English (US)",
      CHINESE_SIMPLIFIED: "Simplified Chinese (简体中文)"
    });
    $translateProvider.useSanitizeValueStrategy("escapeParameters");
  }
]);
