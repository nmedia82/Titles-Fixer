import React, { useState, useEffect } from "react";
import "./pricing.css";

const PricingComponent = ({
  priceAnnually,
  pricingHeader,
  isMonthlyActive,
  priceMonthly,
  titlesAllowed,
  websitesAllowed,
  fastProcessingAllowed,
  onBuyPlan,
}) => {
  const [monthlyActiveClass, setMonthlyActiveClass] = useState("active");

  useEffect(() => {
    setMonthlyActiveClass(isMonthlyActive ? "active" : "");
  }, [isMonthlyActive]);

  return (
    <div className="pricing-card">
      <p className="pricing-header">{pricingHeader}</p>
      <div className="price-container">
        <p className={`toggle-annually ${monthlyActiveClass}`}>
          <span>$</span>
          {priceAnnually}
        </p>
        <p className={`toggle-monthly ${monthlyActiveClass}`}>
          <span>$</span>
          {priceMonthly}
        </p>
      </div>
      <ul>
        <li>
          <p>{titlesAllowed}</p>
        </li>
        <li>
          <p>{websitesAllowed}</p>
        </li>
        <li>
          <p>{fastProcessingAllowed}</p>
        </li>
      </ul>
      <button onClick={onBuyPlan}>Buy</button>
    </div>
  );
};

export default PricingComponent;
