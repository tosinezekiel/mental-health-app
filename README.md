# Project Description

This project is a Mental Awareness Evaluation System designed to assess and monitor mental health status. Built with Next.js, this application leverages NextAuth for authentication, NextUI and TailwindCSS for the UI, Prisma as the ORM, and MySQL for data persistence.

## Features

- **User Authentication:** Secure login and registration using NextAuth.
- **Interactive Assessments:** Users can complete interactive mental health evaluations.
- **Results Tracking:** Users can view their past assessment results.
- **Admin Dashboard:** Admins can manage questions and view aggregated user data.

## Technologies

- **[Next.js](https://nextjs.org/)** - The React framework for production.
- **[NextAuth.js](https://next-auth.js.org/)** - Authentication for Next.js.
- **[NextUI](https://nextui.org/)** - Beautiful, modern, and fast React UI library.
- **[TailwindCSS](https://tailwindcss.com/)** - A utility-first CSS framework.
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM for Node.js and TypeScript.
- **[MySQL](https://www.mysql.com/)** - The world's most popular open source database.
- [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- MySQL

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/tosinezekiel/mental-health-app
cd mental-awareness-eval-system
npm install
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXTAUTH_URL="http://localhost:3000"
npx prisma db push
npm run prisma:seed 
```

