const config = {
  EXPIRED_TOKEN_TIME: { value: 86400 },
  MAX_USER_AGENT: { value: 10 },

  EXPIRED_RECOVERY: { value: 60 },
  TIME_ZONE: { value: 'UTC' },
  VERSION: { value: '1.0.0 Beta Alibaba' },
  NOT_ONLY_SPACES: { value: '.*[^ ].*' },
  REGEX_LETTER_CODE: { value: '^[1-9a-zA-Z_-]*$' },
  NICKNAME: { value: '^[ a-zA-Z0-9]+$' },
  REGEX_IP: { value: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/ },
  HTTP_REGEX: {
    value:
      /^(http[s]?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.){1}([0-9A-Za-z-\.@:%_\+~#=]+)+((\.[a-zA-Z]{2,4})+)(\/(.)*)?(\?(.)*)?/g,
  },
  REGEX_LETTER: {
    value:
      '^(?:(?!.*[ ]{2}))[^ ][ 0-9aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+$',
  },
  REGEX_NUBMER: {
    value: '^[0-9]*$',
  },

  REGEX_LETTER_WITH_NUMBER: {
    value:
      '^(?:(?!.*[ ]{2}))[^ ]([ aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ1234567890]{1,}[!@#$%^&*()_.+~="-]*)+[|!|?]*$',
  },
  LOCALES: { value: ['en', 'vi'] },
  SORT_TYPE: { value: ['asc', 'desc', 'ASC', 'DESC'] },
  DEFAULT_COMPANY_VALUE: { value: 'CBJS' },
  DEFAULT_COMPANY_ORDER_VALUE: { value: 'CBJS-ORDER' },
  DEFAULT_COMPANY_GROUP_CODE: { value: 'CBJS-GROUP' },
  DEFAULT_COMPANY_COMBO_CODE: { value: 'CBJS-COMBO' },
  DEFAULT_COMPANY_COMBO_SUBSCRIBE: { value: 'CBJS-SUBSCRIBE' },
  FOUNDER_ROLE: {
    value: ['SUPERADMIN', 'ADMIN', 'INSTRUCTOR', 'CREATOR', 'STUDENT'],
  },
  NOT_MODIFY_PERMISSIONS: { value: ['users', 'roles', 'permissions'] },
  RANDOM_STRING_LENGTH: { value: 10 },
  TMP_FOLDER: { value: 'tmp' },
  TMP_FILE_MAX: { value: 300 },
  TMP_RELOAD_CHECKER: { value: 10 },
  ALLOW_EXTENSION: { value: ['.png', '.img', '.webp', '.jpg', '.jpeg'] },
  DURATION_TYPE: { value: ['se', 'mi', 'ho', 'da', 'mo'] },
  WHITE_LIST: { value: ['113.161.36.95'] },
  MAX_FILE_SIZE: { value: 2000000 },
  POINT_NAME: { value: 'jutxu' },
  EXCHANGE_RATE: { value: 1 },
  MAX_RECENTLY: { value: 4 },
  TABLE: {
    ORDER: {
      STATUS: {
        PENDING: 'PENDING', //when wait payment or payment method offline
        CANCEL: 'CANCEL', //when user cancel order
        SUCCESS: 'SUCCESS', //when user payment success
      },
    },
  },
};
export default config;
