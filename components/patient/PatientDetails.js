import { Fragment, useState } from "react";
import classes from "./patientDetails.module.css";

export default function PatientDetails(props) {
  const [load, setLoad] = useState(false);
  const { patientData } = props;

  if (!patientData) {
    return <p>Loading...</p>;
  }

  return (
    <section className={classes.details}>
      <h1>{patientData.name}</h1>
      <hr />
      <h2>Patient Biodata</h2> <hr />
      <p>
        Patient Age: <span>{patientData.age}</span>
      </p>
      <hr />
      <p>
        Patient Address: <span>{patientData.address}</span>
      </p>
      <hr />
      <p>
        Marital Status: <span>{patientData.maritalStatus}</span>
      </p>
      <hr />
      <p>
        Gender: <span>{patientData.gender}</span>
      </p>
      <hr />
      <p>
        Occupation: <span>{patientData.occupation}</span>
      </p>
      <hr />
      <p>
        Weight: <span>{patientData.weight}kg</span>
      </p>
      <hr />
      <p>
        Height: <span>{patientData.height}m</span>
      </p>
      <hr />
      <p>
        DOB: <span>{patientData.age}</span>
      </p>
      <hr />
      <p>
        Next of kin: <span>{patientData.nextOfKin}</span>
      </p>
      <hr />
      <p>
        Date of admission: <span>{patientData.dateOfAdmission}</span>
      </p>
      <hr />
      <p>
        Patient Diagnosis: <span></span>
      </p>
      <hr />
      <p>
        Contact details: <span></span>
      </p>
      <hr />
      {!load && (
        <button onClick={() => setLoad(true)} className="btn">
          Load More
        </button>
      )}
      {load && (
        <Fragment>
          <h2>Patient History</h2> <hr />
          <p>
            complaint: <span>{patientData.complaint}</span>
          </p>
          <hr />
          <p>
            Family History: <span>{patientData.familyHistory}</span>
          </p>
          <hr />
          <p>
            Nursing History: <span>{patientData.nursingHistory}</span>
          </p>
          <hr />
          <p>
            Past History: <span>{patientData.pastHistory}</span>
          </p>
          <hr />
          <p>
            Present History: <span>{patientData.presentHistory}</span>
          </p>
          <hr />
          <p>
            observation: <span>{patientData.observation}</span>
          </p>
          <hr />
          <h2>Vital Signs</h2> <hr />
          <p>
            Temperature: <span>{patientData.temperature}degs</span>
          </p>
          <hr />
          <p>
            Respiration: <span>{patientData.respiration}c/m</span>
          </p>
          <hr />
          <p>
            Pulse: <span>{patientData.pulse}b/m</span>
          </p>
          <hr />
          <p>
            Blood Pressure: <span>{patientData.bloodPressure}mm/hg</span>
          </p>
          <hr />
        </Fragment>
      )}
    </section>
  );
}
