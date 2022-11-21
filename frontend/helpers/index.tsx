const serverurl = process.env.NEXT_PUBLIC_API;

const handleErrors = () => {
  //TODO implemet handel error func
  return "error";
};

const fetcher = async (args: {
  path?: string;
  queryPayload?: Record<string, any>;
  token?: string;
  url?: string;
}) => {
  const { path = "", queryPayload = {}, url = serverurl } = args;

  const queryString = new URLSearchParams(
    JSON.parse(JSON.stringify(queryPayload))
  ).toString();
  return fetch(`${url}${path}?${queryString}`, {
    method: "GET",
    headers: {
      // "Content-type": "application/json; charset=UTF-8",
      "Content-Type": "application/json",
    },
  })
    .then((response: any) => response.json())
    .then((data) => data);
};

const poster = async (
  path: string,
  payload: Record<string, any> | Record<string, any>[] = {},
  url = serverurl,
  queryPayload: Record<string, any> = {}
) => {
  const queryString = new URLSearchParams(
    JSON.parse(JSON.stringify(queryPayload))
  ).toString();

  console.log({ payload });
  return fetch(`${url}${path}?${queryString}`, {
    method: "POST",
    headers: {
      // "Content-Type": "application/x-www-form-urlencoded"
      "Content-Type": "application/json",
      //token
    },
    body: JSON.stringify(payload),
  })
    .then((response: any) => response.json())
    .then((data) => data);
};

export { poster, fetcher };
