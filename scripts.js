// Beispiel für eine Funktion, die das Wallet-Guthaben abfragt
function fetchBalance() {
    fetch('/api/get-balance', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YOUR_API_TOKEN', // Sicherstellen, dass Sie Ihre API-Token hier sicher speichern und verwenden
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById('balanceAmount').textContent = data.balance + ' ' + data.unit;
    })
    .catch(error => console.error('Error fetching balance:', error));
  }
  
  // Beispiel für eine Funktion, die eine Zahlung sendet
  function sendPayment(amount, payreq) {
    fetch('/api/send-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_TOKEN',
      },
      body: JSON.stringify({ amount: amount, payment_request: payreq })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        alert('Payment sent successfully!');
      } else {
        alert('Payment failed: ' + data.message);
      }
    })
    .catch(error => console.error('Error sending payment:', error));
  }

function receivePayment() {
    // Simulate receiving a payment
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Payment received.');
            resolve(500); // Simulated received amount
        }, 1000);
    });
}

// Hook up buttons to actions
document.getElementById('refreshBalance').addEventListener('click', async function() {
    const balance = await fetchBalance();
    document.getElementById('balanceAmount').textContent = balance;
});

document.getElementById('sendPayment').addEventListener('click', async function() {
    try {
        await sendPayment(100, 'exampleAddress'); // Simulated send amount and address
        console.log('Payment sent successfully.');
    } catch (error) {
        console.error(error);
    }
});

document.getElementById('receivePayment').addEventListener('click', async function() {
    const amountReceived = await receivePayment();
    const balanceElement = document.getElementById('balanceAmount');
    const newBalance = parseInt(balanceElement.textContent) + amountReceived;
    balanceElement.textContent = newBalance;
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Set the default tab to open
document.addEventListener('DOMContentLoaded', function() {
    // Open the viewWallet tab by default
    document.getElementById('defaultOpen').click();
});
