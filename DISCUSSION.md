# Nick Incardone's Code Submission

Hi, this is my submission. I decided to just put everything in one PR and keep the commits as atomical as I could. I stuck to the 2 hour time limit, so there were some things I did not get to do but below you can find a summary for all the major changes I made. Full disclosure: I use Cursor as my IDE so some of the code was AI assisted, especially some things like testing and tailwind css classes. I believe it allowed me to get more done in the short two hours without sacrificing much if any code quality. Below my changes, you can find a list of things I would add in the future.


# Major Changes and Improvements

## 1. Added TypeScript Types

Added proper TypeScript interfaces for all API requests and responses. This gives us compile-time error checking instead of runtime failures, better autocomplete in the IDE, and makes the code much more maintainable. The types also serve as documentation for what the API expects and returns.

## 2. Implemented API Pagination

Updated the advocates API to support pagination with configurable page size and limits. This is crucial for performance since the original implementation would try to load all advocates at once, which would break with hundreds of thousands of records. The API now returns paginated results with metadata about total count and navigation, making it scalable and production-ready.

## 3. Fixed Basic Frontend Errors and Bad Practices

Cleaned up the React component to follow best practices and fix TypeScript errors. Added proper event typing, replaced direct DOM manipulation with React state, fixed array search logic for specialties, added missing React keys, renamed functions for quicker understanding, and converted nested promises to async/await. These changes linter errors and make the code more maintainable.

## 4. Added Table Pagination and Reusable Component

Implemented frontend pagination controls with page numbers, previous/next buttons, and result counters. Created a generic PaginationTable component that can be reused throughout the application with any data type. This separates concerns by moving table rendering logic out of the main page component and makes the codebase more modular and maintainable.

## 5. Enhanced Search with Debouncing and Error Handling

Added debounced search functionality that waits 300ms after the user stops typing before filtering results, preventing excessive computations on every keystroke. Implemented proper error handling with user-friendly error messages that appear when API calls fail. Also made search case-insensitive and extracted filter logic into reusable functions for better code organization.

## 6. Implemented UI Design with Tailwind CSS

Transformed the basic HTML table into a modern, professional interface using Tailwind CSS. The overall design is now mobile-responsive and follows modern web design principles, making the application visually appealing and user-friendly.

## 7. Added Jest Testing Framework

Integrated Jest testing framework with TypeScript support for comprehensive unit testing. Created test suites for the advocateFilter function that cover all search criteria including name, city, degree, specialties, and years of experience. The tests validate both single advocate filtering and multiple advocate scenarios with various search patterns, ensuring the filter logic works correctly across different use cases and edge conditions.


# Future Improvements

## 1. Add searching capability to api

Currently, search functionality is handled entirely on the client-side using the `advocateFilter` function, which means all advocate data must be loaded into the browser before filtering can occur. This approach won't scale with large datasets and creates unnecessary network overhead. The API should be enhanced to accept search parameters and perform server-side filtering using SQL queries, allowing for more efficient searching across potentially millions of records while maintaining proper pagination. 

## 2. Add global styles and pulling common components out such as buttons

The current implementation has repeated Tailwind CSS classes throughout components, particularly for buttons, form inputs, and spacing. A design system should be created with reusable UI components like `Button`, `Input`, `Card`, and `Badge` that encapsulate consistent styling and behavior. This would reduce code duplication, ensure design consistency across the application, and make it easier to implement design changes globally rather than updating multiple files.

## 3. Improved error handling

The current error handling is basic with generic error messages and no retry mechanisms. A more robust error handling system should include specific error types for different failure scenarios (network errors, validation errors, server errors), loading states to improve user experience, retry logic for transient failures, and more informative error messages that help users understand what went wrong and how to resolve it. Additionally, error boundaries should be implemented to gracefully handle unexpected React component errors.
