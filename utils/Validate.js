import t from '../i18n';

export default class Validate {
  static lengths = {
    name: {
      min: 7,
      max: 50,
    },
    password: {
      min: 6,
      max: 30,
    },
    message: {
      min: 15,
      max: 350,
    },
    address: {
      min: 10,
      max: 350,
    },
    city: {
      min: 2,
      max: 60,
    },
  };

  static get message() {
    return {
      emptyEmail: t('errors.emptyEmail'),
      invalidEmail: t('errors.invalidEmail'),
      emptyPassword: t('errors.emptyPassword'),
      invalidMobileNumber: t('errors.invalidMobileNumber'),
      invalidMobileType: t('errors.invalidMobileType'),
      unknownError: t('errors.unknownError'),

      emptyField: (field, lowerCase = true) =>
        t('errors.emptyField', { field: lowerCase ? field.toLowerCase() : field }),
      invalidField: field => t('errors.invalidField', { field }),
      invalidLength: (field, min, max) => t('errors.invalidLength', { field, min, max }),
      invalidPassword: (min, max) => t('errors.invalidPassword', { min, max }),
    };
  }

  static email(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  static between(value, num1, num2) {
    return value.length >= num1 && value.length <= num2;
  }

  static empty(value) {
    return value.length === 0;
  }
}
