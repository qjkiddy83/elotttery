import enlang from './en';
import arlang from './ar';
import frlang from './fr';

const messages = {
  auto: enlang,
  en: enlang,
  ar: arlang,
  fr: frlang
}

function getLang() { //默认语言
  return messages[navigator.language] ? navigator.language : 'en';
}

export default {
  init: {
    //定义默认语言
    locale: getLang(),
    messages
  },
  langlist: [{
    key: 'auto',
    name: "Auto",
    value: 1
  }, {
    key: 'en',
    name: 'English',
    value: 2
  }, {
    key: 'ar',
    name: 'اللغة العربية',
    value: 3
  }, {
    key: "fr",
    name: 'Français',
    value: 4
  }]
}

