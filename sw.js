//登録が完了するとswファイルが自動的にダウンロードされてからインストールされ、アクティブになる

//selfはウィンドウに関する情報を管理するWindowオブジェクトを指す
//navigatorオブジェクトはwindowオブジェクトのプロパティである
//documentもwindowオブジェクトのプロパティの1つ
// self.addEventListener("install",(e) => {
//     console.log("サービスワーカーをインストール");
// }) 


const cacheName ='cache-v121ad2'
//ServiceWorkerで扱うファイル・キャッシュしておくファイル
const appShellFiles = [
"/icons/android-chrome-192x192.png",
"/icons/android-chrome-384x384.png",
"/icons/apple-touch-icon.png",
"/icons/favicon-16x16.png",
"/icons/favicon-32x32.png",
"/icons/favicon-16x16.png",
"/icons/favicon.ico",
"/app.js",
"/index.js",
"/index.html",
"/style.css",
"/site.webmanifest"
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
// self.addEventListener("fetch",(e) => {
//     e.respondWith((async () => {
//         const r = await caches.match(e.request);
//         if(r)return r;
//         const fetchRequest = e.request.clone();
//         const response = await fetch(fetchRequest);
//         const cache = await caches.open(cacheName);
//         cache.put(e.request,response.clone());
//         return response;
//     }))
// })

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
              .then((response) => {
                  if (response) {
                      return response;
                  }

                  // 重要：リクエストを clone する。リクエストは Stream なので
                  // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
                  // 必要なので、リクエストは clone しないといけない
                  let fetchRequest = event.request.clone();

                  return fetch(fetchRequest)
                      .then((response) => {
                          if (!response || response.status !== 200 || response.type !== 'basic') {
                              return response;
                          }

                          // 重要：レスポンスを clone する。レスポンスは Stream で
                          // ブラウザ用とキャッシュ用の2回必要。なので clone して
                          // 2つの Stream があるようにする
                          let responseToCache = response.clone();

                          caches.open(cacheName)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });

                          return response;
                      });
              })
    );
            });
//e.requestは何が入っている

self.addEventListener("activate",(e) => {
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

self.addEventListener("push",(e) => {
    e.waitUntil(
        self.registration.showNotification("新しい記事",{
            body:"PWAに関する新しい記事を書きました",
            icon:"./icons/android-chrome-192x192.png",
            tag:"new-pwa-article"
        }) 
    )
})


//サービスワーカーがどこにインストールされるのか

