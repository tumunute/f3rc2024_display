
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

const rightSum = 'original_sheet!L26';
const leftSum = 'original_sheet!L12';
const turnLeft= 'original_sheet!B5';
const turnRight= 'original_sheet!B19';
const turnLeftBon="original_sheet!N5";
const turnRightBon="original_sheet!N19";
const pineNumberLeft="original_sheet!H10";
const pineNumberRight="original_sheet!H24";
const chocoNumberLeft="original_sheet!K10";
const chocoNumberRight="original_sheet!K24";
const breadNumberLeft="original_sheet!E8";
const breadNumberRight="original_sheet!E22";
const leftUniversityCell="original_sheet!B2"
const rightUniversityCell="original_sheet!B16"


const apiKey = 'AIzaSyCycowG3GCqzemN0Pd7bXa2fA6Qpkw2Kx0';

// スプシで取得した値をそのままブラウザに表示する　という関数
async function fetchData(range, elementId) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const cellValue = data.values[0][0];
        localStorage.setItem(elementId, cellValue);
        document.getElementById(elementId).innerText = cellValue;
        return cellValue;
    } catch (error) {
        // console.error('Error fetching data:', error);
        document.getElementById(elementId).innerText = '---';
        return "---";
    }
}

// // スプシで取得した0か1の値に対して、1であれば指定した画像を表示、0であれば表示しない　という関数
// function updateImageDisplay(range,elementId) {
//     Promise.all([
//         fetchData(range,elementId)
//     ]).then(values => {
//         // いずれかのセルの値が "1" であれば画像を表示
//         if (values.includes("1")) {
//             imageElement.style.display = 'block';
//         } else {
//             imageElement.style.display = 'none';
//         }
//     });
// }

// スプシで取得した0か1の値に対して、1であれば指定した画像を表示、0であれば表示しない　という関数
function updateImageDisplay(range, elementId) {
    fetchData(range, elementId).then(value => 
        {
        const imageElement = document.getElementById(elementId);
        // セルの値が "1" であれば画像を表示
        if (value === "1") {
            imageElement.style.display = 'block';
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
            document.getElementById(elementId).innerText = '関数内でのエラー';
            return "関数内でのエラー";
        });
}
// パンケーキを入手した個数表示するコード のデバッグ
// async function pineValueLeft() {
//     const pineValueLeft = parseInt(await fetchData(pineNumberLeft, "pineNumberCellLeft"), 10);
//     console.log(pineValueLeft);
// }
// pineValueLeft();
// 関数を呼び出して実行します
// pineValueLeft.then((result) => {
//     console.log(result); // これが "3" を出力します
//   });

async function updateObjects() {
    try {
        // fetchData を待ち、その結果を整数に変換
        const dataPineLeft = await fetchData(pineNumberLeft, "pineNumberCellLeft");
        const dataPineRight= await fetchData(pineNumberRight,"pineNumberCellRight")
        pineValueLeft = parseInt(dataPineLeft, 10);
        pineValueRight=parseInt(dataPineRight,10);

        const dataChocoLeft = await fetchData(chocoNumberLeft, "chocoNumberCellLeft");
        const dataChocoRight= await fetchData(chocoNumberRight,"chocoNumberCellRight")
        chocoValueLeft = parseInt(dataChocoLeft, 10);
        chocoValueRight=parseInt(dataChocoRight,10);

        const dataBreadLeft = await fetchData(breadNumberLeft, "breadNumberCellLeft");
        const dataBreadRight= await fetchData(breadNumberRight,"breadNumberCellRight")
        breadValueLeft = parseInt(dataBreadLeft, 10);
        breadValueRight=parseInt(dataBreadRight,10);

    } catch (error) {
        console.error('Error:', error);
    }
    pine1.style.display="block";
    pine2.style.display="block";
    pine3.style.display="block";
    pine4.style.display="block";
    pine5.style.display="block";
    pine6.style.display="block";
    pine7.style.display="block";
    pine8.style.display="block";
    pine9.style.display="block";
    pine10.style.display="block";

    choco1.style.display-"block";
    choco2.style.display-"block";
    choco3.style.display-"block";
    choco4.style.display-"block";
    choco5.style.display-"block";
    choco6.style.display-"block";
    choco7.style.display-"block";
    choco8.style.display-"block";
    choco9.style.display-"block";
    choco10.style.display-"block";

    bread1.style.display="block";
    bread2.style.display="block";
    bread3.style.display="block";
    bread4.style.display="block";
    bread5.style.display="block";
    bread6.style.display="block";


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
        pine.style.display="none";
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
        choco.style.display="none";
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
        bread3.style.display="none";
    }else if(breadValueRight===1){
        bread3.style.display="none";
        bread2.style.display="none";
    }else if(breadValueRight===0){
        bread3.style.display="none";
        bread2.style.display="none";
        bread1.style.display="none";
    }
}

// async function updateObjects() {
//     try {
//         // fetchData を待ち、その結果を整数に変換
//         const dataPineLeft = await fetchData(pineNumberLeft, "pineNumberCellLeft");
//         const dataPineRight= await fetchData(pineNumberRight,"pineNumberCellRight")
//         pineValueLeft = parseInt(dataPineLeft, 10);
//         pineValueRight=parseInt(dataPineRight,10);

//         const dataChocoLeft = await fetchData(chocoNumberLeft, "chocoNumberCellLeft");
//         const dataChocoRight= await fetchData(chocoNumberRight,"chocoNumberCellRight")
//         chocoValueLeft = parseInt(dataChocoLeft, 10);
//         chocoValueRight=parseInt(dataChocoRight,10);

//         const dataBreadLeft = await fetchData(breadNumberLeft, "breadNumberCellLeft");
//         const dataBreadRight= await fetchData(breadNumberRight,"breadNumberCellRight")
//         breadValueLeft = parseInt(dataBreadLeft, 10);
//         breadValueRight=parseInt(dataBreadRight,10);

//     } catch (error) {
//         console.error('Error:', error);
//     }

//     // 全ての要素を安全に取得
//     const elements = {
//         pine: [
//             document.getElementById("pine1"), document.getElementById("pine2"), document.getElementById("pine3"),
//             document.getElementById("pine4"), document.getElementById("pine5"), document.getElementById("pine6"),
//             document.getElementById("pine7"), document.getElementById("pine8"), document.getElementById("pine9"),
//             document.getElementById("pine10")
//         ],
//         choco: [
//             document.getElementById("choco1"), document.getElementById("choco2"), document.getElementById("choco3"),
//             document.getElementById("choco4"), document.getElementById("choco5"), document.getElementById("choco6"),
//             document.getElementById("choco7"), document.getElementById("choco8"), document.getElementById("choco9"),
//             document.getElementById("choco10")
//         ],
//         bread: [
//             document.getElementById("bread1"), document.getElementById("bread2"), document.getElementById("bread3"),
//             document.getElementById("bread4"), document.getElementById("bread5"), document.getElementById("bread6")
//         ]
//     };

//     // 取得した各要素が存在するか確認しつつ、表示をリセット
//     Object.values(elements).forEach(group => {
//         group.forEach(el => {
//             if (el) el.style.display = "block";
//         });
//     });

//     // 各カテゴリの表示を更新
//     function updateCategoryDisplay(values, group) {
//         for (let i = values; i < group.length; i++) {
//             if (group[i]) group[i].style.display = "none";
//         }
//     }

//     // 左右のパイン、チョコ、パンケーキの表示を更新
//     updateCategoryDisplay(pineValueLeft, elements.pine.slice(0, 5));
//     updateCategoryDisplay(pineValueRight, elements.pine.slice(5, 10));
//     updateCategoryDisplay(chocoValueLeft, elements.choco.slice(0, 5));
//     updateCategoryDisplay(chocoValueRight, elements.choco.slice(5, 10));
//     updateCategoryDisplay(breadValueLeft, elements.bread.slice(0, 3));
//     updateCategoryDisplay(breadValueRight, elements.bread.slice(3, 6));
// }
   


// ここで本体表示
fetchData(leftSum, 'point1');
fetchData(rightSum, 'point2');
updateImageDisplay(turnLeftBon,"bon1");
updateImageDisplay(turnRightBon,"bon2");
updateImageDisplay(turnLeft,"check1");
updateImageDisplay(turnRight,"check2");
displayUniversity(leftUniversityCell,"leftUniversity");
displayUniversity(rightUniversityCell,"rightUniversity");
updateObjects();

// setInterval(() => {
//     fetchData(rightSum, 'point1');
//     fetchData(leftSum, 'point2');
//     updateImageDisplay(turnLeftBon,"bon1");
//     updateImageDisplay(turnRightBon,"bon2");
//     updateImageDisplay(turnLeft,"check1");
//     updateImageDisplay(turnRight,"check2");
//     displayUniversity(leftUniversityCell,"leftUniversity");
//     displayUniversity(rightUniversityCell,"rightUniversity");
//     updateObjects();
// }, 10000);
setInterval(async () => {
    await fetchData(rightSum, 'point1');
    await fetchData(leftSum, 'point2');
    updateImageDisplay(turnLeftBon, "bon1");
    updateImageDisplay(turnRightBon, "bon2");
    updateImageDisplay(turnLeft, "check1");
    updateImageDisplay(turnRight, "check2");
    await updateObjects();
}, 2000);
displayUniversity(leftUniversityCell, "leftUniversity");
displayUniversity(rightUniversityCell, "rightUniversity");