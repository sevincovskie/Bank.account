// HTML
const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const showBtn = document.querySelector("#showBtn");
const cashBackBtn = document.querySelector("#cashBackBtn");
const moneyInput = document.querySelector("#moneyInput");
const balanceEl = document.querySelector("#balanceEl");
const list = document.querySelector("#list");

// Bank hesabını təyin edirik
const bankAccount = {
    balance: 0,
    limit: 1000,
    report: [],

    deposit: function (amount) {
        if (this.balance >= this.limit || amount <= 0 || !amount) {
            alert("Invalid deposit amount!");
            return;
        }

        const cashbackAmount = this.calculateCashback(amount);

        this.balance += amount + cashbackAmount;
        this.addTransaction("Deposit", amount);
        if (cashbackAmount > 0) {
            this.addTransaction("Cashback", cashbackAmount);
        }
        this.updateUI();
        return this.balance;
    },

    withdraw: function (amount) {
        if (this.balance <= 0 || amount <= 0 || !amount) {
            alert("Invalid withdrawal amount!");
            return;
        }

        this.balance -= amount;
        this.addTransaction("Withdrawal", amount);
        this.updateUI();
        return this.balance;
    },

    show: function () {
        console.log("Balance: " + this.balance);
        console.log("Transaction History:", this.report);
        return this.balance;
    },

    cashback: function (amount) {
        if (!amount || amount <= 0) {
            alert("Invalid cashback amount!");
            return;
        }

        const cashbackAmount = this.calculateCashback(amount);
        const cashbackInfo = {
            type: "Cashback",
            amount: cashbackAmount,
            date: new Date()
        };

        this.balance += cashbackAmount;
        this.report.push(cashbackInfo);
        this.updateUI();
        return this.balance;
    },

    addTransaction: function (type, amount) {
        const transaction = {
            type: type,
            amount: amount,
            date: new Date()
        };

        this.report.push(transaction);
        this.updateUI();
    },

    updateUI: function () {
        balanceEl.textContent = this.balance;
        const newContent = this.report.map((item, index) => `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${item.type}</td>
                <td class="text-${item.type == "Deposit" || item.type == "Cashback" ? "success" : "danger"}">
                    ${item.type == "Deposit" || item.type == "Cashback" ? "+" : "-"}${item.amount}
                </td>
                <td>${item.date.toLocaleString()}</td>
            </tr>
        `).join("");
        list.innerHTML = newContent;
    },

    calculateCashback: function (amount) {
        return parseFloat((amount / 100 * 3).toFixed(2));
    }
};

// Düymələrə click hadisələrini qoşuruq
incrementBtn.addEventListener("click", function () {
    const amount = parseFloat(moneyInput.value);
    bankAccount.deposit(amount);
    moneyInput.value = "";
});

decrementBtn.addEventListener("click", function () {
    const amount = parseFloat(moneyInput.value);
    bankAccount.withdraw(amount);
    moneyInput.value = "";
});

showBtn.addEventListener("click", function () {
    bankAccount.show();
});

cashBackBtn.addEventListener("click", function () {
    const amount = parseFloat(moneyInput.value);
    bankAccount.cashback(amount);
    moneyInput.value = "";
});