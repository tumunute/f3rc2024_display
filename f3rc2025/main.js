// 音を鳴らすためのもの
$cover = document.getElementById("cover");
$cover.onclick = () => {
    $cover.style.display = "none";
}

//
// 基本パラメーター
//

// スプシのデータを取るための情報
const sheetId = "1QzzrpKhsqCrdO96jF8X1TP47icwknGuqvcYKWPlC3y4";
const range = "display!G21:I28";
const api_key = "AIzaSyDgvcVnc7jG1ZSkSK4BMGAfj585fkgCXKg";
const sheet_url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${api_key}`;

//
// 変数
//
var fetched_data;
var prev_timer_dict = {};
var setting_start_time = 0;
var match_start_time = 0;
var power_on_time = [0, 0];

//
// DOM要素の取得
//
var $team_dom = [{}, {}];
var lr = ["l", "r"];
for (let i = 0; i < 2; i++) {
    $team_dom[i].point = document.getElementById(`point_${lr[i]}`);
    $team_dom[i].univ = document.getElementById(`univ_${lr[i]}`);

    $team_dom[i].cable = [];
    for (let j = 0; j < 3; j++) {
        $team_dom[i].cable.push(document.getElementById(`cable_${lr[i]}${j}`));
    }
    $team_dom[i].coal = [];
    for (let j = 0; j < 3; j++) {
        $team_dom[i].coal.push(document.getElementById(`coal_${lr[i]}${j}`));
    }
    $team_dom[i].coal_hand = document.getElementById(`coal_hand_${lr[i]}`);
    $team_dom[i].oil = [];
    for (let j = 0; j < 3; j++) {
        $team_dom[i].oil.push(document.getElementById(`oil_${lr[i]}${j}`));
    }
    $team_dom[i].oil_hand = document.getElementById(`oil_hand_${lr[i]}`);
    $team_dom[i].power_on = document.getElementById(`power_on_${lr[i]}`);

}
var $timer = document.getElementById(`timer`);

//
// 便利関数
//

// スプシのデータをfetch
async function fetchData() {
    try {
        const response = await fetch(sheet_url);
        if (!response.ok) {
            throw new Error(`サーバーからの応答が異常です: ${response.status}`);
        }
        fetched_data = await response.json();

        if (!fetched_data.values || fetched_data.values.length === 0) {
            throw new Error("指定した範囲にデータが存在しません。");
        }

        return fetched_data;
    } catch (error) {
        console.error("データ取得エラー:", error);
        document.getElementById(elementId).innerText = "---";
        return "---";
    }
}

// fetched_dataを扱いやすい形式に変換する
function dataToDataDict(data) {
    var data_dict = {};
    data_dict.team_data = [];
    for (let i = 0; i < 2; i++) {
        data_dict.team_data[i] = {
            cable_num: +data.values[0][i],
            coal_num: +data.values[1][i],
            coal_touched: +data.values[2][i] == 1,
            oil_num: +data.values[3][i],
            oil_touched: +data.values[4][i] == 1,
            power_on: +data.values[5][i] == 1,
            name: data.values[6][i],
            power_on_time: +data.values[7][i]
        }
    }

    data_dict.timer = {
        before_setting: +data.values[0][2] == 1,
        setting_timer_displayed: +data.values[1][2] == 1,
        setting_timer_started: +data.values[2][2] == 1,
        before_match: +data.values[3][2] == 1,
        match_timer_started: +data.values[4][2] == 1,
        setting_start_time: +data.values[5][2],
        match_start_time: +data.values[6][2]
    };

    return data_dict;
}

// タイマーを更新する(タイマー専門)
function renew_timer(timer_dict) {
    // タイムスタンプの取得
    if(!prev_timer_dict.setting_timer_started && timer_dict.setting_timer_started) {
        setting_start_time = new Date().getTime() / 1000;
    }
    if(!prev_timer_dict.match_timer_started && timer_dict.match_timer_started) {
        match_start_time = new Date().getTime() / 1000 + 5;
    }
    

    // 表示への反映
    var time = new Date().getTime() / 1000;
    prev_during_match = during_match;
    during_match = false;
    if (timer_dict.match_timer_started) {
        let remained_time = Math.ceil(match_start_time + 180 - time);
        if (remained_time >= 185) {
            $timer.innerText = "5";
        } else if (remained_time > 180) {
            $timer.innerText = String(remained_time - 180);
        } else if (remained_time > 0) {
            $timer.innerText = `${Math.floor(remained_time / 60)}:${("00" + (remained_time % 60)).slice(-2)}`;
            during_match = true;
        } else {
            $timer.innerText = "0:00";
        }
    } else if (timer_dict.before_match) {
        $timer.innerText = "READY"
    } else if (timer_dict.setting_timer_started) {
        let remained_time = Math.ceil(setting_start_time + 60 - time);
        if (remained_time >= 60) {
            $timer.innerText = "1:00";
        } else if (remained_time > 0) {
            $timer.innerText = `0:${("00" + remained_time % 60).slice(-2)}`;
        } else {
            $timer.innerText = "0:00";
        }
    } else if (timer_dict.setting_timer_displayed) {
        $timer.innerText = "1:00";
    } else {
        $timer.innerText = "SETTING"
    }

    if ($timer.innerText.length > 4) {
        $timer.style.fontSize = "100px";
    }

    prev_timer_dict = timer_dict;
}

// チーム別の表示を更新する
function renew_team_display(data_dict) {
    for (let i = 0; i < 2; i++) {
        // 送電線
        for (let j = 0; j < 3; j++) {
            if (j < data_dict.team_data[i].cable_num) {
                $team_dom[i].cable[j].style.opacity = "1.0";
            } else {
                $team_dom[i].cable[j].style.opacity = "0.0";
            }
        }
        // 石炭
        for (let j = 0; j < 3; j++) {
            if (j < data_dict.team_data[i].coal_num) {
                $team_dom[i].coal[j].style.opacity = "1.0";
            } else {
                $team_dom[i].coal[j].style.opacity = "0.0";
            }
        }
        // 石炭触れた
        if (data_dict.team_data[i].coal_touched) {
            $team_dom[i].coal_hand.style.opacity = "1.0";
        } else {
            $team_dom[i].coal_hand.style.opacity = "0.0";
        }
        // 石油
        for (let j = 0; j < 3; j++) {
            if (j < data_dict.team_data[i].oil_num) {
                $team_dom[i].oil[j].style.opacity = "1.0";
            } else {
                $team_dom[i].oil[j].style.opacity = "0.0";
            }
        }
        // 石油触れた
        if (data_dict.team_data[i].oil_touched) {
            $team_dom[i].oil_hand.style.opacity = "1.0";
        } else {
            $team_dom[i].oil_hand.style.opacity = "0.0";
        }
        // Power On
        if (data_dict.team_data[i].power_on) {
            $team_dom[i].power_on.style.opacity = "1.0";
        } else {
            $team_dom[i].power_on.style.opacity = "0.0";
        }
        // チーム名
        $team_dom[i].univ.innerText = data_dict.team_data[i].name;
    }

}

// 表示全てを更新する
function renew_display(data_dict) {
    renew_timer(data_dict.timer);
    renew_team_display(data_dict);
}

// 音声を再生する
function playAudio() {
    var audio = document.getElementById("music");
    audio.play().catch((error) => {
        console.error("再生中にエラーが発生しました:", error);
    });
}

//
// 全体の更新
//
function update() {
    fetchData().then(() => {
        var data_dict = dataToDataDict(fetched_data);
        renew_display(data_dict);
        if (!prev_during_match && during_match) {
            playAudio();
        }
    });
}

//
// 本流
//
setInterval(update, 1000);