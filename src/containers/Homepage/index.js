import React, { useState, useEffect } from "react";

function Homepage() {
  const [data, setData] = useState(0);
  const [news, setNews] = useState(0);

  async function fetchMyAPI() {
    let response = await fetch("https://api.football-data.org/v2/teams/64", {
      headers: { "X-Auth-Token": process.env.REACT_APP_FOOTY_API_KEY }
    });
    let res = await response.json();
    setData(res);
    console.log("this is club data", res);
  }

  async function fetchMyAPI2() {
    let response = await fetch(
      "https://newsapi.org/v2/everything?q=liverpool-fc&from=2019-08-16&to=2019-08-16&sortBy=relevancy&language=en&catergory=sports",
      {
        headers: { "X-Api-Key": process.env.REACT_APP_NEWS_API_KEY }
      }
    );
    let res = await response.json();
    setNews(res.articles);
    console.log("this is news", res.articles);
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
                  {JSON.stringify(item.title)} - {item.publishedAt} -{" "}
                  {item.source.name}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Homepage;
