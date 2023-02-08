export const fetchSales = async () => {
  const baseURL = process.env.VUE_APP_BASE_URL;

  try {
    const res = await fetch(`${baseURL}/sales`);
    
    if (!res.ok) {
      throw new Error(`An error has occured: ${res.status} - ${res.statusText}`);
    }
    
    const data = await res.json();
    
    // fetch items by sales id
    const itemsPromises = data.map(async sale => {
      const itemRes = await fetch(`${baseURL}/items?sale_id=${sale.id}`);
      console.log(itemRes)
      sale.items = await itemRes.json();
    });
    
    await Promise.all(itemsPromises);
    
    return {
      status: `${res.status}-${res.statusText}`,
      headers: {
        "Content-Type": res.headers.get("Content-Type"),
        "Content-Length": res.headers.get("Content-Length"),
      },
      length: res.headers.get("Content-Length"),
      data,
    }
  } catch (err) {
    console.error(err.message);
  }

}