# 🌤️ Weather App

A modern, responsive weather application built with React that fetches real-time weather data using the OpenWeatherMap API. Features include city search, 5-day forecast, geolocation support, temperature unit toggle, and a beautiful gradient neon UI.

**Live Preview:** [https://rabi0145.github.io/weather-app/](https://rabi0145.github.io/weather-app/)

---

## ✨ Features

- 🔍 **City Search** - Search weather for any city in the world.
- 🌡️ **Current Weather** - Display real-time temperature, conditions, humidity, and wind speed.
- 📊 **5-Day Forecast** - Extended forecast with daily weather predictions.
- 📍 **Geolocation Support** - Auto-fetch weather using browser's location.
- 🔄 **Temperature Toggle** - Switch between Celsius and Fahrenheit.
- 🎨 **Gradient Neon Theme** - Modern, eye-catching gradient design.
- ⚡ **Loading States** - Skeleton loaders for better UX.
- 🚨 **Error Handling** - Toast notifications for errors and invalid cities.
- 🌙 **Glassmorphism UI** - Frosted glass effect with backdrop blur.
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop.
- ⚙️ **Custom Hooks** - Reusable, well-documented custom React hooks.
- 🔐 **Environment Variables** - Secure API key management.

---

## 🛠️ Tech Stack


| Technology | Purpose |
|-----------|---------|
| **React** | UI library & component framework |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS v4** | Utility-first CSS framework |
| **OpenWeatherMap API** | Real-time weather data |
| **JavaScript (ES6+)** | Modern JavaScript features |
| **PostCSS** | CSS processing |
| **Autoprefixer** | CSS vendor prefixes |

---

## 📁 Project Structure

```text
weather-app/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          # City search input component
│   │   ├── WeatherSkeleton.jsx    # Loading skeleton placeholders
│   │   └── Toast.jsx              # Toast notification component
│   ├── hooks/
│   │   ├── useWeather.js          # Weather data fetching logic
│   │   ├── useGeolocation.js      # Geolocation hook
│   │   └── useTemperatureUnit.js  # Temp unit conversion logic
│   ├── WeatherApp.jsx             # Main app component
│   ├── index.css                  # Tailwind CSS imports
│   └── main.jsx                   # React entry point
├── .env.local                     # Environment variables (API key)
├── .gitignore                     # Git ignore file
├── tailwind.config.js             # Tailwind configuration
├── vite.config.js                 # Vite configuration
├── postcss.config.js              # PostCSS configuration
├── package.json                   # Project dependencies
└── README.md                      # Project documentation
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- OpenWeatherMap API key

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rabi0145/weather-app.git
   cd weather-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env.local` file in the project root:**
   ```bash
   echo "VITE_WEATHER_API_KEY=your_api_key_here" > .env.local
   ```
   *Replace `your_api_key_here` with your actual OpenWeatherMap API key.*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in the browser:** Navigate to `http://localhost:5173`

---

## 💡 Key Concepts Implemented

### 1. Fetch API & Async/Await
```javascript
const response = await fetch(weatherUrl);
const data = await response.json();
```
- Uses modern `async/await` for clean asynchronous code.
- Proper error handling with `try-catch` blocks.

### 2. Custom React Hooks
- `useWeather()` - Manages weather data fetching and state.
- `useGeolocation()` - Handles browser geolocation API.
- `useTemperatureUnit()` - Manages temperature conversion.

### 3. State Management with `useState`
- Loading states for skeleton loaders.
- Error states for toast notifications.
- Data states for weather information.

### 4. Side Effects with `useEffect`
- Auto-fetch location on component mount.
- Refetch weather when location changes.
- Display error notifications.

### 5. Loading States & Skeletons
- Animated skeleton loaders while fetching.
- Smooth transitions between states to enhance user experience.

---

## 📖 Usage Guide

### Search for a City
- Type the city name in the search bar.
- Click the **Search** button.
- View current weather and the 5-day forecast.

### Use Current Location
- Click the **📍 My Location** button.
- Allow browser location permissions when prompted.
- Weather automatically loads for your current coordinates.

### Toggle Temperature Unit
- Click the **Switch to °F** or **Switch to °C** button.
- All temperatures instantly convert across both current and forecast data.

### View Forecast
- Scroll or swipe to see the 5-day forecast.
- Each card shows the date, icon, description, and temperature using a responsive grid layout.

---

## 🎨 Design Features

### Gradient Neon Theme
- **Dark Background:** High contrast for readability.
- **Neon Gradients:** Cyan, pink, purple, and yellow accents.
- **Glassmorphic UI:** Frosted glass effect with backdrop blur styling.
- **Smooth Animations:** Hover effects and transitions.

### Color Coding
- 🔵 **Cyan** - Temperature
- 💗 **Pink** - Feels Like temperature
- 💛 **Yellow** - Humidity
- 💚 **Green** - Wind Speed

### Responsive Design
- Mobile-first layout approach.
- Tailwind breakpoints optimized for tablet and desktop display.
- Flexible grid layouts and touch-friendly targets.

---

## 🔐 Security & Best Practices

### Environment Variables
- API key is securely stored in `.env.local` (never committed to version control).
- Uses Vite's `import.meta.env` for secure runtime client access.
- `.env.local` is added directly to `.gitignore`.

### Error Handling
- Comprehensive `try-catch` blocks wrapping all API calls.
- Graceful network failure handling.
- Invalid city name detection with user-friendly error messages.

### Code Quality
- Well-documented code containing relevant comments.
- Reusable custom hooks decoupled from UI components.
- Adheres to DRY (Don't Repeat Yourself) design principles.

---

## 🌐 API Integration

### OpenWeatherMap API Endpoints Used

- **Current Weather:**
  ```text
  https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
  ```
- **5-Day Forecast:**
  ```text
  https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric
  ```
- **By Coordinates (Geolocation):**
  ```text
  https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric
  ```

### Response Data Properties Utilized
- `main.temp` - Current temperature
- `main.feels_like` - Feels like temperature
- `main.humidity` - Humidity percentage
- `wind.speed` - Wind speed
- `weather[0].description` - Weather description text
- `weather[0].icon` - Weather icon condition code
- `name` - City name

---

## 📚 Learning Outcomes

This project teaches and demonstrates:
- **React Fundamentals:** Component composition, core hooks (`useState`, `useEffect`, `useCallback`), and custom hook architectures.
- **Async JavaScript:** Fetch API, Promise handling, and `async/await` syntax.
- **State Management:** Complex loading, error, and dynamic data fetching state patterns.
- **Web APIs:** Browser Geolocation API integration and environment variable usage.
- **Modern CSS:** Tailwind CSS implementation, fluid layouts, animations, and transitions.
- **UX/UI Design:** Skeleton components, transient toast components, and visual hierarchy.

---

## 🛠️ Troubleshooting

- **Issue:** `"Failed to fetch weather data"`
  - **Solution:** Check your internet connection, verify your API key string in `.env.local`, and ensure OpenWeatherMap servers are currently up.
- **Issue:** CSS styling is not displaying correctly
  - **Solution:** Ensure `index.css` is properly imported in `main.jsx`. Restart your dev server (`npm run dev`) or clear your browser cache.
- **Issue:** Geolocation feature is not working
  - **Solution:** Allow browser location permissions. Note that the Geolocation API requires an HTTPS connection in production environments to function.
- **Issue:** `"City not found"` error
  - **Solution:** Check the spelling of the city name. Try appending the full country name (e.g., "Paris, FR") as small or obscure cities might require explicit formatting.
- **Issue:** Environment variable returning `undefined`
  - **Solution:** Ensure you renamed the file to exactly `.env.local` and prefix your variable name with `VITE_` (e.g., `VITE_WEATHER_API_KEY`). Restart the Vite development server after editing.

---

## 🚀 Build & Deployment

### Build for Production
```bash
npm run build
```
Generates an optimized static build assets folder inside the `dist/` directory.

### Deploy to GitHub Pages
```bash
npm run build
npm run deploy
```
*Alternatively, you can link the repository to GitHub Actions or select the compiled static output branch within repository Settings → Pages.*

---

## 🎯 Future Enhancements

- [ ] Multi-city comparative metrics dashboard
- [ ] Real-time local severe weather alerts and push notifications
- [ ] Historical climate metrics mapping
- [ ] Air Quality Index (AQI) and UV index data integration
- [ ] Localized sunrise, sunset, and solar positioning times
## 📝 License

This project is open source and available under the **MIT License**. Feel free to use it for personal or educational purposes.

---

## 🙋 Author

**Rabi** - [GitHub Profile](https://github.com/rabi0145)

Built with ❤️ for learning and portfolio purposes.

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements or want to fix a bug, please follow these steps:

1. **Fork** the repository
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add AmazingFeature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vite.dev)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [OpenWeatherMap API Docs](https://openweathermap.org)
- [MDN Web Docs](https://mozilla.org)

---

## ⭐ Show Your Support

If this project helped you, please give it a **⭐ on GitHub**! It helps others discover the repository.

🔗 **Live Demo:** [https://rabi0145.github.io/weather-app/](https://rabi0145.github.io/weather-app/)
