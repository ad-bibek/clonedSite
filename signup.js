

function saveData(){
    let fName, lName, email, password;
    fName = document.getElementById("fName").value;
    lName = document.getElementById("lName").value;
    email = document.getElementById("email");
    password = document.getElementById("password").value;

    localStorage.setItem("fName",fName);
    localStorage.setItem("lName", lName);
    localStorage.setItem("email",email);
    localStorage.setItem("password",password);
}