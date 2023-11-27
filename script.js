const themeBtn = document.querySelector('#themetoggle');
const box = ['light', 'dark'];

themeBtn.addEventListener('click', function () {
    const currentT = document.documentElement.getAttribute('data-theme');
    const cindex = box.indexOf(currentT);
    const newTheme = box[(cindex + 1) % box.length];
    document.documentElement.setAttribute('data-theme', newTheme);
});

function validateForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var quantity = document.getElementById('quantity').value;
    var paymentMethod = document.getElementById('paymentMethod').value;

    if (name === '' || email === '' || quantity === '' || paymentMethod === '') {
        alert('All fields must be filled out');
        return false;
    } else {
        alert('Success! You will receive an email shortly');
    }
    return true;
}

document.getElementById("ticketForm").addEventListener("submit", async function (event) {
    if (!validateForm()) {
        event.preventDefault();
    } else {
        // Continue with form submission logic
        // You can add AJAX or other logic here to send data to the server
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const quantity = document.getElementById('quantity').value;
        const paymentMethod = document.getElementById('paymentMethod').value;

        const response = await fetch('http://localhost:3000/bookTicket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, quantity, paymentMethod }),
        });

        const data = await response.json();
        console.log(data);
    }
});
