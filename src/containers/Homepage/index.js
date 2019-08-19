import React, { useState, useEffect } from "react";

function Homepage() {
  const [data, setData] = useState(0);
  const [news, setNews] = useState(0);

  async function fetchMyAPI() {
    let response = await fetch(
      "https://api.football-data.org/v2/teams/64/matches",
      {
        headers: { "X-Auth-Token": process.env.REACT_APP_FOOTY_API_KEY }
      }
    );
    let res = await response.json();
    setData(res);
    console.log("this is club data", res);
  }

  async function fetchMyAPI2() {
    let today = new Date();
    console.log(today);
    let year = today.getUTCFullYear().toString();
    let month = (today.getUTCMonth() + 1).toString();
    let day = today.getDate().toString();

    if (month.length === 1) {
      month = "0" + month;
    }

    if (day.length === 1) {
      day = "0" + day;
    }

    let date = year + "-" + month + "-" + day;

    let response = await fetch(
      `https://newsapi.org/v2/everything?q=liverpool-fc&from=${date}&to=${date}&sortBy=relevancy&language=en&catergory=sports`,
      {
        headers: { "X-Api-Key": process.env.REACT_APP_NEWS_API_KEY }
      }
    );
    let res = await response.json();
    setNews(res.articles);
    // console.log("this is news", res.articles);
  }

  function dateFormatter(string) {
    let newString = string.slice(0, -10);
    let newDate =
      newString[8] +
      newString[9] +
      "-" +
      newString[5] +
      newString[6] +
      "-" +
      newString[0] +
      newString[1] +
      newString[2] +
      newString[3];
    return newDate;
  }

  useEffect(() => {
    fetchMyAPI();
    fetchMyAPI2();
  }, []);

  return (
    <div>
      <h1>Liverpool FC site</h1>
      <h2>News</h2>
      <ul>
        {news &&
          news.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.url}>
                  {item.title}-{item.publishedAt}-{item.source.name}
                </a>
              </li>
            );
          })}
      </ul>
      <h2>Fixtures</h2>
      {data &&
        data.matches.map((item, index) => {
          return (
            <li key={index}>
              {item.homeTeam.name} {item.score.fullTime.homeTeam} Vs.{" "}
              {item.score.fullTime.awayTeam} {item.awayTeam.name} -{" "}
              {dateFormatter(item.utcDate)}
            </li>
          );
        })}
    </div>
  );
}

export default Homepage;
