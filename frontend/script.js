const themeSwitch = document.getElementById('themeSwitch');

themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
        themeSwitch.checked = true;
    } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
        themeSwitch.checked = false;
    }
});

const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('open');
});

const helpBtn = document.getElementById('helpBtn');
helpBtn.addEventListener('click', () => {
    alert('Besoin d’aide ? Contactez support@noteflow.com');
});

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
 
        if (!email || !password) {
            alert('Veuillez remplir tous les champs.');
            return;}
        try {

            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password})
            });
            const data = await res.json();
            document.getElementById("h2").innerHTML = data;

        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue lors de la création du compte.");
        }
    });
}

const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstname = document.getElementById('regFirstname').value.trim();
        const name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value.trim();
        const confirmPassword = document.getElementById('regConfirmPassword').value.trim();

        if (!firstname || !name || !email || !password || !confirmPassword) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name, firstname })
            });

            const data = await res.json();
            document.getElementById("h2").innerHTML = data
        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue lors de la création du compte.");
        }
    });
}


const resetForm = document.getElementById('resetForm');
if (resetForm) {
    resetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value.trim();
        if (!email) {
            alert('Veuillez entrer votre email.');
            return;
        }
        alert(`Un email de réinitialisation a été envoyé à ${email} (simulation).`);
    });
}

const signupBtn = document.getElementById('signupBtn');
if (signupBtn) {
    signupBtn.addEventListener('click', () => {
        window.location.href = 'register.html';
    });
}
