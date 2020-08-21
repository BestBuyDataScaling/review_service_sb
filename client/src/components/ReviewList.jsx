/* eslint-disable radix */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable class-methods-use-this */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import React from 'react';
import '../styles/ReviewList.css';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import RatingCountByStar from './RatingCountByStar.jsx';
import FilterReview from './FilterReview.jsx';
import Review from './Review.jsx';

import ReviewForm from './ReviewForm.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      productID: 4,
      reviewHeading: '',
      reviewText: '',
      reviewUsername: '',
      reviewRating: 0,
      reviewRecommended: false,
      reviewQuality: 0,
      reviewValue: 0,
      reviewEaseOfUse: 0,
      reviewImages: [],
      reviewAvg: 0,
      reviewCounts: {},
      reviewEmail: '',
    };

    this.getReviewsByProductID = this.getReviewsByProductID.bind(this);
    this.addReviewPart = this.addReviewPart.bind(this);
    this.addReviewQuality = this.addReviewQuality.bind(this);
    this.addReviewValue = this.addReviewValue.bind(this);
    this.addReviewEaseOfUse = this.addReviewEaseOfUse.bind(this);
    this.addReviewRating = this.addReviewRating.bind(this);
    this.writeReview = this.writeReview.bind(this);
    // this.changeProduct = this.changeProduct.bind(this);
    this.toggleReview = this.toggleReview.bind(this);
    this.watchDiv = this.watchDiv.bind(this);
  }

  componentDidMount() {
    // this.getAllReviews();
    const { productID } = this.state;
    this.getReviewsByProductID(productID);
    // $('body').on('change', '#Walker', (event) => {
    //   console.log('IN REVIEW LIST: ', event);
    // });
    // window.addEventListener('message', this.initPort);
    this.watchDiv('searchbar_app');
  }

  // gets reviews by the product ID that is currently in state
  // also, in the second 'then statement, caculates the average rating of reviews by product,
  // and the amount of reviews per star category
  // (e.g. # of 5 star reviews, # of 4 star reviews, etc)

  getReviewsByProductID(state) {
    axios.get('http://ec2-18-218-79-61.us-east-2.compute.amazonaws.com/reviews', {
      params: {
        productID: state,
      },
    })
      .then((reviews) => {
        this.setState({
          reviews: reviews.data,
        });
        return reviews;
      })
      .then(() => {
        let sum = 0;
        const counts = {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0,
        };
        const { reviews } = this.state;
        reviews.forEach((review) => {
          sum += review.reviewRating;
          counts[review.reviewRating]++;
        });

        // eslint-disable-next-line no-restricted-syntax
        for (const key in counts) {
          counts[key] = (counts[key] / reviews.length) * 100;
        }

        if (sum !== 0) {
          this.setState({
            reviewAvg: sum / reviews.length,
            reviewCounts: counts,
          });
        } else {
          this.setState({
            reviewAvg: 0,
            reviewCounts: counts,
          });
        }
        // console.log(this.state)
      })
      .then(() => {
        const { reviewAvg } = this.state;
        document.getElementById('Champagne').className = reviewAvg;
      })
      .catch((error) => {
        console.log('Error retrieving reviews: ', error);
      });
  }

  watchDiv(div) {
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById(`${div}`);

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: false, subtree: false };

    // Callback function to execute when mutations are observed
    // eslint-disable-next-line no-unused-vars
    let callback = (mutationsList, observer) => {
      console.log(mutationsList[0].target.className);
      if (mutationsList[0].attributeName === 'class') {
        this.setState({
          productID: Number.parseInt(mutationsList[0].target.className),
        });
        this.getReviewsByProductID(Number.parseInt(mutationsList[0].target.className));
      }
    };
    callback = callback.bind(this);
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
  }

  // uses the data entered on the 'ReviewForm' component that is rendered to state,
  // and sends a post request to write a new review into the DB
  writeReview(event) {
    event.preventDefault();
    this.toggleReview(event);
    const {
      productID, reviewHeading, reviewText, reviewRating, reviewUsername,
      reviewRecommended, reviewQuality, reviewValue, reviewEaseOfUse, reviewImages,
    } = this.state;
    axios.post('http://ec2-18-218-79-61.us-east-2.compute.amazonaws.com/reviews', {
      productID,
      reviewHeading,
      reviewText,
      reviewRating,
      reviewUsername,
      reviewRecommended,
      reviewQuality,
      reviewValue,
      reviewEaseOfUse,
      reviewImages,
      reviewHelpful: 0,
      reviewUnhelpful: 0,
    })
      .then((confirmation) => {
        console.log('Review successfully posted: ', confirmation);
      })
      .then(() => {
        this.getReviewsByProductID(productID);
      })
      .then(() => {
        this.setState({
          reviewHeading: '',
          reviewText: '',
          reviewRating: 0,
          reviewUsername: '',
          reviewRecommended: false,
          reviewQuality: 0,
          reviewValue: 0,
          reviewEaseOfUse: 0,
          reviewImages: [],
          reviewEmail: '',
        });
      })
      .catch((error) => {
        console.log('Error posting review: ', error);
      });
  }

  // this is used to add certain review characteristics into state,
  // they are passed down as a prop & called in the 'ReviewForm' component
  addReviewPart(event) {
    const reviewPart = event.target.className;
    this.setState({
      [reviewPart]: event.target.value,
    });
  }
  // this is used to add certain review characteristics into state
  // they are passed down as a prop & called in the 'ReviewForm' component

  addReviewQuality(rating) {
    this.setState({
      reviewQuality: rating,
    });
  }

  // this is used to add certain review characteristics into state
  // passed down as a prop & called in the 'ReviewForm' component
  addReviewValue(rating) {
    this.setState({
      reviewValue: rating,
    });
  }

  // this is used to add certain review characteristics into state
  // passed down as a prop & called in the 'ReviewForm' component
  addReviewEaseOfUse(rating) {
    this.setState({
      reviewEaseOfUse: rating,
    });
  }

  addReviewRating(rating) {
    this.setState({
      reviewRating: rating,
    });
  }

  // may or may not need this once we combine
  // this was used in order for me to test out switching up the productID in state
  // changeProduct(event) {
  //   const newProductID = event.target.value;
  //   this.setState({
  //     productID: newProductID,
  //   }, () => {
  //     // eslint-disable-next-line react/destructuring-assignment
  //     this.getReviewsByProductID(this.state.productID);
  //     // this.getAverageRating();
  //   });
  // }

  // used to hide the div with the 'ReviewForm component'
  toggleReview(event) {
    event.preventDefault();
    const reviewDiv = document.getElementById('writeReviewForm');
    if (reviewDiv.className === 'rw-hidden' || !reviewDiv.className) {
      reviewDiv.className = 'rw-visible';
    } else {
      reviewDiv.className = 'rw-hidden';
    }
  }

  render() {
    const {
      reviewAvg, reviewCounts, reviews, reviewRating, reviewHeading, reviewText,
      reviewQuality, reviewValue, reviewEaseOfUse, reviewUsername, reviewEmail,
    } = this.state;
    return (
      <div>
        <input onChange={this.changeProduct} type="text" />
        <div className="reviewStats">
          <div className="ratingSummary">
            <RatingCountByStar
              reviewAvg={reviewAvg}
              reviewCounts={reviewCounts}
              reviews={reviews}
            />
          </div>
          <div className="rating pros">
            <div className="ProsAndCons">
              Pros mentioned
              <button className="proButtons">Pro #1</button>
              <button className="proButtons">Pro #2</button>
              <button className="proButtons">Pro #3</button>
            </div>
            <div className="ProsAndCons">
              Cons mentioned
              <button className="proButtons">Con #1</button>
              <button className="proButtons">Con #1</button>
              <button className="proButtons">Con #1</button>
            </div>
          </div>
          <div className="rating expertRating">
            Expert Rating
            <br />
            <div className="avgRatingScore">
              4.7
            </div>
            <div className="starRatings">
              <StarRatings
                rating={4}
                starRatedColor="yellow"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="3px"
              />
              <br />
              (50 ratings)
            </div>
          </div>
        </div>
        <div style={{ borderBottom: '1px solid rgb(197, 203, 213)' }}>
          <FilterReview />
        </div>
        {reviews.map((review, idx) => <Review review={review} key={idx} />)}
        <div style={{ textAlign: 'center' }}>
          <button className="showReviewButtons show">Show More</button>
          <button className="showReviewButtons" onClick={this.toggleReview}>Write a Review</button>
        </div>
        <ReviewForm
          // review={this.state.addReview}
          addReviewPart={this.addReviewPart}
          reviewQuality={this.addReviewQuality}
          reviewValue={this.addReviewValue}
          reviewEaseOfUse={this.addReviewEaseOfUse}
          reviewRating={this.addReviewRating}
          writeReview={this.writeReview}
          overallRating={reviewRating}
          reviewHeading={reviewHeading}
          reviewText={reviewText}
          reviewQualityDefault={reviewQuality}
          reviewValueDefault={reviewValue}
          reviewEaseOfUseDefault={reviewEaseOfUse}
          reviewUsername={reviewUsername}
          reviewEmail={reviewEmail}
        />
      </div>
    );
  }
}
export default ReviewList;
