//thème
const themeSwitches = document.querySelectorAll('#themeSwitch');
// const bodyParser = require('body-parser')


themeSwitches.forEach(themeSwitch => {
  themeSwitch.addEventListener('change', () => {
    const darkMode = themeSwitch.checked;

    //applique le thème
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.style.fontFamily = "'Inter', sans-serif";
    } else {
      document.body.classList.remove('dark');
      document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    }

    //maj tous les switchs
    themeSwitches.forEach(sw => {
      sw.checked = darkMode;
    });

    //sauvegarde thème
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  });
});

//applique le thème sauvegardé
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    document.body.style.fontFamily = "'Inter', sans-serif";
    themeSwitches.forEach(sw => {
      sw.checked = true;
    });
  }
});

//menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle) {

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

}
//aide
const helpBtn = document.getElementById('helpBtn');
if (helpBtn) {
  const helpPopup = document.querySelector('.help-popup');
  helpBtn.addEventListener('click', () => {
    helpPopup.classList.toggle('show');
  });
}

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
        const data = await res.json();
        localStorage.setItem('token', data.token);

        const token = localStorage.getItem("token")
        console.log(token)

        const Res = await fetch("http://localhost:5000/dashboard", {
          method: "GET",
          headers: { 'Authorization': `Bearer ${token}` },
        })
        document.location.href = "http://localhost:5000/dashboard"
        // const html = await Res.text();
        // document.open();
        // document.write(html);
        // document.close();

      window.addEventListener("load", (event) => {
      console.log("page is fully loaded");
      });


    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de la connexxion.");
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
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, firstname })
      });
      const data = await res.json();
      document.getElementById("h2").innerHTML = data;
    } catch (error) {
      // console.error(error);
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