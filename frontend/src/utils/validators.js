// Validation utility functions

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return '';
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
};

// Username validation
export const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
  if (!username) return 'Username is required';
  if (!usernameRegex.test(username)) return 'Username must be 3-20 alphanumeric characters';
  return '';
};

// Amount validation (for transactions)
export const validateAmount = (amount) => {
  if (amount === null || amount === undefined || amount === '') return 'Amount is required';
  if (isNaN(amount)) return 'Please enter a valid number';
  if (Number(amount) <= 0) return 'Please enter a positive number';
  return '';
};

// Currency formatting
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) return '.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Confirm password match
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return '';
};

// Optional: Date validation
export const validateDate = (date) => {
  if (!date) return 'Date is required';
  return '';
};
