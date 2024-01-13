import React, { useState, useEffect } from "react";
import { Card, ListGroup, Button, Badge } from "react-bootstrap";
import { FaCheck, FaTrash } from "react-icons/fa"; // Import the FaCheck icon
import { FixTitles, UpdateTitles } from "../services/model";
import { toast } from "react-toastify";
import config from "./../config.json";
import { InfinitySpin } from "react-loader-spinner";

const { consumerKey: ck, consumerSecret: cs } = config;

const ProductsList = ({ Products, SiteURL, onTitlesFixed }) => {
  const [Titles, setTitles] = useState([]);
  const [status, setStatus] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let titles = Products.map((p) => ({
      id: p.id,
      current: p.name,
      fixed: false,
      included: true,
    }));
    // console.log(titles);
    setTitles(titles);
  }, [Products]);

  const handleTitleFixing = async () => {
    try {
      setIsLoading(true);
      let titles = Titles.filter((t) => t.included);
      //   return console.log(titles);
      const postData = { titles, user_prompt: "" };
      const { data } = await FixTitles(postData);
      const { fixed_titles, token_usage } = data;
      titles = titles.map((t, i) => ({
        ...t,
        fixed: true,
        new: fixed_titles[i],
      }));

      setTitles(titles);
      setStatus("fixed");

      // uplifting state to app.js
      onTitlesFixed(titles, token_usage);
      setIsLoading(false);

      //   console.log(titles);
    } catch (error) {
      toast.error("Error while creating, please click again");
    }
  };

  const handleUpdateTitles = async () => {
    try {
      setIsLoading(true);
      let titles = Titles.filter((t) => t.included);
      const postData = { site_url: SiteURL, ck, cs, titles };
      //   return console.log(postData);
      const { data } = await UpdateTitles(postData);
      setIsLoading(false);
      toast.success(`${titles.length} titles are updated to site`);

      //   console.log(titles);
    } catch (error) {
      toast.error("Error while creating, please click again");
    }
  };

  const toggleTitleFixable = (id) => {
    const updatedTitles = Titles.map((title) =>
      title.id === id ? { ...title, included: !title.included } : title
    );
    setTitles(updatedTitles);
  };

  const handleCancelFix = () => {
    let titles = Products.map((p) => ({
      id: p.id,
      current: p.name,
      fixed: false,
      included: true,
    }));
    // console.log(titles);
    setTitles(titles);
    setStatus("");
  };

  const getFontSize = (title) => {
    return title.fixed ? "0.9rem" : "1rem";
  };

  const displayCurrentTitle = (title) => {
    return title.included ? (
      <>
        <strong>{title.id}:</strong> {title.current}
      </>
    ) : (
      <s>
        <strong>{title.id}:</strong>
        {title.current}
      </s>
    );
  };

  const getIncludedTitles = () => {
    return Titles.filter((t) => t.included).length;
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-75">
      {IsLoading ? (
        <InfinitySpin
          visible={true}
          width="200"
          color="#4fa94d"
          ariaLabel="infinity-spin-loading"
        />
      ) : (
        <Card style={{ width: "100%" }}>
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {status === "" && (
                  <Button
                    onClick={handleTitleFixing}
                    variant="primary"
                    className="float-right"
                  >
                    Fix Titles{" "}
                    <Badge bg="secondary">{getIncludedTitles()}</Badge>
                  </Button>
                )}
                {status === "fixed" && (
                  <>
                    <Button
                      onClick={handleUpdateTitles}
                      variant="success"
                      className="m-1"
                      disabled={getIncludedTitles() === 0}
                    >
                      Update Titles
                      <Badge bg="primary">{getIncludedTitles()}</Badge>
                    </Button>
                    <Button
                      variant="link"
                      className="m-1"
                      color="red"
                      onClick={handleCancelFix}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </div>
              <span>{SiteURL}</span>
            </div>
          </Card.Header>
          <ListGroup variant="flush">
            {Titles.map((title) => (
              <ListGroup.Item key={title.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div id="titles-container">
                    {title.fixed && <p className="lead">{title.new}</p>}
                    <div
                      className="current-title"
                      style={{ fontSize: getFontSize(title) }}
                    >
                      {displayCurrentTitle(title)}
                    </div>
                  </div>

                  {!title.fixed && (
                    <Button
                      variant="link"
                      onClick={() => toggleTitleFixable(title.id)}
                    >
                      <FaCheck color={title.included ? "green" : "gray"} />
                    </Button>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Card.Footer>
            <Button onClick={handleTitleFixing} variant="primary">
              Fix Titles
            </Button>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default ProductsList;
