import { ClientesModule } from "@/modules/clientes";
import { fetchData } from "@/services/request";

export default async function ClientesPage() {
  const data = await fetchData("clientes/getAllClients");

  if (!data) {
    return <p>Error al obtener los datos</p>;
  } else {
    return <ClientesModule data={data} />;
  }
}
