# Movie List Application 🎥

An interactive React application for searching, filtering, and viewing detailed information about movies.

---


![image](https://github.com/user-attachments/assets/3db0873b-06ea-4d94-b137-0610ac4c463f)

![image](https://github.com/user-attachments/assets/ebc9b490-898c-4755-bbdb-f393f27ede85)



## Table of Contents 📚

- [Features](#features-)
- [Technologies](#technologies-)
- [Setup](#setup-)
- [Usage](#usage-)
- [Project Structure](#project-structure-)
- [Components](#components-)
- [Examples](#examples-)
- [Contributing](#contributing-)
- [License](#license-)

---

## Features ✨

- **Search Movies:** Search for movies by title using the OMDb API.
- **Filter Results:** Filter by year and type (movies, series, or episodes).
- **Pagination:** Navigate through multiple pages of results.
- **Movie Details:** View detailed information for selected movies, including posters and descriptions.
- **Cached Data:** Reduce API calls by caching movie details in Redux.

---

## Technologies 🛠️

### Frontend

- **React** ⚛️: Component-based UI development.
- **Redux Toolkit** 🛒: State management for caching and global state.
- **React Router** 🌐: Navigation between pages.
- **Bootstrap** 🎨: Pre-styled components and responsive design.
- **Font Awesome** 🎭: Iconography.

### Backend Integration

- **OMDb API** 🎥: External API for movie data.

### Development Tools

- **Axios** 🌐: HTTP client for API requests.
- **Lodash** 🛠️: Utility functions (e.g., debounce for optimizing API calls).
- **Sass (SCSS)** 🎨: Advanced CSS styling with variables and mixins.

---

## Setup 🛠️

1. Clone the repository:

   ```bash
   git clone https://github.com/betul/movie-list.git
   cd movie-list
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## Usage 🚀

### Searching for Movies

- Use the search bar to find movies by title.
- Results are fetched dynamically from the OMDb API.

### Filtering Results

- Filter movies by release year and type (movies, series, or episodes).

### Viewing Movie Details

- Click on a movie title to view its detailed information.
- Use the "Back to Movie List" button to return to the main page.

### Caching

- Movie details are cached in Redux to avoid redundant API requests.
- Cached data reduces loading time and improves user experience.

---

## Project Structure 📞

```
src/
├── assets/                # Static assets like images and stylesheets
├── components/            # Reusable React components
│   ├── Detail/            # Components for movie details
│   │   ├── MovieDetail.js      # Main component for movie details
│   │   ├── MovieInfoList.js    # Displays detailed movie information
│   │   └── MoviePoster.js      # Displays movie posters
│   ├── MovieList.js       # Main movie list table
│   ├── MoviesMain.js      # Main page with search and filters
│   ├── Pagination.js      # Pagination component
│   └── SearchFilter.js    # Search and filter component
├── redux/                 # Redux slices for state management
│   ├── movieDetailsSlice.js
│   ├── moviesSlice.js
│   └── navigationSlice.js
├── services/              # API integration (Axios setup)
├── helper/                # Utility functions like normalization
└── App.js                 # Main application entry point
```

---

## Components 🧩

### 1. **MoviesMain.js**

- Displays the main interface with search and filter options.
- Manages movie lists using Redux state.

### 2. **MovieList.js**

- Displays movies in a responsive table.
- Integrates with `react-bootstrap-table-next` for sortable columns.

### 3. **SearchFilter.js**

- Contains search and filter inputs.
- Features icons for better usability.

### 4. **MovieDetail.js**

- Shows detailed information about a selected movie.
- Retrieves data from the Redux cache or API.

### 5. **Pagination.js**

- Handles pagination for the movie list.
- Ensures seamless navigation through pages.

---

## Examples 📈

### Using Lodash for Debouncing

```javascript
import { debounce } from "lodash";

const debouncedFetchMovies = useCallback(
  debounce((normalizedValue) => {
    dispatch(fetchMovies({ query: normalizedValue, page: 1 }));
  }, 500),
  []
);

const handleSearchChange = (value) => {
  const normalizedValue = normalizeSearchQuery(value);
  dispatch(setSearchText(value));
  if (value.length >= 3) {
    debouncedFetchMovies(normalizedValue);
  }
};
```

### Using Axios for API Requests

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://www.omdbapi.com/",
  params: { apikey: "YOUR_API_KEY" },
});

export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await api.get("/", { params: { s: query, page } });
    return response.data;
  } catch (error) {
    throw error;
  }
};
```

### Redux State Management

```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ query, page }) => {
    const response = await api.get("/", { params: { s: query, page } });
    return { query, page, data: response.data };
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: { pages: {}, searchText: "", loading: false },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});
```

---

## Contributing 🧱

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

---

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Icons and Visuals 🎨

- Icons provided by [Font Awesome](https://fontawesome.com/).
- Emojis are used to enhance visual clarity and engagement.

Enjoy building and exploring! 🎥🍿
