import { BASE_API_URL } from "@/shared/providers/envProvider";

export const fetchData = async (endpoint: string) => {
  if (!BASE_API_URL) {
    return null;
  }

  try {
    const response = await fetch(`${BASE_API_URL}/${endpoint}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Error al obtener datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export const fetchOneRow = async (endpoint: string, id: number) => {
  if (!BASE_API_URL) {
    return null;
  }
  try {
    const response = await fetch(`${BASE_API_URL}/${endpoint}/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error al obtener datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export const postData = async (
  endpoint: string,
  postData: Record<string, unknown> | FormData
) => {
  if (!BASE_API_URL) {
    return null;
  }
  try {
    const response = await fetch(`${BASE_API_URL}/${endpoint}`, {
      method: "POST",
      headers:
        postData instanceof FormData
          ? {}
          : { "Content-Type": "application/json" },
      body: postData instanceof FormData ? postData : JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error("Error al enviar datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al enviar datos:", error);
  }
};

export const updateData = async (endpoint: string, updateData: FormData) => {
  if (!BASE_API_URL) {
    return null;
  }
  try {
    const response = await fetch(`${BASE_API_URL}/${endpoint}`, {
      method: "PUT",
      body: updateData,
    });
    if (!response.ok) {
      throw new Error("Error al actualizar datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar datos:", error);
  }
};

export const deleteData = async (endpoint: string, id: number) => {
  if (!BASE_API_URL) {
    return null;
  }
  try {
    const response = await fetch(`${BASE_API_URL}/${endpoint}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar datos:", error);
  }
};
