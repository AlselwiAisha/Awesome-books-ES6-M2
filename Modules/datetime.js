import { DateTime } from './luxon.js';

const showTime = () => {
    debugger;
  const dateTime = document.querySelector('#time');
  const timeDate = () => {
    setInterval(() => {
      const dt = DateTime.utc().toLocal();
      dateTime.innerHTML = dt.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
    }, 0);
  };

  timeDate();
};

export default showTime;