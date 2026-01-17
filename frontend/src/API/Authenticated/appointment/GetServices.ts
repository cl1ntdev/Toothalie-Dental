
 export async function getServices() {
  const token = JSON.parse(localStorage.getItem('userInfo')).token;
  try {
        const response = await fetch('/api/get-services',{
          method: "GET",
          headers: {
            "Content-Type": 'application/json',
            "Authorization" : `Bearer ${token}`
          },
        });
        const data = await response.json()
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error fetching services:", error);
        throw error;
    }
    
};



