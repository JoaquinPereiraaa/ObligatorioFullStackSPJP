export const buscarOfertasService = async (keywords, location) => {
  const apiKey = process.env.JOOBLE_API_KEY;

  const response = await fetch(
    `https://uy.jooble.org/api/${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        keywords,
        location
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Error al consultar Jooble: ${response.status}`);
  }

  const data = await response.json();

  return data;
};