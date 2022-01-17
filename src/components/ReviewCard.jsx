import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { likeReview, unlikeReview } from "../utils/api";
import { formatCategory } from "../utils/util-functions";

export default function ReviewCard({ review, isLoggedIn, sortBy }) {
  const [liked, setLiked] = useState(false);
  const [amountLikes, setAmountLikes] = useState(review.votes);
  const handleLike = () => {
    if (isLoggedIn) {
      likeReview(review.review_id); //patch API Call
      setLiked(true);
      setAmountLikes((currLikes) => currLikes + 1);
    }
  };
  useEffect(() => {
    console.log(review.votes);
    setAmountLikes(review.votes);
  }, [sortBy]);
  const handleUnlike = () => {
    if (isLoggedIn) {
      unlikeReview(review.review_id);
      setLiked(false);
      setAmountLikes((currLikes) => currLikes - 1);
    }
  };

  return (
    <>
      <div className="reviewCard">
        <h3>{`${review.title}`}</h3>
        <p>
          <b>Author: </b>
          {review.owner}
        </p>
        <p className="readMore">
          {`${review.review_body.slice(0, 50) + "... "}`}
          <nav className="readMore">
            <Link to={`/reviews/${review.review_id}`}>Read more!</Link>
          </nav>
        </p>
        <br/>

        <img className="reviewCardImg" src={review.review_img_url} />
        <p>
          <b>Category: </b> {formatCategory(review.category)} <b>Date: </b>{" "}
          {review.created_at.slice(0, 10)}
        </p>
        <p className="likes">
          {" "}
          <b>Likes: </b> {amountLikes}{" "} 
        
        {liked ? (
          <button onClick={handleUnlike} className="likeButton">
            👎
          </button>
        ) : (
          <button className="unlikeButton" onClick={handleLike}>
            👍
          </button>
        )}</p>
        {isLoggedIn ? null : <p>Please login to vote!</p>}

        <p>
          <b>Comments: </b>
          {review.comment_count}{" "}
        </p>
      </div>
      <br />
    </>
  );
}
