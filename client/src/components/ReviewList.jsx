import React from 'react';
// import '../styles/ReviewList.css';
import StarRatings from 'react-star-ratings';
import RatingCountByStar from './RatingCountByStar.jsx';
import FilterReview from './FilterReview.jsx';
import Review from './Review.jsx';
import axios from 'axios';
import ReviewForm from './ReviewForm.jsx';
import $ from 'jquery';

class ReviewList extends React.Component {
  constructor(props) {
    super(props)

    //state holds:
      //the reviews that will be rendered
      //the product ID that is currently being viewed
      //fields used in creating a review

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
      reviewEmail: ''
    };


    this.getReviewsByProductID = this.getReviewsByProductID.bind(this);
    // this.getAllReviews = this.getAllReviews.bind(this);
    this.addReviewPart = this.addReviewPart.bind(this);
    this.addReviewQuality = this.addReviewQuality.bind(this);
    this.addReviewValue = this.addReviewValue.bind(this);
    this.addReviewEaseOfUse = this.addReviewEaseOfUse.bind(this);
    this.addReviewRating = this.addReviewRating.bind(this);
    this.writeReview = this.writeReview.bind(this);
    this.changeProduct = this.changeProduct.bind(this);
    this.toggleReview = this.toggleReview.bind(this);
    // this.onMessage = this.onMessage.bind(this);
  }

  componentDidMount() {
    // this.getAllReviews();
    this.getReviewsByProductID(this.state.productID);
    $('body').on('change', '#Walker', (event) => {
      console.log("IN REVIEW LIST: ", event);
    })
    // window.addEventListener('message', this.initPort);
  }

  // initPort(event) {
  //   var port2 = event.ports[0];
  //   port2.onMessage = this.onMessage;
  // }

  // onMessage(event) {
  //   console.log("EVENT IN REVIEW LIST: ", event);
  // }


  //gets reviews by the product ID that is currently in state
  //also, in the second 'then statement, caculates the average rating of reviews by product, and the amount of reviews per star category (e.g. # of 5 star reviews, # of 4 star reviews, etc)

  getReviewsByProductID(state){
    console.log(11111111111)
    axios.get('http://localhost:4000/reviews', {
      params: {
        productID: state
      }
    })
    .then(reviews => {
      this.setState({
        reviews: reviews.data
      });
      return reviews;
    })
    .then(() => {
      var sum = 0
      var counts = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
      this.state.reviews.forEach(review => {
        sum += review.reviewRating
        counts[review.reviewRating]++
      });

      for (var key in counts) {
        counts[key] = (counts[key] / this.state.reviews.length) * 100;
      }

      if (sum !== 0) {
        this.setState({
          reviewAvg: sum / this.state.reviews.length,
          reviewCounts: counts
        })
      } else {
        this.setState({
          reviewAvg: 0,
          reviewCounts: counts
        });
      }
      // console.log(this.state)
    })
    .catch(error => {
      console.log('Error retrieving reviews: ', error);
    })
  }

  //not currently using this fn - was just using it in the beginning to render some data to the page to work on styling

  // getAllReviews() {
  //   axios.get('/reviews')
  //   .then(reviews => {
  //     this.setState({
  //       reviews: reviews.data
  //     });
  //     // console.log(this.state);
  //   })
  //   .catch(error => {
  //     console.log('Error retrieving reviews: ', error);
  //     console.log(error)
  //   })
  // }


  //uses the data entered on the 'ReviewForm' component that is rendered to state, and sends a post request to write a new review into the DB
  writeReview(event) {
    event.preventDefault();
    this.toggleReview(event);
    axios.post('http://localhost:4000/reviews' , {
      productID: this.state.productID,
      reviewHeading: this.state.reviewHeading,
      reviewText: this.state.reviewText,
      reviewRating: this.state.reviewRating,
      reviewUsername: this.state.reviewUsername,
      reviewRecommended: this.state.reviewRecommended,
      reivewQuality: this.state.reviewQuality,
      reviewValue: this.state.reviewValue,
      reviewEaseOfUse: this.state.reviewEaseOfUse,
      reviewImages: this.state.reviewImages,
      reviewHelpful: 0,
      reviewUnhelpful: 0
    })
    .then(confirmation => {
      console.log('Review successfully posted: ', confirmation);
    })
    .then(() => {
      this.getReviewsByProductID(this.state.productID);
    })
    .then( () => {
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
      reviewEmail: ''
      })
    })
    .catch(error => {
      console.log('Error posting review: ', error);
    })
  }

  //this is used to add certain review characteristics into state - passed down as a prop & called in the 'ReviewForm' component
  addReviewPart(event) {
    let reviewPart = event.target.className
      this.setState({
        [reviewPart]: event.target.value
      });
  }
 //this is used to add certain review characteristics into state - passed down as a prop & called in the 'ReviewForm' component
  //I want to refactor these next 3 functions and combine them, but need to spend some time figuring out how to do so. The problem is that the rating component I'm using only sends back a number (the rating in this case) --need to figure out how to determine which component that number came from in order to combine

  addReviewQuality(rating) {
    this.setState({
      reviewQuality: rating
    })
  }
 //this is used to add certain review characteristics into state - passed down as a prop & called in the 'ReviewForm' component
  addReviewValue(rating) {
    this.setState({
      reviewValue: rating
    })
  }
 //this is used to add certain review characteristics into state - passed down as a prop & called in the 'ReviewForm' component
  addReviewEaseOfUse(rating) {
    this.setState({
      reviewEaseOfUse: rating
    })
  }
  addReviewRating(rating) {
    this.setState({
      reviewRating: rating
    })
  }

  //may or may not need this once we combine - this was used in order for me to test out switching up the productID in state to make sure the reviews were changing based on productID
  changeProduct(event) {
    let newProductID = event.target.value;
    this.setState({
      productID: newProductID
    }, () => {
      this.getReviewsByProductID(this.state.productID);
      // this.getAverageRating();
    })
  }

  //used to hide the div with the 'ReviewForm component'
  toggleReview(event) {
    event.preventDefault();
    let reviewDiv = document.getElementById('writeReviewForm')
    if (reviewDiv.className === 'rw-hidden' || !reviewDiv.className ) {
      reviewDiv.className = 'rw-visible'
    } else {
      reviewDiv.className = 'rw-hidden'
    }
  }
  render() {

    return (
      <div>
        <input onChange={this.changeProduct} type='text'></input>
        <div className='reviewStats'>
          <div className = 'ratingSummary'>
            <RatingCountByStar
            reviewAvg = {this.state.reviewAvg}
            reviewCounts = {this.state.reviewCounts}
            reviews = {this.state.reviews}
            />
          </div>
          <div className ='rating pros'>
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
          <div className = 'rating expertRating'>
            Expert Rating
            <br></br>
            <div className='avgRatingScore'>
              4.7
            </div>
            <div className='starRatings'>
              <StarRatings
                rating={4}
                starRatedColor="yellow"
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="3px"
                />
              <br></br>
              (50 ratings)
            </div>
          </div>
        </div>
        <div style={{borderBottom: '1px solid rgb(197, 203, 213)'}}>
          <FilterReview />
        </div>
        {this.state.reviews.map( (review, idx) =>
        <Review review={review}  key={idx} />
        )}
        <div style={{textAlign: 'center'}}>
          <button className='showReviewButtons show' >Show More</button>
          <button className ='showReviewButtons' onClick={this.toggleReview}>Write a Review</button>
        </div>
        <ReviewForm
          // review={this.state.addReview}
          addReviewPart={this.addReviewPart}
          reviewQuality = {this.addReviewQuality}
          reviewValue = {this.addReviewValue}
          reviewEaseOfUse = {this.addReviewEaseOfUse}
          reviewRating = {this.addReviewRating}
          writeReview = {this.writeReview}
          overallRating = {this.state.reviewRating}
          reviewHeading = {this.state.reviewHeading}
          reviewText = {this.state.reviewText}
          reviewQualityDefault = {this.state.reviewQuality}
          reviewValueDefault = {this.state.reviewValue}
          reviewEaseOfUseDefault = {this.state.reviewEaseOfUse}
          reviewUsername = {this.state.reviewUsername}
          reviewEmail = {this.state.reviewEmail}
        />
    </div>
    )
  }
}

  export default ReviewList