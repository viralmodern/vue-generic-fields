export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

export default {
  props: {
    emailRules: {
      type: Array,
      default: () => [
        (v) => !!v || 'E-mail is required',
        (v) => EMAIL_REGEX.test(v) || 'E-mail must be valid'
      ]
    },
    textRules: {
      type: Array,
      default: () => [(v) => !!v || 'This field is required']
    },
    linkRules: {
      type: Array,
      default: () => [
        (v) => !!v || 'Url is required',
        (v) => URL_REGEX.test(v) || 'Url must be valid'
      ]
    }
  }
}
