import classes from "./requestList.module.css";

export default function RequestList({ data, setShowRequest }) {
  return (
    <section className={classes.section}>
      <ul>
        {data.map((list) => {
          const time = new Date(list.time).toLocaleString();
          return (
            <li>
              {
                <p>
                  Department Name:<span>{list.name}</span>
                </p>
              }
              <hr />
              {
                <p>
                  Request:<span>{list.request}</span>
                </p>
              }
              <hr />
              {
                <p>
                  Sender:<span>{list.sender}</span>
                </p>
              }
              <hr />
              {
                <p>
                  Time:<span>{time}</span>
                </p>
              }
              <hr />
            </li>
          );
        })}
      </ul>
      <div className={classes.action}>
        <button onClick={() => setShowRequest(false)} className="btn">
          Close
        </button>
      </div>
    </section>
  );
}
