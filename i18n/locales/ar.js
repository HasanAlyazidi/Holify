export default {
  languageName: 'عربي',
  direction: 'rtl',

  app: {
    name: 'قدسها',
    description: 'إدارة النفايات',
  },

  // styles
  style: {
    row: 'row-reverse',
    start: 'right',
    end: 'left',
    marginStart: 'marginRight',
    marginEnd: 'marginLeft',
    paddingStart: 'paddingRight',
    paddingEnd: 'paddingLeft',
  },

  images: {
    menu: require('../../assets/images/screens/Main/menu-rtl.png')
  },

  welcomeMessage: 'مرحباً بك في قدسها',
  login: 'تسجيل الدخول',
  logout: 'تسجيل خروج',
  register: 'تسجيل حساب',
  about: 'من نحن',
  contact: 'اتصل بنا',
  settings: 'اللغة',

  myPoints: 'نقاطي',
  scan: 'فحص',

  account: {
    back: 'رجوع',
    register: 'تسجيل حساب',
    reset: 'نسيت البيانات؟',
    loginButton: 'دخول الآن',
    registerButton: 'تسجيل الآن',
  },

  resetPassword: {
    title: 'استعادة الحساب',
    enterEmail: 'أدخل بريدك الإلكتروني الذي سجلت به:',
    submit: 'إرسال رابط الإستعادة',
  },

  myAccount: {
    title: 'حسابي',
    submit: 'تحديث الحساب',
  },

  permissions: {
    camera: {
      allowed: 'جاري الوصول إلى الكاميرا',
      denied: 'لا يمكن الوصول إلى الكاميرا',
    },
  },

  confirmLogout: 'هل تريد بالفعل تسجيل الخروج؟',

  username: 'اسم المستخدم',
  fullname: 'الاسم كامل',
  name: 'الاسم',
  email: 'البريد الإلكتروني',
  password: 'الرقم السري',
  mobile: 'رقم الجوال',
  message: 'الرسالة',
  address: 'العنوان',
  city: 'المدينة',

  ok: 'موافق',
  back: 'رجوع',
  next: 'التالي',
  cancel: 'إلغاء',
  confirm: 'تأكيد',
  yes: 'نعم',

  social: {
    instagram: 'صفحتنا على Instagram',
  },

  sendNow: 'إرسال الآن',

  messages: {

  },

  errors: {
    emptyField: 'يرجى إدخال {{field}}',
    invalidField: '{{field}} غير صحيح',
    invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
    invalidLength: '{{field}}: يرجى إدخال نص مكون من {{min}} إلى {{max}} حرف',
    invalidPassword: 'يرجى إدخال رقم سري مكون من {{min}} إلى {{max}} حرف ورقم',
    invalidMobileNumber: 'رقم الجوال غير صحيح',
    invalidMobileType: 'يرجى إدخال رقم جوال صحيح',
    unknownError: 'يرجى التأكد من البيانات ثم المحاولة مجدداً',

    failedApi: {
      tryAgain: 'حاول مجدداً',
      message: 'لا يمكن عرض البيانات',
    },
  },
};
