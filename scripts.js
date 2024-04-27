const streams = [
  'btcusdt@trade',
  'btcusdt@kline_1m', // Kerzenchart-Updates jede Minute
  'btcusdt@depth20'   // Die letzten 20 Updates im Orderbuch
];

const url = `wss://stream.binance.com:9443/stream?streams=${streams.join('/')}`;
const connection = new WebSocket(url);

connection.onmessage = function(event) {
  const data = JSON.parse(event.data);
  const stream = data.stream;

  if (stream.includes('@trade')) {
    updateTradeData(data.data);
  } else if (stream.includes('@kline')) {
    updateKlineData(data.data);
  } else if (stream.includes('@depth')) {
    updateDepthData(data.data);
  }
};

function updateTradeData(tradeData) {
  document.getElementById('lastPrice').textContent = `$${parseFloat(tradeData.p).toFixed(2)}`;
  document.getElementById('lastTradeQty').textContent = tradeData.q;
}

function updateKlineData(klineData) {
  document.getElementById('openPrice').textContent = `$${parseFloat(klineData.k.o).toFixed(2)}`;
  document.getElementById('highPrice').textContent = `$${parseFloat(klineData.k.h).toFixed(2)}`;
  document.getElementById('lowPrice').textContent = `$${parseFloat(klineData.k.l).toFixed(2)}`;
  document.getElementById('closePrice').textContent = `$${parseFloat(klineData.k.c).toFixed(2)}`;
}

function updateDepthData(depthData) {
  document.getElementById('bidPrice').textContent = `$${parseFloat(depthData.b[0][0]).toFixed(2)}`;
  document.getElementById('askPrice').textContent = `$${parseFloat(depthData.a[0][0]).toFixed(2)}`;
}