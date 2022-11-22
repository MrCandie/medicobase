import React, { useRef, useState } from "react";
import classes from "./medication.module.css";
import Spinner from "../../spinner/spinner";
import PatientDrug from "./patientDrug";

export default function GetPatient() {
  const [loading, setLoading] = useState(false);
  const [drug, setDrug] = useState([]);
  const [drugList, setDrugList] = useState(false);
  const searchRef = useRef();

  const searchHandler = (e) => {
    e.preventDefault();
    const enteredSearch = searchRef.current.value;

    setDrugList(true);

    setLoading(true);
    fetch("/api/medication/drugs")
      .then((res) => {
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        const drugs = data.message;
        const filteredDrug = drugs.filter(
          (drug) => drug.patient == enteredSearch
        );
        setDrug(filteredDrug);
        setLoading(false);
      });
  };
  return (
    <div>
      <section className={classes.container}>
        <h1>Fetch Patient Drug Prescriptions</h1>
        <form onSubmit={searchHandler} className={classes.form}>
          <input
            ref={searchRef}
            type="search"
            placeholder="enter patient full name"
          />
          <button>Fetch</button>
        </form>
      </section>
      {drugList && <PatientDrug setDrugList={setDrugList} drugs={drug} />}
      {loading && <Spinner />}
    </div>
  );
}
