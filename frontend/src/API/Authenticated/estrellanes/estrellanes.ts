const getAll = async (token) => {
  const result = await fetch('/api/estrellanes', {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
  return await result.json();
}

const getOne = async (id, token) => {
  const result = await fetch(`/api/estrellanes/${id}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
  return await result.json();
}

const create = async (data, token) => {
  const result = await fetch('/api/estrellanes', {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/ld+json" // API Platform typically expects this
    },
    body: JSON.stringify(data)
  });
  return await result.json();
}

const update = async (id, data, token) => {
  const result = await fetch(`/api/estrellanes/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/ld+json" 
    },
    body: JSON.stringify(data)
  });
  return await result.json();
}

const remove = async (id, token) => {
  const result = await fetch(`/api/estrellanes/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });
  if (result.status === 204) {
    return { success: true };
  }
  return { success: false, status: result.status };
}

export default async function EstrellanesAPI({ req_method, id = null, data = null }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token; 

  if (!token) {
    throw new Error("Authentication token is missing.");
  }

  switch (req_method) {
    case "GET_ALL":
      return await getAll(token);
      
    case "GET_ONE":
      if (!id) throw new Error("ID is required for GET_ONE");
      return await getOne(id, token);
      
    case "POST":
      if (!data) throw new Error("Data payload is required for POST");
      return await create(data, token);
      
    case "PUT":
      if (!id || !data) throw new Error("ID and Data payload are required for PUT");
      return await update(id, data, token);
      
    case "DELETE":
      if (!id) throw new Error("ID is required for DELETE");
      return await remove(id, token);
      
    default:
      throw new Error(`Unsupported request method: ${req_method}`);
  }
}