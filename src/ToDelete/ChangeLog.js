/**
 * Change for Project
 * 
 * 1. **App Component (`App.js`)**
 *    - **Lines 1-2**: Added `GoToTop` component for scrolling to the top of the page.
 *    - **Lines 8-9**: Replaced `YouTubePlayer` with `ModalPlayer` for showing trailers in a modal.
 *    - **Lines 25-27**: Added `lastMovieElementRef` to handle infinite scrolling.
 * 
 * 2. **API Constants (`constants.js`)**
 *    - **Lines 2-3**: Updated API key and endpoints.
 * 
 * 3. **Movie Component (`Movie.js`)**
 *    - **Line 4**: Added `lastMovieElementRef` prop.
 *    - **Line 14**: Used `lastMovieElementRef` for observing the last movie element in infinite scrolling.
 * 
 * 4. **Movies Component (`Movies.js`)**
 *    - **Line 2**: Added `lastMovieElementRef` prop.
 *    - **Lines 7-13**: Adjusted movie mapping to include `lastMovieElementRef` for infinite scrolling.
 * 
 * 5. **Movies Slice (`moviesSlice.js`)**
 *    - **Line 4**: Updated `fetchMovies` thunk to include pagination (`page` parameter).
 *    - **Lines 11-12**: Modified `initialState` to track `page` and `hasMore`.
 *    - **Lines 16-22**: Adjusted `extraReducers` to handle pagination and append new movies.
 * 
 * 6. **New Component: GoToTop (`GoToTop.jsx`)**
 *    - Created a new component to handle scrolling to the top of the page.
 * 
 * 7. **New SCSS File: GoToTop (`GoToTop.scss`)**
 *    - Added styles for the `GoToTop` component.
 * 
 * 8. **New Component: ModalPlayer (`ModalPlayer.jsx`)**
 *    - Created a new component to display video trailers in a modal.
 * 
 * 9. **New SCSS File: ModalPlayer (`ModalPlayer.scss`)**
 *    - Added styles for the `ModalPlayer` component.
 */