import { useRef, useState } from "react";
import classes from "./nursesform.module.css";
import Spinner from "../spinner/spinner";
import { useRouter } from "next/router";

export default function NursesForm() {
  const [isLoading, setIsLoading] = useState(false);
  const wardNameRef = useRef();
  const numNursesOnDutyRef = useRef();
  const numNursesOnWardRef = useRef();
  const numPatientAdmissionRef = useRef();
  const nursesNameRef = useRef();
  const snrNurseNameRef = useRef();
  const router = useRouter();

  const wardFormHandler = (e) => {
    e.preventDefault();
    const enteredWardName = wardNameRef.current.value;
    const enteredNumNursesOnDuty = numNursesOnDutyRef.current.value;
    const enteredNursesOnWard = numNursesOnWardRef.current.value;
    const enteredNumPatientAdmission = numPatientAdmissionRef.current.value;
    const enteredNursesName = nursesNameRef.current.value;
    const enteredSnrNurseName = snrNurseNameRef.current.value;

    if (
      !enteredWardName ||
      !enteredNumNursesOnDuty ||
      !enteredNursesOnWard ||
      !enteredNumPatientAdmission ||
      !enteredNursesName ||
      !enteredSnrNurseName
    ) {
      return;
    }

    setIsLoading(true);
    fetch("/api/ward", {
      method: "POST",
      body: JSON.stringify({
        wardName: enteredWardName,
        numNursesDuty: enteredNumNursesOnDuty,
        numNursesWard: enteredNursesOnWard,
        numPatient: enteredNumPatientAdmission,
        nursesName: enteredNursesName,
        snrNurse: enteredSnrNurseName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setIsLoading(false);
      });
    router.replace("/ward");
  };
  return (
    <div className={classes.container}>
      <h1>Ensure to fill in every details correctly1</h1>
      <form onSubmit={wardFormHandler}>
        <div>
          <label htmlFor="name">Ward Name</label>
          <input ref={wardNameRef} id="name" type="text" />
        </div>
        <div>
          <label htmlFor="number">Number of nurses on ward</label>
          <input ref={numNursesOnWardRef} id="number" type="number" />
        </div>
        <div>
          <label htmlFor="duty">Number of nurses on duty</label>
          <input ref={numNursesOnDutyRef} id="duty" type="number" />
        </div>
        <div>
          <label htmlFor="adm">Number of patients on admission</label>
          <input ref={numPatientAdmissionRef} id="adm" type="number" />
        </div>
        <div>
          <label htmlFor="ward">Names of nurses on ward</label>
          <textarea ref={nursesNameRef} rows="4" id="ward" />
        </div>
        <div>
          <label htmlFor="snr">Senior Nurse On Duty</label>
          <input ref={snrNurseNameRef} id="snr" type="text" />
        </div>
        <button className={classes.btn}>Submit</button>
      </form>
      {isLoading && <Spinner />}
    </div>
  );
}
