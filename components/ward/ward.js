import React, { Fragment, useRef, useState } from "react";
import classes from "./ward.module.css";
import Link from "next/link";
import Head from "next/head";
import Spinner from "../spinner/spinner";
import { getPatientData, getSearchedPatient } from "../../db-util";
import PatientDetails from "../patient/PatientDetails";

export default function Ward() {
  const [wardStat, setWardStat] = useState([]);
  const [showWardStat, setShowWardStat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [patientData, setPatientData] = useState();
  const [showData, setShowData] = useState(false);
  const [request, setrequest] = useState(false);
  const searchRef = useRef();

  const searchPatientHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredName = searchRef.current.value;
    const patient = await getSearchedPatient(enteredName, setIsLoading);
    setPatientData(patient);
  };

  const showStatsHandler = () => {
    setShowWardStat((prevState) => !prevState);
    setIsLoading(true);
    fetch("/api/ward")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setWardStat(data.message);
        setIsLoading(false);
      });
  };
  const closeSearchResult = () => {
    setShowData(false);
    setPatientData(false);
  };

  return (
    <Fragment>
      <Head>
        <title></title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>
      <section className={classes.ward}>
        <div className={classes.stat}>
          <button onClick={showStatsHandler}>
            {showWardStat ? "Hide Ward Statiatics" : "Show Ward Stats"}
          </button>
          <Link href="/patient">Admit Patient</Link>
          <Link href="vital">Vital Signs</Link>
          <Link href="/medication">Medications</Link>
          <Link onClick={() => setrequest((prevState) => !prevState)} href="">
            Send Request
          </Link>
        </div>
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
        {patientData && (
          <div
            onClick={() => setShowData(true)}
            className={classes.searchresult}
          >
            <h1>{patientData.name}</h1>
          </div>
        )}
        {request && (
          <div className={classes.request}>
            <Link href="">Doctor</Link>
            <hr />
            <Link href="">Pharmacy</Link>
            <hr />
            <Link href="">Laboratory</Link>
            <hr />
            <Link href="">Radiology</Link>
          </div>
        )}
        {showWardStat && (
          <Fragment>
            {wardStat.map((ward) => (
              <div className={classes.statistics}>
                <h2>Ward Statistics</h2>
                <h1>Ward Name: {ward.wardName}</h1>
                <hr />
                <h1>Number of Nurses on ward: {ward.numNursesWard}</h1> <hr />
                <h1>Number of nurses on duty: {ward.numNursesDuty}</h1> <hr />
                <h1>Names of nurses on ward: {ward.nursesName}</h1> <hr />
                <h1>Number of patients on admission: {ward.numPatient}</h1>{" "}
                <hr />
                <h1>Senior Nurse on duty: {ward.snrNurse}</h1> <hr />
              </div>
            ))}
          </Fragment>
        )}
        {showData && <PatientDetails patientData={patientData} />}
        {showData && (
          <button onClick={closeSearchResult} className={classes.btn}>
            Close
          </button>
        )}
      </section>
      {isLoading && <Spinner />}
    </Fragment>
  );
}
