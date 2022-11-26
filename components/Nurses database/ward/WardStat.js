import { Fragment } from "react";
import Popup from "../../popup/popup";

export default function WardStat({ wardStat, setShowWardStat }) {
  if (wardStat.length === 0) {
    return (
      <Popup>
        <p className="center">No Stats found...</p>
        <div className="action">
          <button className="btn" onClick={() => setShowWardStat(false)}>
            Close
          </button>
        </div>
      </Popup>
    );
  }
  return (
    <Fragment>
      {wardStat.map((ward) => (
        <div className={classes.statistics}>
          <h2>Ward Statistics</h2>
          <h1>Ward Name: {ward.wardName}</h1>
          <hr />
          <h1>Number of Nurses on ward: {ward.numNursesWard}</h1> <hr />
          <h1>Number of nurses on duty: {ward.numNursesDuty}</h1> <hr />
          <h1>Names of nurses on ward: {ward.nursesName}</h1> <hr />
          <h1>Number of patients on admission: {ward.numPatient}</h1> <hr />
          <h1>Senior Nurse on duty: {ward.snrNurse}</h1> <hr />
        </div>
      ))}
    </Fragment>
  );
}
