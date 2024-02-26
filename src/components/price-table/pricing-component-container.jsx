import React, { useState, useEffect } from "react";
import PricingComponent from "./pricing-component";
import bgbottom from "./../../images/bg-bottom.svg";
import bgtop from "./../../images/bg-top.svg";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

import "./pricing.css";
import { toast } from "react-toastify";
import { AddTransaction } from "../../services/model";

const PricingContainer = ({
  User,
  onPaymentCompleted,
  onPaymentCompletedGuest,
}) => {
  const [isMontlyActive, setIsMontlyActive] = useState(false);
  const [paddle, setPaddle] = useState("");

  const paddleEnv = "sandbox";
  const paddleToken =
    paddleEnv === "sandbox" ? "test_4965d0e9be2db08e51a606fbcea" : "";

  const sandboxPrices = {
    starter: {
      price_id: "pri_01hm99j6d0vcvfbgd53h8h1fkn",
      title_credits: 100,
      website_credits: 1,
    },
    economy: {
      price_id: "pri_01hm99kjypqbtdxhc570kmans6",
      title_credits: 1000,
      website_credits: 5,
    },
    agency: {
      price_id: "pri_01hm99nafz9ppcqz5axe38wnpt",
      title_credits: 5000,
      website_credits: 25,
    },
  };

  useEffect(() => {
    async function initializePaddleInstance() {
      // Replace 'ENVIRONMENT_GOES_HERE' and 'AUTH_TOKEN_GOES_HERE' with your values

      try {
        const paddleInstance = await initializePaddle({
          environment: paddleEnv,
          token: paddleToken,
          checkout: {
            settings: {
              theme: "dark",
            },
          },
          eventCallback: async function (response) {
            if ("checkout.completed" === response.name) {
              toast.info("Checkout completed successfully, updating account");
              paddleInstance.Checkout.close();

              let { data: transaction } = response;
              transaction.date = new Date().toISOString().split("T")[0];
              if (User) {
                const postData = {
                  user_id: User.UserId,
                  email: User.user_email,
                  transaction_id: transaction.id,
                  details: transaction,
                };
                const { data: credits } = await AddTransaction(postData);
                onPaymentCompleted(credits, transaction);
                toast.success("Account Updated.");
              } else {
                onPaymentCompletedGuest();
              }
            }
          },
        });
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      } catch (error) {
        console.error("Error initializing Paddle:", error);
      }
    }

    initializePaddleInstance();
  }, [User, paddleToken, onPaymentCompleted]);

  const togglePricing = () => {
    setIsMontlyActive(!isMontlyActive);
  };

  const handleBuyPlan = (plan) => {
    // return console.log(paddle);
    // Define the items for Paddle checkout
    const { price_id, title_credits, website_credits } =
      paddleEnv === "sandbox" ? sandboxPrices[plan] : "";
    const credits = 50;
    const checkout_settings = {
      items: [
        {
          priceId: price_id,
          quantity: 1,
        },
      ],
      customData: { title_credits, website_credits },
    };

    // Use the 'credits' value and 'price_id' in your Paddle code
    console.log(
      `Clicked button with ${credits} credits. Price ID: ${price_id}`
    );

    // Open Paddle checkout with the specified items
    paddle?.Checkout.open(checkout_settings);
  };

  return (
    <div className="pricing-container">
      <img src={bgtop} alt="" />
      <img src={bgbottom} alt="" />

      <div className="pricing-body">
        {/* {TogglePlan()} */}

        <label className="pricing-card-container" htmlFor="switch">
          <PricingComponent
            pricingHeader="Starter"
            priceAnnually="9.99"
            priceMonthly="6.99"
            titlesAllowed="200 Titles"
            websitesAllowed="Single Website"
            fastProcessingAllowed="Fast Processing"
            isMonthlyActive={isMontlyActive}
            onBuyPlan={() => handleBuyPlan("starter")}
          />
          <PricingComponent
            pricingHeader="Economy"
            priceAnnually="49.99"
            priceMonthly="24.99"
            titlesAllowed="1000 Titles"
            websitesAllowed="5 Websites"
            fastProcessingAllowed="Fast Processing"
            isMonthlyActive={isMontlyActive}
            onBuyPlan={() => handleBuyPlan("economy")}
          />
          <PricingComponent
            pricingHeader="Agency"
            priceAnnually="99.99"
            priceMonthly="75.99"
            titlesAllowed="5000 Titles"
            websitesAllowed="15 Websites"
            fastProcessingAllowed="Fast Processing"
            isMonthlyActive={isMontlyActive}
            onBuyPlan={() => handleBuyPlan("agency")}
          />
        </label>
      </div>
    </div>
  );

  function TogglePlan() {
    return (
      <div className="toggle-row">
        <p>Annually</p>
        <div className="toggle-container">
          <input
            className="toggle-switch"
            type="checkbox"
            id="switch"
            name="switch"
            onClick={togglePricing}
          />
        </div>
        <p>Monthly</p>
      </div>
    );
  }
};

export default PricingContainer;
