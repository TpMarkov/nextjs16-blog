
# NextPro Blog - Modern Real-time Blogging Platform

A high-performance real-time blogging platform built with Next.js 16 and Convex, featuring a premium writing experience and seamless user interactions.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)
![Convex](https://img.shields.io/badge/Convex-1.30.0-EE4337?style=flat-square&logo=convex&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better%20Auth-1.3.27-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20v4-38B2AC?style=flat-square&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-7.1.0-2D3748?style=flat-square&logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)

## 1. Project Overview
**NextPro Blog** is a cutting-edge blogging platform designed to share ideas with the world. It is built for content creators who value a beautiful, distraction-free writing environment, and for readers who want to engage in real-time.

This site serves as a portfolio piece demonstrating modern web development capabilities, including real-time database interactions, responsive design, and secure authentication.

## 2. Audience & Benefits
**Who is this for?**
-   **Writers & Bloggers**: A clean interface to create and publish rich content.
-   **Developers**: A reference implementation for Next.js 16, Convex, and modern UI patterns.
-   **Community Managers**: A platform that fosters engagement through real-time presence and commenting.

**Key Benefits:**
-   **Real-time Interaction**: See who is reading along with you (Live Presence).
-   **Engagement**: Rich commenting system to foster community discussions.
-   **Performance**: Blazing fast load times and seamless page transitions.
-   **Visual Appeal**: A "premium feel" UI with dark mode support and smooth animations.

## 3. Tech Stack
This project leverages the latest web technologies for maximum performance and developer experience:

-   **Framework**: [Next.js 16.0.7](https://nextjs.org/) (React 19.2.0)
-   **Backend & Database**: [Convex 1.30.0](https://convex.dev/) (Real-time database & backend functions)
-   **Authentication**: [Better Auth 1.3.27](https://better-auth.com/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
-   **Forms**: React Hook Form + Zod
-   **ORM**: [Prisma 7.1.0](https://www.prisma.io/) (with PostgreSQL adapter)

## 4. Live Demo
Check out the live application here:
👉 **[https://nextpro-blog.vercel.app/](https://nextpro-blog.vercel.app/)**

## 5. Project Gallery
*To add your own images, replace the URLs below with screenshots of your application found in your `public` folder or hosted externally.*

| Home Page | Post Editor |
| :---: | :---: |
| ![Home Page](https://i.ibb.co/TB4QkG69/Home.png) | ![Post Editor](https://i.ibb.co/4whwLFY9/post-editor.png) |
| *Modern Landing Page* | *Rich Text Editing* |

| Blog Post | Comments Section |
| :---: | :---: |
| ![Blog Post](https://i.ibb.co/bjZ8hWcy/blog-page.png) | ![Comments](https://i.ibb.co/vvhNQXTV/post-comments.png) |
| *Clean Reading Experience* | *Real-time Discussion* |

## 6. Getting Started (For Developers)

Follow these instructions to set up the project locally.

### Prerequisites
-   Node.js (v18 or higher)
-   npm or pnpm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/nextjs16-blog.git
    cd nextjs16-blog
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add your keys (Convex, Better Auth, Database URL).
    ```bash
    mv .env.example .env.local
    ```

4.  **Start Convex**
    Run the Convex development server to sync your schema and functions.
    ```bash
    npx convex dev
    ```

5.  **Run the application**
    In a new terminal window, start the Next.js dev server:
    ```bash
    npm run dev
    # or
    pnpm dev
    ```

6.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
