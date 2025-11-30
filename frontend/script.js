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

        window.location.href = "http://localhost:3001/dashboard.html"

        
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


// Toaster notification bloc note
function showToast(message, ok=true){
  let toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.right = "18px";
  toast.style.bottom = "18px";
  toast.style.background = ok ? "#e7fbe7" : "#ffecec";
  toast.style.color = ok ? "#168054" : "#c52c2c";
  toast.style.padding = "9px 17px";
  toast.style.borderRadius = "8px";
  toast.style.border = "1.2px dashed " + (ok ? "#4be1b1" : "#c52c2c");
  toast.style.fontFamily = "'Fira Mono', 'Roboto Mono', monospace";
  toast.style.boxShadow = "0 2px 16px rgba(60,88,32,0.13)";
  toast.style.zIndex = 1200;
  toast.style.opacity = "0.96";
  document.body.appendChild(toast);
  setTimeout(()=>{ toast.remove(); },1500);
}


window.addEventListener('DOMContentLoaded', () => {
    const styleBtn = document.getElementById('styleBtn');
    const styleModal = document.getElementById('styleModal');
    const mainColorInput = document.getElementById('mainColorInput');
    const fontSelect = document.getElementById('fontSelect');

    const savedColor = localStorage.getItem('mainColor');
    const savedFont = localStorage.getItem('mainFont');

    if(savedColor) {
      document.body.style.color = savedColor;}
    if(savedFont) 
      {document.body.style.fontFamily = savedFont;}

    const header = document.querySelector('header')
    const footer = document.querySelector('footer')

    if (savedColor) {
      if (header) header.style.borderColor = savedColor;
      if (footer) footer.style.borderColor = savedColor;
    }

    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, input, textarea, label, header, footer, main, .kanban-task, .timeline-item, .modal-content').forEach(el => {
        if(savedColor) el.style.color = savedColor;
        if(savedFont) el.style.fontFamily = savedFont;
    });

    styleBtn.onclick = () => {
        styleModal.style.display = 'flex';
    };

    window.closeStyleModal = () => {
        styleModal.style.display = 'none';
    };

    window.applyStyle = () => {
        const color = mainColorInput.value;
        const font = fontSelect.value;

        document.body.style.color = color;
        document.body.style.fontFamily = font;
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, input, textarea, label, header, footer, main, .kanban-task, .timeline-item, .modal-content').forEach(el => {
            el.style.color = color;
            el.style.fontFamily = font;

            if (el.tagName === "HEADER" || el.tagName === "FOOTER") el.style.borderColor = color;
          
        });

        localStorage.setItem('mainColor', color);
        localStorage.setItem('mainFont', font);

        closeStyleModal();
    };
});
