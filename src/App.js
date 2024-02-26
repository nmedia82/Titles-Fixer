import React, { useState, useEffect, useSyncExternalStore } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SitesManager from "./components/SitesManager";
import useLocalStorage from "./services/useLocalStorage";
import "./App.css";
import {
  AddWebsite,
  FetchTitles,
  GetWebsiteInfo,
  SignupUser,
} from "./services/model";
import { InfinitySpin } from "react-loader-spinner";
import ProductsList from "./components/ProductsList";
import { ClearAddressHistory, IsAllowedToAddWebsite } from "./services/helper";
import PricingContainer from "./components/price-table/pricing-component-container";
import Header from "./components/Header";
import AuthForm from "./components/auth/Auth";
import { loginUser, logout } from "./services/auth";
import { Container, Col, Row, Button } from "react-bootstrap";
import MyCredits from "./components/Credits";
import logo from "./images/Logo-white.svg";

function AppContainer() {
  const [User, setUser] = useLocalStorage("tf_user", null);
  const [MySites, setMySites] = useLocalStorage("tf_sites", []);
  const [TokenUsage, setTokenUsage] = useLocalStorage("tf_tokan_usage", []);
  const [Transactions, setTransactions] = useLocalStorage(
    "tf_transactions",
    []
  );
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
  const [View, setView] = useState("Login");
  const [activeNavItem, setActiveNavItem] = useState("");
  const [Guest, setGuest] = useState(false);

  // console.log(User);

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);

      const callbackSuccess = urlParams.get("success");
      const user_id = urlParams.get("user_id");
      const surl = urlParams.get("surl");

      ClearAddressHistory();

      if (surl) {
        // console.log(surl);
        handleSiteAdded(surl);
      }

      if (callbackSuccess === "1") {
        const [userId, websiteId] = user_id.split(":");
        setIsLoading(true);

        try {
          const { data: website_info } = await GetWebsiteInfo(
            userId,
            websiteId
          );
          // console.log(website_info);
          // Update the MySites array
          setMySites((prevMySites) => {
            return prevMySites.map((site) => {
              if (site.WebsiteId === websiteId) {
                return { ...website_info };
              }
              return site;
            });
          });

          setIsLoading(false);

          if (user_id === "guest") setGuest(true);
          setView("Home");
        } catch (error) {
          console.error("Error fetching website info:", error);
          setIsLoading(false);
        }
      }
    };

    // console.log(User);

    fetchData();
  }, [setMySites]);

  const handleNavClick = (navItem) => {
    if (navItem === "Logout") return handleLogout();
    setActiveNavItem(navItem);
    setView(navItem);
    console.log(navItem);
    // setActiveNavItem("Home");
    // Implement your own logic for navigation or other actions here
  };

  const handlePaymentCompleted = (
    { title_credits, website_credits },
    transaction
  ) => {
    setWebsiteCredits(website_credits);
    setTitleCredits(title_credits);
    const transactions = [transaction, ...Transactions];
    setTransactions(transactions);
    setView("Home");
    // setActiveNavItem("Home");
  };

  const handleLogout = () => {
    logout();
    setUser(null); // Clear user data
    setView("Login");
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
      setTitleCredits(user_info.title_credits);
      setWebsiteCredits(user_info.website_credits);
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
    const user_id = !User ? "guest" : User.UserId;
    const postData = { site_url, user_id };
    const { data: website } = await AddWebsite(postData);
    setTitleCredits(parseInt(website.title_credits));
    my_sites = [website, ...my_sites];
    setMySites(my_sites);
    setIsLoading(false);
  };

  const handleSiteRemove = (website_id) => {
    const my_sites = MySites.filter((w) => w.WebsiteId !== website_id);
    setMySites(my_sites);
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
    // setView("Home");
    setTokenUsage(token_usage);
    // setTitlesFixed(titles);
    setTitleCredits(title_credits);
  };

  const handleDemo = () => {
    setGuest(true);
    setView("Home");
  };

  return (
    <div className="container-fluid p-0">
      {View === "Login" && !User && (
        <div className="row m-0 vh-100 p-5 ">
          {IsLoading ? (
            <InfinitySpin
              visible={true}
              width="200"
              color="#4fa94d"
              ariaLabel="infinity-spin-loading"
            />
          ) : (
            <>
              <div className="col-lg-6 p-0 bg-blue-custom d-flex align-items-center justify-content-center">
                <div className="text-center text-white">
                  <img
                    src={logo}
                    alt="Title Fixer Online"
                    className="app-logo img-fluid"
                    style={{ width: "200px" }}
                  />
                  <h2 className="mt-3">SEO, AI Optimized Titles</h2>
                  <p className="mt-3">
                    Create best titles for your products and increase sales.
                  </p>
                  <Button variant="light" onClick={handleDemo}>
                    Launch Demo
                  </Button>
                </div>
              </div>
              <div className="col-lg-6 p-0 bg-white d-flex align-items-center justify-content-center">
                <AuthForm onAuth={handleAuth} />
              </div>
            </>
          )}
        </div>
      )}

      {(User || Guest) && (
        <div className="p-0">
          <Header
            onNavClick={handleNavClick}
            User={User}
            // activeNavItem={(nav) => setActiveNavItem(nav)}
          />
          <div className="row mt-4">
            {IsLoading ? (
              <InfinitySpin
                visible={true}
                width="200"
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
              />
            ) : (
              <div className="col-md-12 px-5">
                {View === "Home" && (
                  <SitesManager
                    onSiteAdded={handleSiteAdded}
                    MySites={MySites}
                    onFetchProducts={handleFetchProducts}
                    onRemoveSite={handleSiteRemove}
                  />
                )}

                {View === "products" && (
                  <ProductsList
                    Products={Products}
                    Website={SiteSelected}
                    onTitlesFixed={handleTitleFixed}
                    TitleCredits={TitleCredits}
                    User={User}
                  />
                )}

                {View === "Buy" && (
                  <PricingContainer
                    User={User}
                    onPaymentCompleted={handlePaymentCompleted}
                  />
                )}

                {View === "Credits" && (
                  <MyCredits
                    TitleCredits={TitleCredits}
                    WebsiteCredits={WebsiteCredits}
                    onViewChange={(v) => setView(v)}
                    transactions={Transactions}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default AppContainer;
