# Redirect Checker Tool

## Description

The Redirect Checker Tool is a web application built with Next.js that allows users to easily verify URL redirects. Users can upload a CSV file containing source and target URLs, and the tool will check if the redirects are working correctly.

## Features

- Upload CSV files with source and target URLs
- Check redirects for multiple URLs simultaneously
- Display results with color-coded success/failure indicators
- Download results as a CSV file
- Progress bar to show checking status
- Responsive design for various screen sizes

## Technologies Used

- Next.js 13+ (App Router)
- React
- TypeScript
- Tailwind CSS
- Axios for API requests

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rushidshinde/redirect-checker.git

2. Navigate to the project directory:
   
   ```bash
   cd redirect-checker-tool

3. Install dependencies:

or

4. Run the development server:

or


5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Enter the base URL for your redirects (e.g., https://yourdomain.com).
2. Upload a CSV file containing source and target URLs.
3. Click the "Check Redirects" button to start the process.
4. View the results displayed on the page.
5. Download the results as a CSV file if needed.

## CSV File Format

The CSV file should have two columns:
1. Source URL (the URL to check)
2. Target URL (the expected final URL)

Example:

   ```csv
   /source-url,/target-url 
   /old-page,/new-page 
   /oldsite,/newsite
   ```
## API Routes

The project includes an API route for checking redirects:

- `/api/checkRedirect`: Accepts a URL parameter and returns the redirected URL.

## Components

- `RedirectChecker`: Main component handling the redirect checking logic
- `FileUpload`: Handles CSV file upload
- `ResultDisplay`: Displays the results of redirect checks
- `UploadInstructions`: Provides instructions for CSV file format
- `ProgressBar`: Shows the progress of redirect checking

## Customization

You can customize the appearance of the application by modifying the Tailwind CSS classes in the component files or by updating the `tailwind.config.ts` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please contact [Rushi](mailto:rushidshinde@gmail.com).
