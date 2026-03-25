const getAll = async () => {
  const result = await fetch('/api/estrellanes', {
    method: "GET",
    headers: {
      "Accept": "application/ld+json"
    },
  });
  return await result.json();
}

const getOne = async (id) => {
  const result = await fetch(`/api/estrellanes/${id}`, {
    method: "GET",
    headers: {
      "Accept": "application/ld+json"
    },
  });
  return await result.json();
}

const create = async (data) => {
  const result = await fetch('/api/estrellanes', {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json"
    },
    body: JSON.stringify(data)
  });
  return await result.json();
}

const update = async (id, data) => {
  const result = await fetch(`/api/estrellanes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/ld+json"
    },
    body: JSON.stringify(data)
  });
  return await result.json();
}

const remove = async (id) => {
  const result = await fetch(`/api/estrellanes/${id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/ld+json"
    },
  });
  if (result.status === 204) {
    return { success: true };
  }
  return { success: false, status: result.status };
}

export default async function EstrellanesAPI({ req_method, id = null, data = null }) {
  switch (req_method) {
    case "GET_ALL":
      return await getAll();
      
    case "GET_ONE":
      if (!id) throw new Error("ID is required for GET_ONE");
      return await getOne(id);
      
    case "POST":
      if (!data) throw new Error("Data payload is required for POST");
      return await create(data);
      
    case "PUT":
      if (!id || !data) throw new Error("ID and Data payload are required for PUT");
      return await update(id, data);
      
    case "DELETE":
      if (!id) throw new Error("ID is required for DELETE");
      return await remove(id);
      
    default:
      throw new Error(`Unsupported request method: ${req_method}`);
  }
}