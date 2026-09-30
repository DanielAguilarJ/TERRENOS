/**
 * Guía «Comprar un terreno en Hidalgo: qué revisar». Contenido y citas.
 *
 * Cada cita es LITERAL y sale de un artículo de ley descargado de su fuente oficial el 2026-09-30. La guarda
 * `guias/verificar_pagina.py` (fuera del repo, junto a la evidencia) exige que cada `cita(...)` de este archivo esté
 * dentro de una cita ya verificada contra el texto oficial, con la misma ley y el mismo artículo, y que la tabla de
 * leyes coincida con la del expediente de fuentes. Por eso las llamadas van en UNA línea y con comillas dobles:
 * al añadir o cambiar una cita, hay que añadirla primero al expediente de fuentes y volver a correr la guarda.
 *
 * Sin montos en pesos: el valor de la UMA, los derechos del Registro y las tarifas municipales cambian cada año.
 */

export type CodigoLey = "F-LA" | "H-HAC" | "H-RPP" | "H-AH" | "H-CAT" | "H-NOT" | "H-CC";

export type Ley = { codigo: CodigoLey; nombre: string; publicacion: string; reforma: string; url: string };
export type Cita = { ley: CodigoLey; articulo: string; texto: string };
export type Paso = { id: string; titulo: string; texto: string[]; pedir: string[]; citas: Cita[] };

const ley = (codigo: CodigoLey, nombre: string, publicacion: string, reforma: string, url: string): Ley =>
  ({ codigo, nombre, publicacion, reforma, url });
const cita = (codigo: CodigoLey, articulo: string, texto: string): Cita => ({ ley: codigo, articulo, texto });

export const RUTA_GUIA_TERRENO = "/guias/comprar-terreno-en-hidalgo";
export const CONSULTADA = "30 de septiembre de 2026";

export const LEYES: Record<CodigoLey, Ley> = {
  "F-LA": ley("F-LA", "Ley Agraria", "DOF 26-02-1992", "DOF 01-04-2024", "https://www.ordenjuridico.gob.mx/Documentos/Federal/wo6027.doc"),
  "H-HAC": ley("H-HAC", "Ley de Hacienda para los Municipios del Estado de Hidalgo", "P.O. alcance 21-11-2011", "P.O. alcance uno 31-12-2025", "https://www.congreso-hidalgo.gob.mx/biblioteca_legislativa/leyes_cintillo/Ley%20de%20Hacienda%20para%20los%20Municipios%20del%20Estado%20de%20Hidalgo.pdf"),
  "H-RPP": ley("H-RPP", "Ley del Registro Público de la Propiedad del Estado de Hidalgo", "P.O. alcance dos 22-12-2014", "P.O. alcance tres 22-08-2025", "https://www.congreso-hidalgo.gob.mx/biblioteca_legislativa/leyes_cintillo/Ley%20del%20Registro%20Publico%20de%20la%20Propiedad%20del%20Estado%20de%20Hidalgo.pdf"),
  "H-AH": ley("H-AH", "Ley de Asentamientos Humanos, Desarrollo Urbano y Ordenamiento Territorial del Estado de Hidalgo", "P.O. alcance 17-09-2007", "P.O. alcance uno 19-11-2025", "https://www.congreso-hidalgo.gob.mx/biblioteca_legislativa/leyes_cintillo/Ley%20de%20Asentamientos%20Humanos,%20Desarrollo%20Urbano%20y%20Ordenamiento%20Territorial.pdf"),
  "H-CAT": ley("H-CAT", "Ley de Catastro del Estado de Hidalgo", "P.O. 02-09-2013", "P.O. alcance vol. II 31-12-2016", "https://www.congreso-hidalgo.gob.mx/biblioteca_legislativa/leyes_cintillo/Ley%20de%20Catastro%20del%20Estado%20de%20Hidalgo.pdf"),
  "H-NOT": ley("H-NOT", "Ley del Notariado para el Estado de Hidalgo", "P.O. alcance 25-01-2010", "P.O. alcance uno 20-08-2024", "https://www.congreso-hidalgo.gob.mx/biblioteca_legislativa/leyes_cintillo/Ley%20del%20Notariado%20para%20el%20Estado%20de%20Hidalgo.pdf"),
  "H-CC": ley("H-CC", "Código Civil para el Estado de Hidalgo", "—", "P.O. alcance tres 22-08-2025", "https://www.congreso-hidalgo.gob.mx/biblioteca_legislativa/leyes_cintillo/Codigo%20Civil.pdf"),
};

export const PASOS: Paso[] = [
  {
    id: "ejido",
    titulo: "¿Es propiedad privada o tierra ejidal?",
    texto: [
      "Es lo primero que conviene saber, porque cambia todo lo demás. La Ley Agraria declara nula la venta de las tierras del asentamiento humano del ejido y hace inalienables las de uso común, salvo los casos que la propia ley prevé. Una parcela con derechos ejidales solo puede venderse a otros ejidatarios o avecindados del mismo núcleo de población.",
      "Para que alguien de fuera compre una parcela, primero tiene que salir del régimen ejidal con el dominio pleno: el Registro Agrario Nacional la da de baja, expide un título de propiedad y ese título se inscribe en el Registro Público de la Propiedad. Desde entonces la tierra se rige por el derecho común.",
      "En la primera venta después del dominio pleno, los familiares de quien vende, quienes hayan trabajado la parcela por más de un año, los ejidatarios, los avecindados y el núcleo de población, en ese orden, tienen derecho del tanto durante 30 días naturales desde que se les notifica. Si no se les notifica, la venta puede anularse.",
    ],
    pedir: [
      "Si te dicen que es propiedad privada: la escritura con sus datos de inscripción en el Registro Público de la Propiedad.",
      "Si la tierra viene de un ejido: el título de propiedad que expidió el Registro Agrario Nacional, su inscripción en el Registro Público y, si es la primera venta, prueba de que se notificó el derecho del tanto.",
      "Cuando el predio no aparece en el Registro Público: la constancia del órgano ejidal de que no pertenece a bienes ejidales ni comunales, que el propio Registro pide para certificarlo.",
    ],
    citas: [
      cita("F-LA", "64", "Cualquier acto que tenga por objeto enajenar, prescribir o embargar dichas tierras será nulo de pleno derecho."),
      cita("F-LA", "74", "La propiedad de las tierras de uso común es inalienable, imprescriptible e inembargable, salvo los casos previstos en el artículo 75 de esta ley."),
      cita("F-LA", "80", "Los ejidatarios podrán enajenar sus derechos parcelarios a otros ejidatarios o avecindados del mismo núcleo de población."),
      cita("F-LA", "82", "solicitarán al Registro Agrario Nacional que las tierras de que se trate sean dadas de baja de dicho Registro, el cual expedirá el título de propiedad respectivo, que será inscrito en el Registro Público de la Propiedad correspondiente a la localidad."),
      cita("F-LA", "82", "las tierras dejarán de ser ejidales y quedarán sujetas a las disposiciones del derecho común."),
      cita("F-LA", "84", "gozarán del derecho del tanto, el cual deberán ejercer dentro de un término de treinta días naturales contados a partir de la notificación"),
      cita("F-LA", "84", "Si no se hiciere la notificación, la venta podrá ser anulada."),
      cita("F-LA", "150", "sólo surtirán efectos entre los otorgantes pero no podrán producir perjuicio a terceros"),
      cita("H-RPP", "149 fr. VI", "Constancia del órgano ejidal, que acredite que no pertenece a bienes ejidales ni comunales;"),
    ],
  },
  {
    id: "registro",
    titulo: "¿Quién es el dueño y qué pesa sobre el terreno?",
    texto: [
      "El Registro Público de la Propiedad es lo que protege a quien compra frente a terceros. Un documento registrable que no se inscribe no produce efectos en perjuicio de terceros, y lo que sí está inscrito se presume cierto y de su titular, salvo prueba en contrario.",
      "Por eso la compra se revisa contra el Registro: quién aparece como titular y qué gravámenes reporta el inmueble, como una hipoteca, un embargo u otra limitación. Si aparece alguno, deja la firma sujeta a que se cancele antes.",
      "Al presentar la escritura, el Registro suspende la inscripción si falta el certificado de gravámenes vigente o el avalúo catastral vigente. Mientras se escritura, el notario puede dar al Registro un primer aviso preventivo, con vigencia de 60 días naturales. Los registradores expiden las certificaciones en un plazo no mayor a cinco días hábiles.",
    ],
    pedir: [
      "Certificado de gravámenes vigente del Registro Público de la Propiedad.",
      "Los datos de inscripción del inmueble a nombre de quien vende.",
      "Si hay algún gravamen: el documento con el que se cancela, antes de firmar.",
    ],
    citas: [
      cita("H-RPP", "13", "Los documentos que conforme a esta Ley sean registrables y no se registren, no producirán efectos en perjuicio frente a terceros."),
      cita("H-RPP", "14", "se presume, salvo prueba en contrario, y a todos los efectos legales, que el derecho registrado existe y pertenece a su titular"),
      cita("H-RPP", "73 fr. II", "El certificado de gravámenes previamente obtenido y vigente al momento de la presentación del documento;"),
      cita("H-RPP", "73 fr. IV", "El avalúo catastral vigente al momento de la presentación del documento, en todos los actos relacionados a transmisiones de propiedad;"),
      cita("H-RPP", "112", "tendrá vigencia por un término de sesenta días naturales"),
      cita("H-RPP", "148", "en un plazo no mayor a los cinco días hábiles."),
    ],
  },
  {
    id: "uso-de-suelo",
    titulo: "¿Qué se puede hacer en el terreno?",
    texto: [
      "El uso de suelo dice qué se permite en el predio, y la ley de Hidalgo distingue entre la constancia y la licencia. La constancia de uso de suelo informa los usos y destinos de un predio, pero no autoriza modificarlo, construir ni alterarlo. La licencia de uso de suelo sí autoriza un uso o destino.",
      "La constancia la expide el municipio (o la Secretaría, según el programa aplicable) y vale seis meses; la licencia vale un año. Una constancia, permiso o licencia que contradiga la ley o los programas de desarrollo urbano es nula.",
      "Los terrenos grandes tienen un paso más: los proyectos de aprovechamiento, fraccionamiento, fusión, subdivisión o relotificación de más de 10,000 m² deben presentar ante la Secretaría la solicitud de constancia de viabilidad y el estudio de impacto urbano y vial.",
    ],
    pedir: [
      "Una constancia de uso de suelo reciente, para saber qué permite el programa en ese predio.",
      "Si ya hay un proyecto: la licencia de uso de suelo y, en más de 10,000 m², la constancia de viabilidad con su estudio de impacto urbano y vial.",
    ],
    citas: [
      cita("H-AH", "4 fr. VI", "lo cual no autoriza su modificación, construcción o alteración"),
      cita("H-AH", "4 fr. XIX", "Licencia de uso de suelo: El documento expedido por la autoridad, en el cual se autoriza el uso o destino de un predio o inmueble"),
      cita("H-AH", "136", "Los Municipios expedirán las constancias de uso del suelo, previa solicitud de los interesados, las cuales tendrán una vigencia de seis meses"),
      cita("H-AH", "137", "Las licencias de uso del suelo tendrán una vigencia de un año"),
      cita("H-AH", "132", "las que se expidan en contravención a esta disposición, serán nulas y no producirán efecto jurídico alguno"),
      cita("H-AH", "139 fr. III", "Proyectos de cualquier uso o destino que impliquen el aprovechamiento, fraccionamiento, fusión, subdivisión, relotificación o polígono de actuación concertada, de más de diez mil metros cuadrados de superficie"),
    ],
  },
  {
    id: "catastro",
    titulo: "Catastro: el registro del predio en el municipio",
    texto: [
      "Todo predio de Hidalgo debe estar inscrito en el padrón catastral de su municipio. La cédula o constancia catastral se pide a la autoridad catastral, que debe expedirla en un plazo no mayor a quince días.",
      "Compara la superficie del catastro con la de la escritura: si no coinciden, pregúntale al notario antes de seguir. Y ten en cuenta que la venta es una de las causas por las que la ley revalúa el valor catastral del predio.",
    ],
    pedir: [
      "La cédula o constancia catastral del predio.",
      "El avalúo catastral vigente, que el Registro pide al inscribir la compra.",
    ],
    citas: [
      cita("H-CAT", "9", "Todos los predios ubicados en el territorio del Estado, deberán estar inscritos en el Padrón Catastral Municipal correspondiente."),
      cita("H-CAT", "36", "expedirán, en un plazo no mayor a quince días, cédulas catastrales, constancias y demás documentos que contengan la información catastral"),
      cita("H-CAT", "64 fr. IV", "La totalidad, o parte del predio sea objeto de traslado de dominio u otra causa que modifique su régimen jurídico;"),
    ],
  },
  {
    id: "traslacion",
    titulo: "El impuesto de traslación de dominio",
    texto: [
      "Lo paga quien compra. La Ley de Hacienda para los Municipios del Estado de Hidalgo fija una tasa general del 2% sobre la base gravable.",
      "Si el valor catastral, el de avalúo, el del contrato y el comercial no coinciden, la base es el mayor de ellos. La ley reduce ese valor en cinco veces la Unidad de Medida y Actualización (UMA) vigente a la fecha de escrituración, elevada al año.",
      "La declaración se presenta en la Tesorería Municipal dentro de 20 días hábiles, acompañada de una constancia de que el inmueble no tiene adeudos de impuestos, derechos o multas.",
    ],
    pedir: [
      "La constancia de no adeudo del inmueble que expide la Tesorería Municipal.",
      "El monto de la UMA y las tarifas vigentes en el municipio, que tu notario aplica al calcular el impuesto.",
    ],
    citas: [
      cita("H-HAC", "28", "Están obligados a pago del impuesto sobre traslación de dominio y otras operaciones con bienes inmuebles, las personas físicas o morales que adquieran inmuebles"),
      cita("H-HAC", "32", "se causará y pagará aplicando la tasa general del 2% sobre la base gravable."),
      cita("H-HAC", "29", "En caso de existir diferencias entre el valor catastral, de avalúo, contractual o comercial, la base para el pago del impuesto será el mayor de tales valores."),
      cita("H-HAC", "29", "después de reducirlo en cinco veces la Unidad de Medida y Actualización vigente a la fecha de escrituración"),
      cita("H-HAC", "33", "de que el propietario del inmueble objeto del traslado de dominio no tiene ningún adeudo en relación con ese propio inmueble"),
      cita("H-HAC", "33", "se presentarán dentro de un plazo de 20 días hábiles"),
    ],
  },
  {
    id: "escritura",
    titulo: "La escritura ante notario",
    texto: [
      "En Hidalgo, la venta de un inmueble se hace en escritura pública, por regla general.",
      "Cuando las leyes lo disponen, el notario calcula, retiene y entera los impuestos y derechos de la operación, con responsabilidad solidaria. Y debe abstenerse de actuar si no le entregan la documentación necesaria: llegar con los papeles de los pasos anteriores es lo que permite firmar.",
    ],
    pedir: [
      "Todo lo anterior, entregado al notario con tiempo para revisarlo antes del día de la firma.",
    ],
    citas: [
      cita("H-CC", "2299", "Tratándose de inmuebles, su venta se hará en escritura pública, por regla general."),
      cita("H-NOT", "22", "calcularan, retendrán y enterarán bajo su responsabilidad solidaria por cuenta de los interesados, los impuestos y derechos que cada caso genere."),
      cita("H-NOT", "143 fr. VI", "Abstenerse de actuar cuando no le sea aportada la documentación necesaria"),
    ],
  },
];

/** Resumen para llevar: sale de los pasos, no añade nada que no esté citado arriba. */
export const LISTA_FINAL = [
  "Régimen de la tierra: escritura inscrita o, si viene de un ejido, título del Registro Agrario Nacional inscrito.",
  "Certificado de gravámenes vigente y, si hay gravamen, cómo se cancela.",
  "Constancia de uso de suelo reciente y, para un proyecto, la licencia correspondiente.",
  "Cédula o constancia catastral y avalúo catastral vigente.",
  "Constancia de no adeudo del inmueble para el impuesto de traslación de dominio.",
  "Todo en manos del notario antes del día de la firma.",
];
