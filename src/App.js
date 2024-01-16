import React, { useState, useEffect, useSyncExternalStore } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SitesManager from "./components/SitesManager";
import useLocalStorage from "./services/useLocalStorage";
import {
  AddWebsite,
  FetchTitles,
  FixTitles,
  GetWebsiteInfo,
} from "./services/model";
import { InfinitySpin } from "react-loader-spinner";
import logo from "./logo.svg";
import ProductsList from "./components/ProductsList";
import { IsAllowedToAddWebsite } from "./services/helper";
import PricingContainer from "./components/price-table/pricing-component-container";

function AppContainer() {
  const [MySites, setMySites] = useLocalStorage("tf_sites", []);
  const [TokenUsage, setTokenUsage] = useLocalStorage("tf_tokan_usage", []);
  // const [TitlesFixed, setTitlesFixed] = useLocalStorage("tf_tokan_usage", []);
  const [TitleCredits, setTitleCredits] = useLocalStorage(
    "tf_title_credits",
    0
  );

  const [Products, setProducts] = useState([]);
  const [SiteSelected, setSiteSelected] = useState({});
  const [IsLoading, setIsLoading] = useState(false);
  const [View, setView] = useState("home");

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const successParam = urlParams.get("success");
      const user_id = urlParams.get("user_id");

      if (successParam === "1") {
        const [userId, websiteId] = user_id.split(":");
        setIsLoading(true);

        try {
          const { data } = await GetWebsiteInfo(userId, websiteId);
          // Update the MySites array
          setMySites((prevMySites) => {
            return prevMySites.map((site) => {
              if (site.WebsiteId === websiteId) {
                return { ...data };
              }
              return site;
            });
          });

          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching website info:", error);
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [setMySites]);

  const handleSiteAdded = async (site_url) => {
    let my_sites = [...MySites];
    if (!IsAllowedToAddWebsite(my_sites)) {
      setView("buy");
      return toast.error(`Sorry, you reached max limit of your free credit`);
    }

    setIsLoading(true);
    const { data: website } = await AddWebsite({ site_url });
    setTitleCredits(parseInt(website.title_credits));
    my_sites = [website, ...my_sites];
    setMySites(my_sites);
    setIsLoading(false);
  };

  const handleFetchProducts = (website) => {
    try {
      setIsLoading(true);
      const { site_url, consumer_key, consumer_secret } = website;
      setSiteSelected(website);
      FetchTitles(site_url, consumer_key, consumer_secret)
        .then((products) => {
          setView("products");
          setProducts(products);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching titles:", error); // Handle errors here
          setIsLoading(false);
        });
    } catch (ex) {
      toast.error("Error while fetching titles: " + ex);
      setIsLoading(false);
    }
  };

  const handleTitleFixed = async (titles, token_usage, title_credits) => {
    setView("home");
    setTokenUsage(token_usage);
    // setTitlesFixed(titles);
    setTitleCredits(title_credits);
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
        {IsLoading ? (
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        ) : (
          <div className="col-md-12">
            {View === "home" && (
              <SitesManager
                onSiteAdded={handleSiteAdded}
                MySites={MySites}
                onFetchProducts={handleFetchProducts}
              />
            )}

            {View === "products" && (
              <ProductsList
                Products={Products}
                Website={SiteSelected}
                onTitlesFixed={handleTitleFixed}
                TitleCredits={TitleCredits}
              />
            )}

            {View === "buy" && <PricingContainer />}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default AppContainer;
