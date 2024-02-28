import React, { useState, useEffect } from "react";
import { Card, ListGroup, Button, Badge } from "react-bootstrap";
import { FaCheck, FaExternalLinkAlt, FaTrash } from "react-icons/fa"; // Import the FaCheck icon
import { FixTitles, UpdateTitles } from "../services/model";
import { toast } from "react-toastify";
import { InfinitySpin } from "react-loader-spinner";

const ProductsList = ({
  Products,
  TitleCredits,
  User,
  Website,
  onTitlesFixed,
}) => {
  const [Titles, setTitles] = useState([]);
  const [status, setStatus] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  const {
    site_url,
    UserId,
    consumer_key: ck,
    consumer_secret: cs,
    WebsiteId,
  } = Website;
  // console.log(User);

  useEffect(() => {
    let titles = Products.map((p) => ({
      id: p.id,
      current: p.name,
      fixed: false,
      included: false,
    }));
    // console.log(titles);
    setTitles(titles);
  }, [Products]);

  const handleTitleFixing = async () => {
    try {
      setIsLoading(true);
      let titles = Titles.filter((t) => t.included);
      //   return console.log(titles);
      const user_email = !User ? "" : User.user_email;
      const user_id = !User ? "guest" : User.UserId;
      const postData = {
        site_id: WebsiteId,
        user_id,
        titles,
        user_prompt: "",
        user_email,
      };
      const { data } = await FixTitles(postData);
      const { fixed_titles, token_usage, title_credits } = data;
      titles = titles.map((t, i) => ({
        ...t,
        fixed: true,
        new: fixed_titles[i],
      }));

      // console.log(titles);

      setTitles(titles);
      setStatus("fixed");

      // uplifting state to app.js
      onTitlesFixed(titles, token_usage, title_credits);
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
      const postData = { site_url, ck, cs, titles };
      //   return console.log(postData);
      const { data } = await UpdateTitles(postData);
      console.log(data.update);
      setIsLoading(false);
      toast.success(`${titles.length} titles are updated to site`);
      setStatus("updated");

      titles = data.update.map((p) => ({
        id: p.id,
        current: p.name,
        fixed: true,
        included: true,
        permalink: p.permalink,
      }));
      setTitles(titles);
      //   console.log(titles);
    } catch (error) {
      toast.error("Error while creating, please click again");
    }
  };

  const toggleTitleFixable = (title) => {
    if (getIncludedTitles() >= TitleCredits && !title.included) {
      return toast.error(`Max titles credits limit is ${TitleCredits}`);
    }

    const updatedTitles = Titles.map((t) =>
      t.id === title.id ? { ...t, included: !t.included } : t
    );
    setTitles(updatedTitles);
  };

  const handleCancelFix = () => {
    let titles = Products.map((p) => ({
      id: p.id,
      current: p.name,
      fixed: false,
      included: false,
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
      <p style={{ color: "green" }}>
        <strong>{title.id}:</strong> {title.current}
      </p>
    ) : (
      <p>
        <strong>{title.id}:</strong>
        {title.current}
      </p>
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
                      Update <Badge bg="primary">{getIncludedTitles()}</Badge>
                    </Button>
                    {/* <Button
                      variant="link"
                      className="m-1"
                      color="red"
                      onClick={handleCancelFix}
                    >
                      Cancel
                    </Button> */}
                  </>
                )}
              </div>
              <span>{site_url}</span>
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
                      onClick={() => toggleTitleFixable(title)}
                    >
                      <FaCheck color={title.included ? "green" : "gray"} />
                    </Button>
                  )}
                  {title.permalink && (
                    <a target="_blank" href={title.permalink}>
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Card.Footer>
            <p
              style={{ color: "green" }}
            >{`You have ${TitleCredits} credits`}</p>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default ProductsList;
