import isEmail from 'validator/es/lib/isEmail';
export const isValidEmail = (email) => isEmail(email);
export const isValidName = (name) => {
  if (name.length === 0 || name.length > 24) return false;
  return true;
}

export const isValidPassword = (password) => {
  if (password.length === 0 || password.length > 64) return false;
  return true;
}
