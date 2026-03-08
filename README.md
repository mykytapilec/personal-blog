# Personal Blog – Node.js + Express

This project is a simple **personal blog application** built with **Node.js, Express, MongoDB, and EJS**.
It allows visitors to read blog posts and provides an admin panel for managing articles.

The project was implemented as part of the roadmap.sh backend projects.

Project specification:
https://roadmap.sh/projects/personal-blog

---

# Features

## Guest Section

* View list of blog articles
* Read full article content
* Pagination on the homepage

## Admin Section

* Admin login
* Admin dashboard
* Create new articles
* Edit existing articles
* Delete articles
* Logout functionality

## Article Fields

Each article contains:

* Title
* Excerpt (short preview)
* Content
* Publication date

---

# Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* EJS templates
* Express Session

---

# Project Structure

```
project
│
├── models
│   └── Article.ts
│
├── routes
│   ├── guestRoutes.ts
│   └── adminRoutes.ts
│
├── middleware
│   └── auth.ts
│
├── views
│   ├── index.ejs
│   ├── article.ejs
│   │
│   └── admin
│       ├── login.ejs
│       ├── dashboard.ejs
│       ├── add.ejs
│       └── edit.ejs
│
├── app.ts
├── package.json
└── README.md
```

---

# Installation

Clone the repository:

```
git clone https://github.com/mykytapilec/personal-blog.git
cd personal-blog
```

Install dependencies:

```
npm install
```

---

# Environment Setup

Create a `.env` file in the root directory:

```
MONGO_URI=mongodb://localhost:27017/blog
SESSION_SECRET=your_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password
```

Make sure **MongoDB is running locally**.

---

# Run the Project

Start the server:

```
npm start
```

or with nodemon:

```
npm run dev
```

The app will run at:

```
http://localhost:3000
```

---

# Admin Access

Login page:

```
http://localhost:3000/admin/login
```

Use the credentials defined in your `.env` file.

After login you can:

* create articles
* edit articles
* delete articles
* logout

---

# Future Improvements

Possible improvements for the project:

* Article slug URLs
* Markdown support
* Article search
* Tags and categories
* API version of the blog

---

# License

This project is for learning purposes and part of the roadmap.sh backend learning path.
