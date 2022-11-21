import classes from "./medication.module.css";
import AddMedication from "./addMedication";
import { useState } from "react";
import GetMedication from "./getMedication";
import DrugList from "./drugList";
import PatientDrug from "./patientDrug";
import GetPatient from "./getPatient";

export default function Medication() {
  const [record, setRecord] = useState(false);
  const [meds, setMeds] = useState(false);
  const [drug, setDrug] = useState(false);
  const [getPatient, setGetPatient] = useState(false);
  return (
    <section className={classes.section}>
      <h1>Medications</h1>
      <div className={classes.actions}>
        <button
          onClick={() => setRecord((prevState) => !prevState)}
          className={classes.btn}
        >
          Record Medication
        </button>
        <button
          onClick={() => setMeds((prevState) => !prevState)}
          className={classes.btn}
        >
          Fetch Patient History
        </button>
        <button
          onClick={() => setDrug((prevState) => !prevState)}
          className={classes.btn}
        >
          Upload Patient Medications
        </button>
        <button
          onClick={() => setGetPatient((prevState) => !prevState)}
          className={classes.btn}
        >
          Fetch Patient Drugs
        </button>
      </div>
      {record && <AddMedication setRecord={setRecord} />}
      {meds && <GetMedication />}
      {drug && <DrugList drug={setDrug} />}
      {getPatient && <GetPatient />}
    </section>
  );
}
