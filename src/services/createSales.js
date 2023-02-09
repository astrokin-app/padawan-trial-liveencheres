export const createSales = async (newSale) => {
  const baseURL = process.env.VUE_APP_BASE_URL;

  try {
    const res = await fetch(`${baseURL}/sales`, {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({title: newSale.title, description: newSale.description}),
    });
    
    if (!res.ok) {
      throw new Error(`An error has occured: ${res.status} - ${res.statusText}`);
    }
      
    const itemsPromises = newSale.items.map(async item => {
      await fetch(`${baseURL}/items`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sale_id: newSale.id, description: item}),
      });
    });
    
      await Promise.all(itemsPromises);
    // }
  } catch (err) {
    console.error(err.message);
  }

}