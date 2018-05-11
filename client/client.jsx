import React from 'react';
import Reviews from './components/Reviews.jsx';
import Description from './components/Description.jsx';
import css from './style.css';

const ReviewsInfo = () => (
  <div>
    <Description />
    <Reviews />
  </div>
);

window.ReviewsInfo = ReviewsInfo;

