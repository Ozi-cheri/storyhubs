import React from "react";
import styles from "../../styles/StoryhubsFeedback.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const StoryhubsFeedback = (props) => {
  const {
    id,
    owner,
    profile_id,
    likes_count,
    like_id,
    story_title,
    story_creator,
    category,
    your_feedback,
    image,
    updated_at,
    storyhubsFeedbackPage,
    setStoryhubsFeedbacks,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const handleEdit = () => {
    history.push(`/storyhubs_feedbacks/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/storyhubs_feedbacks/${id}/`);

      history.goBack();
    } catch (err) {}
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });

      setStoryhubsFeedbacks((prevStoryhubsFeedbacks) => ({
        ...prevStoryhubsFeedbacks,

        results: prevStoryhubsFeedbacks.results.map((storyhubs_feedback) => {
          return storyhubs_feedback.id === id
            ? {
                ...storyhubs_feedback,
                likes_count: storyhubs_feedback.likes_count + 1,
                like_id: data.id,
              }
            : storyhubs_feedback;
        }),
      }));
    } catch (err) {}
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);

      setStoryhubsFeedbacks((prevStoryhubsFeedbacks) => ({
        ...prevStoryhubsFeedbacks,

        results: prevStoryhubsFeedbacks.results.map((storyhubs_feedback) => {
          return storyhubs_feedback.id === id
            ? {
                ...storyhubs_feedback,
                likes_count: storyhubs_feedback.likes_count - 1,
                like_id: null,
              }
            : storyhubs_feedback;
        }),
      }));
    } catch (err) {}
  };

  return (
    <Card className={styles.StoryhubsFeedback}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <i class="fa-solid fa-user"></i>

            {owner}
          </Link>

          <div className="d-flex align-items-center">
            <span>{updated_at}</span>

            {is_owner && storyhubsFeedbackPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>

      <Link to={`/storyhubs_feedbacks/${id}`}>
        <Card.Img src={image} alt={story_title} />
      </Link>

      <Card.Body>
        {story_title && (
          <Card.Title className="text-center">{story_title}</Card.Title>
        )}

        {story_creator && (
          <Card.Title className="text-center">{story_creator}</Card.Title>
        )}

        {category && <Card.Text>{story_creator}</Card.Text>}

        {your_feedback && <Card.Text>{your_feedback}</Card.Text>}

        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>You won't be able to like your own Feedback!</Tooltip>
              }
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Please Log in to like Feedbacks!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}

          {likes_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoryhubsFeedback;
