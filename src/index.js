import './styles.css';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.refs = this.getRefs(selector);
    this.endTime = targetDate.getTime();
    this.intervalId = setInterval(() => {
      this.currentTime = Date.now();
      this.deltaTime = this.endTime - this.currentTime;
      if (this.deltaTime <= 0) {
        this.stopTimer(this.intervalId, this.refs);
        return;
      }
      this.saveRestTime(this.deltaTime);
      this.updateFaceTimer(this.refs);
    }, 1000);
  }
  getRefs(root) {
    const refs = {
      container: document.querySelector(`${root}`),
      days: document.querySelector(`${root} [data-value="days"]`),
      hours: document.querySelector(`${root} [data-value="hours"]`),
      mins: document.querySelector(`${root} [data-value="mins"]`),
      secs: document.querySelector(`${root} [data-value="secs"]`),
    };
    return refs;
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  saveRestTime(differ) {
    this.days = this.pad(Math.floor(differ / (1000 * 60 * 60 * 24)));
    this.hours = this.pad(
      Math.floor((differ % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    this.mins = this.pad(Math.floor((differ % (1000 * 60 * 60)) / (1000 * 60)));
    this.secs = this.pad(Math.floor((differ % (1000 * 60)) / 1000));
  }

  updateFaceTimer({ days, hours, mins, secs }) {
    days.textContent = this.days;
    hours.textContent = this.hours;
    mins.textContent = this.mins;
    secs.textContent = this.secs;
  }

  stopTimer(id, { container }) {
    clearInterval(id);
    const message = '<p class="message">Time is over</p>';
    container.insertAdjacentHTML('afterend', message);
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(2021, 3, 1, 11, 11, 0),
});
