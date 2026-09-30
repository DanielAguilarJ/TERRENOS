/**
 * Número de WhatsApp listo para un enlace wa.me: solo dígitos y con lada de país.
 * - Quita espacios, guiones, paréntesis y el «+», que wa.me no acepta.
 * - Quita el prefijo internacional «00».
 * - A un número nacional de México (10 dígitos) le antepone la lada 52: sin ella, wa.me leería
 *   «55…» como Brasil y abriría el chat de otra persona.
 * Devuelve "" si el resultado no es un número internacional válido (11 a 15 dígitos, sin 0 inicial).
 * Con "" los botones de WhatsApp no se pintan, así que nunca queda un enlace roto.
 */
export function waNumber(raw: string | null | undefined): string {
  let digits = (raw ?? "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 10) digits = "52" + digits;
  return /^[1-9]\d{10,14}$/.test(digits) ? digits : "";
}
