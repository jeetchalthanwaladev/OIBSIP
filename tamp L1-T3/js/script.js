/* TempX - Temperature Converter
    JavaScript */

// Get HTML elements
const temperatureInput = document.getElementById("temperature");
const inputUnit = document.getElementById("inputUnit");
const temperatureForm = document.getElementById("temperatureForm");

const errorMessage = document.getElementById("errorMessage");

const results = document.getElementById("results");
const resultSummary = document.getElementById("resultSummary");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");


// Conversion Functions

function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}


// Format Temperature

function formatTemperature(value) {
    return Number(value.toFixed(2));
}


// Show Error

function showError(message) {
    errorMessage.textContent = message;

    results.style.display = "none";
}


// Clear Error

function clearError() {
    errorMessage.textContent = "";
}


// Validate Temperature

function validateTemperature(value, unit) {

    if (value === "") {
        return "Please enter a temperature.";
    }

    if (!Number.isFinite(Number(value))) {
        return "Please enter a valid number.";
    }

    const temperature = Number(value);

    // Absolute zero validation
    if (unit === "celsius" && temperature < -273.15) {
        return "Celsius temperature cannot be below −273.15°C (absolute zero).";
    }

    if (unit === "fahrenheit" && temperature < -459.67) {
        return "Fahrenheit temperature cannot be below −459.67°F (absolute zero).";
    }

    if (unit === "kelvin" && temperature < 0) {
        return "Kelvin temperature cannot be below 0 K (absolute zero).";
    }

    return "";
}


// Convert Temperature

function convertTemperature() {

    const value = temperatureInput.value.trim();
    const unit = inputUnit.value;

    // Validate input
    const validationError = validateTemperature(value, unit);

    if (validationError) {
        showError(validationError);
        return;
    }

    clearError();

    const temperature = Number(value);

    let celsius;
    let fahrenheit;
    let kelvin;


    // Convert based on selected unit
    if (unit === "celsius") {

        celsius = temperature;

        fahrenheit = celsiusToFahrenheit(celsius);

        kelvin = celsiusToKelvin(celsius);

    } else if (unit === "fahrenheit") {

        fahrenheit = temperature;

        celsius = fahrenheitToCelsius(fahrenheit);

        kelvin = celsiusToKelvin(celsius);

    } else if (unit === "kelvin") {

        kelvin = temperature;

        celsius = kelvinToCelsius(kelvin);

        fahrenheit = celsiusToFahrenheit(celsius);
    }


    // Display results
    celsiusResult.textContent = `${formatTemperature(celsius)} °C`;

    fahrenheitResult.textContent = `${formatTemperature(fahrenheit)} °F`;

    kelvinResult.textContent = `${formatTemperature(kelvin)} K`;


    // Summary
    resultSummary.textContent =
        `${formatTemperature(temperature)}° ${getUnitSymbol(unit)} converted successfully.`;


    // Show results
    results.style.display = "block";
}


// Get Unit Symbol

function getUnitSymbol(unit) {

    if (unit === "celsius") {
        return "C";
    }

    if (unit === "fahrenheit") {
        return "F";
    }

    if (unit === "kelvin") {
        return "K";
    }

    return "";
}


// Form Submit

temperatureForm.addEventListener("submit", function (event) {

    // Prevent page reload
    event.preventDefault();

    convertTemperature();
});


// Real-Time Validation

temperatureInput.addEventListener("input", function () {

    const value = temperatureInput.value.trim();
    const unit = inputUnit.value;

    // Empty input
    if (value === "") {
        clearError();
        results.style.display = "none";
        return;
    }

    const validationError = validateTemperature(value, unit);

    if (validationError) {
        showError(validationError);
    } else {
        clearError();
    }
});


// Validate When Unit Changes

inputUnit.addEventListener("change", function () {

    const value = temperatureInput.value.trim();

    if (value === "") {
        clearError();
        return;
    }

    const validationError =
        validateTemperature(value, inputUnit.value);

    if (validationError) {
        showError(validationError);
    } else {
        clearError();
    }
});


// Initial State

results.style.display = "none";
clearError();