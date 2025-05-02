import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import StoryhubsFeedback from "./StoryhubsFeedback";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";

function StoryhubsFeedbacksPage({ message, filter = "" }) {
  const [storyhubs_feedbacks, setStoryhubsFeedbacks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchStoryhubsFeedbacks = async () => {
      try {
        const { data } = await axiosReq.get(`/storyhubs_feedbacks/?${filter}`);
        setStoryhubsFeedbacks(data);
        setHasLoaded(true);
      } catch (err) {
      }
    };

    setHasLoaded(false);
    fetchStoryhubsFeedbacks();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={12}>
        {hasLoaded ? (
          <>
            {storyhubs_feedbacks.results.length ? (
              storyhubs_feedbacks.results.map((book_review) => (
                <StoryhubsFeedback key={storyhubs_feedback.id} {...storyhubs_feedback} setStoryhubsFeedbacks={setStoryhubsFeedbacks} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default StoryhubsFeedbacksPage;