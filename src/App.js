import React, { useState, useEffect, useSyncExternalStore } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SitesManager from "./components/SitesManager";
import useLocalStorage from "./services/useLocalStorage";
import {
  AddWebsite,
  FetchTitles,
  GetWebsiteInfo,
  SignupUser,
} from "./services/model";
import { InfinitySpin } from "react-loader-spinner";
import ProductsList from "./components/ProductsList";
import { IsAllowedToAddWebsite } from "./services/helper";
import PricingContainer from "./components/price-table/pricing-component-container";
import Header from "./components/Header";
import AuthForm from "./components/auth/Auth";
import { loginUser, logout } from "./services/auth";

function AppContainer() {
  const [User, setUser] = useLocalStorage("tf_user", null);
  const [MySites, setMySites] = useLocalStorage("tf_sites", []);
  const [TokenUsage, setTokenUsage] = useLocalStorage("tf_tokan_usage", []);
  // const [TitlesFixed, setTitlesFixed] = useLocalStorage("tf_tokan_usage", []);
  const [TitleCredits, setTitleCredits] = useLocalStorage(
    "tf_title_credits",
    0
  );
  const [WebsiteCredits, setWebsiteCredits] = useLocalStorage(
    "tf_website_credits",
    1
  );

  const [Products, setProducts] = useState([]);
  const [SiteSelected, setSiteSelected] = useState({});
  const [IsLoading, setIsLoading] = useState(false);
  const [View, setView] = useState("Home");

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

    // console.log(User);

    fetchData();
  }, [setMySites]);

  const handlePaymentCompleted = ({ title_credits, website_credits }) => {
    setWebsiteCredits(website_credits);
    setTitleCredits(title_credits);
  };

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const handleAuth = async (auth_data, is_registered) => {
    // return console.log(auth_data);
    if (is_registered && auth_data._password !== auth_data._password2) {
      return toast.error("Passwords are not mached.");
    }
    try {
      setIsLoading(true);
      let user_info = {};
      let view = "Home";
      if (is_registered) {
        let { data } = await SignupUser(auth_data);
        user_info = data;
        view = "Buy";
      } else {
        user_info = await loginUser(auth_data);
        console.log(user_info);
      }

      delete user_info.user_password;
      setUser(user_info);
      setIsLoading(false);
      setView(view);
    } catch (e) {
      toast.error(e.message);
      setIsLoading(false);
    }
  };

  const handleSiteAdded = async (site_url) => {
    let my_sites = [...MySites];
    if (!IsAllowedToAddWebsite(my_sites)) {
      return setView("Buy");
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
    setView("Home");
    setTokenUsage(token_usage);
    // setTitlesFixed(titles);
    setTitleCredits(title_credits);
  };

  return (
    <div className="container mt-5">
      <Header onNavClick={setView} User={User} onLogout={handleLogout} />
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
            {View === "Home" && (
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

            {View === "Buy" && (
              <PricingContainer onPaymentCompleted={handlePaymentCompleted} />
            )}

            {View === "Login" && <AuthForm onAuth={handleAuth} />}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default AppContainer;
