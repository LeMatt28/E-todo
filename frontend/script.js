// MODE SOMBRE/CLAIR
const themeToggle = document.getElementById('themeToggle');

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});

themeToggle.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark');

  themeToggle.textContent = dark ? "☀️" : "🌙";

  localStorage.setItem('theme', dark ? 'dark' : 'light');
});


// Menu mobile (affichage/masque des liens)
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Bouton aide
const helpBtn = document.getElementById('helpBtn');
if (helpBtn) {
  const helpPopup = document.querySelector('.help-popup');
  helpBtn.addEventListener('click', () => {
    helpPopup.classList.toggle('show');
  });
}

// Formulaire Connexion
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('LogEmail').value.trim();
    const password = document.getElementById('LogPassword').value.trim();
    if (!email || !password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
   
       fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      .then(async res => {
      const data = await res.json();
        document.getElementById("h2").innerHTML = data
        console.log(data)
        if (!data.token) {
          return console.error("Token JWT manquant")
        }
        localStorage.setItem('token', data.token);

        window.location.href = "http://localhost:3000/dashboard.html"

        
      })
      .catch(err => {
        if (err) {
          console.error(err)
          alert("Erreur d'authentification")
        }
      })
  });
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email')?.value.trim();
    const lastName = document.getElementById('lastname')?.value.trim();
    const firstName = document.getElementById('firstname')?.value.trim();
    const password = document.getElementById('password')?.value.trim();
    const confirmPassword = document.getElementById('confirmPassword')?.value.trim();
    if (!email || !lastName || !firstName || !password || !confirmPassword) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name: lastName, firstname: firstName })
      });
      const data = await res.json();
      document.getElementById("h2").innerHTML = data;
    } catch (error) {
      // console.error(error);
      alert("Une erreur est survenue lors de la création du compte.");
    }
  });
}

