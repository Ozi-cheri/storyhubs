#  Storyhubs Frontend

Welcome to the frontend of **Storyhubs** – a user-generated storytelling platform that allows individuals to share life experiences, travel stories, and inspirational moments from around the world.

This is the **React.application** frontend that communicates with the **Django Rest Framework** backend. It supports image uploads via **Cloudinary**, displays user feedback stories, and includes a responsive layout.


##  Live Site

The live site can be found [here](https://storyhubs-7a570d7437c8.herokuapp.com/).





## Project Overview

Storyhubs allows users to:

- Sign up, log in, and manage their profiles.
- Creates stories.
- Follow and Like feedbacks.
- Upload stories with images, categorized by theme (e.g. travel, culture, personal growth).
- View stories shared by others on the home page.
- Interact with a clean, mobile-friendly UI.

## Agile methodology


* This project follows Agile development principles, focusing on iterative development and regular feedback.  The project was managed using GitHub Projects, where user stories were created and tracked as issues.

### Tools Used For Agile development

GitHub Projects for tracking sprints and issues

GitHub Issues for writing user stories with clear acceptance criteria

Commits linked to issues for traceability and progress updates

- The project board can be found [here] (https://github.com/users/ozi-cheri/projects/9)



## Existing Features


#### Navigation

This contains links to Home,Signup, Log in, 


- The homepage displays users uploads

- Log In
Users can login here if they already have an account.

- Signup
New users are expected to sign up before they could access the site.


### Profile Page

Once signup or logged in, users have access to a profile form where they can upload or update Profile pictures
 or personal descriptions.


### New Feedback

There are buttons for New Feedback where users can write feedbacks about their stories and upload their image.


### Edit & Delete Options (3-Dots Menu)
Each post or feedback includes a three-dots icon (`⋯`) giving access to:

- Edit: Opens the form pre-filled with the original content for quick updates.
- Delete: Prompts a confirmation before removing the content.

These buttons are only visible to the content owner of the page 


### Follow/Unfollow Page

- Users can **follow** or **unfollow** others by visiting their profiles.

- Follower/following counts are dynamically displayed and you can unfollow a user by clicking the button again and vice versa.
  



## Feature Improvements 

* Users will be able to comment on feedbacks and engage in discussion

* Allow filtering feedbacks by location, category, or language

* Notify users when someone follows or interacts with their stories

* Award badges based on activity or story themes


## Languages
- HTML
- CSS
- Bootstrap
- React

## Libraries used
- React is a JavaScript library used to build the user interface. 
- React-Bootstrap was used to provide pre-built, responsive components.
- Axios handled API requests between the React frontend and the Django REST API, allowing the Front-end to communicate with the Back-end.
- React Router Dom was used for managing routing and navigation between different pages within the React frontend.

## Technologies used
- [GitHub](https://github.com/) was used to host the repository and as version control.

- [Heroku](https://www.heroku.com/) was used to deploy the frontend of the project.

- [Leonardo Ai](https://app.leonardo.ai/) created all the profile photos.
- [ChatGPT](https://chatgpt.com/) created the book titles, author names and book reviews.
- [Wirefames](https://tabletomarkdown.com/convert-spreadsheet-to-markdown/) created the table in my TESTING.md file.
- 
- [FontAwesome](https://fontawesome.com/) was used to choose icons for the NavBar.




## User stories


* As a first time user, i want to create an account in order to access the site and start posting my own stories.

* As a user, I want to view a list of stories on the homepage so I can browse what others have shared.


* As a user, I have my profile page where I can display information about myself.


* As a logged in user, i can easily visit the site using log-in button displayed at the navigation bar.


* As a user, I can create my own stories feedback about my life experience to share my views with the platform.


* As a user logged in user, I can view others feedback.
- As a user, i can edit my profile or my stories and even delete as well so I can manage what I share.

* As a user, i can follow and like my favourite profile so i can motivate them especially if they have interesting stories.
* As a user, I want to be able to post a new story so I can share my experience.

* As a user, I want the site to be fully responsive so I can use it on any device.

* As a user, I want to view error messages clearly when something goes wrong.



### Wireframes 




### User experience






### Colour scheme



### Typography


### Testing

Please see separate [TESTING.md](TESTING.md) file for all testing.


### ### Deployment
1. Log in Or Sign up to your Heroku account.
2. Click New to Create new app.
3. Choose an app name and choose the closest region and click on create app.
4. Go to the Heroku app Dashboard.
5. Click the 'Deploy' tab.
6. In the Deployment method section, click Connect to GitHub.
7. Search for the repo you want to connect and click Connect.
8. Select  manual deploy section and wait for few minutes for your app to go through the process of deployment.
9. Your app is deployed. You can find it in *** Open app ***.


