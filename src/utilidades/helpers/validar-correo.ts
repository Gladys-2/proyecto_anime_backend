export function validarCorreo(correo: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(correo).toLowerCase());
}