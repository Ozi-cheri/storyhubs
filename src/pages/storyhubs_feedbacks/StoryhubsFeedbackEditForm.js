import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import styles from "../../styles/StoryhubsFeedbackCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function StoryhubsFeedbackEditForm() {
  const [errors, setErrors] = useState({});

  const [storyhubsFeedbackData, setStoryhubsFeedbackData] = useState({
    story_title: "",
    story_creator: "",
    category: "",
    your_feedback: "",
    image: "",
  });
  const { story_title, story_creator, category, your_feedback, image } = storyhubsFeedbackData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/storyhubs_feedbacks/${id}/`);
        const { story_title, story_creator, category, your_feedback, image, is_owner } = data;

        is_owner ? setStoryhubsFeedbackData({ story_title, story_creator, category, your_feedback, image }) : history.push("/");
      } catch (err) {
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setBookReviewData({
      ...storyhubsFeedbackData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setStoryhubsFeedbackData({
        ...storyhubsFeedbackData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("story_title", story_title);
    formData.append("story_creator", story_creator);
    formData.append("category", category);
    formData.append("your_feedback", your_feedback);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/storyhubs_feedbacks/${id}/`, formData);
      history.push(`/storyhubs_feedbacks/${id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Story Title</Form.Label>
        <Form.Control
          type="text"
          name="story_title"
          value={story_title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.story_title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))} 

      <Form.Group>
        <Form.Label>story_creator</Form.Label>
        <Form.Control
          type="text"
          name="story_creator"
          value={story_creator}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.story_creator?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={category}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Your Feedback</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="your_feedback"
          value={your_feedback}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.your_feedback?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={12} lg={12}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={12} lg={12} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default StoryhubsFeedbackEditForm;