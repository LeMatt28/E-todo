const token = localStorage.getItem("token")
console.log(token)
const payload = JSON.parse(window.atob(token.split('.')[1]));
const userId = payload.userID; 

window.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('mainColor');
    const savedFont = localStorage.getItem('mainFont');

    if(savedColor) document.body.style.color = savedColor;
    if(savedFont) document.body.style.fontFamily = savedFont;

    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, input, textarea, label, header, footer, main, .form-card'
    ).forEach(el => {
        if(savedColor) el.style.color = savedColor;
        if(savedFont) el.style.fontFamily = savedFont;
    });
});



window.onload = () => {
    fetch("http://localhost:5000/user", {
    method: "GET",
    headers: { 'Authorization': `Bearer ${token}` },
})
    .then(res => res.json())
    .then(data => {
         const user = data.result[0];
        console.log(data)
        const firstname = user.firstname
        const lastname = user.name
        const email = user.email

        document.getElementById("accFirstName").value = firstname;
        document.getElementById("accLastName").value = lastname;
        document.getElementById("accEmail").value = email;



    })
}

const AccountForm = document.getElementById('accountForm');
if (AccountForm) {
  AccountForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('accEmail')?.value.trim();
    const lastName = document.getElementById('accLastName')?.value.trim();
    const firstName = document.getElementById('accFirstName')?.value.trim();
    const password = document.getElementById('accPassword')?.value.trim();
    const confirmPassword = document.getElementById('accPasswordConfirm')?.value.trim();

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    const body = {  email,  
                    name: lastName, 
                    firstname: firstName}
    if (password) {
        body.password = password;}

    try {
      const res = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", 
                   "Authorization": `Bearer ${token}` },
                   
        body: JSON.stringify(body)
      });
      const data = await res.json();
      document.getElementById("h2").innerHTML = data.message;
    } catch (error) {
      alert("Une erreur est survenue lors de la création du compte.");
    }
  });
}