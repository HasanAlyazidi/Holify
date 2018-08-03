import I18n from 'react-native-i18n';

import ar from './locales/ar';
import en from './locales/en';
import ur from './locales/ur';

I18n.fallbacks = true;

I18n.translations = {
  ar,
  en,
  ur,
};

const defaultLocale = 'ar';

I18n.defaultLocale = defaultLocale; // if app does not support 'en', set this to 'ar'

I18n.locale = defaultLocale;

const t = (string, options = {}) => I18n.t(string, options);

const setLocale = (lang) => {
  I18n.locale = lang;
};

const isRTL = () => t('direction') === 'rtl';

const textAlign = () => (isRTL() ? t('style.end') : t('style.start'));

export { I18n, isRTL, setLocale, defaultLocale, textAlign };

export default t;
