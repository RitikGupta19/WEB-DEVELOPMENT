const request = require("request");

const url =
  "http://api.aerisapi.com/observations/seattle,wa?client_id=P0GTAluKzRBM6LySpbQkB&client_secret=1ukUxk6Nba0AvnDj5g9PMSBzJQ2d0L6moH0xWhNX";

request({ url: url }, (error, response) => {
  const data = JSON.parse(response.body);
  console.log(data);
});
