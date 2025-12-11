export type FormError = {
  message: string;
}

const emailRegex = /^\S+@\S+\.\S+$/;

export function isRequired(field: string, value: string | undefined, formErrors: Record<string, FormError>) {
  if (value === null || value === undefined || value.trim().length <= 0)
    formErrors[field] = {message: 'Este campo es obligatorio'};
  return formErrors;
}

export function hasMinQuantity(field: string, value: any[], formErrors: Record<string, FormError>, amount: number) {
  if (formErrors[field] !== undefined || value === undefined) return formErrors;

  const isInvalid = value.length < amount;

  if (isInvalid) {
    formErrors[field] = {message: `Debe especificar al menos ${amount} elemento/s`};
  }

  return formErrors;
}

export function isEmailValid(field: string, value: string, formErrors: {[key: string]: FormError }) {
  if (formErrors[field] !== undefined) return formErrors;

  const isEmailFormatInvalid = !emailRegex.test(value.trim());

  if (isEmailFormatInvalid) {
    formErrors[field] = {message: 'Ingrese un correo válido'};
  }

  return formErrors;
}

export function isPasswordValid(field: string, value: string, formErrors: {[key: string]: FormError }) {

  if (formErrors[field] !== undefined) return formErrors;

  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(value);
  const hasLowercase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(value);

  if (
    value.length < minLength ||
    !hasUppercase ||
    !hasLowercase ||
    !hasNumber ||
    !hasSpecialChar
  ) formErrors[field] = {message: 'La contraseña debe contener al menos 8 caracteres, ' +
        'una letra mayúscula, una minúscula, un número y un caracter especial'};

  console.log("from password validation: " + formErrors[field]);

  return formErrors;
}

export function isNameValid(field: string, value: string, formErrors: {[key: string]: FormError }) {
  if (formErrors[field] !== undefined) return formErrors;

  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(value)) {
    formErrors[field] = {message: 'Este campo solo puede contener letras y números'};
  }
  return formErrors;
}

export function isPhoneNumberValid(field: string, value: string, formErrors: {[key: string]: FormError }) {
  if (formErrors[field] !== undefined) return formErrors;

  const regex = /^\d{8,15}$/;

  if (regex.test(value)) {
    formErrors[field] = {message: 'Formato de teléfono incorrecto'};
  }
  return formErrors;
}

export function sanitizeAlphanumeric(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, '');
}

export function sanitizeInt(value: string) {
  return value.replace(/[^0-9]/g, '');
}
export function sanitizeFloat(value: string): string {
  if (!value) return '';

  // 1. Reemplaza comas por puntos para unificar el separador decimal
  // 2. Elimina todo lo que no sea dígito o punto
  // 3. Evita múltiples puntos decimales
  // 4. Evita que empiece con punto (ej: ".5" → "0.5")
  // 5. Elimina ceros iniciales innecesarios (excepto en "0.5")

  let sanitized = value.replace(/,/g, '.').replace(/[^0-9.]/g, '');

  // Evitar múltiples puntos
  const parts = sanitized.split('.');
  if (parts.length > 2) {
    sanitized = parts[0] + '.' + parts.slice(1).join('');
  }

  // Si empieza con punto, agregar un 0
  if (sanitized.startsWith('.')) {
    sanitized = '0' + sanitized;
  }

  // Si está vacío o solo es "0" o "0.", devolver limpio
  if (sanitized === '' || sanitized === '0.' || sanitized === '.') {
    return sanitized === '.' ? '0.' : sanitized;
  }

  // Eliminar ceros a la izquierda (ej: "00789" → "789")
  sanitized = sanitized.replace(/^0+(\d+)/, '$1');

  // Si después de todo queda solo un punto, lo convertimos en "0."
  if (sanitized === '.') {
    sanitized = '0.';
  }
  console.log(sanitized);
  return sanitized;
}



