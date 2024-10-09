const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = '9fe310d685272cc368ed4450410a6b53'; // Replace with your API key

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Route for the home page
app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

// Route to fetch weather data
app.post('/weather', async (req, res) => {
    const city = req.body.city;

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const weather = response.data;
        res.render('index', { weather, error: null });
    } catch (error) {
        res.render('index', { weather: null, error: 'City not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
