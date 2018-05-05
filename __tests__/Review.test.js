import React from 'react';
import Enzyme from 'enzyme';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Review from '../../client/components/Review.jsx'

Enzyme.configure({ adapter: new Adapter() });


const review = [{
    "author_name": "Craig Francis",
    "author_url": "https://www.google.com/maps/contrib/108262712829758798917/reviews",
    "language": "en",
    "profile_photo_url": "https://lh5.googleusercontent.com/-Ke1fzBZDHB4/AAAAAAAAAAI/AAAAAAAAjWI/mygiCr_mb3c/s128-c0x00000000-cc-rp-mo-ba2/photo.jpg",
    "rating": 5,
    "relative_time_description": "a month ago",
    "text": "Beautiful hotel, we stayed for a few nights before our wedding (even though we are San Francisco locals) and it was a beautiful experience. The staff were so nice and thoughtful, the suite was large and spacious, an extremely comfortable bed and a dink g area big enough it have the family around for a meals to celebrate together. The staff are very attentive and the hotel feels very secure. \n\nThe Redwood Room was great to gather friends and have drinks, stylish and has a great vibe. \n\nOverall we can’t recommend this place enough!",
    "time": 1516577994
  }]

describe('Review', () => {
  it('should be defined', () => {
    let wrapper = shallow(<Review
      review={review}
    />)
    expect(wrapper).toBeDefined();
  });

  it('should render correctly', () => {
    const tree = shallow(
      <Review
      review={review}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
