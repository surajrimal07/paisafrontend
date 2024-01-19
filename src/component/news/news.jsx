import React, { useEffect, useRef, useState } from 'react';
import { BiRefresh } from 'react-icons/bi';
import ScrollToTop from "react-scroll-to-top";
import { getNews } from '../../apis/api.js';
import './news.css';

const NewsDisplay = () => {
    const [newsData, setNewsData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const loaderRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY + window.innerHeight;
          const triggerPosition = document.getElementById('news-container').offsetTop;

          if (scrollPosition > triggerPosition) {
            setShowAnimation(true);
          } else {
            setShowAnimation(false);
          }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);


    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await getNews(page, 10);
        const newData = response.data;
        setNewsData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    const truncateDescription = (description, wordLimit) => {
        const words = description.split(' ');
        if (words.length <= wordLimit) {
          return description;
        }
        return words.slice(0, wordLimit).join(' ') + '...';
      };

    const handleObserver = (entities) => {
      const target = entities[0];
      if (target.isIntersecting && !loading) {
        fetchNews();
      }
    };

    const handleRefresh = async () => {
      try {
        const response = await getNews(1, 10);
        const newData = response.data;
        setNewsData(newData);

        const newsContainer = document.getElementById('news-container');
        if (newsContainer) {
          newsContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (error) {
        console.error('Error refreshing news:', error);
      }
    };

    useEffect(() => {
      const loaderCurrent = loaderRef.current;
      const options = {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      };

      const observer = new IntersectionObserver(handleObserver, options);

      if (loaderCurrent) {
        observer.observe(loaderCurrent);
      }

      return () => {
        if (loaderCurrent) {
          observer.unobserve(loaderCurrent);
        }
      };
      // eslint-disable-next-line
    }, [loaderRef]);

    useEffect(() => {
      fetchNews();
      // eslint-disable-next-line
    }, []);

    const getDefaultImage = () => {
      return 'news.jpg';
    };
    //fix lint warning later

    return (
      <div id="news-container" className={`container mt-5 ${showAnimation ? 'slide-from-below' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="text-left" onClick={handleRefresh} style={{ color: '#808080', cursor: 'pointer', fontSize: '1.7em', flex: '1' }}>
          Financial News
        </div>
        <div className="d-flex align-items-center">
          <button className="btn btn-link me-0" onClick={handleRefresh}>
            <BiRefresh style={{ fontSize: '1.7em', color: '#808080' }} />
          </button>
          <span style={{ color: '#808080', fontSize: '1.2em',cursor: 'pointer', marginRight: '0px' }}>Refresh</span>
        </div>
      </div>
          <div className="row">
            {newsData.map((news, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={news.img_url || getDefaultImage()}
                    className="card-img-top"
                    alt={`News ${index + 1}`}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = getDefaultImage();
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{news.title}</h5>
                    <p className="card-text">
                      {truncateDescription(news.description, 20)}
                    </p>
                    <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-secondary align-self-center"
                      style={{ marginTop: 'auto' }}
                    >
                      Read More <i className="bi bi-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loading && <p>Loading...</p>}

          <div ref={loaderRef} style={{ height: '10px' }} />
          <ScrollToTop smooth />
        </div>
      );
    };
  export default NewsDisplay;