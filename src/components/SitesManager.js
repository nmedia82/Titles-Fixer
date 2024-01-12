import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import SitesList from "./SitesList";

const SitesManager = ({ MySites, onSiteAdded, onFetchProducts }) => {
  const [siteUrl, setSiteUrl] = useState("");

  const handleAddSite = () => {
    if (siteUrl.trim() !== "") {
      onSiteAdded(siteUrl);
      setSiteUrl("");
    }
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="siteUrl">
          <Form.Control
            type="text"
            placeholder="Enter site URL"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddSite}>
          Add Site
        </Button>
      </Form>
      <SitesList sites={MySites} onFetchProducts={onFetchProducts} />
    </div>
  );
};

export default SitesManager;
