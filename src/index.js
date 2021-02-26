import './styles.css';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this._refs = this._getRefs(selector);
    this._endTime = targetDate.getTime();
    this._intervalId = setInterval(() => {
      this._currentTime = Date.now();
      this._deltaTime = this._endTime - this._currentTime;
      if (this._deltaTime <= 0) {
        this._stopTimer(this._intervalId, this._refs);
        return;
      }
      this._saveRestTime(this._deltaTime);
      this._updateFaceTimer(this._refs);
    }, 1000);
  }
  _getRefs(root) {
    const refs = {
      container: document.querySelector(`${root}`),
      days: document.querySelector(`${root} [data-value="days"]`),
      hours: document.querySelector(`${root} [data-value="hours"]`),
      mins: document.querySelector(`${root} [data-value="mins"]`),
      secs: document.querySelector(`${root} [data-value="secs"]`),
    };
    return refs;
  }

  _pad(value) {
    return String(value).padStart(2, '0');
  }

  _saveRestTime(differ) {
    this._days = this._pad(Math.floor(differ / (1000 * 60 * 60 * 24)));
    this._hours = this._pad(
      Math.floor((differ % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    this._mins = this._pad(
      Math.floor((differ % (1000 * 60 * 60)) / (1000 * 60)),
    );
    this._secs = this._pad(Math.floor((differ % (1000 * 60)) / 1000));
  }

  _updateFaceTimer({ days, hours, mins, secs }) {
    days.textContent = this._days;
    hours.textContent = this._hours;
    mins.textContent = this._mins;
    secs.textContent = this._secs;
  }

  _stopTimer(id, { container }) {
    clearInterval(id);
    const message = '<p class="message">Time is over</p>';
    container.insertAdjacentHTML('afterend', message);
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date(2021, 1, 26, 21, 18, 0),
});
