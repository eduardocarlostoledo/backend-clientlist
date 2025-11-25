# Subscription Email List Application

This project is a subscription email list application built with Node.js, Express, and PostgreSQL. It allows users to subscribe to an email list and sends them offers via email.

## Project Structure

```
subscription-email-app
├── src
│   ├── server.js               # Entry point of the application
│   ├── config
│   │   └── database.js         # Database configuration settings
│   ├── db
│   │   └── connection.js       # PostgreSQL connection script
│   ├── routes
│   │   └── subscribe.js        # Route for subscription endpoint
│   ├── controllers
│   │   └── subscriptionController.js # Subscription logic
│   ├── models
│   │   └── Subscription.js      # Subscription model/schema
│   ├── services
│   │   └── emailService.js      # Email sending service using Nodemailer
│   └── templates
│       └── emailTemplate.html   # HTML email template
├── package.json                 # npm configuration file
└── README.md                    # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd subscription-email-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up your PostgreSQL database and update the `src/config/database.js` file with your database connection details.

## Usage

1. Start the server:
   ```
   npm start
   ```

2. Use the `/api/subscribe` endpoint to subscribe to the email list by sending a POST request with the email address in the request body.

3. The application will send a confirmation email to the subscribed email address using the HTML template defined in `src/templates/emailTemplate.html`.

## Sending Emails to Subscribers

The application includes functionality to send emails to all subscribers every 3 seconds using the specified HTML template. This can be triggered by implementing the appropriate logic in the subscription controller.

## License

This project is licensed under the MIT License.