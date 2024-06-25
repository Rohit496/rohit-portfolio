public with sharing class WeatherAppController {
    // Method to get the API key and format it as a parameter for the URL
    public static String getKey() {
        String key = '08b02af48f7db29a5e2704b2331dcd06';
        String output = '&appid=' + key;
        return output;
    }

    // AuraEnabled method to get the weather data, marked cacheable for better performance
    @AuraEnabled(cacheable=true)
    public static String getWeather(String input) {
        // Construct the URL for the API call
        String url =
            'https://api.openweathermap.org/data/2.5/weather?q=' +
            input +
            '&units=metric' +
            getKey();

        // Get the response from the API
        String response = getResponse(url);
        return response;
    }

    // Helper method to make the HTTP request and return the response
    public static String getResponse(String url) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();

        // Set the endpoint and method for the HTTP request
        request.setEndpoint(url);
        request.setMethod('GET');
        request.setTimeout(120000);

        try {
            // Send the request and get the response
            HttpResponse response = http.send(request);
            String responseBody = response.getBody();
            return responseBody;
        } catch (Exception e) {
            // Handle any exceptions and return an error message
            return 'Error: ' + e.getMessage();
        }
    }
}
