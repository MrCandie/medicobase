import React from "react";
import classes from "../loadReview/reviewlist.module.css";
import Popup from "../../popup/popup";

export default function LoadPrescription({ data, setshowPrescription }) {
  if (data.length === 0) {
    return (
      <Popup>
        <p className="center">No Prescriptions found</p>
        <div className="action">
          <button onClick={() => setshowPrescription(false)} className="btn">
            Close
          </button>
        </div>
      </Popup>
    );
  }
  return (
    <section className={classes.section}>
      <h1>New Prescriptions</h1>
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
                  Doctor's Name:<span>{list.doctor}</span>
                </p>
              }
              <hr />

              {
                <p>
                  Prescription:<span>{list.prescription}</span>
                </p>
              }
              <hr />
              {
                <p>
                  Time:<span>{time}</span>
                </p>
              }
              <hr />
            </li>
          );
        })}
      </ul>
      <button onClick={() => setshowPrescription(false)} className="btn">
        Close
      </button>
    </section>
  );
}
