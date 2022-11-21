import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import createDatabase from "../../db-util";
import Spinner from "../spinner/spinner";
import classes from "./admin.module.css";

export default function Admin() {
  const [showNursingDatabase, setShowNursingDatabase] = useState(false);
  const [showDoctorDatabase, setShowDoctorDatabase] = useState(false);
  const [showLabDatabase, setShowLabDatabase] = useState(false);
  const [showRadiologyDatabase, setShowRadiologyDatabase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nursesRef = useRef();
  const doctorRef = useRef();
  const labRef = useRef();
  const radiologyRef = useRef();

  const createNursesDatabaseHandler = (e) => {
    e.preventDefault();
    const enteredNurseDeptName = nursesRef.current.value;

    setIsLoading(true);
    createDatabase(enteredNurseDeptName, setIsLoading);
  };
  const createDoctorDatabaseHandler = (e) => {
    e.preventDefault();
    const enteredDoctorDeptName = doctorRef.current.value;
    setIsLoading(true);
    createDatabase(enteredDoctorDeptName, setIsLoading);
  };
  const createLaboratoryDatabaseHandler = (e) => {
    e.preventDefault();
    const enteredLabDeptName = labRef.current.value;

    setIsLoading(true);
    createDatabase(enteredLabDeptName, setIsLoading);
  };

  const createRadiologyDatabaseHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const enteredRadiologyDeptName = radiologyRef.current.value;
    createDatabase(enteredRadiologyDeptName, setIsLoading);
  };
  return (
    <Fragment>
      <section className={classes.admin}>
        <h1>Organization Name: </h1>
        <h1>Organization Address: </h1>
        <h1>Admin Name: </h1>
        <h1>Total Number of Patients in the database: </h1>
        <div className={classes.department}>
          <h1>Create A New Department Database</h1>
          <Link
            onClick={() => {
              setShowDoctorDatabase((prevState) => !prevState);
            }}
            href=""
          >
            Doctors & Consultant Database
          </Link>
          <Link href="/nurses">Nurses Database</Link>
          <Link
            onClick={() => {
              setShowLabDatabase((prevState) => !prevState);
            }}
            href=""
          >
            Laboratory Database
          </Link>
          <Link
            onClick={() => {
              setShowRadiologyDatabase((prevState) => !prevState);
            }}
            href=""
          >
            Radiology Database
          </Link>
        </div>
      </section>
      {showNursingDatabase && (
        <Fragment>
          <section className={classes.nurses}>
            <h1>Create Database for nurses</h1>
            <form onSubmit={createNursesDatabaseHandler}>
              <div className={classes.input}>
                <label htmlFor="nurses">Enter Database Name</label>
                <input ref={nursesRef} id="nurses" type="text" />
              </div>
              <button>Create</button>
            </form>
          </section>
        </Fragment>
      )}
      {showDoctorDatabase && (
        <Fragment>
          <section className={classes.nurses}>
            <h1>Create Database for Doctors</h1>
            <form onSubmit={createDoctorDatabaseHandler}>
              <div className={classes.input}>
                <label htmlFor="nurses">Enter Database Name</label>
                <input ref={doctorRef} id="nurses" type="text" />
              </div>
              <button>Create</button>
            </form>
          </section>
        </Fragment>
      )}
      {showLabDatabase && (
        <Fragment>
          <section className={classes.nurses}>
            <h1>Create Database for Laboratory</h1>
            <form onSubmit={createLaboratoryDatabaseHandler}>
              <div className={classes.input}>
                <label htmlFor="nurses">Enter Database Name</label>
                <input ref={labRef} id="nurses" type="text" />
              </div>
              <button>Create</button>
            </form>
          </section>
        </Fragment>
      )}
      {showRadiologyDatabase && (
        <Fragment>
          <section className={classes.nurses}>
            <h1>Create Database for Radiology</h1>
            <form onSubmit={createRadiologyDatabaseHandler}>
              <div className={classes.input}>
                <label htmlFor="radiology">Enter Database Name</label>
                <input ref={radiologyRef} id="radiology" type="text" />
              </div>
              <button>Create</button>
            </form>
          </section>
        </Fragment>
      )}
      {isLoading && <Spinner />}
    </Fragment>
  );
}
