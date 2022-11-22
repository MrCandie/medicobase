import { Fragment, useRef, useState } from "react";
import classes from "./loadreview.module.css";
import Spinner from "../../spinner/spinner";
import ReviewList from "./ReviewList";

export default function LoadReview() {
  const searchRef = useRef();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [review, setReview] = useState(false);
  const [allReview, setAllReview] = useState([]);
  const [showReview, setShowReview] = useState(false);

  const loadReviewHandler = () => {
    setShowReview((prev) => !prev);
    setLoading(true);
    fetch("/api/review")
      .then((res) => res.json())
      .then((data) => {
        const reviewData = data.message;
        setAllReview(reviewData);
        setLoading(false);
      });
  };
  const searchHandler = (e) => {
    e.preventDefault();
    const enteredSearch = searchRef.current.value;
    setReview(true);

    setLoading(true);
    fetch("/api/review")
      .then((res) => res.json())
      .then((data) => {
        const reviewData = data.message;

        const filteredData = reviewData.filter(
          (data) => data.name == enteredSearch
        );
        setData(filteredData);
        setLoading(false);
      });
  };
  return (
    <Fragment>
      <section className={classes.section}>
        <h1>View Doctor's Reviews</h1>
        <form onSubmit={searchHandler} className={classes.form}>
          <input
            ref={searchRef}
            type="search"
            placeholder="enter patient full name"
          />
          <button>Fetch Review</button>
        </form>
        <div className={classes.action}>
          <button onClick={loadReviewHandler} className="btn">
            Load All Reviews
          </button>
        </div>
        {loading && <Spinner />}
      </section>
      {showReview && <ReviewList setReview={setShowReview} data={allReview} />}
      {review && <ReviewList setReview={setReview} data={data} />}
    </Fragment>
  );
}
