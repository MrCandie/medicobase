import React, { Fragment, useRef, useState } from "react";
import classes from "./medication.module.css";
import MedicationList from "./medicationList";
import Spinner from "../../spinner/spinner";

export default function GetMedication() {
  const [isLoading, setIsLoading] = useState(false);
  const [patientDrug, setPatientDrug] = useState([]);
  const [drug, setDrug] = useState([]);
  const [drugList, setDrugList] = useState(false);
  const searchRef = useRef();

  const searchHandler = (e) => {
    e.preventDefault();
    const enteredSearchItem = searchRef.current.value;
    setDrugList(true);

    if (!enteredSearchItem) {
      return;
    }

    setIsLoading(true);
    fetch("/api/medication")
      .then((res) => res.json())
      .then((data) => {
        setPatientDrug(data.message);
        setIsLoading(false);
      });

    const filteredDrug = patientDrug.filter(
      (drug) => drug.patient == enteredSearchItem
    );
    setDrug(filteredDrug);
  };

  return (
    <Fragment>
      <section className={classes.container}>
        <h1>Fetch Patient Medication History</h1>
        <form onSubmit={searchHandler} className={classes.form}>
          <input
            ref={searchRef}
            type="search"
            placeholder="enter patient full name"
          />
          <button>Fetch</button>
        </form>
      </section>
      {drugList && <MedicationList setDrugList={setDrugList} drug={drug} />}
      {isLoading && <Spinner />}
    </Fragment>
  );
}
