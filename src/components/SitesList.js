import React from "react";
import { ListGroup, Button } from "react-bootstrap";

const SitesList = ({ sites, onFetchProducts }) => {
  return (
    <ListGroup>
      {sites.map((site, index) => (
        <ListGroup.Item
          key={index}
          className="d-flex justify-content-between align-items-center"
        >
          {site.site_url}
          <Button
            variant="primary"
            onClick={() => onFetchProducts(site.site_url)}
          >
            Fetch Products
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SitesList;
