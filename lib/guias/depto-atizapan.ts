/**
 * Guía «Comprar un departamento en Atizapán: gastos y documentos». Contenido y citas.
 *
 * Mismo contrato que `terreno-hidalgo.ts`: cada cita es LITERAL, sale de un artículo de ley descargado del acervo de
 * la Legislatura del Estado de México el 2026-09-30, y la guarda `guias/verificar_pagina.py` (fuera del repo, junto a
 * la evidencia) exige que cada `cita(...)` esté dentro de una cita ya verificada con la misma ley y el mismo artículo,
 * que `LEYES` coincida con la tabla del expediente y que cada cifra de un paso aparezca en las citas de ESE paso. Por
 * eso las llamadas van en UNA línea y con comillas dobles. El Código Civil del Estado de México numera por libro
 * («7.600», «8.23»).
 *
 * Sin montos en pesos: la tarifa del impuesto, los derechos del Registro y los aranceles se actualizan. Y a diferencia
 * de Hidalgo, aquí no hay tasa única del impuesto: no copiar cifras de una guía a la otra.
 */

export type CodigoLey = "M-CF" | "M-CC" | "M-LR" | "M-COND" | "M-NOT";

export type Ley = { codigo: CodigoLey; nombre: string; publicacion: string; reforma: string; url: string };
export type Cita = { ley: CodigoLey; articulo: string; texto: string };
export type Paso = { id: string; titulo: string; texto: string[]; pedir: string[]; citas: Cita[] };
export type Gasto = { paso: string; texto: string };

const ley = (codigo: CodigoLey, nombre: string, publicacion: string, reforma: string, url: string): Ley =>
  ({ codigo, nombre, publicacion, reforma, url });
const cita = (codigo: CodigoLey, articulo: string, texto: string): Cita => ({ ley: codigo, articulo, texto });

export const RUTA_GUIA_DEPTO = "/guias/comprar-departamento-en-atizapan";
export const CONSULTADA = "30 de septiembre de 2026";

export const LEYES: Record<CodigoLey, Ley> = {
  "M-CF": ley("M-CF", "Código Financiero del Estado de México y Municipios", "Gaceta 09-03-1999", "Decreto 240, Gaceta 17-12-2025", "https://legislacion.congresoedomex.gob.mx/storage/documentos/legislacion/7-C%C3%93DIGO%20FINANCIERO%20(2).doc"),
  "M-CC": ley("M-CC", "Código Civil del Estado de México", "Gaceta 07-06-2002", "Decreto 333, Gaceta 16-06-2026", "https://legislacion.congresoedomex.gob.mx/storage/documentos/legislacion/3-CODIGO%20CIVIL.doc"),
  "M-LR": ley("M-LR", "Ley Registral para el Estado de México", "Gaceta 18-08-2011", "Decreto 100, Gaceta 03-04-2025", "https://legislacion.congresoedomex.gob.mx/storage/documentos/legislacion/228-REGISTRAL.doc"),
  "M-COND": ley("M-COND", "Ley que Regula el Régimen de Propiedad en Condominio en el Estado de México", "Gaceta 11-04-2002", "Decreto 258, Gaceta 29-04-2024", "https://legislacion.congresoedomex.gob.mx/storage/documentos/legislacion/223-CONDOMINIO-.doc"),
  "M-NOT": ley("M-NOT", "Ley del Notariado del Estado de México", "Gaceta 03-01-2002", "Decreto 100, Gaceta 03-04-2025", "https://legislacion.congresoedomex.gob.mx/storage/documentos/legislacion/62-NOTARIADO-.doc"),
};

export const PASOS: Paso[] = [
  {
    id: "registro",
    titulo: "¿Quién es el dueño y qué pesa sobre el departamento?",
    texto: [
      "En el Estado de México, el Registro Público de la Propiedad está a cargo del Instituto de la Función Registral (IFREM). El Registro da publicidad a los actos jurídicos para que surtan efectos contra terceros: un documento registrable que no se inscribe solo produce efectos entre las partes, no en perjuicio de terceros.",
      "Cada inmueble consta en un folio real electrónico, y ahí se revisa quién aparece como dueño. Solo puede vender quien lo es: la ley declara nula la venta de un bien ajeno.",
      "El certificado de existencia o inexistencia de gravámenes y limitaciones reúne los asientos vigentes del inmueble, como un embargo u otro gravamen, y los avisos que todavía no se convierten en inscripción. El IFREM lo expide a más tardar el quinto día hábil después de presentada la solicitud y hecho el pago.",
    ],
    pedir: [
      "Los datos del folio real electrónico del departamento, a nombre de quien vende.",
      "El certificado de existencia o inexistencia de gravámenes y limitaciones.",
      "Si aparece un gravamen, un embargo u otra limitación: el documento con el que se cancela, antes de firmar.",
    ],
    citas: [
      cita("M-CC", "8.3", "El Registro Público de la Propiedad está a cargo del Instituto de la Función Registral del Estado de México"),
      cita("M-CC", "8.1", "Mediante el Registro Público de la Propiedad se da publicidad a los actos jurídicos para que surtan efectos contra terceros."),
      cita("M-CC", "8.13", "Los documentos que conforme a las leyes sean registrables y no se registren, sólo producirán efectos entre las partes y no en perjuicio de tercero."),
      cita("M-CC", "7.553", "La venta de bien ajeno es nula"),
      cita("M-LR", "51", "El inmueble es la unidad básica registral en el Registro, el cual constará en un folio real electrónico."),
      cita("M-LR", "77 fr. I", "Certificado de existencia o inexistencia de gravámenes y limitaciones."),
      cita("M-LR", "80", "en el mismo se harán constar todos los asientos vigentes y los avisos definitivos que no se hayan convertido en inscripción."),
      cita("M-LR", "81", "se expedirá a más tardar el quinto día hábil siguiente, contado a partir de aquel en que se haya presentado la solicitud y el pago correspondiente."),
    ],
  },
  {
    id: "aviso-preventivo",
    titulo: "El aviso preventivo del notario",
    texto: [
      "Antes de escriturar, el notario debe solicitar al Registro el certificado sobre la existencia o inexistencia de gravámenes o anotaciones. No es un favor: la Ley del Notariado lo pone entre sus obligaciones.",
      "Esa solicitud surte efectos de aviso preventivo, con vigencia de 180 días naturales desde que se presenta. Si el aviso definitivo de la compraventa se da mientras sigue vigente, surte efectos desde la presentación del aviso preventivo. Así la ley da prioridad a la compra durante el tiempo en que se firma e inscribe la escritura.",
    ],
    pedir: [
      "Pregúntale al notario cuándo presentó la solicitud del certificado: desde esa fecha corren los 180 días.",
      "Que la firma y el aviso definitivo queden dentro de ese plazo.",
    ],
    citas: [
      cita("M-CC", "8.23", "el Notario Público deberá solicitar al Registro, certificado sobre la existencia o inexistencia de gravámenes o anotaciones."),
      cita("M-NOT", "20 fr. X", "Solicitar al Instituto de la Función Registral del Estado de México o registro público respectivo, certificado sobre la existencia o inexistencia de gravámenes o anotaciones"),
      cita("M-CC", "8.24", "surtirá efectos de aviso preventivo"),
      cita("M-CC", "8.25", "Dicha nota tendrá vigencia de ciento ochenta días naturales a partir de la fecha de presentación de la solicitud."),
      cita("M-CC", "8.27", "Si el aviso definitivo se da durante la vigencia del aviso preventivo, surtirá efectos desde la presentación de éste"),
    ],
  },
  {
    id: "condominio",
    titulo: "Si es un condominio: reglamento, áreas comunes y cuotas",
    texto: [
      "Al comprar una unidad en condominio compras también tu parte de los elementos comunes: ese derecho de copropiedad es accesorio e indivisible del derecho de propiedad sobre la unidad, así que no se vende por separado.",
      "El contrato debe hacer constar que se te entrega una copia del Reglamento Interior del Condominio, y la compraventa debe inscribirse en el Registro Público de la Propiedad. Quien vende tiene que avisar a los demás condóminos a través del administrador, pero ese aviso no les da derecho de preferencia ni del tanto.",
      "Las cuotas para gastos comunes que no se pagan a tiempo causan intereses moratorios y pueden exigirse por la vía judicial. Por eso conviene saber, antes de firmar, si el departamento debe cuotas.",
    ],
    pedir: [
      "Copia del Reglamento Interior del Condominio, y que el contrato diga que te la entregaron.",
      "Una constancia del administrador de que el departamento no debe cuotas.",
      "La cuota vigente fijada por la asamblea y qué cubre.",
    ],
    citas: [
      cita("M-COND", "13", "El derecho de copropiedad sobre los elementos comunes del inmueble es accesorio e indivisible del derecho de propiedad privativo sobre la unidad de propiedad exclusiva"),
      cita("M-COND", "11", "se hará constar que se entrega al interesado una copia del Reglamento Interior del Condominio."),
      cita("M-COND", "10", "así como los contratos de traslación de dominio y demás actos que afecten la propiedad o el dominio de estos inmuebles, además de cumplir con los requisitos y presupuestos de esta Ley, deberán inscribirse en el Registro Publico de la Propiedad"),
      cita("M-COND", "26", "deberán hacerlo del conocimiento de los demás condóminos a través del administrador del condominio, sin que ello represente el otorgamiento del derecho de preferencia o del tanto para unos u otros."),
      cita("M-COND", "36", "Las cuotas para gastos comunes que los condóminos no cubran puntualmente, causarán intereses moratorios"),
      cita("M-COND", "36", "Las cuotas o aportaciones fijadas por la asamblea, constituyen obligaciones de carácter civil, por lo tanto, podrán ser exigibles por la vía judicial correspondiente."),
    ],
  },
  {
    id: "impuesto",
    titulo: "El impuesto sobre adquisición de inmuebles",
    texto: [
      "Lo paga quien compra. El Código Financiero del Estado de México y Municipios obliga a pagarlo a las personas físicas y jurídicas colectivas que adquieren inmuebles en el Estado.",
      "La base es el valor mayor entre el catastral del inmueble y el de operación que dice el contrato. A diferencia de Hidalgo, aquí no hay una tasa única: el impuesto es la cuota fija del rango de la tarifa en que cae la base, más el factor de ese rango multiplicado por la diferencia entre la base y el límite inferior del rango.",
      "Se paga dentro de los 17 días siguientes a la adquisición, y el notario lo calcula bajo su responsabilidad.",
    ],
    pedir: [
      "Que el notario te muestre el cálculo: qué valor tomó como base y en qué rango de la tarifa cae.",
      "La tarifa vigente la aplica el notario; esta guía no da montos.",
    ],
    citas: [
      cita("M-CF", "113", "Están obligadas al pago de este impuesto las personas físicas y jurídicas colectivas que adquieran inmuebles ubicados en el Estado"),
      cita("M-CF", "115", "La base gravable de este impuesto será el valor que resulte mayor entre el valor catastral del inmueble, determinado conforme lo establece el Título Quinto de este Código y el de operación estipulado en el contrato respectivo."),
      cita("M-CF", "115", "será el resultado de sumar a la cuota fija que corresponda, de conformidad con la tarifa, la cantidad que se determine al multiplicar el factor aplicable previsto para cada rango"),
      cita("M-CF", "115", "por la diferencia que exista entre la base gravable determinada conforme al párrafo segundo de este artículo y el importe indicado en el límite inferior del rango de valor base relativo."),
      cita("M-CF", "116", "El pago del impuesto deberá hacerse dentro de los diecisiete días siguientes a aquél en que se realice cualesquiera de los supuestos de adquisición"),
      cita("M-CF", "117", "calcularán el impuesto bajo su responsabilidad"),
    ],
  },
  {
    id: "adeudos",
    titulo: "Predial, agua y catastro sin adeudos",
    texto: [
      "Con la declaración del impuesto se presentan las certificaciones de pago del impuesto predial, de clave y valor catastral, de pago de derechos de agua o constancia de no servicio y de no adeudo de aportaciones de mejoras, actualizadas al momento de pagar.",
      "El Código Financiero hace al notario responsable solidario del predial y del impuesto sobre adquisición si autoriza la escritura sin verificar antes los pagos con las constancias de no adeudo que emiten las autoridades municipales. Por eso te las pedirá.",
    ],
    pedir: [
      "Certificación de pago del impuesto predial y certificación de clave y valor catastral.",
      "Constancia de pago de derechos de agua, o de no servicio, y de no adeudo de aportaciones de mejoras.",
    ],
    citas: [
      cita("M-CF", "116", "así como certificaciones de pago del Impuesto Predial; de clave y valor catastral; de pago de derechos de agua o constancia de no servicio y de no adeudo de aportaciones de mejoras, actualizadas al momento de realizar el pago."),
      cita("M-CF", "41", "Son responsables solidarios del pago de créditos fiscales:"),
      cita("M-CF", "41", "Los notarios públicos, respecto de los impuestos Predial y sobre Adquisición de Inmuebles y Otras Operaciones Traslativas de Dominio de Inmuebles, cuando autoricen definitivamente escrituras, sin que previamente verifiquen el cumplimiento de los requisitos y formalidades legales"),
      cita("M-CF", "41", "con las constancias de no adeudo que, para el efecto, emitan las autoridades municipales, según corresponda."),
    ],
  },
  {
    id: "escritura",
    titulo: "La escritura ante notario",
    texto: [
      "En el Estado de México, la venta de un inmueble debe otorgarse en escritura pública, y los notarios asesoran gratuitamente a los interesados en este tipo de operaciones: pregúntale al tuyo lo que no entiendas antes de firmar.",
      "El notario debe abstenerse de actuar si no le entregan la documentación necesaria o no se cubren los impuestos, derechos y gastos que genera la operación. En la escritura hace constar que explicó el valor y las consecuencias legales de su contenido, y la autoriza definitivamente cuando están pagados los impuestos que causó el acto.",
    ],
    pedir: [
      "Todo lo anterior, entregado al notario con tiempo para revisarlo antes del día de la firma.",
      "Si quien vende está casado, pregúntale al notario si su régimen matrimonial pide la firma de su cónyuge.",
    ],
    citas: [
      cita("M-CC", "7.600", "Si se trata de bienes inmuebles, la venta debe otorgarse en escritura pública."),
      cita("M-CC", "7.601", "Los Fedatarios Públicos asesorarán gratuitamente a los interesados en este tipo de operaciones."),
      cita("M-NOT", "20 fr. VII", "Abstenerse de actuar cuando no le sea aportada la documentación necesaria o no le sean cubiertos los montos por concepto de impuestos, derechos y gastos que se generen;"),
      cita("M-NOT", "79", "Que les explicó el valor y las consecuencias legales del contenido de la escritura."),
      cita("M-NOT", "88", "El notario deberá autorizar definitivamente la escritura cuando estén pagados los impuestos que causó el acto"),
    ],
  },
];

/** Los gastos que aparecen en los pasos, sin montos: cada uno remite al paso que lo explica y lo cita. */
export const GASTOS: Gasto[] = [
  { paso: "impuesto", texto: "El impuesto sobre adquisición de inmuebles, que paga quien compra y calcula el notario." },
  { paso: "escritura", texto: "Los impuestos, derechos y gastos que genera la escritura: el notario no actúa si no se cubren." },
  { paso: "registro", texto: "El pago del certificado de gravámenes y limitaciones, que el IFREM expide después de la solicitud y el pago." },
  { paso: "adeudos", texto: "Predial, agua y aportaciones de mejoras pagados: sus certificaciones acompañan la declaración del impuesto." },
  { paso: "condominio", texto: "Las cuotas del condominio pagadas: las atrasadas causan intereses moratorios." },
];

/** Resumen para llevar: sale de los pasos, no añade nada que no esté citado arriba. */
export const LISTA_FINAL = [
  "Folio real electrónico a nombre de quien vende y certificado de gravámenes y limitaciones.",
  "La fecha en que el notario pidió el certificado, que abre el aviso preventivo.",
  "Reglamento Interior del Condominio y constancia de que el departamento no debe cuotas.",
  "Certificaciones de predial, de clave y valor catastral, de agua y de aportaciones de mejoras.",
  "El cálculo del impuesto sobre adquisición de inmuebles.",
  "Todo en manos del notario antes del día de la firma.",
];
