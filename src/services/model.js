// import config from "../config";
import httpService from "./http";
import config from "./../config.json";
// import { getUserID, getUserRole } from "./auth";

const { apiURL, consumerKey, consumerSecret } = config;

export function FetchTitles(site_url) {
  return new Promise((resolve, reject) => {
    const apiUrl = `${site_url}/wp-json/wc/v3/products/`;

    // Basic Authentication credentials
    const authHeader = {
      username: consumerKey,
      password: consumerSecret,
    };

    httpService
      .get(apiUrl, {
        auth: authHeader,
      })
      .then((response) => {
        // Handle the API response here, extracting specific keys from each product
        const products = response.data.map((product) => ({
          id: product.id,
          sku: product.sku,
          name: product.name,
        }));
        resolve(products); // Resolve the promise with the extracted products
      })
      .catch((error) => {
        // Handle errors if the request fails
        reject(error); // Reject the promise with the error
      });
  });
}

export function FixTitles(data) {
  const url = `${apiURL}/fix-titles`;
  return httpService.post(url, data);
}

export function UpdateTitles(data) {
  const url = `${apiURL}/update-titles`;
  return httpService.post(url, data);
}
