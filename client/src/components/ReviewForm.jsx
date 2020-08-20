import React from 'react';
import Rating from 'react-rating';
// import '../styles/ReviewForm.css'
import StarRatings from 'react-star-ratings';


const ReviewForm = ({ review, addReviewPart, reviewQuality, reviewValue, reviewEaseOfUse, reviewRating, writeReview, reviewHeading, reviewText, reviewQualityDefault, reviewValueDefault, reviewEaseOfUseDefault, reviewUsername, reviewEmail }) => {

  return (
    <div id = 'writeReviewForm' class = 'rw-hidden' >
      <div className = 'bufferReview' >
      </div>
      <div  className = 'reviewForm' >
        <h4> Overall rating: </h4>
        <StarRatings
          className = 'reviewRating'
          onClick = { reviewRating }
          starDimension = "33px"
          starSpacing = "0px"
          isSelectable = { true }
          changeRating = { rating => reviewRating(rating) }
          starHoverColor = "yellow"
          starRatedColor = "yellow"
        />
        <div>
        <br></br>
          <h5> Summary </h5>
          <input type = "text" className = 'reviewHeading' onChange = { addReviewPart } value = { reviewHeading } ></input>
          <br></br>
          <em style = {{ fontSize: '13px' }}> Example: Great Camera for beginners! </em>
        </div>
        <div>
          <h5> Your review </h5>
          <textarea className = 'reviewText' onChange = { addReviewPart } value = { reviewText}  ></textarea>
          <br></br>
          <em style = {{ fontSize: '13px' }}> Minimum required characters: 50 </em>
        </div>
        <br></br>
        <div>
          <h5> Would you recommend this to a friend? </h5>
          <input className = 'reviewRecommended' onChange = { addReviewPart } type = 'radio' id = 'yes' name = 'recommended' value = { true } defaultChecked = { false } ></input>
          <label htmlFor = 'yes'> Yes </label><br></br>
          <input className = 'reviewRecommended' onChange = { addReviewPart } type = 'radio' id = 'no' name = 'recommended' value = { false } defaultChecked = { false } ></input>
          <label htmlFor = 'no' > No </label><br></br>
        </div>
        <div>
          <h5> Help us break it down </h5>
          Quality: <Rating
                      onClick = { reviewQuality }
                      emptySymbol = { <div className = "emptyRating" ></div>}
                      fullSymbol = { <div className = "fullRating" ></div> }
                      initialRating = { reviewQualityDefault }
                   />
          <br></br>
          Value: <Rating
                    onClick = { reviewValue }
                    emptySymbol = { <div className = "emptyRating" ></div> }
                    fullSymbol = { <div className = "fullRating" ></div> }
                    initialRating = { reviewValueDefault }
                  />
          <br></br>
          Ease of Use: <Rating
                          onClick = { reviewEaseOfUse }
                          emptySymbol = { <div className = "emptyRating" ></div> }
                          fullSymbol = { <div className = "fullRating" ></div> }
                          initialRating = { reviewEaseOfUseDefault }
                       />
        <br></br>
        </div>
        <br></br>
        <div>
          <h5> Add a photo </h5>
          <input type = 'file' ></input>
        </div>
        <br></br>
        <div>
          <h5> Tell us a little about yourself. </h5>
          <p style = {{ fontSize: '15px' }}><strong> Create a nickname </strong></p>
          <input className = 'reviewUsername' type = 'text' onChange = { addReviewPart } value = { reviewUsername } ></input>
          <p style = {{ fontSize: '15px' }}><strong> Email address </strong><em> Optional </em></p>
          <input className = 'reviewEmail' type = 'text' onChange = { addReviewPart } value = { reviewEmail } ></input>
        </div>
        <button onClick = { writeReview } className = 'reviewSubmit' > Submit Review </button>
      </div>
    </div>
    )
}

export default ReviewForm;