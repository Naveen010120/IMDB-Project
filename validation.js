const registerForm = document.getElementById('registerForm');
        const loginForm = document.getElementById('loginForm');
        const container = document.getElementById('container');
        const loginContainer = document.getElementById('loginContainer');
        const showLogin = document.getElementById('showLogin');
        const showRegister = document.getElementById('showRegister');

        // Toggle between Register and Login forms
        showLogin.addEventListener('click', () => {
            container.style.display = 'none';
            loginContainer.style.display = 'block';
        });

        showRegister.addEventListener('click', () => {
            loginContainer.style.display = 'none';
            container.style.display = 'block';
        });

        // Register functionality
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;

            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if email already exists
            const emailExists = users.some(user => user.email === email);
            if (emailExists) {
                alert('Email is already registered. Please login.');
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration successful!');
            registerForm.reset();
        });

        // Login functionality
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                alert(`Welcome back, ${user.name}!`);
                location.href='./main.html';
                loginForm.reset();
            } else {
                alert('Invalid email or password.');
            }
        });