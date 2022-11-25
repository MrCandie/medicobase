import React, { Fragment } from "react";
import classes from "./medicationList.module.css";
import Popup from "../../popup/popup";

export default function MedicationList({ drug, setDrugList }) {
  console.log(drug);
  if (drug.length === 0) {
    return (
      <Popup>
        <p className="center">No drug found</p>
        <div className={classes.action}>
          <button onClick={() => setDrugList(false)} className="btn">
            Close
          </button>
        </div>
      </Popup>
    );
  }
  return (
    <section className={classes.section}>
      <ul className={classes.drugs}>
        {drug.map((drugs) => {
          const time = new Date(drugs.timestamp).toLocaleString();
          return (
            <li className={classes.drug}>
              <p>
                Patient Name: <span>{drugs.patient}</span>
              </p>
              <hr />
              <p>
                Drug: <span>{drugs.name}</span>
              </p>
              <hr />
              <p>
                Dose: <span>{drugs.dose}</span>
              </p>
              <hr />
              <p>
                Nurse: <span>{drugs.nurse}</span>
              </p>
              <hr />
              <p>
                Time: <span>{time}</span>
              </p>
              <hr />
            </li>
          );
        })}
      </ul>
      <div className={classes.action}>
        <button onClick={() => setDrugList(false)} className="btn">
          Close
        </button>
      </div>
    </section>
  );
}
