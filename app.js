//ServiceWorker APIをブラウザがサポートしているなら
//ServiceWorkerを登録
//navigatorオブジェクトはブラウザに関する情報を管理する。
//navigatorオブジェクトの参照を返す

if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./sw.js").catch((err) => console.error(err));
}

const button = document.getElementById("notifications");

button.addEventListener("click", () => {
    Notification.requestPermission().then(result => {
        if(result === "granted"){
            doNotification();
        }
    })
})

const doNotification = () => {
    new Notification("Hello World",{body:"PWAを実装してみます",icon:"./icons/android-chrome-192x192.png"});
    console.log("IMAMO");
    setTimeout(doNotification,10000);
}







