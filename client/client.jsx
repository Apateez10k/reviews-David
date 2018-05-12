import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './components/Reviews';
import Description from './components/Description';

const ReviewsInfo = () => (
  <div>
    <Description />
    <Reviews />
  </div>
);

const ReviewsInfoLoader = (id) => {
  ReactDOM.hydrate(React.createElement(ReviewsInfo), document.getElementById(id));
};

window.ReviewsInfo = ReviewsInfo;
window.ReviewsInfoLoader = ReviewsInfoLoader;

