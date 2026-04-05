// service-worker.js - CEBMS GEOff PWA

const CACHE_NAME = 'cebms-geoff-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
  // adicione aqui outros arquivos importantes do seu site, como CSS, JS e imagens
];

// Evento de instalação - faz cache dos arquivos essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Arquivos em cache: CEBMS GEOff');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de ativação - limpa caches antigos se necessário
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Removendo cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Evento fetch - responde com cache ou busca na rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
