function get_data(){
    //GET TWEET FROM BACKEND
    let  xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/tweets"; //ganti nama file sesuai nama file json kalian
    xhr.onreadystatechange = function(){
       if(this.readyState == 4 && this.status == 200){
           let tweets = JSON.parse(this.response)
           tweets["data"].forEach(tweet => {
               const tweetSection = document.getElementById("section-tweets")
               const card = document.createElement("div")
               card.setAttribute("class", "card mt-3 mb-2")
               const cardHeader = document.createElement("div")
               cardHeader.setAttribute("class", "card-header")
               cardHeader.innerHTML = "Tweet from user " + tweet.user_id
               const cardBody  = document.createElement("div")
               cardBody.setAttribute("class", "card-body")
               const blockquote = document.createElement("blockquote")
               blockquote.setAttribute("class", "blockquote mb-2 mt-2")
               const p = document.createElement("p")
               p.innerHTML = tweet.content
               
               blockquote.append(p)
               cardBody.append(blockquote)
               card.append(cardHeader, cardBody)
               tweetSection.append(card)
            });
       }
   }
   xhr.open("GET", url, true);
   xhr.send();
}

window.onload = function(){
    // cek apakah access_token & 
    if((localStorage.getItem("access_token")  && localStorage.getItem("refresh_token")) == null){
        const sectionForm = document.getElementById("section-form")
        sectionForm.classList.add("d-none")
    }
    get_data()
}


//POST NEW TWEET
const formTweet = document.getElementById("form-tweet")
formTweet.addEventListener("submit", function(e){
    e.preventDefault()
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/tweets";

  //get data from form
  content = document.getElementById("tweets").value;

  //validasi input
  if (content == "") return alert("Content tidak boleh kosong");

  let data = JSON.stringify({
    content: content
  });


  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('refresh_token')}`);
  xhr.onreadystatechange = function () {
    if (this.status == 200) {
        formTweet.reset()
    }else{
        alert("Something went wrong !")
    }
};
  xhr.send(data);

  //give feedback
  const alertLoc = document.getElementById("tweet-alert")
  const divEl = document.createElement("div");
  divEl.setAttribute("class", "alert alert-success");
  divEl.setAttribute("role", "alert");
  divEl.innerHTML = "Tweet berhasil ditambahkan !";
  alertLoc.appendChild(divEl);

  
})

const logout = document.getElementById("logout")
logout.addEventListener("click", function(e){
    e.preventDefault()
    let xhr = new XMLHttpRequest();
    let url = "http://127.0.0.1:5000/auth/logout";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem('refresh_token')}`);
    xhr.onreadystatechange = function () {
      if (this.status == 200) {
         console.log(this.response)
      }else{
          alert("Something went wrong !")
      }
  };
    xhr.send();

    //remove token from locasStorage
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    window.location.href = "../home/index.html";
})


