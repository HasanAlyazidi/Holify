import { showAlert, Validate, User } from './Common';

export default class Api {
  static url(url) {
    if (process.env.NODE_ENV === 'development') {
      return `http://192.168.1.31/laravel/designer-faisal/rivulet/public/api/v1/${url}`;
    }

    return `http://rivulet.shop/api/v1/${url}`;
  }

  static fetchCall(method, page, userOptions = {}) {
    console.log(`Api | method: ${method} | ${Api.url(page)}`); // eslint-disable-line no-console

    const options = {
      headers: {},

      alertTitle: '',
      auth: false,

      onStart: () => {},
      onSuccess: () => {},
      onFinish: () => {},

      ...userOptions,
    };

    let fetchOptions = {
      method,
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
    };

    if (options.auth) {
      fetchOptions = {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${User.token}`,
        },
      };
    }

    const formData = new FormData();

    if (options.params) {
      Object.keys(options.params).map(key => formData.append(key, options.params[key]));
      fetchOptions = { ...fetchOptions, body: formData };
    }

    options.onStart();

    let isApiError = false;
    let isResponseOk = false;

    return fetch(Api.url(page), fetchOptions)
      .then((response) => {
        isResponseOk = response.ok;
        return response.json();
      })
      .then((json) => {
        if (isResponseOk) {
          return json;
        }

        const { error } = json;

        isApiError = typeof error === 'string' && error.length > 0;
        throw new Error(error);
      })
      .then(options.onSuccess)
      .catch((e) => {
        if ('onError' in options) {
          options.onError(e);
          return;
        }

        showAlert(
          options.alertTitle,
          isApiError && e.message ? e.message : Validate.message.unknownError,
        );
      })
      .then(options.onFinish);
  }

  static get(page, options) {
    return Api.fetchCall('GET', page, options);
  }

  static post(page, options) {
    return Api.fetchCall('POST', page, options);
  }

  static patch(page, options, isLaravelApi = false) {
    let userOptions = options;
    let method = 'PATCH';

    if (isLaravelApi) {
      method = 'POST';
      userOptions = { ...userOptions, params: { ...userOptions.params, _method: 'PATCH' } };
    }

    return Api.fetchCall(method, page, userOptions);
  }
}
