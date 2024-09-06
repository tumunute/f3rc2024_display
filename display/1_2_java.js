// 点数
const point1 = document.getElementById("point1");
const point2 = document.getElementById("point2");
// パイナップル
const pine1 = document.getElementById("pine1");
const pine2 = document.getElementById("pine2");
const pine3 = document.getElementById("pine3");
const pine4 = document.getElementById("pine4");
const pine5 = document.getElementById("pine5");
const pine6 = document.getElementById("pine6");
const pine7 = document.getElementById("pine7");
const pine8 = document.getElementById("pine8");
const pine9 = document.getElementById("pine9");
const pine10 = document.getElementById("pine10");
const pineNumberCellLeft = document.getElementById("pineNumberCellLeft");
const pineNumberCellRight = document.getElementById("pineNumberCellRight");
// チョコレート
const choco1 = document.getElementById("choco1");
const choco2 = document.getElementById("choco2");
const choco3 = document.getElementById("choco3");
const choco4 = document.getElementById("choco4");
const choco5 = document.getElementById("choco5");
const choco6 = document.getElementById("choco6");
const choco7 = document.getElementById("choco7");
const choco8 = document.getElementById("choco8");
const choco9 = document.getElementById("choco9");
const choco10 = document.getElementById("choco10");
const chocoNumbercellLeft = document.getElementById("chocoNumberCellLeft");
const chocoNumbercellRight = document.getElementById("chocoNumberCellRight");

// パンケーキ
const bread1 = document.getElementById("bread1");
const bread2 = document.getElementById("bread2");
const bread3 = document.getElementById("bread3");
const bread4 = document.getElementById("bread4");
const bread5 = document.getElementById("bread5");
const bread6 = document.getElementById("bread6");
const breadNumberCellLeft = document.getElementById("breadNumberCellLeft");
const breadNumberCellRight = document.getElementById("breadNumberCellRight");

// タイム
const timer = document.getElementById("timer");

// ボナペティ
const bon1 = document.getElementById("bon1");
const bon2 = document.getElementById("bon2");

// チェック
const check1 = document.getElementById("check1");
const check2 = document.getElementById("check2");

// 左側の大学
const leftUniversity = document.getElementById("leftUniversity");
const start = document.getElementById("start");
// 右側の大学
const rightUniversity = document.getElementById("rightUniversity");

// スプシで取得した範囲
const sheetId = "1mzq8dD3eU-CaZxN-gWO1JmFkO3Jht_C3YSY_W-lzrFs";

// 範囲指定でデータを取得
const range = "original_sheet!G32:G46";

// 取得したデータを配列に変換する関数
function convertRangeToArray(rangeData) {
  const startRow = 32;
  const endRow = 48;
  const sheetName = "original_sheet";
  const sheetData = [];

  for (let i = startRow; i <= endRow; i++) {
    sheetData.push(`${sheetName}!G${i}`);
  }

  return sheetData;
}

// 例として、範囲データを配列に変換
const sheetData = convertRangeToArray(range);

async function fetchData1(range, elementId) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKeys[0]}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`サーバーからの応答が異常です: ${response.status}`);
    }
    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      throw new Error("指定した範囲にデータが存在しません。");
    }

    const cellValue = data.values[0][0];
    localStorage.setItem(elementId, cellValue);
    document.getElementById(elementId).innerText = cellValue;

    return cellValue;
  } catch (error) {
    console.error("データ取得エラー:", error);
    document.getElementById(elementId).innerText = "---";
    return "---";
  }
}

async function fetchData2(range, elementId) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKeys[1]}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`サーバーからの応答が異常です: ${response.status}`);
    }
    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      throw new Error("指定した範囲にデータが存在しません。");
    }

    const cellValue = data.values[0][0];
    localStorage.setItem(elementId, cellValue);
    document.getElementById(elementId).innerText = cellValue;

    return cellValue;
  } catch (error) {
    console.error("データ取得エラー:", error);
    document.getElementById(elementId).innerText = "---";
    return "---";
  }
}

async function fetchData3(range, elementId) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKeys[2]}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`サーバーからの応答が異常です: ${response.status}`);
    }
    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      throw new Error("指定した範囲にデータが存在しません。");
    }

    const cellValue = data.values[0][0];
    localStorage.setItem(elementId, cellValue);
    document.getElementById(elementId).innerText = cellValue;

    return cellValue;
  } catch (error) {
    console.error("データ取得エラー:", error);
    document.getElementById(elementId).innerText = "---";
    return "---";
  }
}

async function fetchData4(range, elementId) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKeys[5]}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`サーバーからの応答が異常です: ${response.status}`);
    }
    const data = await response.json();

    if (!data.values || data.values.length === 0) {
      throw new Error("指定した範囲にデータが存在しません。");
    }

    const cellValue = data.values[0][0];
    localStorage.setItem(elementId, cellValue);
    document.getElementById(elementId).innerText = cellValue;

    return cellValue;
  } catch (error) {
    console.error("データ取得エラー:", error);
    document.getElementById(elementId).innerText = "---";
    return "---";
  }
}
// console.log(fetchData1(sheetData[0], 'point1'));
// console.log(fetchData2(sheetData[0], 'point1'));
// console.log(fetchData3(sheetData[0], 'point1'));

// スプシで取得した0か1の値に対して、1であれば指定した画像を表示、0であれば表示しない　という関数
function updateImageDisplay(range, elementId) {
  fetchData3(range, elementId).then((value) => {
    const imageElement = document.getElementById(elementId);
    // セルの値が "1" であれば画像を表示
    if (value === "1") {
      imageElement.style.display = " inline-block";
    } else {
      imageElement.style.display = "none";
    }
  });
}
// 大学の名前を表示する関数
function displayUniversity(range, elementId) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKeys[3]}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const nameOfUniversity = data.values[0][0];
      localStorage.setItem(elementId, nameOfUniversity);
      document.getElementById(elementId).innerText = nameOfUniversity;
      return nameOfUniversity;
    })
    .catch((error) => {
      // console.error('Error fetching data:', error);
      document.getElementById(elementId).innerText = "now_loading...";
      return "now_loading...";
    });
}

// いろいろ取得する
async function updateObjects() {
  try {
    // fetchData を待ち、その結果を整数に変換
    const dataPineLeft = await fetchData1(sheetData[6], "pineNumberCellLeft");
    const dataPineRight = await fetchData2(sheetData[7], "pineNumberCellRight");
    pineValueLeft = parseInt(dataPineLeft, 10);
    console.log(pineValueLeft);
    pineValueRight = parseInt(dataPineRight, 10);
    console.log(pineValueRight);

    const dataChocoLeft = await fetchData1(sheetData[8], "chocoNumberCellLeft");
    const dataChocoRight = await fetchData2(
      sheetData[9],
      "chocoNumberCellRight"
    );
    chocoValueLeft = parseInt(dataChocoLeft, 10);
    console.log(chocoValueLeft);
    chocoValueRight = parseInt(dataChocoRight, 10);
    console.log(chocoValueRight);

    const dataBreadLeft = await fetchData1(
      sheetData[10],
      "breadNumberCellLeft"
    );
    const dataBreadRight = await fetchData2(
      sheetData[11],
      "breadNumberCellRight"
    );
    breadValueLeft = parseInt(dataBreadLeft, 10);
    console.log(breadValueLeft);
    breadValueRight = parseInt(dataBreadRight, 10);
    console.log(breadValueRight);
  } catch (error) {
    console.error("Error:", error);
  }

  pine1.style.display = " inline-block";
  pine2.style.display = " inline-block";
  pine3.style.display = " inline-block";
  pine4.style.display = " inline-block";
  pine5.style.display = " inline-block";
  pine6.style.display = " inline-block";
  pine7.style.display = " inline-block";
  pine8.style.display = " inline-block";
  pine9.style.display = " inline-block";
  pine10.style.display = " inline-block";

  choco1.style.display = " inline-block";
  choco2.style.display = " inline-block";
  choco3.style.display = " inline-block";
  choco4.style.display = " inline-block";
  choco5.style.display = " inline-block";
  choco6.style.display = " inline-block";
  choco7.style.display = " inline-block";
  choco8.style.display = " inline-block";
  choco9.style.display = " inline-block";
  choco10.style.display = " inline-block";

  bread1.style.display = " inline-block";
  bread2.style.display = " inline-block";
  bread3.style.display = " inline-block";
  bread4.style.display = " inline-block";
  bread5.style.display = " inline-block";
  bread6.style.display = " inline-block";

  // 左側のパイン
  if (pineValueLeft === 5) {
  } else if (pineValueLeft === 4) {
    pine5.style.display = "none";
  } else if (pineValueLeft === 3) {
    pine4.style.display = "none";
    pine5.style.display = "none";
  } else if (pineValueLeft === 2) {
    pine3.style.display = "none";
    pine4.style.display = "none";
    pine5.style.display = "none";
  } else if (pineValueLeft === 1) {
    pine2.style.display = "none";
    pine3.style.display = "none";
    pine4.style.display = "none";
    pine5.style.display = "none";
  } else if (pineValueLeft === 0) {
    pine1.style.display = "none";
    pine2.style.display = "none";
    pine3.style.display = "none";
    pine4.style.display = "none";
    pine5.style.display = "none";
  }
  // 右側のパイン
  if (pineValueRight === 5) {
  } else if (pineValueRight === 4) {
    pine10.style.display = "none";
  } else if (pineValueRight === 3) {
    pine9.style.display = "none";
    pine10.style.display = "none";
  } else if (pineValueRight === 2) {
    pine8.style.display = "none";
    pine9.style.display = "none";
    pine10.style.display = "none";
  } else if (pineValueRight === 1) {
    pine7.style.display = "none";
    pine8.style.display = "none";
    pine9.style.display = "none";
    pine10.style.display = "none";
  } else if (pineValueRight === 0) {
    pine6.style.display = "none";
    pine7.style.display = "none";
    pine8.style.display = "none";
    pine9.style.display = "none";
    pine10.style.display = "none";
  }
  // 左側のチョコ
  if (chocoValueLeft === 5) {
  } else if (chocoValueLeft === 4) {
    choco5.style.display = "none";
  } else if (chocoValueLeft === 3) {
    choco4.style.display = "none";
    choco5.style.display = "none";
  } else if (chocoValueLeft === 2) {
    choco3.style.display = "none";
    choco4.style.display = "none";
    choco5.style.display = "none";
  } else if (chocoValueLeft === 1) {
    choco2.style.display = "none";
    choco3.style.display = "none";
    choco4.style.display = "none";
    choco5.style.display = "none";
  } else if (chocoValueLeft === 0) {
    choco1.style.display = "none";
    choco2.style.display = "none";
    choco3.style.display = "none";
    choco4.style.display = "none";
    choco5.style.display = "none";
  }
  // 右側のチョコ
  if (chocoValueRight === 5) {
  } else if (chocoValueRight === 4) {
    choco10.style.display = "none";
  } else if (chocoValueRight === 3) {
    choco9.style.display = "none";
    choco10.style.display = "none";
  } else if (chocoValueRight === 2) {
    choco8.style.display = "none";
    choco9.style.display = "none";
    choco10.style.display = "none";
  } else if (chocoValueRight === 1) {
    choco7.style.display = "none";
    choco8.style.display = "none";
    choco9.style.display = "none";
    choco10.style.display = "none";
  } else if (chocoValueRight === 0) {
    choco6.style.display = "none";
    choco7.style.display = "none";
    choco8.style.display = "none";
    choco9.style.display = "none";
    choco10.style.display = "none";
  }
  // 左側のパンケーキ
  if (breadValueLeft === 3) {
  } else if (breadValueLeft === 2) {
    bread3.style.display = "none";
  } else if (breadValueLeft === 1) {
    bread3.style.display = "none";
    bread2.style.display = "none";
  } else if (breadValueLeft === 0) {
    bread3.style.display = "none";
    bread2.style.display = "none";
    bread1.style.display = "none";
  }

  // 右側のパンケーキ
  if (breadValueRight === 3) {
  } else if (breadValueRight === 2) {
    bread6.style.display = "none";
  } else if (breadValueRight === 1) {
    bread5.style.display = "none";
    bread4.style.display = "none";
  } else if (breadValueRight === 0) {
    bread6.style.display = "none";
    bread5.style.display = "none";
    bread4.style.display = "none";
  }
}

// ここで本体表示
fetchData1(sheetData[0], "point1");
fetchData2(sheetData[1], "point2");
updateImageDisplay(sheetData[4], "bon1");
updateImageDisplay(sheetData[5], "bon2");
updateImageDisplay(sheetData[2], "check1");
updateImageDisplay(sheetData[3], "check2");
displayUniversity(sheetData[12], "leftUniversity");
displayUniversity(sheetData[13], "rightUniversity");
updateObjects();

setInterval(async () => {
  console.log("Interval triggered"); // インターバルが発火したことをログで確認
  try {
    await fetchData1(sheetData[0], "point1");
    await fetchData2(sheetData[1], "point2");
    updateImageDisplay(sheetData[4], "bon1");
    updateImageDisplay(sheetData[5], "bon2");
    updateImageDisplay(sheetData[2], "check1");
    updateImageDisplay(sheetData[3], "check2");
    await updateObjects(); // 正しく await されていることを確認
  } catch (error) {
    console.error("Interval error:", error);
  }
  document.getElementById("chocoNumberCellLeft").innerText = "";
  document.getElementById("chocoNumberCellRight").innerText = "";
  document.getElementById("pineNumberCellLeft").innerText = "";
  document.getElementById("pineNumberCellRight").innerText = "";
  document.getElementById("breadNumberCellLeft").innerText = "";
  document.getElementById("breadNumberCellRight").innerText = "";
}, 5000);

// スプレッドシートから値を取得する関数
async function fetchSpreadsheetValue(range) {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKeys[4]}`
  );
  const data = await response.json();
  return data.values[0][0]; // 取得した値を返す（例：1か0）
}

function playAudio() {
  var audio = document.getElementById("music");
  audio.play().catch((error) => {
    console.error("再生中にエラーが発生しました:", error);
  });
}

async function startTimer() {
  let nokori = 183; // 180秒（3分）
  let settingNokori = 61;
  let countdown = 3;
  let setting_flag = false;
  let regulation_flag = false;
  setInterval(async () => {
    const value = await fetchSpreadsheetValue(sheetData[14]);
    console.log(value);
    if (value === "1") {
      document.getElementById("timer").innerText = "set";
    } else if (value === "2") {
      if (!setting_flag) {
        settingNokori = 61;
        setting_flag = true;
      }
      settingNokori -= 1;
      const minutes = Math.floor(settingNokori / 60);
      const seconds = settingNokori % 60;

      const timeString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      console.log(timeString);

      if (settingNokori > 0) {
        document.getElementById("timer").innerText = timeString;
      } else {
        document.getElementById("timer").innerText = "0:00";
      }
    } else if (value === "3") {
      document.getElementById("timer").innerText = "stop";
    } else if (value === "4") {
      document.getElementById("timer").innerText = "ready";
    } else if (value === "5") {
      if (!regulation_flag) {
        nokori = 183;
        countdown = 3;
        regulation_flag = true;
      }
      countdown -= 1;
      nokori -= 1;

      console.log(countdown);
      console.log(nokori);

      const minutes = Math.floor(nokori / 60);
      const seconds = nokori % 60;
      const timeString = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      console.log(timeString);

      if (countdown < 4 && countdown > 0) {
        if (countdown === 3) {
          document.getElementById("timer").innerText = countdown;
          playAudio();
          console.log("ここでなるはず");
        }
        document.getElementById("timer").innerText = countdown;
      } else if (countdown < 1 && nokori > 177) {
        document.getElementById("timer").innerText = "GO!";
      } else if (nokori > 0 && nokori < 178) {
        if (nokori === 3) {
          document.getElementById("timer").innerText = timeString;
          playAudio();
          console.log("ここでなるはず");
        } else {
          document.getElementById("timer").innerText = timeString;
        }
      } else if (nokori < 1) {
        document.getElementById("timer").innerText = "FINISH!";
      }
    } else {
      console.log("タイマーは進行しません");
    }

    // タイマー停止時のリセット
    if (setting_flag && value != "2") {
      setting_flag = false;
    } else if (regulation_flag && value != "5") {
      regulation_flag = false;
    }
  }, 1000);
}

startTimer();
