import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SitesManager from "./components/SitesManager";
import useLocalStorage from "./services/useLocalStorage";
import { FetchTitles } from "./services/model";
import logo from "./logo.svg";
import ProductsList from "./components/ProductsList";

function AppContainer() {
  const [MySites, setMySites] = useLocalStorage("tf_sites", []);
  const [Products, setProducts] = useState([]);

  const handleSiteAdded = (site) => {
    const my_sites = [site, ...MySites];
    setMySites(my_sites);
  };

  const handleFetchProducts = (site_url) => {
    try {
      FetchTitles(site_url)
        .then((products) => {
          // console.log(products);
          setProducts(products);
        })
        .catch((error) => {
          console.error("Error fetching titles:", error); // Handle errors here
        });
    } catch (ex) {
      toast.error("Error while fetching titles: " + ex);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <img
          src={logo}
          alt="Your Logo"
          className="app-logo img-fluid"
          style={{ width: "100px", height: "100px" }}
        />
        <nav className="display-6">TitleFixer App</nav>
        <nav>Home</nav>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          {Products.length === 0 && (
            <SitesManager
              onSiteAdded={handleSiteAdded}
              MySites={MySites}
              onFetchProducts={handleFetchProducts}
            />
          )}

          {Products.length > 0 && <ProductsList Products={Products} />}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AppContainer;
