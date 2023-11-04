// Simulated AJAX calls to a backend server
function fetchBalance() {
    // Simulate fetching balance from the backend
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Balance fetched.');
            resolve(1000); // Simulated balance
        }, 1000);
    });
}

function sendPayment(amount, address) {
    // Simulate sending payment to the backend
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (amount <= 0 || !address) {
                console.error('Invalid payment details.');
                reject('Invalid payment details.');
                return;
            }
            console.log('Payment sent.');
            resolve();
        }, 1000);
    });
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
