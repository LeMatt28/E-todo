// -------------------- THEME SWITCH --------------------
const themeSwitches = document.querySelectorAll('#themeSwitch');

themeSwitches.forEach(themeSwitch => {
  themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    document.body.style.fontFamily = document.body.classList.contains('dark') ?
      "'Inter', sans-serif" : "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

    // synchroniser tous les switch
    themeSwitches.forEach(sw => {
      if(sw !== themeSwitch) sw.checked = themeSwitch.checked;
    });

    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
});

// appliquer le thème sauvegardé
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if(savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeSwitches.forEach(sw => sw.checked = true);
    document.body.style.fontFamily = "'Inter', sans-serif";
  }
});

// -------------------- MENU MOBILE --------------------
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('navLinks');

if(menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// -------------------- BOUTON AIDE FLOTTANT --------------------
const helpBtn = document.getElementById('helpBtn');
if(helpBtn) {
  const helpPopup = document.querySelector('.help-popup');
  helpBtn.addEventListener('click', () => {
    helpPopup.classList.toggle('show');
  });
}

// -------------------- FORMULAIRES --------------------
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    // validation mot de passe sur register
    if(form.id === 'registerForm') {
      const pass = form.querySelector('#password').value;
      const confirm = form.querySelector('#confirmPassword').value;
      if(pass !== confirm) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }
    }
    alert('Formulaire soumis (simulation)');
  });
});

// -------------------- LOGO HOME --------------------
const logoLink = document.querySelector('header h1 a');
if(logoLink) {
  logoLink.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = 'index.html';
  });
}
