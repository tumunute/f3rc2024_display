
// 点数
const point1=document.getElementById("point1");
const point2=document.getElementById("point2");
// パイナップル
const pine1=document.getElementById("pine1");
const pine2=document.getElementById("pine2");
const pine3=document.getElementById("pine3");
const pine4=document.getElementById("pine4");
const pine5=document.getElementById("pine5");
const pine6=document.getElementById("pine6");
const pine7=document.getElementById("pine7");
const pine8=document.getElementById("pine8");
const pine9=document.getElementById("pine9");
const pine10=document.getElementById("pine10");
// const pineNumberCellLeft=document.getElementById("pineNumberCellLeft");
const pineNumberCellRight=document.getElementById("pineNumberCellRight");
// チョコレート
const choco1=document.getElementById("choco1");
const choco2=document.getElementById("choco2");
const choco3=document.getElementById("choco3");
const choco4=document.getElementById("choco4");
const choco5=document.getElementById("choco5");
const choco6=document.getElementById("choco6");
const choco7=document.getElementById("choco7");
const choco8=document.getElementById("choco8");
const choco9=document.getElementById("choco9");
const choco10=document.getElementById("choco10");
const chocoNumbercellLeft=document.getElementById("chocoNumberCellLeft");
const chocoNumbercellRight=document.getElementById("chocoNumberCellRight");


// パンケーキ
const bread1=document.getElementById("bread1");
const bread2=document.getElementById("bread2");
const bread3=document.getElementById("bread3");
const bread4=document.getElementById("bread4");
const bread5=document.getElementById("bread5");
const bread6=document.getElementById("bread6");
const breadNumberCellLeft=document.getElementById("breadNumberCellLeft");
const breadNumberCellRight=document.getElementById("breadNumberCellRight");

// タイム
const timer=document.getElementById("timer");

// ボナペティ
const bon1=document.getElementById("bon1");
const bon2=document.getElementById("bon2");

// チェック
const check1=document.getElementById("check1");
const check2=document.getElementById("check2");


// 左側の大学
const leftUniversity=document.getElementById("leftUniversity");
// 右側の大学
const rightUniversity=document.getElementById("rightUniversity");

// スプシで取得した範囲
const sheetId = '1mzq8dD3eU-CaZxN-gWO1JmFkO3Jht_C3YSY_W-lzrFs';
// const sheetData="original_sheet!G32:G45"
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

// const leftSum = 'original_sheet!L12';//0
// const rightSum = 'original_sheet!L26';//1
// const turnLeft= 'original_sheet!B5';//2
// const turnRight= 'original_sheet!B19';//3
// const turnLeftBon="original_sheet!N5";//4
// const turnRightBon="original_sheet!N19";//5
// const pineNumberLeft="original_sheet!H10";//6
// const pineNumberRight="original_sheet!H24";//7
// const chocoNumberLeft="original_sheet!K10";//8
// const chocoNumberRight="original_sheet!K24";//9
// const breadNumberLeft="original_sheet!E8";//10
// const breadNumberRight="original_sheet!E22"//11
// const leftUniversityCell="original_sheet!B2"//12
// const rightUniversityCell="original_sheet!B16"//13


const apiKey = 'AIzaSyCycowG3GCqzemN0Pd7bXa2fA6Qpkw2Kx0';


async function fetchData(range, elementId) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    
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
        console.error('データ取得エラー:', error);
        document.getElementById(elementId).innerText = '---';
        return "---";
    }
}

console.log(fetchData(sheetData[0], 'point1'));
fetchData(sheetData[1], 'point2');

// スプシで取得した0か1の値に対して、1であれば指定した画像を表示、0であれば表示しない　という関数
function updateImageDisplay(range, elementId) {
    fetchData(range, elementId).then(value => 
        {
        const imageElement = document.getElementById(elementId);
        // セルの値が "1" であれば画像を表示
        if (value === "1") {
            imageElement.style.display = ' inline-block';
        } else {
            imageElement.style.display = 'none';
        }
    });   
}
// 大学の名前を表示する関数
function displayUniversity(range,elementId){
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const nameOfUniversity = data.values[0][0];
            localStorage.setItem(elementId, nameOfUniversity);
            document.getElementById(elementId).innerText = nameOfUniversity;
            return nameOfUniversity;
        })
        .catch(error => {
            // console.error('Error fetching data:', error);
            document.getElementById(elementId).innerText = 'now_loading...';
            return "now_loading...";
        });
}
// いろいろ取得する
async function updateObjects() {
    try {
        // fetchData を待ち、その結果を整数に変換
        const dataPineLeft = await fetchData(sheetData[6], "pineNumberCellLeft");
        const dataPineRight= await fetchData(sheetData[7],"pineNumberCellRight");
        pineValueLeft = parseInt(dataPineLeft, 10);
        console.log(pineValueLeft);
        pineValueRight=parseInt(dataPineRight,10);
        console.log(pineValueRight);

        const dataChocoLeft = await fetchData(sheetData[8]  , "chocoNumberCellLeft");
        const dataChocoRight= await fetchData(sheetData[9]  ,"chocoNumberCellRight");
        chocoValueLeft = parseInt(dataChocoLeft, 10);
        console.log(chocoValueLeft);
        chocoValueRight=parseInt(dataChocoRight,10);
        console.log(chocoValueRight);

        const dataBreadLeft = await fetchData(sheetData[10]  , "breadNumberCellLeft");
        const dataBreadRight= await fetchData(sheetData[11]  ,"breadNumberCellRight");
        breadValueLeft = parseInt(dataBreadLeft, 10);
        console.log(breadValueLeft);
        breadValueRight=parseInt(dataBreadRight,10);
        console.log(breadValueRight);

    } catch (error) {
        console.error('Error:', error);
    }

    pine1.style.display=" inline-block";
    pine2.style.display=" inline-block";
    pine3.style.display=" inline-block";
    pine4.style.display=" inline-block";
    pine5.style.display=" inline-block";
    pine6.style.display=" inline-block";
    pine7.style.display=" inline-block";
    pine8.style.display=" inline-block";
    pine9.style.display=" inline-block";
    pine10.style.display=" inline-block";

    choco1.style.display=" inline-block";
    choco2.style.display=" inline-block";
    choco3.style.display=" inline-block";
    choco4.style.display=" inline-block";
    choco5.style.display=" inline-block";
    choco6.style.display=" inline-block";
    choco7.style.display=" inline-block";
    choco8.style.display=" inline-block";
    choco9.style.display=" inline-block";
    choco10.style.display=" inline-block";

    bread1.style.display=" inline-block";
    bread2.style.display=" inline-block";
    bread3.style.display=" inline-block";
    bread4.style.display=" inline-block";
    bread5.style.display=" inline-block";
    bread6.style.display=" inline-block";


    // 左側のパイン
    if (pineValueLeft===5){
        ;
    }else if (pineValueLeft===4){
        pine5.style.display="none";
    }else if (pineValueLeft===3){
        pine4.style.display="none";
        pine5.style.display="none";
    }else if(pineValueLeft===2){
        pine3.style.display="none";
        pine4.style.display="none";
        pine5.style.display="none";
    }else if(pineValueLeft===1){
        pine2.style.display="none";
        pine3.style.display="none";
        pine4.style.display="none";
        pine5.style.display="none";
    }else if(pineValueLeft===0){
        pine1.style.display="none";
        pine2.style.display="none";
        pine3.style.display="none";
        pine4.style.display="none";
        pine5.style.display="none";
    }
    // 右側のパイン
    if (pineValueRight===5){
        ;
    }else if (pineValueRight===4){
        pine10.style.display="none";
    }else if (pineValueRight===3){
        pine9.style.display="none";
        pine10.style.display="none";
    }else if(pineValueRight===2){
        pine8.style.display="none";
        pine9.style.display="none";
        pine10.style.display="none";
    }else if(pineValueRight===1){
        pine7.style.display="none";
        pine8.style.display="none";
        pine9.style.display="none";
        pine10.style.display="none";
    }else if(pineValueRight===0){
        pine5.style.display="none";
        pine7.style.display="none";
        pine8.style.display="none";
        pine9.style.display="none";
        pine10.style.display="none";
    }
    // 左側のチョコ
    if (chocoValueLeft===5){
        ;
    }else if (chocoValueLeft===4){
        choco5.style.display="none";
    }else if (chocoValueLeft===3){
        choco4.style.display="none";
        choco5.style.display="none";
    }else if(chocoValueLeft===2){
        choco3.style.display="none";
        choco4.style.display="none";
        choco5.style.display="none";
    }else if(chocoValueLeft===1){
        choco2.style.display="none";
        choco3.style.display="none";
        choco4.style.display="none";
        choco5.style.display="none";
    }else if(chocoValueLeft===0){
        choco1.style.display="none";
        choco2.style.display="none";
        choco3.style.display="none";
        choco4.style.display="none";
        choco5.style.display="none";
    }
    // 右側のチョコ
    if (chocoValueRight===5){
        ;
    }else if (chocoValueRight===4){
        choco10.style.display="none";
    }else if (chocoValueRight===3){
        choco9.style.display="none";
        choco10.style.display="none";
    }else if(chocoValueRight===2){
        choco8.style.display="none";
        choco9.style.display="none";
        choco10.style.display="none";
    }else if(chocoValueRight===1){
        choco7.style.display="none";
        choco8.style.display="none";
        choco9.style.display="none";
        choco10.style.display="none";
    }else if(chocoValueRight===0){
        choco5.style.display="none";
        choco7.style.display="none";
        choco8.style.display="none";
        choco9.style.display="none";
        choco10.style.display="none";
    }
    // 左側のパンケーキ
    if (breadValueLeft===3){
        ;
    }else if(breadValueLeft===2){
        bread3.style.display="none";
    }else if(breadValueLeft===1){
        bread3.style.display="none";
        bread2.style.display="none";
    }else if(breadValueLeft===0){
        bread3.style.display="none";
        bread2.style.display="none";
        bread1.style.display="none";
    }
    
    // 右側のパンケーキ
    if (breadValueRight===3){
        ;
    }else if(breadValueRight===2){
        bread6.style.display="none";
    }else if(breadValueRight===1){
        bread5.style.display="none";
        bread4.style.display="none";
    }else if(breadValueRight===0){
        bread6.style.display="none";
        bread5.style.display="none";
        bread4.style.display="none";
    }
}



// ここで本体表示
// fetchData(sheetData[0] , 'point1');
// fetchData(sheetData[1], 'point2');
updateImageDisplay(sheetData[4],"bon1");
updateImageDisplay(sheetData[5] ,"bon2");
updateImageDisplay(sheetData[2] ,"check1");
updateImageDisplay(sheetData[3] ,"check2");
displayUniversity(sheetData[12] ,"leftUniversity");
displayUniversity(sheetData[13] ,"rightUniversity");
updateObjects();


// setInterval(async () => {
//     await fetchData(sheetData[0]  , 'point1');
//     await fetchData(sheetData[1] , 'point2');
//     updateImageDisplay(sheetData[4] ,"bon1");
//     updateImageDisplay(sheetData[5] ,"bon2");
//     updateImageDisplay(sheetData[2] ,"check1");
//     updateImageDisplay(sheetData[3] ,"check2");
//     await updateObjects();
// }, 5000);

// setInterval(async () => {
//     try {
//         // データの取得
//         await fetchData(sheetData[0], 'point1');
//         await fetchData(sheetData[1], 'point2');
//         updateImageDisplay(sheetData[4], "bon1");
//         updateImageDisplay(sheetData[5], "bon2");
//         updateImageDisplay(sheetData[2], "check1");
//         updateImageDisplay(sheetData[3], "check2");
        
//         // オブジェクトの更新
//         await updateObjects();
//     } catch (error) {
//         console.error('Interval error:', error);
//     }
// }, 4000);

setInterval(async () => {
    console.log('Interval triggered'); // インターバルが発火したことをログで確認
    try {
        await fetchData(sheetData[0], 'point1');
        await fetchData(sheetData[1], 'point2');
        await updateImageDisplay(sheetData[4], "bon1");
        await updateImageDisplay(sheetData[5], "bon2");
        await updateImageDisplay(sheetData[2], "check1");
        await updateImageDisplay(sheetData[3], "check2");
        await updateObjects(); // 正しく await されていることを確認
    } catch (error) {
        console.error('Interval error:', error);
    }
}, 15000);