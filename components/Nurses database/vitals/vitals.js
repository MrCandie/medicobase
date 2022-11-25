import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useRef, useState } from "react";
import Spinner from "../../spinner/spinner";
import classes from "./vital.module.css";
import Popup from "../../popup/popup";
import VitalsForm from "./vitalsForm";
import VitalDetails from "./VitalDetails";

export default function Vitals() {
  const router = useRouter();
  const [vitals, setVitals] = useState(false);
  const [patientVital, setPatientVital] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vitalSigns, setVitalSigns] = useState([]);
  const [showVitals, setShowVitals] = useState(false);
  const searchRef = useRef();

  const searchHandler = (e) => {
    e.preventDefault();
    setShowVitals(true);
    const enteredSearchItem = searchRef.current.value;
    setIsLoading(true);
    fetch("/api/vitals")
      .then((res) => res.json())
      .then((data) => {
        setPatientVital(data.message);
        setIsLoading(false);
      });

    const filteredPatientVitals = patientVital.filter(
      (patient) => patient.name == enteredSearchItem
    );

    setVitalSigns(filteredPatientVitals);
  };

  return (
    <Fragment>
      <Head>
        <title>Vital Signs</title>
      </Head>
      <section className={classes.section}>
        <div className={classes.arrow}>
          <span
            onClick={() => {
              router.replace("/ward");
            }}
            class="material-symbols-outlined"
          >
            arrow_back
          </span>
        </div>
        <div className={classes.container}>
          <form onSubmit={searchHandler} className={classes.search}>
            <input
              ref={searchRef}
              placeholder="Enter patient full name"
              type="search"
            />
            <button>Fetch Patient Vitals</button>
          </form>
          <button
            onClick={() => setVitals((prevState) => !prevState)}
            className="btn"
          >
            Add New Vitals
          </button>
        </div>
        {showVitals && (
          <VitalDetails setShowVitals={setShowVitals} vitalSigns={vitalSigns} />
        )}
        {vitals && <VitalsForm setVitals={setVitals} />}
        {isLoading && <Spinner />}
      </section>
    </Fragment>
  );
}
