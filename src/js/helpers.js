import { TIMEOUT_REQUEST_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const fetchData = async (url, options = null) => {
  const fetchPro = options
    ? fetch(url, {
        method: 'POST',
        headers: {
          contentType: 'application/json',
        },
        body: JSON.stringify(options.bodyData),
      })
    : fetch(url);
  try {
    const response = await Promise.race([
      fetchPro,
      timeout(TIMEOUT_REQUEST_SEC),
    ]);
    const responseData = await response.json();
    if (!response.ok)
      throw new Error(`${responseData.message} ${response.status}`);
    return responseData;
  } catch (error) {
    throw error;
  }
};
