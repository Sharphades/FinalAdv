document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert('This email is already registered!');
        return;
    }

    const newUser = { fullName, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirmPassword').value = '';

    alert('Registration successful! Redirecting to login page...');
    window.location.href = 'login.html';
});
