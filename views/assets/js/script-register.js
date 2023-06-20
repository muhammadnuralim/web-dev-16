const formRegister = document.getElementById("form-register");
formRegister.addEventListener("submit", function (e) {
  e.preventDefault();
  
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5000/auth/register";

  //get data from form
  username = document.getElementById("username").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  confirm_password = document.getElementById("confirm-password").value;

  //validasi input
  if (username == "") return alert("Username tidak boleh kosong");
  if (email == "") return alert("email tidak boleh kosong");
  if (password == "") return alert("password tidak boleh kosong");
  if (password != confirm_password)
    return alert("password yang dimasukan tidak sama");

  let data = JSON.stringify({
    username: username,
    email: email,
    password: password,
  });
  

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.onreadystatechange = function () {
    if (this.status == 200) {
             
        formRegister.reset()
    }else{
        alert("Something went wrong !")
    }
};
  xhr.send(data);

  //give feedback
  const alertLoc = document.getElementById("alert-loc")
  const div = document.createElement("div");
  div.setAttribute("class", "alert alert-success");
  div.setAttribute("role", "alert");
  div.innerHTML = "Data berhasil ditambahkan !";
  alertLoc.append(div);
});


