import classes from "./medication.module.css";
import AddMedication from "./addMedication";
import { Fragment, useState } from "react";
import GetMedication from "./getMedication";
import DrugList from "./drugList";
import PatientDrug from "./patientDrug";
import GetPatient from "./getPatient";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Medication() {
  const router = useRouter();
  const [record, setRecord] = useState(false);
  const [meds, setMeds] = useState(false);
  const [drug, setDrug] = useState(false);
  const [getPatient, setGetPatient] = useState(false);
  return (
    <Fragment>
      <Head>
        <title>Medication</title>
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
        <h1>Medications</h1>
        <div className={classes.actions}>
          <button
            onClick={() => setRecord((prevState) => !prevState)}
            className={classes.btn}
          >
            Record <br /> Medication
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
    </Fragment>
  );
}
