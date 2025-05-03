import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import StoryhubsFeedback from "./StoryhubsFeedback";

function StoryhubsFeedbackPage() {
  const { id } = useParams();
  const [storyhubs_feedback, setStoryhubsFeedback] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: storyhubs_feedback }] = await Promise.all([
          axiosReq.get(`/storyhubs_feedbacks/${id}`),
        ]);
        setStoryhubsFeedback({ results: [storyhubs_feedback] });
      } catch (err) {
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={12}>
        <StoryhubsFeedback {...storyhubs_feedback.results[0]} setStoryhubsFeedbacks={setStoryhubsFeedback} storyhubsFeedbackPage />
      </Col>

    </Row>
  );
}

export default StoryhubsFeedbackPage;