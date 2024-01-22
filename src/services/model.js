// import config from "../config";
import httpService from "./http";
import config from "./../config.json";
// import { getUserID, getUserRole } from "./auth";

const { apiURL } = config;

export function FetchTitles(site_url, consumerKey, consumerSecret) {
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

export function GetWebsiteInfo(user_id, website_id) {
  const url = `${apiURL}/get-website-info/${user_id}/${website_id}`;
  return httpService.get(url);
}

export function SignupUser(data) {
  const url = `${apiURL}/add-user`;
  return httpService.post(url, data);
}

export function AddWebsite(data) {
  const url = `${apiURL}/add-website`;
  return httpService.post(url, data);
}

export function UpdateTitles(data) {
  const url = `${apiURL}/update-titles`;
  return httpService.post(url, data);
}

export function FixTitles(data) {
  const url = `${apiURL}/fix-titles`;
  return httpService.post(url, data);
}

export function AddTransaction(data) {
  const url = `${apiURL}/add-transaction`;
  return httpService.post(url, data);
}

export function AddCredits(data) {
  const url = `${apiURL}/add-credits`;
  return httpService.post(url, data);
}
