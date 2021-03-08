export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const USERNAME_RE = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
export const USERNAME_MIN_LENGTH = 3;
