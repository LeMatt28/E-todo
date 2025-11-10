//thème
const themeSwitches = document.querySelectorAll('#themeSwitch');

themeSwitches.forEach(themeSwitch => {
  themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    document.body.style.fontFamily = document.body.classList.contains('dark')
      ? "'Inter', sans-serif"
      : "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

    //même état pour tous les switch
    themeSwitches.forEach(sw => {
      if (sw !== themeSwitch) sw.checked = themeSwitch.checked;
    });

    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
});

//appliquer le thème stocké
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeSwitches.forEach(sw => sw.checked = true);
    document.body.style.fontFamily = "'Inter', sans-serif";
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
    //vérif mot de passe
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