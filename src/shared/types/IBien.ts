export interface IBien {
  id_bien: number;
  tipo_bien?: string;
  marca: string;
  modelo: string;
  anio: number;
  patente?: string;
  cobertura: string;
  adicionales: string;
  accesorios: string;
  descripcion?: string;
  actividad?: string;
  ubicacion?: string;
  tipo_contrato?: string;
  dni_asegurado?: string;
  monto: number;
}
