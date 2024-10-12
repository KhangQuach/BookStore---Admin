export const validateAddBook = (form) => {
  let errors = {};

  // Check for empty fields
  if (!form.name) errors.name = 'Name is required';
  if (!form.price) errors.price = 'Price is required';
  if (!form.author) errors.author = 'Author is required';
  if (!form.language) errors.language = 'Language is required';
  if (!form.publisher) errors.publisher = 'Publisher is required';
  if (!form.publishDate) errors.publishDate = 'Publish date is required';
  if (!form.category) errors.category = 'Category is required';
  if (!form.pageNumber) errors.pageNumber = 'Page number is required';
  if (!form.rate) errors.rate = 'Rate is required';
  if (!form.part.length) errors.part = 'At least one part';
  if (!form.typeBook.length) errors.typeBook = 'At least one type of book is required';

  // Check if price and rate are valid numbers
  if (form.price && isNaN(form.price)) errors.price = 'Price must be a number';

  // Custom validation (e.g., check if page number is a valid integer)
  if (form.pageNumber && !Number.isInteger(+form.pageNumber)) {
    errors.pageNumber = 'Page number must be an integer';
  }

  return errors;
};

export const  validateAddUser = () => {
  let errors = {};

  // Check required fields
  if (!form.username) errors.username = 'Username is required';
  if (!form.password) errors.password = 'Password is required';
  if (!form.fullname) errors.fullname = 'Full name is required';
  if (!form.email) errors.email = 'Email is required';
  if (!form.phone) errors.phone = 'Phone number is required';
  if (!form.birthday) errors.birthday = 'Birthday is required';
  if (form.age === null) errors.age = 'Age is required';
  if (!form.gender) errors.gender = 'Gender is required';
  if (!form.address1) errors.address1 = 'Address is required';

  // Check email format
  if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email is invalid';
  }

  // Check phone number format (example: simple validation for digits)
  if (form.phone && !/^\d{10}$/.test(form.phone)) {
    errors.phone = 'Phone number must be 10 digits';
  }

  // Check password length
  if (form.password && form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }

  // Check age (make sure it's a positive integer)
  if (form.age && (isNaN(form.age) || form.age <= 0)) {
    errors.age = 'Age must be a positive number';
  }

  return errors;
};