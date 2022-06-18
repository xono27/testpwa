//登録が完了するとswファイルが自動的にダウンロードされてからインストールされ、アクティブになる

//selfはウィンドウに関する情報を管理するWindowオブジェクトを指す
//navigatorオブジェクトはwindowオブジェクトのプロパティである
//documentもwindowオブジェクトのプロパティの1つ
// self.addEventListener("install",(e) => {
//     console.log("サービスワーカーをインストール");
// }) 


const cacheName ='cache-v1'
//ServiceWorkerで扱うファイル・キャッシュしておくファイル
const appShellFiles = [
    "/serviceworker/icons/android-chrome-192x192.png",
    "/serviceworker/icons/android-chrome-384x384.png",
    "/serviceworker/icons/apple-touch-icon.png",
    "/serviceworker/icons/favicon-16x16.png",
    "/serviceworker/icons/favicon-32x32.png",
    "/serviceworker/icons/favicon-16x16.png",
    "/serviceworker/icons/favicon.ico",
    "/serviceworker/icons/app.js",
    "/serviceworker/icons/index.html",
    "/serviceworker/icons/style.css",
    "/serviceworker/site.webmanifest"
]
const contentToCache = appShellFiles



//waitUntil:サービスワーカーはwaitUntil内のコードが実行されるまでインストールされない
//webstrageは同期的⇔cacheStrageは非同期的
self.addEventListener("install",(e) => {
    console.log("Service Worker Install");
    e.waitUntil(async () => {
        const cache = await caches.open(cacheName);
        console.log("Caching all");
        await cache.addAll(contentToCache);
    })
})


//ブラウザからサーバーへのリクエストを傍受する
self.addEventListener("fetch",(e) => {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        if(r)return r;
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        cache.put(e.request,response.clone());
        return response;
    }))
})
//e.requestは何が入っている

self.addEventListener("active",(e) => {
    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if(key !== cacheName){
                    return caches.delete(key);
                }
            }))
        }) 
    )
})



//サービスワーカーがどこにインストールされるのか

