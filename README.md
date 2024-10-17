# [QueryQuotient](https://survey-web-app-04.web.app/) a digital survey web application 

**QueryQuotient** is a full-featured Survey Application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides users with an intuitive platform for creating, voting, and analyzing surveys. This app includes payment functionalities, user role management, and an admin dashboard for robust survey and user interaction control.

## Live Website
[Click Here to Visit Website](https://survey-web-app-04.web.app/)

## Backend Repository
[QueryQuotient Backend Code](https://github.com/dear-mahmud-bd/survey-web-server)

## Key Features

- **Authentication System**
  - Users can sign up using email/password or Google authentication.
  - JWT-based authentication with token storage in localStorage for session management.

- **Responsive Design**
  - Fully responsive, with optimal viewing on mobile, tablet, and desktop.

- **Survey Creation and Management**
  - Users can create surveys with questions that allow for "Yes" or "No" responses.
  - Surveys have fields like title, description, category, and deadlines.
  - Users can view all surveys, vote, and analyze results with real-time updates.

- **Role Management**
  - Roles include user, surveyor, admin, and pro-user.
  - Admins can manage users and assign roles.
  - Pro-users have special privileges like commenting on surveys.

- **Survey Results Visualization**
  - View survey results using visual charts (bar charts, pie charts) for better insights.
  - Toggle between table and chart views of survey responses.

- **Feedback System**
  - Admins can leave feedback on unpublished surveys, viewable by surveyors.

- **Payment Integration**
  - Pro-user membership is available through an integrated payment system.
  - Pro-users gain access to advanced features such as commenting and priority support.

- **Private Routes**
  - Protect routes to restrict access based on roles.
  - Users maintain their login sessions without being redirected after reloads.

- **Search and Filters**
  - Surveys can be filtered by categories and sorted by total votes.
  - Search functionality for surveys by title.

- **Dynamic Page Titles**
  - React Helmet is used to dynamically change page titles based on the current route.

- **Alerts and Notifications**
  - Uses SweetAlert for user feedback (CRUD operations, successful login, etc.).

## Pages

- **Homepage**
  - Hero section with banner and an explore button.
  - Featured surveys and recently created surveys.
  - "How It Works" section explaining the survey process.
  - FAQ section to answer common questions about the platform.

- **Survey Page**
  - Lists all surveys with title, description, total votes, and category filters.
  - Allows logged-in users to vote, and pro-users to comment on surveys.
  - Displays survey results after the survey ends or once a user votes.

- **Surveyor Dashboard**
  - Survey creation and management dashboard.
  - Allows surveyors to create, update, and manage their surveys.
  - Displays survey responses in both table and chart formats.

- **Admin Dashboard**
  - Manage user roles and permissions.
  - View all surveys, payments, and feedback from unpublished surveys.

- **User Dashboard**
  - Users can view and participate in surveys they have booked or reported.

## Technologies Used

- **Frontend**: React, Tailwind CSS, React Query, SweetAlert, React Helmet
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT for private route handling
- **Payment Gateway**: Stripe (for pro-user membership subscriptions)
- **Deployment**: Firebase (client-side), Vercel (server-side)

## Assignment_ID: assignment12_category_0020

Admin Email:
``` 
hira@gmail.com
```
Admin Password:
``` 
!234asdZ
```
 