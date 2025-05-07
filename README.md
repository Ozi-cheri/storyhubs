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


### Profile Form

Once signup or logged in, users have access to a profile form where they can upload or update Profile pictures
 or personal descriptions.


### New Feedback

There are buttons for New Feedback where users can write feedbacks about their stories and upload their image.


### Edit & Delete Options (3-Dots Menu)
Each post or feedback includes a three-dots icon (`⋯`) giving access to:

- Edit: Opens the form pre-filled with the original content for quick updates.
- Delete: Prompts a confirmation before removing the content.

These buttons are only visible to the content owner of the page 


### Follow/Unfollow System

- Users can **follow** or **unfollow** others by visiting their profiles.

- Follower/following counts are dynamically displayed.
  



## Feature Improvements 

* Users will be able to comment on feedbacks and engage in discussion

* Allow filtering feedbacks by location, category, or language

* Notify users when someone follows or interacts with their stories

* Award badges based on activity or story themes

