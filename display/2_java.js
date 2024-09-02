const sheetId = '1mzq8dD3eU-CaZxN-gWO1JmFkO3Jht_C3YSY_W-lzrFs';
const sheetData = [
    "original_sheet!G32",
    "original_sheet!G33",
    "original_sheet!G34",
    "original_sheet!G35",
    "original_sheet!G36",
    "original_sheet!G37",
    "original_sheet!G38",
    "original_sheet!G39",
    "original_sheet!G40",
    "original_sheet!G41",
    "original_sheet!G42",
    "original_sheet!G43",
    "original_sheet!G44",
    "original_sheet!G45",
];
const apiKey = 'AIzaSyCycowG3GCqzemN0Pd7bXa2fA6Qpkw2Kx0';

async function fetchData(range, elementId) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    
    try {
        console.log(`Fetching data from URL: ${url}`); // デバッグ用に追加
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`サーバーからの応答が異常です: ${response.status}`);
        }
        const data = await response.json();

        if (!data.values || data.values.length === 0) {
            throw new Error('指定した範囲にデータが存在しません。');
        }

        const cellValue = data.values[0][0];
        localStorage.setItem(elementId, cellValue);
        document.getElementById(elementId).innerText = cellValue;

        return cellValue;
    } catch (error) {
        console.error('データ取得エラー:', error);
        document.getElementById(elementId).innerText = '---';
        return "---";
    }
}

// 範囲を配列から取得してfetchDataを呼び出す
fetchData(sheetData[0], 'point1');
fetchData(sheetData[1], 'point2');

const sheetData2="original_sheet!G32:G45"
console.log(sheetData2);


// データを取得する関数


// 関数を呼び出してデータを取得
console.log(getSheetData());
