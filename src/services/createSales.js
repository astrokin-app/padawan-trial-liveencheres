export const createSales = async ({ title, description, items, id }) => {
  const baseURL = process.env.VUE_APP_BASE_URL;

  try {
    const res = await fetch(`${baseURL}/sales`, {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, description }),
    });
    
    if (!res.ok) {
      throw new Error(`An error has occured: ${res.status} - ${res.statusText}`);
    }
    
    const content = await res.json();
    console.log(content);
    
    if (content && items && id) {
      // fetch items by sales id
      const itemsPromises = items.map(async item => {
        await fetch(`${baseURL}/items`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ sale_id: id, description: item }),
        });
      });
    
      await Promise.all(itemsPromises);
    }
  } catch (err) {
    console.error(err.message);
  }

}