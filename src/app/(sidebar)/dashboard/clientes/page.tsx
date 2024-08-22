import { ClientesModule } from "@/modules/clientes";
import { fetchData } from "@/services/request";

export default async function ClientesPage() {
  let data = [];

  try {
    data = await fetchData("clientes/getAllClients");
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return <p>Error al obtener los datos. Por favor, intente nuevamente más tarde.</p>;
  }

  if (!data || data.length === 0) {
    return <p>No se encontraron datos para mostrar.</p>;
  }

  return <ClientesModule data={data} />;
}
