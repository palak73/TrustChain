const email = document.getElementById("email");
const password = document.getElementById("password");
const login = document.getElementById("login");
const register = document.getElementById("register");
const usermail = document.getElementById("user-email");
const dashboard = document.getElementById("dashboard");
const logout = document.getElementById("logout");

login.addEventListener("click",()=>{
    if(!email.value || !password.value)
        return alert("Please fill both fields");
    else{
        dashboard.classList.remove("hidden"); 
        usermail.innerText = email.value;
    }
})

register.addEventListener("click",()=>{
    if(!email.value || !password.value)
        return alert("Please fill both fields");
    else{
        dashboard.classList.remove("hidden"); 
        usermail.innerText = email.value;
    }
})

logout.addEventListener("click",()=>{
    dashboard.classList.add("hidden");
    email.value = "";
    password.value = "";
})