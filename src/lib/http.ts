import { JSONValue } from '@/types';

const convertResponse = async (res: Response) => {
  if (res.status >= 403) throw new Error('Unauthorized');
  const contentType = res.headers.get('content-type');

  if (contentType && contentType.indexOf('application/json') !== -1) {
    const json = await res.json();
    return json;
  } else {
    const text = await res.text();
    return text;
  }
};

class HttpClient {
  async get(url: string) {
    const res = await fetch(url);

    return convertResponse(res);
  };

  async post(url: string, data: Record<string, JSONValue>) {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    return convertResponse(res);
  };

  async delete(url: string) {
    const res = await fetch(url, { method: 'DELETE' });

    return convertResponse(res);
  }
};

export default HttpClient;
