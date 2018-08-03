export default {
  languageName: 'English',
  direction: 'ltr',

  app: {
    name: 'Holify',
    description: 'Waste Management',
  },

  // styles
  style: {
    row: 'row',
    start: 'left',
    end: 'right',
    marginStart: 'marginLeft',
    marginEnd: 'marginRight',
    paddingStart: 'paddingLeft',
    paddingEnd: 'paddingRight',
  },

  images: {
    menu: require('../../assets/images/screens/Main/menu-ltr.png')
  },

  welcomeMessage: 'Welcome Holify',
  login: 'Login',
  logout: 'Logout',
  register: 'Register',
  about: 'About Us',
  contact: 'Contact Us',
  settings: 'Language',

  myPoints: 'My Points',
  scan: 'Scan',

  account: {
    back: 'Back',
    register: 'Register',
    reset: 'Forgot?',
    loginButton: 'Login Now',
    registerButton: 'Register Now',
  },

  resetPassword: {
    title: 'Reset Password',
    enterEmail: 'Enter your email you registered with:',
    submit: 'Send Reset Link',
  },

  myAccount: {
    title: 'My Account',
    submit: 'Update My Account',
  },

  permissions: {
    camera: {
      allowed: 'Requesting for camera permission',
      denied: 'No access to camera',
    },
  },

  confirmLogout: 'Are you sure you want to log out?',

  username: 'User Name',
  fullname: 'Full Name',
  name: 'Name',
  email: 'Email',
  password: 'Password',
  mobile: 'Mobile',
  message: 'Message',
  address: 'Address',
  city: 'City',

  ok: 'OK',
  back: 'Back',
  next: 'Next',
  cancel: 'Cancel',
  confirm: 'Confirm',
  yes: 'Yes',

  social: {
    instagram: 'Holify on Instagram',
  },

  sendNow: 'Send Now',

  messages: {

  },

  errors: {
    emptyField: 'Enter the {{field}}',
    invalidField: '{{field}} is invalid',
    invalidEmail: 'Enter a valid email',
    invalidLength: '{{field}}: Enter a text between {{min}} and {{max}} characters.',
    invalidPassword: 'Enter a password between {{min}} and {{max}} characters and numbers.',
    invalidMobileNumber: 'Enter a valid mobile number',
    invalidMobileType: 'Please enter a valid mobile number',
    unknownError: 'Make sure all inputs are entered correctly, then try again.',

    failedApi: {
      tryAgain: 'Try Again',
      message: 'Error Occurred',
    },
  },
};
