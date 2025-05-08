document.addEventListener("DOMContentLoaded", () => {
    class Budget {
        #exp //to store expenses

        constructor() {
            this.#exp = [];
        }
        addExp(description, amount) {
            const expense = {
                id: Date.now(),
                description,
                amount: parseFloat(amount)
            };
            this.#exp.push(expense);
            return expense;
        }

        removeExp(id) {
            this.#exp = this.#exp.filter(expense => expense.id !== id);
        }

        getExp() {
            return [...this.#exp];
        }

        getTotal() {
            return this.#exp.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
        }
    }

    const tracker = new Budget();

    const budgetForm = document.getElementById("budgetForm");
    const desc = document.getElementById("desc");
    const amount = document.getElementById("amount");
    const total = document.getElementById("spent");
    const list = document.getElementById("list");

    if (!budgetForm || !desc || !amount || !total || !list) {
        alert("Error: One or more elements not found.");
        return;
    }

    function renderingDOM() {
        list.innerHTML = "";
        const expenses = tracker.getExp();
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${expense.description}: $${expense.amount.toFixed(2)}</span>
            <button data-id="${expense.id}">remove</button>`;
            list.appendChild(li);
        });

        total.textContent = tracker.getTotal();
    }

    budgetForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const description = desc.value.trim();
        const amountValue = amount.value.trim();
        if (description && amountValue && !isNaN(amountValue) && amountValue > 0) {
            tracker.addExp(description, amountValue);
            renderingDOM();
            budgetForm.reset();
        }
    });

    list.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const id = Number(e.target.dataset.id);
            tracker.removeExp(id);
            renderingDOM();
        }
    })

    renderingDOM();
})