import { useRef, useState } from "react";
import Overlay from "../../overlay/overlay";
import Spinner from "../../spinner/spinner";
import classes from "./prescription.module.css";

export default function Prescription({ setPrescription }) {
  const nameRef = useRef();
  const doctorRef = useRef();
  const prescriptionRef = useRef();
  const [loading, setLoading] = useState(false);

  const prescriptionHandler = (e) => {
    e.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredDoctor = doctorRef.current.value;
    const enteredPrescription = prescriptionRef.current.value;

    if (!enteredName || !enteredDoctor || !enteredPrescription) {
      return;
    }

    const prescriptionData = {
      name: enteredName,
      doctor: enteredDoctor,
      prescription: enteredPrescription,
      time: new Date(),
    };

    setLoading(true);
    fetch("/api/prescription", {
      method: "POST",
      body: JSON.stringify(prescriptionData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setLoading(false);
      });
  };

  return (
    <section>
      <Overlay />
      <div className={classes.presc}>
        <h1>Enter Prescription</h1>
        <hr />
        <form onSubmit={prescriptionHandler}>
          <div className={classes.prescribe}>
            <label htmlFor="name">Patient Name</label>
            <input ref={nameRef} type="name" id="name" />
          </div>
          <div className={classes.prescribe}>
            <label htmlFor="name">Doctor's Name</label>
            <input ref={doctorRef} type="name" id="name" />
          </div>
          <div className={classes.prescribe}>
            <label htmlFor="name">Enter new prescription</label>
            <textarea ref={prescriptionRef} rows="3" id="name" />
          </div>
          <div className="action">
            <button className="btn">Submit</button>
            <button
              onClick={() => setPrescription(false)}
              type="button"
              className="btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      {loading && <Spinner />}
    </section>
  );
}
