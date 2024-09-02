const time=new Date();
const goalTime=time.getTime();
console.log(goalTime);

const futureTime=goalTime+180


setInterval(()=>{
    const nowTime2=new Date();
    const nowTime=nowTime2.getTime();
    const keika=-futureTime+nowTime;
    const nokori=180-(Math.round(keika/1000))
    
    const minutes = Math.floor(nokori/ 60); // 150を60で割って整数部分を取得
    const seconds = nokori % 60; // 150を60で割ったあまりを取得

    const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // 秒が一桁の場合、先頭に0を追加
    console.log(timeString); // 出力: "2:30"
    document.getElementById("timer").innerText=timeString;
},1000)

