//3
const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const showBtn = document.querySelector("#showBtn");
const moneyInput = document.querySelector("#moneyInput");
const balanceEl = document.querySelector("#balanceEl");
const list = document.querySelector("#list");




const bankAccount = {
    balance: 0,
    limit: 1000,
    report: [],
    date: new Date(),

    deposit: function (m) {
        if (this.balance >= this.limit || m <= 0 || !m ) {
            alert ("Pis yaşamırsan aaa");
            console.log("Invalid balance");
            return;
        }
        this.balance += m;

        const history = {
            type: "Cash",
            amount: m,
            created: this.date,
        };

        
        this.report.push(history);
        
        return this.balance;

    },

    withdraw: function (m) {
        const checkValid = () => {
            if (this.balance >= 0) {
                console.log("Invalid balance");
                alert ("Kasib!limiti kecirsen,meblegi duzgun daxil et!")
                return;
            }
            this.balance -= m;
            
            const history = {
                type: "Withdraw",
                amount: m,
                created: this.date,
            };

           
            this.report.push(history);

        };


        checkValid();
        return this.balance;
    },

    show: function (m) {
        const thisObj = this;
        function handleMonitor() {
            console.log(thisObj.balance);
            console.log(thisObj.report);
        }
        handleMonitor();
        return this.balance;
    }

};





//4
incrementBtn.addEventListener("click", function () {
    const value = moneyInput.value;
    bankAccount.deposit(+value);
    moneyInput.value = "";
});

decrementBtn.addEventListener("click", function () {
    const value = moneyInput.value;
    bankAccount.withdraw( + value);
    moneyInput.value = "";
});

showBtn.addEventListener("click", function () {
    const result = bankAccount.show();

    balanceEl.innerHTML = result;

    const newContent = bankAccount.report.map (( item, index) => `
    <tr>
    <th scope="row">${index+1}</th>
    <td>${item.type}</td>
    <td class="text-${item.type == "Cash "? "success" : "danger"}">${item.type == "Cash"? "+" + item.amount : "-" + item.amount}</td>
    <td>${item.created}</td>
  </tr>

    `
    )
    .join("");
    list.innerHTML = newContent;
});



