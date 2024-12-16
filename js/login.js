
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const validUser = users.find(user => user.email === email && user.password === password);

        if (validUser) {
            localStorage.setItem("is_login", "true")
            location.href = "index.html"
        } else {
            alert('Invalid email or password!');
        }

        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    });

