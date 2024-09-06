
let nokori = 184; // 180秒 + 3カウント
let settingNokori = 61;
let countdown = 3;
let setting_flag = false;
let regulation_flag = false;
let last_status = "0"
let setContDown;

check = setInterval( () => {
  const value = localStorage.getItem("14"); //ストップ
  const timeStamp = localStorage.getItem("15"); //タイムスタンプ
  const timeDiff = new Date() - timeStamp;
  if (value !== last_status) {
    clearInterval(setContDown);
    setting_flag = false;
    regulation_flag = false;
    updateTimer();
    setTimeout( () => {
      setContDown = setInterval(() => {
        updateTimer();
      }, 1000);  
    }, (-timeDiff) % 1000 + 1000);
    last_status = value;
  }
}, 50);

function updateTimer() {
  const value = localStorage.getItem("14"); //ストップ
  switch (value) {
    case "1":
      timer.innerText = "set"
      break;
  
    case "2":
      if (!setting_flag) {
        settingNokori = 61;
        setting_flag = true;
      }
      
      if (settingNokori > 0) {
        settingNokori--;
      } 
      timer.innerText = timeFormat(settingNokori);
      break;

    case "3":
      timer.innerText = "stop";
      break;

    case "4":
      timer.innerText = "ready";
      break;

    case "5":
      if (!regulation_flag) {
        nokori = 184;
        regulation_flag = true;
      }
      if (nokori > 0) {
        nokori--;
      }

      if (180 < nokori && nokori <= 183) {
        timer.innerText = nokori - 180;
        if (nokori === 183) {
          // playAudio();
        }
      } else if (178 < nokori && nokori <= 180) {
        timer.innerText = "GO!";
      } else if (0 < nokori && nokori <= 178) {
        timer.innerHTML = timeFormat(nokori);
        if (nokori === 3) {
          // playAudio();
        }
      } else {
        timer.innerText = "FINISH!";
      }
      break;

    default:
      break;
  }
};


function timeFormat(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;

  return `${minutes}:${("00" + seconds).slice(-2)}`;
}