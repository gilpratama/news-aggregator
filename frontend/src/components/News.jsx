import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../News.css';


const NewsPortal = () => {
  const [newsData, setNewsData] = useState({ newsApiData: [], guardianApiData: [], nytApiData: [] });

  useEffect(() => {
    axios
      .get('http://localhost/api/news') // Replace with your Laravel API endpoint
      .then(response => {
        setNewsData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="news-column">
        <h2>NewsAPI</h2>
        {newsData.newsApiData.map((news, index) => (
          <div className="news-item" key={index}>
            {news.image && <img className="news-thumbnail" src={news.image} alt="News Thumbnail" />}
            <div>
              <h3 className="news-title">{news.title}</h3>
              <p className="news-description">{news.description}</p>
              <a href={news.link} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>
        ))}
      </div>
      <div className="news-column">
        <h2>The Guardian</h2>
        {newsData.guardianApiData.map((news, index) => (
          <div className="news-item" key={index}>
            {news.image && <img className="news-thumbnail" src={news.image} alt="News Thumbnail" />}
            <div>
              <h3 className="news-title">{news.title}</h3>
              <p className="news-description">{news.description}</p>
              <a href={news.link} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>
        ))}
      </div>
      <div className="news-column">
        <h2>New York Times</h2>
        {newsData.nytApiData.map((news, index) => (
          <div className="news-item" key={index}>
            {news.image && <img className="news-thumbnail" src={news.image} alt="News Thumbnail" />}
            <div>
              <h3 className="news-title">{news.title}</h3>
              <p className="news-description">{news.description}</p>
              <a href={news.link} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPortal;
