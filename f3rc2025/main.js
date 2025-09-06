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
const api_key = "AIzaSyBUBFMVirf2m6HxxEbE6Pjt2zS5S_r2214";
const sheet_url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${api_key}`;

//
// 変数
//
var fetched_data;
var prev_timer_dict = {};
var setting_start_time = 0;
var match_start_time = 0;
var power_on_time = [0, 0];
var prev_remained_time = 0;
var current_remained_time = 0;
var update_count = 0;

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
    $team_dom[i].cable_hand = document.getElementById(`cable_hand_${lr[i]}`);
    $team_dom[i].oil = [];
    for (let j = 0; j < 3; j++) {
        $team_dom[i].oil.push(document.getElementById(`oil_${lr[i]}${j}`));
    }
    $team_dom[i].fuel_hand = document.getElementById(`fuel_hand_${lr[i]}`);
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
        console.log("fetch");
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
            cable_touched: +data.values[2][i] == 1,
            oil_num: +data.values[3][i],
            fuel_touched: +data.values[4][i] == 1,
            power_on: +data.values[5][i] == 1,
            name: data.values[6][i]
        }
    }

    data_dict.timer = {
        before_setting: +data.values[0][2] == 1,
        setting_timer_displayed: +data.values[1][2] == 1,
        setting_timer_started: +data.values[2][2] == 1,
        before_match: +data.values[3][2] == 1,
        match_timer_started: +data.values[4][2] == 1
    };

    return data_dict;
}

// タイマーを更新する(タイマー専門)
function renew_timer(timer_dict) {
    // タイムスタンプの取得
    if (!prev_timer_dict.setting_timer_started && timer_dict.setting_timer_started) {
        setting_start_time = new Date().getTime() / 1000;
    }
    if (!prev_timer_dict.match_timer_started && timer_dict.match_timer_started) {
        match_start_time = new Date().getTime() / 1000 + 5;
    }


    // 表示への反映
    var time = new Date().getTime() / 1000;
    if (timer_dict.match_timer_started) {
        current_remained_time = match_start_time + 180 - time;
        let remained_time = Math.ceil(current_remained_time);
        if (remained_time >= 185) {
            $timer.innerText = "5";
        } else if (remained_time > 180) {
            $timer.innerText = String(remained_time - 180);
        } else if (remained_time > 0) {
            $timer.innerText = `${Math.floor(remained_time / 60)}:${("00" + (remained_time % 60)).slice(-2)}`;
        } else {
            $timer.innerText = "0:00";
        }
    } else if (timer_dict.before_match) {
        $timer.innerText = "READY"
    } else if (timer_dict.setting_timer_started) {
        current_remained_time = setting_start_time + 60 - time;
        let remained_time = Math.ceil(current_remained_time);
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
    } else {
        $timer.style.fontSize = "200px";
    }
}

function renew_points(data_dict) {
    for (let i = 0; i < 2; i++) {
        let point = 0;
        if (data_dict.team_data[i].fuel_touched) {
            point += 2;
        }
        if (data_dict.team_data[i].cable_touched) {
            point += 2;
        }
        if (data_dict.team_data[i].fuel_touched && data_dict.team_data[i].cable_touched) {
            point += 1;
        }
        let fuel_num = data_dict.team_data[i].coal_num + data_dict.team_data[i].oil_num;
        point += fuel_num * 10;
        let cable_num = data_dict.team_data[i].cable_num;
        point += cable_num * 30;
        if (fuel_num == 6) {
            point += 85;
        }
        if (cable_num == 3) {
            point += 60;
        }
        $team_dom[i].point.innerText = String(point);
    }
}

// チーム別の表示(点数以外)を更新する
function renew_team_display(data_dict) {
    for (let i = 0; i < 2; i++) {
        // 送電線
        for (let j = 0; j < 3; j++) {
            if (j < data_dict.team_data[i].cable_num) {
                $team_dom[i].cable[j].style.opacity = "1.0";
            } else {
                $team_dom[i].cable[j].style.opacity = "0.2";
            }
        }
        // 石炭
        for (let j = 0; j < 3; j++) {
            if (j < data_dict.team_data[i].coal_num) {
                $team_dom[i].coal[j].style.opacity = "1.0";
            } else {
                $team_dom[i].coal[j].style.opacity = "0.2";
            }
        }
        // 送電線触れた
        if (data_dict.team_data[i].cable_touched) {
            $team_dom[i].cable_hand.style.opacity = "1.0";
        } else {
            $team_dom[i].cable_hand.style.opacity = "0.2";
        }
        // 石油
        for (let j = 0; j < 3; j++) {
            if (j < data_dict.team_data[i].oil_num) {
                $team_dom[i].oil[j].style.opacity = "1.0";
            } else {
                $team_dom[i].oil[j].style.opacity = "0.2";
            }
        }
        // 燃料触れた
        if (data_dict.team_data[i].fuel_touched) {
            $team_dom[i].fuel_hand.style.opacity = "1.0";
        } else {
            $team_dom[i].fuel_hand.style.opacity = "0.2";
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
    renew_points(data_dict);
    renew_team_display(data_dict);
}

// 音声を再生する
function playCountDownAudio() {
    var audio = document.getElementById("music_count_down");
    audio.play().catch((error) => {
        console.error("再生中にエラーが発生しました:", error);
    });
}

function playSettingAudio() {
    var audio = document.getElementById("music_setting");
    audio.play().catch((error) => {
        console.error("再生中にエラーが発生しました:", error);
    });
}

//
// 全体の更新
//
function updateImpl() {
    var data_dict = dataToDataDict(fetched_data);
    renew_display(data_dict);

    if (data_dict.timer.match_timer_started) {
        console.log(current_remained_time);
        if (prev_remained_time > 183.5 && current_remained_time <= 183.5 || prev_remained_time > 3.5 && current_remained_time <= 3.5) {
            playCountDownAudio();
            console.log("aaaaaaaa");
        }
    } else if (!data_dict.timer.before_match && data_dict.timer.setting_timer_started) {
        if (!prev_timer_dict.setting_timer_started) {
            playSettingAudio();
        } else if (prev_remained_time > 0 && current_remained_time <= 0) {
            playSettingAudio();
        }
    }
    prev_remained_time = current_remained_time;
    prev_timer_dict = data_dict.timer;
}

function update() {
    if (update_count % 15 == 0) {
        // API呼び出し上限が1分60回のため、呼び出し回数を削減
        fetchData().then(updateImpl);
    } else {
        // タイマーの表示を自然にするためにupdateは高頻度で
        updateImpl();
    }
    update_count++;
}

//
// 本流
//
setInterval(update, 100);