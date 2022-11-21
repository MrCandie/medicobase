import { useRef, useState } from "react";
import Spinner from "../spinner/spinner";
import classes from "./vital.module.css";
import VitalDetails from "./VitalDetails";
import VitalsForm from "./vitalsForm";

export default function Vitals() {
  const [vitals, setVitals] = useState(false);
  const [patientVital, setPatientVital] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vitalSigns, setVitalSigns] = useState([]);
  const searchRef = useRef();

  const searchHandler = (e) => {
    e.preventDefault();
    const enteredSearchItem = searchRef.current.value;
    setIsLoading(true);
    fetch("/api/vitals")
      .then((res) => res.json())
      .then((data) => {
        setPatientVital(data.message);
        setIsLoading(false);
      });

    console.log(patientVital);

    const filteredPatientVitals = patientVital.filter(
      (patient) => patient.name == enteredSearchItem
    );

    setVitalSigns(filteredPatientVitals);
    console.log(vitalSigns);
  };
  return (
    <section className={classes.section}>
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
      <div className={classes.vitals}>
        {vitalSigns.map((vital) => {
          const date = new Date(vital.timeUploaded).toLocaleString("en-US");
          console.log(date);
          return (
            <div className={classes.vital}>
              <h1>
                Name: <span>{vital.name}</span>
              </h1>{" "}
              <hr />
              <h1>
                Temperature: <span>{vital.temperature}deg</span>
              </h1>
              <hr />
              <h1>
                Pulse: <span>{vital.pulse}b/m</span>
              </h1>
              <hr />
              <h1>
                Respiration: <span>{vital.respiration}c/m</span>
              </h1>
              <hr />
              <h1>
                Blood Pressure: <span>{vital.bloodPressure}mmHg</span>
              </h1>
              <hr />
              <h1>
                Comments: <span>{vital.comment}</span>
              </h1>
              <hr />
              <h1>
                Nurse Name:<span> {vital.nurseName}</span>
              </h1>
              <hr />
              <h1>
                Time: <span>{date}</span>
              </h1>
              <hr />
            </div>
          );
        })}
      </div>
      {vitals && <VitalsForm />}
      {isLoading && <Spinner />}
    </section>
  );
}
