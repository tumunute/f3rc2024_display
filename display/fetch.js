// スプシで取得した範囲
const sheetId = "1mzq8dD3eU-CaZxN-gWO1JmFkO3Jht_C3YSY_W-lzrFs";
// 範囲指定でデータを取得
const range = "original_sheet!G32:G47";
// 最新のデータ
async function fetchData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKeys[0]}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    for (let i = 0; i < data.values.length; i++) {
      localStorage.setItem(i, data.values[i][0]);
    }
  } catch (error) {
    console.error("データ取得エラー", error);
  }
}

setInterval(fetchData, 700);