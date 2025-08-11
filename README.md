# 301 Redirect Checker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Payload CMS](https://img.shields.io/badge/Payload_CMS-black?style=for-the-badge&logo=payloadcms&logoColor=white)](https://payloadcms.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-black?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-black?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Quickly verify URL redirects with our tool. Upload a CSV file and download results instantly. This application helps you ensure your 301 redirects are working as expected, identifying successes, warnings, and failures.

## Table of Contents

*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [Getting Started](#getting-started)
  *   [Prerequisites](#prerequisites)
  *   [Installation](#installation)
  *   [Running the Application](#running-the-application)
*   [Usage](#usage)
*   [Project Structure](#project-structure)
*   [Code Quality & Formatting](#code-quality--formatting)
*   [Testing](#testing)
*   [Deployment](#deployment)
*   [License](#license)
*   [Contact](#contact)

## Features

*   **CSV Upload**: Easily upload a CSV file containing source and target URL pairs for bulk redirect checking.
*   **Base URL Support**: Specify a base URL to handle relative paths in your CSV.
*   **Detailed Redirect Analysis**: For each URL pair, the tool checks:
  *   The actual redirected URL.
  *   The HTTP status code (e.g., 200, 301, 404).
  *   A clear status (SUCCESS, WARNING, FAILURE) based on the redirect outcome.
  *   A descriptive message explaining the result.
  *   A flag indicating if an update is recommended (e.g., for 404s after redirect).
*   **Persistent Results**: All scan results are saved and accessible via a unique link, allowing you to revisit past reports.
*   **Interactive Results Display**:
  *   Filter results by status (All, Success, Warning, Failure).
  *   Toggle between grid and list views for better readability.
  *   Download results as a CSV file for external analysis.
  *   Copy the direct link to a specific report.
*   **Intuitive User Interface**: Built with `shadcn/ui` and Tailwind CSS for a modern and responsive design.
*   **Dark Mode Support**: Seamlessly switch between light and dark themes.

## Technologies Used

*   **Frontend**:
  *   [Next.js 15](https://nextjs.org/) (React Framework)
  *   [TypeScript](https://www.typescriptlang.org/)
  *   [Tailwind CSS](https://tailwindcss.com/)
  *   [shadcn/ui](https://ui.shadcn.com/) (UI Components)
  *   [Lucide React](https://lucide.dev/) (Icons)
  *   [Sonner](https://sonner.emilkowalski.com/) (Toasts/Notifications)
*   **Backend/CMS**:
  *   [Payload CMS 3.x](https://payloadcms.com/) (Headless CMS)
  *   [Vercel Postgres Adapter](https://payloadcms.com/docs/database/vercel-postgres) (Database)
  *   [Lexical Editor](https://lexical.dev/) (Rich Text Editor for CMS)
  *   [Axios](https://axios-http.com/) (HTTP Client for API calls)
  *   [Sharp](https://sharp.pixelplumbing.com/) (Image Processing)
*   **Development Tools**:
  *   [npm](https://www.npmjs.com/) (Package Manager)
  *   [ESLint](https://eslint.org/) (Code Linting)
  *   [Prettier](https://prettier.io/) (Code Formatting)
  *   [Playwright](https://playwright.dev/) (End-to-End Testing)
  *   [Vitest](https://vitest.dev/) (Unit/Integration Testing)
  *   [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (Containerization)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18.20.2 or >=20.9.0 recommended)
*   npm (latest version recommended)
*   Docker & Docker Compose (optional, but recommended for database setup)
*   A `.env` file with necessary environment variables (see `.env.example`).

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/rushidshinde/redirect-checker.git
    cd 301-redirect-checker
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project based on `.env.example`.
    You'll need to configure your `PAYLOAD_SECRET` and `POSTGRES_URL`.

    ```
    # .env example
    PAYLOAD_SECRET=your_payload_secret_key
    POSTGRES_URL=postgres://user:password@host:port/database
    # Add other necessary environment variables as per your setup
    ```

4.  **Start the database (using Docker Compose - Recommended):**

    ```bash
    docker-compose up -d postgres
    ```
    This will start a PostgreSQL container. Ensure your `POSTGRES_URL` in `.env` matches the Docker Compose configuration.

5.  **Run Payload CMS migrations:**

    ```bash
    npm run payload migrate
    ```

6.  **Seed initial data (optional):**

    ```bash
    npm run payload seed
    ```

### Running the Application

1.  **Start the Next.js development server:**

    ```bash
    npm run dev
    ```

    The application will be accessible at `http://localhost:3000`.

2.  **Access the Payload CMS Admin (optional):**
    The Payload CMS admin panel will typically be available at `http://localhost:3000/admin`. You can create an admin user via the CLI or the first-user registration page.

## Usage

1.  Navigate to the homepage (`http://localhost:3000`).
2.  **Enter Base URL**: Provide the base URL for your website (e.g., `https://www.example.com`). Do not include a trailing slash.
3.  **Upload CSV File**: Click on the file input and select your CSV file.
  *   **CSV Format**: Each row must contain two relative URLs, separated by a comma.
    *   First column: Source URL (e.g., `/old-page`)
    *   Second column: Target URL (e.g., `/new-page`)
  *   **Important**: Do not include domain names or a header row in your CSV.
  *   You can download a template CSV file from the "Upload Instructions" section on the homepage.
4.  **Check Redirects**: Click the "Check Redirects" button. A progress bar will appear as the tool processes your URLs.
5.  **View Results**: Once the check is complete, you will be redirected to a results page displaying a detailed report.
  *   Use the filters to view specific redirect statuses.
  *   Switch between grid and list views.
  *   Download the report as a CSV.
  *   Copy the link to share your report.

## Project Structure

```
.
├── collections/                # Payload CMS collections (Users, Results)
├── components/                 # React components (custom, ui, theme-related)
│   ├── custom/                 # Custom application-specific components
│   ├── ui/                     # Shadcn UI components
│   └── mode-toggle.tsx         # Theme toggle component
├── lib/                        # Utility functions and types
│   ├── results/                # Logic for checking and creating results
│   ├── types.ts                # TypeScript interfaces and enums
│   └── utils.ts                # General utilities (e.g., cn for Tailwind)
├── public/                     # Static assets (icons, template CSV)
├── app/                        # Next.js app directory
│   ├── api/                    # API routes (e.g., /api/checkRedirect)
│   ├── (payload)/              # Payload CMS admin routes and layout
│   ├── result/[title]/         # Dynamic route for displaying results
│   ├── layout.tsx              # Root layout for the frontend
│   ├── page.tsx                # Homepage and results page
│   └── not-found.tsx           # Custom 404 page
├── tests/                      # Playwright E2E and Vitest API tests
│   ├── api.int.spec.ts         # API integration tests
│   └── frontend.e2e.spec.ts    # Frontend end-to-end tests
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore file
├── .prettierrc.json            # Prettier configuration
├── components.json             # Shadcn UI configuration
├── docker-compose.yml          # Docker Compose setup
├── Dockerfile                  # Dockerfile for the application
├── eslint.config.mjs           # ESLint configuration
├── next.config.mjs             # Next.js configuration
├── package.json                # Project dependencies and scripts
├── payload.config.ts           # Payload CMS configuration
├── payload-types.ts            # Auto-generated Payload CMS types
└── README.md                   # This file
```

## Code Quality & Formatting

This project adheres to strict code quality and formatting standards:

*   **ESLint**: Configured for linting JavaScript and TypeScript code, ensuring best practices and catching potential errors.
*   **Prettier**: Automatically formats code on save, maintaining consistent style across the entire codebase.
*   **TypeScript**: Used throughout the project for type safety and improved developer experience.

## Testing

The project includes comprehensive testing to ensure reliability:

*   **End-to-End Tests (Playwright)**: Located in `tests/frontend.e2e.spec.ts`, these tests simulate user interactions to verify the frontend functionality.
*   **API Integration Tests (Vitest)**: Located in `tests/api.int.spec.ts`, these tests verify the backend API endpoints and their interactions with the database.

To run tests:

```bash
npm test
npm run playwright test
```

## Deployment

The project is designed for containerized deployment using Docker. A `Dockerfile` and `docker-compose.yml` are provided for easy setup in production environments.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE.md) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out:

*   **GitHub**: [https://github.com/rushidshinde](https://github.com/rushidshinde)

---
