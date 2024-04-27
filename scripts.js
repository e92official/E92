const url = 'wss://stream.binance.com:9443/ws/btcusdt@trade';
const btcPriceElement = document.getElementById('btcPrice');

const connection = new WebSocket(url);

connection.onmessage = function (event) {
  const data = JSON.parse(event.data);
  const price = parseFloat(data.p).toFixed(2);
  btcPriceElement.textContent = `$${price}`;
};

connection.onerror = function (error) {
  console.error('WebSocket Error:', error);
  btcPriceElement.textContent = 'Fehler beim Laden der Daten';
};

connection.onclose = function () {
  console.log('WebSocket connection closed');
  btcPriceElement.textContent = 'Verbindung geschlossen';
};