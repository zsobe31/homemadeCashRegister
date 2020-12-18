var dateTimeHolder = document.getElementById('datetime');
var balanceHolder = document.getElementById('balance');
var amountHolder = document.getElementById('amount');
var storeButton = document.getElementById('store');
var transactionsListContainer = document.getElementById('transactions');
var transactionRowTemplate = document.querySelector('.transaction-row-template');

var todayIs = (new Date().getFullYear() + "." + (new Date().getMonth() + 1) + "." + new Date().getDate()) + ".";
console.log(todayIs);
// document.getElementById('dateTime').innerHTML = todayIs;

var transactions = [];
insertTransactionRow(15000, new Date());
insertTransactionRow(-5000, new Date());

storeButton.addEventListener('click', function addAmount() {
    if (isTransactionValid(amountHolder, dateTimeHolder)) {
        var intValue = parseInt(amountHolder.value);
        var date = new Date(dateTimeHolder.value);
        insertTransactionRow(intValue, date);

        amountHolder.value = '';
        dateTimeHolder.value = todayIs;
    }
})

function insertTransactionRow(amount, date) {
    transactions.push({
        "amount": amount,
        "date": date
    });

    // var listItem = document.createElement('li');
    var listItem = transactionRowTemplate.cloneNode(true);
    listItem.querySelector('.transaction-id').textContent = transactions.length - 1;
    listItem.querySelector('.transaction-date').textContent = date.toDateString();
    listItem.querySelector('.transaction-amount').textContent = amount + ' Ft.-';
    var deleteButton = listItem.querySelector('.delete-transaction');
    deleteButton.setAttribute('data-id', transactions.length - 1);
    deleteButton.addEventListener('click', deleteTransactionRow);

    // listItem.textContent = date.toDateString() + ' : ' + amount + ' Ft.-';
    transactionsListContainer.appendChild(listItem);

    console.log(transactions);
    balanceHolder.textContent = calculateBalance();
}

function deleteTransactionRow(event) {
    var id = event.target.getAttribute('data-id');
    transactions.splice(id, 1);
    var row = event.target.parentNode.parentNode;
    row.parentNode.removeChild(row);
    balanceHolder.textContent = calculateBalance();
}

function isTransactionValid(amountHolder, dateTimeHolder) {
    var amountValid = validateAmount(amountHolder);
    var datetimeValid = validateDate(dateTimeHolder);
    return amountValid && datetimeValid;
}

function validateDate(dateTimeHolder) {
    var datetimeValid = true;
    var date = new Date(dateTimeHolder.value);
    if (date.toString() === "Invalid Date") {
        datetimeValid = false;
        dateTimeHolder.classList.add('invalid');
        console.log("A beírt dátum NEM megfelelő!");
    } else {
        dateTimeHolder.classList.remove('invalid');
        console.log("A beírt dátum megfelelő!");
    }
    return datetimeValid;
}

function validateAmount(amountHolder) {
    var amountValid = true;
    if (isNaN(parseInt(amountHolder.value))) {
        amountValid = false;
        amountHolder.classList.add('invalid');
        console.log("A beírt összeg NEM megfelelő!");
    } else {
        amountHolder.classList.remove('invalid');
        console.log("A beírt összeg megfelelő!");
    }
    return amountValid;
}

function calculateBalance() {
    var balance = 0;
    for (var i = 0; i < transactions.length; i++) {
        balance += transactions[i].amount;
    }
    return balance + " Ft.-";
}