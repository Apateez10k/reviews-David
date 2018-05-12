import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './components/Reviews.jsx';
import Description from './components/Description.jsx';

const ReviewsInfo = () => (
  <div>
    <Description />
    <Reviews />
  </div>
);

const ReviewsInfoLoader = (id) => {
  ReactDOM.render(React.createElement(ReviewsInfo), document.getElementById(id)); 
};

window.ReviewsInfo = ReviewsInfo;
window.ReviewsInfoLoader = ReviewsInfoLoader;

