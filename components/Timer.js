import Countdown from "react-countdown";
import styles from "../styles/Modal.module.css";

export default function Timer() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>Nova palavra disponível! Atualize a página.</span>;
    } else {
      // Render a countdown
      return (
        <span>
          {hours.toString().padStart(2, "0")}:
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </span>
      );
    }
  };

  return (
    <div className={styles.timer}>
      <i className={`fas fa-stopwatch ${styles.clockIcon}`}></i>
      <div className={styles.timerInfo}>
        <span>Tempo até a próxima palavra</span>
        <Countdown date={date} renderer={renderer}></Countdown>
      </div>
    </div>
  );
}
