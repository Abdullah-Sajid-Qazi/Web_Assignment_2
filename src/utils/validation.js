// Checks the checkout form. Returns an object with one message for each wrong field.
export function validateCheckout(form) {
  const errors = {};

  if (form.name.trim().length < 3) {
    errors.name = 'Enter your full name (at least 3 letters).';
  }
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errors.email = "That email doesn't look right. Try something like ali@gmail.com";
  }
  if (!/^03\d{9}$/.test(form.phone.trim())) {
    errors.phone = 'Phone number should be 11 digits starting with 03, like 03001234567';
  }
  if (!form.city) {
    errors.city = 'Pick your city.';
  }
  if (!/^[a-z0-9-]+(\.[a-z]{2,})+$/i.test(form.domain.trim())) {
    errors.domain = 'Enter a domain like myshop.pk (no http:// and no spaces).';
  }
  if (!form.agree) {
    errors.agree = 'You have to agree to the terms first.';
  }

  return errors;
}
