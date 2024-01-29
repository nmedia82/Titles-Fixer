import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import SitesList from "./SitesList";
import { FaPlus } from "react-icons/fa";
import { ValidateURL } from "../services/helper";
import { toast } from "react-toastify";

const SitesManager = ({
  MySites,
  onSiteAdded,
  onFetchProducts,
  onRemoveSite,
}) => {
  const [siteURL, setSiteURL] = useState("");

  const handleAddSite = () => {
    // console.log(siteURL);
    if (!ValidateURL(siteURL)) {
      return toast.error("URL is not valid");
    }
    if (siteURL.trim() !== "") {
      onSiteAdded(siteURL);
      setSiteURL("");
    }
  };

  return (
    <div>
      <InputGroup className="mb-3" size="lg">
        <Form.Control
          placeholder="e.g: https://mystore.com"
          aria-label="Website URL"
          aria-describedby="basic-addon2"
          onChange={(e) => setSiteURL(e.target.value)}
          onKeyUp={(e) => {
            setSiteURL(e.target.value);
            if (e.key === "Enter") {
              handleAddSite();
            }
          }}
        />
        <Button variant="success" id="button-addon2" onClick={handleAddSite}>
          <FaPlus />
        </Button>
      </InputGroup>

      {MySites.length > 0 && (
        <SitesList
          sites={MySites}
          onFetchProducts={onFetchProducts}
          onRemoveSite={onRemoveSite}
        />
      )}
    </div>
  );
};

export default SitesManager;
