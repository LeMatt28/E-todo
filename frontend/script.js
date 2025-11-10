//thème
const themeSwitches = document.querySelectorAll('#themeSwitch');

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

//formulaires
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // vérifie le mdp dans le formulaire
    if (form.id === 'registerForm') {
      const pass = form.querySelector('#password').value;
      const confirm = form.querySelector('#confirmPassword').value;
      if (pass !== confirm) {
        alert("les mots de passe ne correspondent pas");
        return;
      }
    }

    alert('formulaire envoyé (simulation)');
  });
});

//logo
const logoLink = document.querySelector('header h1 a');
if (logoLink) {
  logoLink.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = 'index.html';
  });
}