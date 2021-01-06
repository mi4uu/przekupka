import { key, baseUrl } from "./config";
import axios from "axios";
import qs from "qs";

import { getMessageSignature } from "./getMessageSignature";

export const makePrivateCall = (
  path: string,
  params: { [key: string]: any }
) => {
  if (!params.nonce) {
    params.nonce = Date.now() * 1000; // spoof microsecond
  }

  return axios.post(baseUrl + path, qs.stringify(params), {
    headers: {
      "API-Key": key,
      "API-Sign": getMessageSignature(path, params),
      "User-Agent": "Miial kraken client",
    },
  });
};
