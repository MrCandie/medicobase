import Head from "next/head";
import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import classes from "./portal.module.css";
import PatientReview from "../review/PatientReview";
import Spinner from "../../spinner/spinner";
import RequestList from "../requests/requestList";
import Prescription from "../prescription/prescription";
import { getSearchedPatient } from "../../../db-util";
import PatientDetails from "../../Nurses database/patient/PatientDetails";

export default function DoctorPortal() {
  const [loading, setLoading] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [data, setData] = useState([]);
  const [prescription, setPrescription] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [patientData, setPatientData] = useState();
  const [patientDetail, setPatientDetails] = useState(false);
  const [showData, setShowData] = useState();
  const searchRef = useRef();

  const searchPatientHandler = async (e) => {
    e.preventDefault();
    setShowData(true);
    setPatientDetails(true);
    const enteredSearch = searchRef.current.value;
    setLoading(true);
    const response = await fetch("/api/patient");
    const data = await response.json();
    const searchedPt = data.message;

    const patient = searchedPt.find((patient) => patient.name == enteredSearch);
    setPatientData(patient);
    setLoading(false);
    searchRef.current.value = "";
  };

  // console.log(patientData);

  const loadRequestHandler = () => {
    setShowRequest(true);
    setLoading(true);
    fetch("/api/request")
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
        setLoading(false);
      });
  };

  const [review, setReview] = useState(false);
  return (
    <Fragment>
      <Head>
        <title>Doctor</title>
      </Head>
      <section className={classes.doctor}>
        <h1>Doctor's Portal</h1>
        <hr />

        <div className={classes.action}>
          <Link
            onClick={() => setReview((prevState) => !prevState)}
            href=""
            className="btn"
          >
            Review <br /> Patient
          </Link>
          <Link onClick={loadRequestHandler} className="btn" href="">
            View <br /> Requests
          </Link>
          <Link onClick={() => setPrescription(true)} className="btn" href="">
            Send <br /> Prescription
          </Link>
          <Link
            onClick={() => setShowForm((prev) => !prev)}
            className="btn"
            href=""
          >
            Search <br /> Patient
          </Link>
        </div>
      </section>
      {showForm && (
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
      )}
      {review && <PatientReview setReview={setReview} />}
      {showRequest && (
        <RequestList setShowRequest={setShowRequest} data={data} />
      )}
      {prescription && <Prescription setPrescription={setPrescription} />}
      {showData && (
        <PatientDetails setShowData={setShowData} patientData={patientData} />
      )}

      {loading && <Spinner />}
    </Fragment>
  );
}
