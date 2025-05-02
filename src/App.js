import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import StoryhubsFeedbackCreateForm from "./pages/storyhubs_feedbacks/StoryhubsFeedbackCreateForm";
import StoryhubsFeedbackPage from "./pages/storyhubs_feedbacks/StoryhubsFeedbackPage";
import StoryhubsFeedbacksPage from "./pages/storyhubs_feedbacks/StoryhubsFeedbacksPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import StoryhubsFeedbackEditForm from "./pages/storyhubs_feedbacks/StoryhubsFeedbackEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <StoryhubsFeedbacksPage message="No results found..." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <StoryhubsFeedbacksPage
                message="No results found. Follow someone!"
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/likes"
            render={() => (
              <StoryhubsFeedbacksPage
                message="No results found. Like a review!"
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/login" render={() => <SignInForm />} />
          <Route exact path="/register" render={() => <SignUpForm />} />
          <Route exact path="/storyhubs_feedbacks/create" render={() => <StoryhubsFeedbackCreateForm />} />
          <Route exact path="/storyhubs_feedbacks/:id" render={() => <StoryhubsFeedbackPage />} />
          <Route exact path="/storyhubs_feedbacks/:id/edit" render={() => <StoryhubsFeedbackEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;