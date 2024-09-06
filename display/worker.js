let sheetId='1mzq8dD3eU-CaZxN-gWO1JmFkO3Jht_C3YSY_W-lzrFs';
let apiKeys = [
    'AIzaSyBryr75R3SRBqJh4FizXNauEEEcuXCfOLw',//F3RC-administration-judgement
    'AIzaSyBTOHtW657T7pW8qDbxIwkOiCQsCCKFcyo',//F3RC-administration-judgement2
    'AIzaSyACio62QoPRJ29rK2BY0Hm1nr9fwlXeIXs',//F3RC-administration-judgement3
    'AIzaSyAe0xvphXhdyHCUYaZKHOo8NSYxDyiOpMI',//F3RC-administration-judgement4
    "AIzaSyCutbM3oCR398a9Dpk9b1Hd-45QBBHDoA8",//F3RC-administration-judgement5
    "AIzaSyBvJ1nqjfbcuc91TZ5F-Shcx90OBkE0dIs"//11
];

// スプレッドシートから値を取得する関数
async function fetchSpreadsheetValue(range) {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKeys[4]}`);
    const data = await response.json();
    return data.values[0][0]; // 取得した値を返す（例：1か0）
}

// worker.js
self.onmessage = async function(event) {
    const sheetData = event.data.sheetData;
    setInterval(async () => {
        const value = await fetchSpreadsheetValue(sheetData[14]);
        self.postMessage(value);
    }, 3000);
};




