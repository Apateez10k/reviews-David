import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };

    this.expandDescription = this.expandDescription.bind(this);
  }

  expandDescription() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { review } = this.props;
    const reviewBody = `${review.text}`;
    const starsPercentage = (googleRating) => {
      const percent = (googleRating / 5) * 100;
      return `${percent}%`;
    };

    let component = null;
    if (!this.state.expanded) {
      component = (<LinesEllipsis
        text={reviewBody}
        maxLine="3"
        ellipsis="... See More"
        trimRight
        basedOn="letters"
      />);
    } else if (this.state.expanded) {
      component = reviewBody;
    }

    return (
      <div className="review-container">
        <div className="review-profile-pic">
          <img src={review.profile_photo_url} alt="reviewer profile" width={70} height={70} />
        </div>
        <div className="review-column" onClick={() => this.expandDescription()} onKeyDown={() => this.expandDescription()} role="button" tabIndex="0">
          <div className="review-column-name">{review.author_name}</div>
          <div className="review-column-date">{review.relative_time_description}</div>
          <div className="reviews-details-ratings-stars">
            <div className="reviews-details-ratings-stars-top" style={{ width: starsPercentage(review.rating) }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            <div className="reviews-details-ratings-stars-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
          </div>
          <div className="review-column-text">
            {component}
          </div>
        </div>
      </div>
    );
  }
}

Review.propTypes = {
  review: PropTypes.element.isRequired,
};
