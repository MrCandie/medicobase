import classes from "./vital.module.css";
import Popup from "../../popup/popup";

export default function VitalDetails({ vitalSigns, setShowVitals }) {
  if (vitalSigns.length === 0) {
    return (
      <Popup>
        <p className="center">No vital signs data found</p>
        <div className="action">
          <button onClick={() => setShowVitals(false)} className="btn">
            Close
          </button>
        </div>
      </Popup>
    );
  }
  return (
    <div className={classes.vitals}>
      {vitalSigns.map((vital) => {
        const date = new Date(vital.timeUploaded).toLocaleString("en-US");

        return (
          <div className={classes.vital}>
            <h1>
              Name: <span>{vital.name}</span>
            </h1>{" "}
            <hr />
            <h1>
              Temperature: <span>{vital.temperature}deg</span>
            </h1>
            <hr />
            <h1>
              Pulse: <span>{vital.pulse}b/m</span>
            </h1>
            <hr />
            <h1>
              Respiration: <span>{vital.respiration}c/m</span>
            </h1>
            <hr />
            <h1>
              Blood Pressure: <span>{vital.bloodPressure}mmHg</span>
            </h1>
            <hr />
            <h1>
              Comments: <span>{vital.comment}</span>
            </h1>
            <hr />
            <h1>
              Nurse Name:<span> {vital.nurseName}</span>
            </h1>
            <hr />
            <h1>
              Time: <span>{date}</span>
            </h1>
            <hr />
          </div>
        );
      })}
      <div className="action">
        <button onClick={() => setShowVitals(false)} className="btn">
          Close
        </button>
      </div>
    </div>
  );
}
