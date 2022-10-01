interface Options {
  body?: any;
}

function getEndpoint(path: string, params: any = {}): string {
  const url = Object.keys(params).reduce(function reducer(
    acc: URL,
    key: string
  ): URL {
    acc.searchParams.set(key, params[key]);
    return acc;
  },
  new URL(path, "http://dev.null/api/"));

  return url.pathname + url.search;
}

export async function get(endpoint: string, params: any = {}) {
  const url = getEndpoint(endpoint, params);
  const { data, error } = await fetch(url).then((res) => res.json());

  if (error) throw error;

  return data;
}
