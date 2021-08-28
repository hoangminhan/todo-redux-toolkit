import { URL_API } from "../constants";

import axios from "axios";
export default function callApi(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${URL_API}/${endpoint}`,
    data: body,
  }).catch((err) => {
    console.log(err);
  });
}
