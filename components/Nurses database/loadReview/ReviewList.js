import { Fragment } from "react";
import classes from "./reviewlist.module.css";
import Popup from "../../popup/popup";

export default function ReviewList({ data, setReview }) {
  if (data.length === 0) {
    return (
      <Popup>
        <p className="center">No Reviews Found!...Try Later...</p>
        <div className="action">
          <button onClick={() => setReview(false)} className="btn">
            Close
          </button>
        </div>
      </Popup>
    );
  }
  return (
    <section className={classes.section}>
      <ul>
        {data.map((list) => {
          const time = new Date(list.time).toLocaleString();
          return (
            <li>
              {
                <p>
                  Patient Name:<span>{list.name}</span>
                </p>
              }
              <hr />
              {
                <p>
                  Diagnosis:<span>{list.diagnosis}</span>
                </p>
              }
              <hr />
              {
                <p>
                  New Findings:<span>{list.findings}</span>
                </p>
              }
              <hr />
              {
                <p>
                  Changes in care:<span>{list.changes}</span>
                </p>
              }
              <hr />
              {
                <p>
                  Doctor's Name:<span>{list.doctor}</span>
                </p>
              }
              <hr />
              {
                <p>
                  Review Time:<span>{time}</span>
                </p>
              }
              <hr />
            </li>
          );
        })}
      </ul>
      <button onClick={() => setReview(false)} className="btn">
        Close
      </button>
    </section>
  );
}
