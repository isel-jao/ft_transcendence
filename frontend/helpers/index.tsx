//TODOD any to types , impelement func
const apiurl = "add api url here";

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
  const { path = "", queryPayload = {}, url = apiurl } = args;

  const queryString = new URLSearchParams(
    JSON.parse(JSON.stringify(queryPayload))
  ).toString();
  return fetch(`${url}${path}?${queryString}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(handleErrors)
    .then((response: any) => response.json());
};

const poster = async (
  path: string,
  payload: Record<string, any> | Record<string, any>[] = {},
  tokenOld?: string | undefined,
  url = apiurl,
  queryPayload: Record<string, any> = {}
) => {
  const queryString = new URLSearchParams(
    JSON.parse(JSON.stringify(queryPayload))
  ).toString();
  return fetch(`${url}${path}?${queryString}`, {
    method: "POST",
    headers: {},
    body: JSON.stringify(payload),
  })
    .then(handleErrors)
    .then((response: any) => response.json());
};

export { poster, fetcher };
