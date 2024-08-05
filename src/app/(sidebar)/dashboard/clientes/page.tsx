import { ClientesModule } from "@/modules/clientes";
import { fetchData } from "@/services/mysql/functions";

export default async function ClientesPage() {
  const data = await fetchData("clientes/getAllClients");
  console.log(data);

  if (data) {
    return <ClientesModule data={data} />;
  } else {
    return <p>Error al obtener los datos</p>;
  }
}
