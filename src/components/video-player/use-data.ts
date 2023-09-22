import { useEffect, useState } from 'react';
import { ClientData } from '../../types';

export interface useDataResponse {
  data: ClientData | undefined // data extracted by the query provided into useData
}

export function useData(query: string): useDataResponse {
  const [data, setData] = useState<ClientData | undefined>(undefined);

  // 1. Start with the query text string. 
  const rawQuery = query;

  // 2. Load introspection schema for each of the _connection fields found in the query text above.
  useEffect(() => {
    let ignore = false;

    const fetchData = async (url: string) => {
      if (ignore) return

      const response = await fetch(
        url,
        {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            // 'Access-Control-Allow-Headers': "Content-Type, Authorization",
            // mode: 'no-cors',
          },
        },
      );
      response.json().then(j => {
        console.debug(j)
        setData(j)
      })
    }

    // const url = `https://api.findip.net/85.255.234.72/?token=91d3af8a1641473387cbc8b00ada9d8b`
    const url = `https://geolocation-db.com/json/`
    fetchData(url).catch(console.error)

    // Cancel any future `fetchData`
    return () => { ignore = true }
  }, [rawQuery])

  return { data };
}