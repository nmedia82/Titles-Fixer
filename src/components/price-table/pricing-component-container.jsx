import React, { Component } from "react";
import PricingComponent from "./pricing-component";
import bgbottom from "./../../images/bg-bottom.svg";
import bgtop from "./../../images/bg-top.svg";

import "./pricing.css";

class PricingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMontlyActive: false,
    };
  }
  togglePricing = () => {
    this.setState({
      isMontlyActive: !this.state.isMontlyActive,
    });
  };
  render() {
    return (
      <div className="pricing-container">
        <img src={bgtop} alt="" />
        <img src={bgbottom} alt="" />

        <div className="pricing-body">
          <h1>Our Pricing</h1>
          <div className="toggle-row">
            <p>Annually</p>
            <div className="toggle-container">
              <input
                className="toggle-switch"
                type="checkbox"
                id="switch"
                name="switch"
                onClick={this.togglePricing}
              />
            </div>
            <p>Monthly</p>
          </div>
          <label className="pricing-card-container" for="switch">
            <PricingComponent
              pricingHeader="Basic"
              priceAnnually="199.99"
              priceMonthly="19.99"
              storage="500 GB Storage"
              allowedUser="2 Users Allowed"
              gigabits="Send up to 3 GB"
              isMonthlyActive={this.state.isMontlyActive}
            />
            <PricingComponent
              pricingHeader="Professional"
              priceAnnually="249.99"
              priceMonthly="24.99"
              storage="1 TB Storage"
              allowedUser="5 Users Allowed"
              gigabits="Send up to 10 GB"
              isMonthlyActive={this.state.isMontlyActive}
            />
            <PricingComponent
              pricingHeader="Master"
              priceAnnually="399.99"
              priceMonthly="39.99"
              storage="2 TB Storage"
              allowedUser="10 Users Allowed"
              gigabits="Send up to 20 GB"
              isMonthlyActive={this.state.isMontlyActive}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default PricingContainer;
