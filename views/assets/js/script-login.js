const formLogin = document.getElementById("form-login")
formLogin.addEventListener("submit", function(e){
    e.preventDefault();
  
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/auth/login";
  
    //get data from form
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
  
    //validasi input
    if (username == "") return alert("Username tidak boleh kosong");
    if (password == "") return alert("password tidak boleh kosong");
  
    let data = JSON.stringify({
      username: username,
      password: password,
    });
  
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
    xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {               
        //   formLogin.reset()
        let data = JSON.parse(this.response)
        //save to token to localStorage
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("refresh_token", data.refresh_token)
        window.location.href = "../home/index.html";
      }
  };
    xhr.send(data);
})