import { useRef } from "react";
import classes from "./ward.module.css";
import { getSearchedPatient } from "../../../db-util";

export default function PatientSearch({
  setShowData,
  setIsLoading,
  setPatientData,
}) {
  const searchRef = useRef();

  const searchPatientHandler = async (e) => {
    e.preventDefault();

    const enteredName = searchRef.current.value;
    if (!enteredName) {
      return;
    }
    setShowData(true);
    setIsLoading(true);

    const patient = await getSearchedPatient(enteredName, setIsLoading);
    setPatientData(patient);
    searchRef.current.value = "";
  };
  return (
    <div className={classes.search}>
      <form onSubmit={searchPatientHandler}>
        <input
          id="search"
          ref={searchRef}
          type="search"
          placeholder="Enter Patient Full Name"
        />
        <button>Search Patient</button>
      </form>
    </div>
  );
}
