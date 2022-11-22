import React from "react";
import classes from "./medicationList.module.css";

export default function MedicationList({ drug, setDrugList }) {
  console.log(drug);
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
