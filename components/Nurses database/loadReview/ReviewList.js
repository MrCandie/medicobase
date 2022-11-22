import classes from "./reviewlist.module.css";

export default function ReviewList({ data, setReview }) {
  return (
    <section className={classes.section}>
      <ul>
        {data.map((list) => {
          const time = new Date(list.time).toLocaleString();
          return (
            <li>
              {
                <p>
                  Patient Name:<span>{list.name}</span>
                </p>
              }
              <hr />
              {
                <p>
                  Diagnosis:<span>{list.diagnosis}</span>
                </p>
              }
              <hr />
              {
                <p>
                  New Findings:<span>{list.findings}</span>
                </p>
              }
              <hr />
              {
                <p>
                  Changes in care:<span>{list.changes}</span>
                </p>
              }
              <hr />
              {
                <p>
                  Doctor's Name:<span>{list.doctor}</span>
                </p>
              }
              <hr />
              {
                <p>
                  Review Time:<span>{time}</span>
                </p>
              }
              <hr />
            </li>
          );
        })}
      </ul>
      <button onClick={() => setReview(false)} className="btn">
        Close
      </button>
    </section>
  );
}
