import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import SitesList from "./SitesList";
import { FaPlus } from "react-icons/fa";

const SitesManager = ({ MySites, onSiteAdded, onFetchProducts }) => {
  const [siteURL, setSiteURL] = useState("");

  const handleAddSite = () => {
    console.log(siteURL);
    if (siteURL.trim() !== "") {
      onSiteAdded(siteURL);
      setSiteURL("");
    }
  };

  return (
    <div>
      <Form>
        <InputGroup className="mb-3" size="lg">
          <Form.Control
            placeholder="Website URL"
            aria-label="Website URL"
            aria-describedby="basic-addon2"
            onChange={(e) => setSiteURL(e.target.value)}
          />
          <Button
            variant="outline-primary"
            id="button-addon2"
            onClick={handleAddSite}
          >
            <FaPlus />
          </Button>
        </InputGroup>
      </Form>
      <SitesList sites={MySites} onFetchProducts={onFetchProducts} />
    </div>
  );
};

export default SitesManager;
