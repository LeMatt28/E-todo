const token = localStorage.getItem("token")
console.log(token)

fetch("http://localhost:5000/user/todos", {
    method: "GET",
    headers: { 'Authorization': `Bearer ${token}` },
})
.then(async res => {
        const data = await res.json();
        const container = document.getElementById("h1");
container.innerHTML = ""; 

data.result.forEach(todo => {
    container.innerHTML += `
            Title : ${todo.title}<br>
            Description : ${todo.description}<br>
            Due time: ${todo.due_time}<br>
            Status : ${todo.status}<br>
    `;
});

});


