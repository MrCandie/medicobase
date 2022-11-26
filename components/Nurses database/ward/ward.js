import React, { Fragment, useState } from "react";
import classes from "./ward.module.css";
import Link from "next/link";
import Head from "next/head";
import Spinner from "../../spinner/spinner";
import PatientDetails from "../patient/PatientDetails";
import { useRouter } from "next/router";
import LoadReview from "../loadReview/LoadReview";
import DoctorRequest from "../requests/DoctorRequest";
import WardRequest from "./wardRequest";
import WardStat from "./WardStat";
import PatientSearch from "./PatientSearch";

export default function Ward() {
  const router = useRouter();
  const [wardStat, setWardStat] = useState([]);
  const [showWardStat, setShowWardStat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [patientData, setPatientData] = useState();
  const [showData, setShowData] = useState(false);
  const [request, setrequest] = useState(false);
  const [review, setReview] = useState(false);
  const [req, setReq] = useState(false);

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
        <title>Ward</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>
      <section className={classes.ward}>
        <div className={classes.arrow}>
          <span
            onClick={() => {
              router.replace("/nurses");
            }}
            class="material-symbols-outlined"
          >
            arrow_back
          </span>
        </div>
        <div className={classes.stat}>
          <Link href="" onClick={showStatsHandler}>
            {showWardStat ? "Hide Ward Statiatics" : "Show Ward Stats"}
          </Link>
          <Link href="/patient">Admit Patient</Link>
          <Link href="vital">Vital Signs</Link>
          <Link href="/medication">Medications</Link>
          <Link onClick={() => setrequest((prevState) => !prevState)} href="">
            Send Request
          </Link>
          <Link onClick={() => setReview((prev) => !prev)} href="">
            Doctor Reviews
          </Link>
        </div>
        <PatientSearch
          setPatientData={setPatientData}
          setIsLoading={setIsLoading}
          setShowData={setShowData}
        />
        {patientData && (
          <div
            onClick={() => setShowData(true)}
            className={classes.searchresult}
          >
            <h1>{patientData.name}</h1>
          </div>
        )}
        {request && <WardRequest setrequest={setrequest} setReq={setReq} />}
        {showWardStat && (
          <WardStat setShowWardStat={setShowWardStat} wardStat={wardStat} />
        )}
        {review && <LoadReview />}
        {showData && (
          <PatientDetails setShowData={setShowData} patientData={patientData} />
        )}
        {req && <DoctorRequest setReq={setReq} />}
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
