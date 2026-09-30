// DERIVADO por generar_sitio.py. No editar a mano.
// Coordenadas: ubicaciones.json (medido 2026-09-29; Nominatim sobre datos © OpenStreetMap).
// Distancias: entorno-villas.json (medido 2026-09-30), por calle en auto y sin autopistas de cuota, no tiempo
// de traslado. Solo las que OSRM y Valhalla dan iguales dentro de la tolerancia de ese archivo.
export const ubicacionesMedidas = "2026-09-30";
export const ubicaciones = {
  "villas-de-la-hacienda": {
    lat: 19.608274,
    lon: -99.231060,
    precisa: true,
    referencias: [
      { nombre: "Tec de Monterrey, Campus Estado de México", km: 2.1 },
      { nombre: "Plaza Arboledas", km: 6.7 },
      { nombre: "Plaza Satélite, sobre Periférico Norte", km: 15.0 },
    ],
  },
  "el-bindho": {
    lat: 20.076172,
    lon: -98.933499,
    precisa: false,
    referencias: [],
  },
} as const;
