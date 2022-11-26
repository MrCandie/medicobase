import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useRef, useState } from "react";
import classes from "./patient.module.css";
import Spinner from "../../spinner/spinner";
import Popup from "../../popup/popup";

export default function Patients() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const nameRef = useRef();
  const addressRef = useRef();
  const maritalRef = useRef();
  const genderRef = useRef();
  const ageRef = useRef();
  const nextOfKinRef = useRef();
  const dateOfAdmissionRef = useRef();
  const occupationRef = useRef();
  const observationRef = useRef();
  const complaintRef = useRef();
  const temperatureRef = useRef();
  const respirationRef = useRef();
  const pulseRef = useRef();
  const bpRef = useRef();
  const commentsRef = useRef();
  const nursingHistoryRef = useRef();
  const pastHistoryRef = useRef();
  const presentHistoryRef = useRef();
  const childhoodHistoryRef = useRef();
  const familyHistoryRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredMaritalStatus = maritalRef.current.value;
    const enteredGender = genderRef.current.value;
    const enteredAge = ageRef.current.value;
    const enteredNextOfKin = nextOfKinRef.current.value;
    const enteredDateOfAdmission = dateOfAdmissionRef.current.value;
    const enteredOccupation = occupationRef.current.value;
    const enteredFamilyHistory = familyHistoryRef.current.value;
    const enteredChildhoodHistory = childhoodHistoryRef.current.value;
    const enteredPresentHistory = presentHistoryRef.current.value;
    const enteredPastHistory = pastHistoryRef.current.value;
    const enteredNursingHistory = nursingHistoryRef.current.value;
    const enteredComment = commentsRef.current.value;
    const enteredBp = bpRef.current.value;
    const enteredPulse = pulseRef.current.value;
    const enteredTemperature = temperatureRef.current.value;
    const enteredRespiration = respirationRef.current.value;
    const enteredComplaint = complaintRef.current.value;
    const enteredObs = observationRef.current.value;

    if (
      enteredName.trim() === "" ||
      enteredAge.trim() === "" ||
      enteredBp.trim() === "" ||
      enteredChildhoodHistory.trim() === "" ||
      enteredComment.trim() === "" ||
      enteredComplaint.trim() === "" ||
      enteredDateOfAdmission.trim() === "" ||
      enteredFamilyHistory.trim() === "" ||
      enteredGender.trim() === "" ||
      enteredMaritalStatus.trim() === "" ||
      enteredNextOfKin.trim() === "" ||
      enteredNursingHistory.trim() === "" ||
      enteredObs.trim() === "" ||
      enteredOccupation.trim() === "" ||
      enteredPastHistory.trim() === "" ||
      enteredPresentHistory.trim() === "" ||
      enteredPulse.trim() === "" ||
      enteredRespiration.trim() === "" ||
      enteredTemperature.trim() === ""
    ) {
      return;
    }

    setLoading(true);
    fetch("/api/patient", {
      method: "POST",
      body: JSON.stringify({
        name: enteredName,
        age: enteredAge,
        gender: enteredGender,
        maritalStatus: enteredMaritalStatus,
        address: enteredAddress,
        nextOfKin: enteredNextOfKin,
        dateOfAdmission: enteredDateOfAdmission,
        occupation: enteredOccupation,
        familyHistory: enteredFamilyHistory,
        childhoodHistory: enteredChildhoodHistory,
        presentHistory: enteredPresentHistory,
        pastHistory: enteredPastHistory,
        nursingHistory: enteredNursingHistory,
        observation: enteredObs,
        complaint: enteredComplaint,
        temperature: enteredTemperature,
        pulse: enteredPulse,
        respiration: enteredRespiration,
        bloodPressure: enteredBp,
        comment: enteredComment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          setErrorMsg("Problem admitting patient... Try Again");
          setError(true);
          setLoading(false);
        }
        return res.json();
      })
      .then((data) => {
        setMsg(data.message);
        setSuccess(true);
        setLoading(false);
      });
  };

  if (error) {
    return (
      <Popup>
        <p className="error">{errorMsg}</p>
        <div className="action">
          <button onClick={() => setError(false)} className="btn">
            Close
          </button>
        </div>
      </Popup>
    );
  }

  if (success) {
    return (
      <Popup>
        <p className="center">{msg}</p>
        <div className="action">
          <button onClick={() => setSuccess(false)} className="btn">
            Close
          </button>
        </div>
      </Popup>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>Admission</title>
      </Head>
      <section className={classes.container}>
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
        <div className={classes.body}>
          <h1 className={classes.h1}>Add a new patient to database</h1>
          <hr />

          <form onSubmit={submitHandler}>
            <div className={classes.category}>
              <h1>Enter patient biodata</h1>
            </div>
            <div className={classes.patient}>
              <label htmlFor="name">Patient Name</label>
              <input ref={nameRef} id="name" type="text" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="age">Patient Age</label>
              <input ref={ageRef} id="age" type="date" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="sec">Gender</label>
              <select ref={genderRef} htmlFor="sex">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className={classes.patient}>
              <label htmlFor="weight">Weight in kg</label>
              <input ref={nextOfKinRef} id="weight" type="text" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="height">Height</label>
              <input ref={nextOfKinRef} id="height" type="text" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="marital">Marital Status</label>
              <select ref={maritalRef} htmlFor="marital">
                <option value="single">Single</option>
                <option value="married">married</option>
                <option value="divorced">divorced</option>
                <option value="widowed">widowed</option>
              </select>
            </div>
            <div className={classes.patient}>
              <label htmlFor="job">Patient Occupation</label>
              <input ref={occupationRef} id="job" type="text" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="kin">Next Of Kin</label>
              <input ref={nextOfKinRef} id="kin" type="text" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="address">Patient Residential Address</label>
              <input ref={addressRef} id="address" type="text" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="date">Date of Admission</label>
              <input ref={dateOfAdmissionRef} id="date" type="text" />
            </div>

            <div className={classes.category}>
              <h1>Enter patient history</h1>
            </div>
            <div className={classes.patient}>
              <label htmlFor="nursing">Nursing History</label>
              <textarea ref={nursingHistoryRef} rows="5" id="nursing" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="present">History Of Present Illness</label>
              <textarea ref={presentHistoryRef} rows="5" id="present" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="past">Past Medical History</label>
              <textarea ref={pastHistoryRef} rows="5" id="past" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="childhood">Childhood Illness</label>
              <textarea ref={childhoodHistoryRef} rows="3" id="childhood" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="family">Family History</label>
              <textarea ref={familyHistoryRef} rows="3" id="family" />
            </div>

            <div className={classes.category}>
              <h1>Record Patient Vital Signs</h1>
            </div>
            <div className={classes.patient}>
              <label htmlFor="temp">Temperature in Celsius</label>
              <input ref={temperatureRef} id="temp" type="text" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="bp">Blood Pressure</label>
              <input ref={bpRef} id="bp" type="text" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="pulse">Pulse</label>
              <input ref={pulseRef} id="pulse" type="text" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="respiration">Respiration</label>
              <input ref={respirationRef} id="respiration" type="text" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="comment">Add Comments</label>
              <textarea
                placeholder="Any abnormalities?"
                rows="5"
                id="comment"
                type="text"
                ref={commentsRef}
              />
            </div>

            <div className={classes.category}>
              <h1>Record Observations, complaints</h1>
            </div>
            <div className={classes.patient}>
              <label htmlFor="obs">Enter Observation</label>
              <textarea ref={observationRef} rows="4" id="obs" />
            </div>
            <div className={classes.patient}>
              <label htmlFor="comp">Enter Patient Complaint</label>
              <textarea ref={complaintRef} rows="4" id="comp" />
            </div>

            <button className="btn">Register Patient</button>
          </form>
        </div>
      </section>
      {loading && <Spinner />}
    </Fragment>
  );
}
