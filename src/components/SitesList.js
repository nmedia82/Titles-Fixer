import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import config from "./../config.json";
import { getUserID } from "../services/auth";

const { returnURL, callbackURL } = config;

const SitesList = ({ sites, onFetchProducts }) => {
  const handleConnectSite = ({ WebsiteId, site_url }) => {
    // Define the base endpoint
    const endpoint = `${site_url}/wc-auth/v1/authorize`;

    let user_id = getUserID();
    user_id = !user_id ? "guest" : user_id;

    // Define the query parameters
    const params = new URLSearchParams({
      app_name: "Title Fixerr",
      scope: "read_write",
      user_id: `${user_id}:${WebsiteId}`,
      return_url: returnURL,
      callback_url: callbackURL,
    });

    // Append the query parameters to the endpoint
    const endpointWithParams = `${endpoint}?${params.toString()}`;
    return endpointWithParams;
  };

  return (
    <ListGroup>
      {sites.map((site, index) => (
        <ListGroup.Item
          key={index}
          className="d-flex justify-content-between align-items-center"
        >
          {site.site_url}
          {site.is_connected && (
            <Button variant="success" onClick={() => onFetchProducts(site)}>
              Fetch Products
            </Button>
          )}
          {!site.is_connected && (
            <a href={handleConnectSite(site)} className="btn btn-primary">
              Connect Site
            </a>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SitesList;
