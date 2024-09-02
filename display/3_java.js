// // 範囲指定でデータを取得
// const range = "original_sheet!G32:G46";
// const sheetId = '1mzq8dD3eU-CaZxN-gWO1JmFkO3Jht_C3YSY_W-lzrFs';
// // 取得したデータを配列に変換する関数
// function convertRangeToArray(rangeData) {
//     const startRow = 32;
//     const endRow = 46;
//     const sheetName = "original_sheet";
//     const sheetData = [];

//     for (let i = startRow; i <= endRow; i++) {
//         sheetData.push(`${sheetName}!G${i}`);
//     }

//     return sheetData;
// }

// // 例として、範囲データを配列に変換
// const sheetData = convertRangeToArray(range);
// console.log(sheetData);


// const apiKey = 'AIzaSyCycowG3GCqzemN0Pd7bXa2fA6Qpkw2Kx0';
// const apiKey2="AIzaSyD_fY5H4XDQp5QF9LiElBRhG1VI-m3HffM";
// const apiKey3="AIzaSyDfu_XrGz2SaA-kOg-v_0cGRMH8Xv8wzmQ";
// const apiKey4="AIzaSyBC8bPgWQbFa2Z6f8lJ44zpz6XzOHBKz24";


// async function fetchData(range, elementId) {
//     const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`サーバーからの応答が異常です: ${response.status}`);
//         }
//         const data = await response.json();

//         if (!data.values || data.values.length === 0) {
//             throw new Error('指定した範囲にデータが存在しません。');
//         }

//         const cellValue = data.values[0][0];
//         localStorage.setItem(elementId, cellValue);
//         document.getElementById(elementId).innerText = cellValue;

//         return cellValue;
//     } catch (error) {
//         console.error('データ取得エラー:', error);
//         document.getElementById(elementId).innerText = '---';
//         return "---";
//     }
// }

// async function fetchData2(range, elementId) {
//     const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey2}`;
    
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`サーバーからの応答が異常です: ${response.status}`);
//         }
//         const data = await response.json();

//         if (!data.values || data.values.length === 0) {
//             throw new Error('指定した範囲にデータが存在しません。');
//         }

//         const cellValue = data.values[0][0];
//         localStorage.setItem(elementId, cellValue);
//         document.getElementById(elementId).innerText = cellValue;

//         return cellValue;
//     } catch (error) {
//         console.error('データ取得エラー:', error);
//         document.getElementById(elementId).innerText = '---';
//         return "---";
//     }
// }

// async function fetchData3(range, elementId) {
//     const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey3}`;
    
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`サーバーからの応答が異常です: ${response.status}`);
//         }
//         const data = await response.json();

//         if (!data.values || data.values.length === 0) {
//             throw new Error('指定した範囲にデータが存在しません。');
//         }

//         const cellValue = data.values[0][0];
//         localStorage.setItem(elementId, cellValue);
//         document.getElementById(elementId).innerText = cellValue;

//         return cellValue;
//     } catch (error) {
//         console.error('データ取得エラー:', error);
//         document.getElementById(elementId).innerText = '---';
//         return "---";
//     }
// }

// async function fetchData4(range, elementId) {
//     const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey4}`;
    
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`サーバーからの応答が異常です: ${response.status}`);
//         }
//         const data = await response.json();

//         if (!data.values || data.values.length === 0) {
//             throw new Error('指定した範囲にデータが存在しません。');
//         }

//         const cellValue = data.values[0][0];
//         localStorage.setItem(elementId, cellValue);
//         document.getElementById(elementId).innerText = cellValue;

//         return cellValue;
//     } catch (error) {
//         console.error('データ取得エラー:', error);
//         document.getElementById(elementId).innerText = '---';
//         return "---"
//     }
// }
// let point1=document.getElementById("point1");
// console.log(fetchData(sheetData[0], 'point1'));
// console.log(fetchData2(sheetData[0], 'point1'));
// console.log(fetchData3(sheetData[0], 'point1'));
// console.log(fetchData4(sheetData[0], 'point1'));

const sheetId = '1mzq8dD3eU-CaZxN-gWO1JmFkO3Jht_C3YSY_W-lzrFs';
const apiKeys = [
    'AIzaSyCycowG3GCqzemN0Pd7bXa2fA6Qpkw2Kx0',
    'AIzaSyD_fY5H4XDQp5QF9LiElBRhG1VI-m3HffM',
    'AIzaSyDfu_XrGz2SaA-kOg-v_0cGRMH8Xv8wzmQ',
    'AIzaSyBC8bPgWQbFa2Z6f8lJ44zpz6XzOHBKz24'
];

// 単一の関数に統合し、APIキーのフォールバックを追加
async function fetchDataWithFallback(range, elementId, apiKeys, attempt = 0) {
    if (attempt >= apiKeys.length) {
        console.error('全てのAPIキーでのデータ取得に失敗しました。');
        document.getElementById(elementId).innerText = '---';
        return "---";
    }

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKeys[attempt]}`;
    
    try {
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
        console.error(`データ取得エラー: ${error.message}, APIキーの試行を切り替えます (${attempt + 1}/${apiKeys.length})`);
        return await fetchDataWithFallback(range, elementId, apiKeys, attempt + 1);
    }
}

// 範囲を配列に変換する関数
function convertRangeToArray(rangeData) {
    const startRow = 32;
    const endRow = 46;
    const sheetName = "original_sheet";
    const sheetData = [];

    for (let i = startRow; i <= endRow; i++) {
        sheetData.push(`${sheetName}!G${i}`);
    }

    return sheetData;
}

// データ取得の実行
const sheetData = convertRangeToArray("original_sheet!G32:G46");
setInterval(async () => {
    const result = await fetchDataWithFallback(sheetData[0], 'point1', apiKeys);
    console.log(result);
}, 100); // 5000ミリ秒（5秒）ごとに実行
