# Mental Health Platform

This is a web application designed to provide mental health support and resources. It allows users to connect with professionals, track their mood, and access various tools to help manage their mental well-being.

## Features

*   **User Authentication:** Secure sign-up and login functionality.
*   **Admin Dashboard:** Admins can manage users and professionals.
*   **Professional Profiles:** View detailed profiles of mental health professionals.
*   **Mood Tracker:** A tool for users to track their daily mood.
*   **Chat Functionality:** Real-time chat with professionals.
*   **Emergency Support:** Quick access to emergency contact information.
*   **Assessments:** Users can take mental health assessments.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm (or pnpm/yarn)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/mental-health-platform.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Start the development server
    ```sh
    npm run dev
    ```

## Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in the development mode.
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the code.

## Key Dependencies

*   **Next.js:** React framework for production.
*   **React:** A JavaScript library for building user interfaces.
*   **Tailwind CSS:** A utility-first CSS framework.
*   **Firebase:** Used for backend services like authentication and database.
*   **Shadcn/ui:** A collection of re-usable components.

## Project Structure

```
.
├── app
│   ├── api
│   ├── admin
│   ├── assessment
│   ├── auth
│   ├── chat
│   ├── emergency
│   ├── professionals
│   └── profile
├── components
│   └── ui
├── hooks
├── lib
├── public
└── types
```
