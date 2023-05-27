import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../News.css';

const NewsPortal = () => {
  const [newsData, setNewsData] = useState({ newsApiData: [], guardianApiData: [], nytApiData: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({ newsApiData: [], guardianApiData: [], nytApiData: [] });

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

  useEffect(() => {
    if (newsData.newsApiData.length === 0 || newsData.guardianApiData.length === 0 || newsData.nytApiData.length === 0) {
      // Wait until the API data is fetched
      return;
    }

    const filteredNewsApiData = newsData.newsApiData.filter(
      news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (news.description && news.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const filteredGuardianApiData = newsData.guardianApiData.filter(
      news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (news.description && news.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const filteredNytApiData = newsData.nytApiData.filter(
      news =>
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (news.description && news.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setSearchResults({ newsApiData: filteredNewsApiData, guardianApiData: filteredGuardianApiData, nytApiData: filteredNytApiData });
  }, [searchTerm, newsData]);

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const newsToDisplay = searchTerm ? searchResults : newsData;

  return (
    <div>
      <div className="search-bar">
        <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search news..." />
      </div>
      <div className="news-container">
        <div className="news-column">
          <h2>NewsAPI</h2>
          {newsToDisplay.newsApiData.map((news, index) => (
            <div className="news-card" key={index}>
              {news.image && <img className="news-thumbnail" src={news.image} alt="News Thumbnail" />}
              <div>
                <h3 className="news-title">{news.title}</h3>
                <p className="news-description">{news.description}</p>
                <a href={news.link} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="news-column">
          <h2>The Guardian</h2>
          {newsToDisplay.guardianApiData.map((news, index) => (
            <div className="news-card" key={index}>
              {news.image && <img className="news-thumbnail" src={news.image} alt="News Thumbnail" />}
              <div>
                <h3 className="news-title">{news.title}</h3>
                <p className="news-description">{news.description}</p>
                <a href={news.link} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="news-column">
          <h2>New York Times</h2>
          {newsToDisplay.nytApiData.map((news, index) => (
            <div className="news-card" key={index}>
              {news.image && <img className="news-thumbnail" src={news.image} alt="News Thumbnail" />}
              <div>
                <h3 className="news-title">{news.title}</h3>
                <p className="news-description">{news.description}</p>
                <a href={news.link} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPortal;
