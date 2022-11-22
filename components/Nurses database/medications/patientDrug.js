import classes from "./medicationList.module.css";

export default function PatientDrug({ drugs, setDrugList }) {
  return (
    <section className={classes.section}>
      <ul className={classes.drugs}>
        {drugs.map((drug) => (
          <li key={drug._id} className={classes.drug}>
            <p>
              Patient Name: <span>{drug.patient}</span>
            </p>
            <hr />
            <p>
              Drug: <span>{drug.name}</span>
            </p>
            <hr />
            <p>
              Dose: <span>{drug.dose}</span>
            </p>
            <hr />
            <p>
              Time: <span>{drug.time}</span>
            </p>
            <hr />
            <p>
              Route: <span>{drug.route}</span>
            </p>
            <hr />
          </li>
        ))}
      </ul>
      <div className={classes.action}>
        <button onClick={() => setDrugList(false)} className="btn">
          Close
        </button>
      </div>
    </section>
  );
}
