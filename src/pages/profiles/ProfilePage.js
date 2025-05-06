import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InfiniteScroll from "react-infinite-scroll-component";
import StoryhubsFeedback from "../storyhubs_feedbacks/StoryhubsFeedback";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileStoryhubsFeedbacks, setProfileStoryhubsFeedbacks] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileStoryhubsFeedbacks }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/storyhubs_feedbacks/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileStoryhubsFeedbacks(profileStoryhubsFeedbacks);
        setHasLoaded(true);
      } catch (err) {
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.storyhubs_feedbacks_count}</div>
              <div>Feedbacks</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Black}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={12}>
  {profile?.city_of_origin && profile?.languages_spoken && profile?.story_title && profile?.proudest_moment && profile?.about_me ? (
    <p>
      Hi All! I am {profile.name} and am from {profile.city_of_origin}.<br />
      I speak {profile.languages_spoken}. My story is titled "{profile.story_title}".<br />
      One of my proudest moments was {profile.proudest_moment}.<br />
      
    </p>
  ) : null}
</Col>

      </Row>
    </>
  );

  const mainProfileStoryhubsFeedbacks = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s feedbacks</p>
      <hr />
      {profileStoryhubsFeedbacks.results.length ? (
        <InfiniteScroll
          children={profileStoryhubsFeedbacks.results.map((storyhubs_feedback) => (
            <StoryhubsFeedback key={storyhubs_feedback.id} {...storyhubs_feedback} setStoryhubsFeedbacks={setProfileStoryhubsFeedbacks} />
          ))}
          dataLength={profileStoryhubsFeedbacks.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileStoryhubsFeedbacks.next}
          next={() => fetchMoreData(profileStoryhubsFeedbacks, setProfileStoryhubsFeedbacks)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} has no feedback yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={12}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileStoryhubsFeedbacks}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;