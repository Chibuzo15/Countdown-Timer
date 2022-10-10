// unix timestamp is number of seconds since January 1st, 1970 at 00:00:00 UTC

// varibale to store the setInterval function
var interval;
// start date in unix timestamp
var startDate;
// end date in unix timestamp
var endDate;

/**
 * MAIN FUNCTIONS
 */
function start() {
  // get inputted value

  const inputValue = document.getElementById("seconds").value;

  if (!inputValue) {
    alert("No value inputted");
    return;
  }

  if (parseInt(inputValue) > 60 * 60 * 24) {
    alert("Maximum countdown time value is exceeded: 24 hours limit!");
  }

  //
  // parseInt() to convert input value from text type to integer
  const valueInMilliSeconds = parseInt(inputValue) * 1000;

  // set start date to current date
  startDate = new Date().getTime(); // .getTime() converts the date object to timestamp
  endDate = startDate + valueInMilliSeconds;

  // start for interval
  startInterval();

  // start for windwo animation frame
  // window.requestAnimationFrame(runFrame);
}

function reset() {
  // resets all values and stops timer
  //
  // reset all values
  endDate = undefined;
  startDate = undefined;
  //
  // stop timer
  clearInterval(interval);

  //   clear html texts
  const timer1 = document.getElementById("timer-1");
  const timer2 = document.getElementById("timer-2");

  timer1.innerText = "00:00:00";
  timer2.innerText = "00:00:00";
}

//
//This is a function to update the current values displayed on the screen
function runInterval() {
  // get the current date in UNIX
  const currentDate = new Date().getTime();
  //
  // get remainder time
  if (endDate == undefined) {
    // do not run this frame function is end date is not defined
    return;
  }
  const remainingTime = endDate - currentDate;
  const remainingTimeInSeconds = remainingTime / 1000;

  //   reset if its zero or less
  if (remainingTime <= 0) {
    alert("Countdown is Up!!");
    reset();
  }

  // format values
  // display values as hours:minutes:seconds

  // MODULO operator ' % ' will be used
  // because we want seconds and minutes capped at 60
  // and hours capped at 24

  // Math.floor to approximate to next lower decimal

  // this expression makes sure seconds is 60 or less
  const seconds = Math.floor(remainingTimeInSeconds % 60);

  // minutes
  let minutes = 0;
  // if remaining time is above 1 hour , use modulus operator to cap minutes at 60
  if (remainingTimeInSeconds > 60 * 60) {
    let time = remainingTimeInSeconds % (60 * 60); // get remainder time in sec
    minutes = Math.floor(time / 60);
  } else {
    // if less than 1 hr then use direct divide by 60
    minutes = Math.floor(remainingTimeInSeconds / 60);
  }

  // hours
  let hours = 0;
  // 1 day = (60 * 60 * 24) seconds
  // if remaining time is above 1 day , use modulus operator to cap hours at 24
  if (remainingTimeInSeconds > 60 * 60 * 24) {
    let time = remainingTimeInSeconds % (60 * 60 * 24);
    hours = Math.floor(time / (60 * 60));
  } else {
    // if not then use direct divide by 3600
    hours = Math.floor(remainingTimeInSeconds / (60 * 60));
  }

  // pass values to render function for displaying on html
  renderForInterval({
    hour: hours,
    min: minutes,
    sec: seconds,
  });
}

// same as runInterval, but its for window.animationFrame()
function runFrame() {
  // get the current date in UNIX
  const currentDate = new Date().getTime();
  //
  // get remainder time
  if (endDate == undefined) {
    // do not run this frame function is end date is not defined
    return;
  }
  const remainingTime = endDate - currentDate;
  const remainingTimeInSeconds = remainingTime / 1000;

  //   reset if its zero or less
  if (remainingTime <= 0) {
    alert("Countdown is Up!!");
    reset();
  }

  // format values
  // display values as hours:minutes:seconds

  // MODULO operator ' % ' will be used
  // because we want seconds and minutes capped at 60
  // and hours capped at 24

  // Math.floor to approximate to next lower decimal

  // this expression makes sure seconds is 60 or less
  const seconds = Math.floor(remainingTimeInSeconds % 60);

  // minutes
  let minutes = 0;
  // if remaining time is above 1 hour , use modulus operator to cap minutes at 60
  if (remainingTimeInSeconds > 60 * 60) {
    let time = remainingTimeInSeconds % (60 * 60);
    minutes = Math.floor(time / 60);
  } else {
    // if less than 1 hr then use direct divide by 60
    minutes = Math.floor(remainingTimeInSeconds / 60);
  }

  // hours
  let hours = 0;
  // 1 day = (60 * 60 * 24) seconds
  // if remaining time is above 1 day , use modulus operator to cap hours at 24
  if (remainingTimeInSeconds > 60 * 60 * 24) {
    let time = remainingTimeInSeconds % (60 * 60 * 24);
    hours = Math.floor(time / (60 * 60));
  } else {
    // if not then use direct divide by 3600
    hours = Math.floor(remainingTimeInSeconds / (60 * 60));
  }

  renderForAnimated({
    hour: hours,
    min: minutes,
    sec: seconds,
  });

  //
  // This is for animation frame method
  // if remaining time is more than zero seconds, call the function again
  if (remainingTime > 0) {
    window.requestAnimationFrame(runFrame);
  }
}

/**
 * FUNCTIONS TO DISPLAY VALUE
 */

//argument destructuring to get hour, min, sec
function renderForInterval({ hour, min, sec }) {
  const timer1 = document.getElementById("timer-1");

  //   format texts to double digits
  let hr = hour.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let m = min.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let s = sec.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  timer1.innerText = `${hr}:${m}:${s}`;
}

function renderForAnimated({ hour, min, sec }) {
  const timer2 = document.getElementById("timer-2");

  //   format texts to double digits
  let hr = hour.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let m = min.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  let s = sec.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  timer2.innerText = `${hr}:${m}:${s}`;
}

/**
 * HELPER FUNCTIONS
 */

function startInterval() {
  // this function calls
  interval = setInterval(() => {
    runInterval();
  }, 1000);
}
