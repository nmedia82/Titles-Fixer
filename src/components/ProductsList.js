import React, { useState, useEffect } from "react";
import { Card, ListGroup, Button, Badge } from "react-bootstrap";
import { FaCheck } from "react-icons/fa"; // Import the FaCheck icon
import { FixTitles } from "../services/model";
import { toast } from "react-toastify";

const ProductsList = ({ Products, SiteURL, onTitlesFixed }) => {
  const [Titles, setTitles] = useState([]);

  useEffect(() => {
    let titles = Products.map((p) => ({
      id: p.id,
      current: p.name,
      fixed: true,
      new: p.name,
      included: true,
    }));
    console.log(titles);
    setTitles(titles);
  }, [Products]);

  const handleTitleFixing = async () => {
    try {
      let titles = [...Titles];
      const postData = { titles, user_prompt: "" };
      const { data } = await FixTitles(postData);
      const { fixed_titles, token_usage } = data;
      titles = Titles.map((t, i) => ({
        ...t,
        fixed: true,
        new: fixed_titles[i],
        included: true,
      }));
      setTitles(titles);

      // uplifting state to app.js
      onTitlesFixed(titles, token_usage);

      console.log(titles);
    } catch (error) {
      toast.error("Error while creating, please click again");
    }
  };

  const toggleTitleIncluded = (id) => {
    const updatedTitles = Titles.map((title) =>
      title.id === id ? { ...title, included: !title.included } : title
    );
    setTitles(updatedTitles);
  };

  const getFontSize = (title) => {
    return title.fixed ? "0.9rem" : "1rem";
  };

  const displayNewTitle = (title) => {
    return title.included ? <strong>{title.new}</strong> : <s>{title.new}</s>;
  };

  const getIncludedTitles = () => {
    return Titles.filter((t) => t.included).length;
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Button
              onClick={handleTitleFixing}
              variant="primary"
              className="float-right"
            >
              Fix Titles <Badge bg="secondary">{Titles.length}</Badge>
            </Button>
            <Button
              variant="success"
              className="m-1"
              disabled={getIncludedTitles() === 0}
            >
              Update Titles <Badge bg="primary">{getIncludedTitles()}</Badge>
            </Button>
          </div>
          <span>{SiteURL}</span>
        </div>
      </Card.Header>
      <ListGroup variant="flush">
        {Titles.map((title) => (
          <ListGroup.Item key={title.id}>
            <div className="d-flex justify-content-between align-items-center">
              <div id="titles-container">
                {title.fixed && (
                  <p className="lead">{displayNewTitle(title)}</p>
                )}
                <div
                  className="current-title"
                  style={{ fontSize: getFontSize(title) }}
                >
                  <strong>{title.id}:</strong> {title.current}
                </div>
              </div>
              {title.fixed && (
                <Button
                  variant="link"
                  onClick={() => toggleTitleIncluded(title.id)} // Handle click to toggle title.included
                >
                  <FaCheck color={title.included ? "green" : "gray"} />{" "}
                  {/* Display FaCheck icon with color based on title.included */}
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
  );
};

export default ProductsList;
