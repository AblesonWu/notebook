# Javascript 各种问题

## Tips

1. 将string状态下的`true/false`转化为boolean

```javascript 
/true/i.test('false'); // => false
/true/i.test('true'); // => true
```

## 2. Web Worker

在Mater线程下创建Worker

```javascript
const worker = new Worker(new URL('../../utils/getCountryCode.js', import.meta.url), { type: 'module' });
worker.postMessage(osgiConfig.countryCodeUrl);
worker.onmessage = ({ data }) => {
  if (data.error) {
    // eslint-disable-next-line no-console
    console.error(data.error);
    return;
  }
  // eslint-disable-next-line no-underscore-dangle
  window.__countryCode = data;
};
```

创建Worker文件

```javascript
import { client } from '../api/client';

const fetchCountryCode = async (endpoint) => {
  try {
    const response = await client.get(endpoint, { mode: 'cors', credential: 'include' });
    postMessage(response.data);
  } catch (e) {
    postMessage({ error: 'unknown error' });
  }
};

self.onmessage = ({ data }) => {
  fetchCountryCode(data);
};

```



