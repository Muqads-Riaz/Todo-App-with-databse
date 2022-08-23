
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-analytics.js";
  import { getDatabase, ref, set, push ,onValue } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
  import { getAuth ,createUserWithEmailAndPassword , signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCGmCcBk5xO9osyupjRNEgO217Jo_Ak6qU",
    authDomain: "to-do-app-af57e.firebaseapp.com",
    databaseURL: "https://to-do-app-af57e-default-rtdb.firebaseio.com",
    projectId: "to-do-app-af57e",
    storageBucket: "to-do-app-af57e.appspot.com",
    messagingSenderId: "665475540565",
    appId: "1:665475540565:web:485965acb0b7e5112316dc",
    measurementId: "G-PCYC9GGQJ1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase();
  const auth = getAuth();

window.goToSignIN = function(){
  window.location.href = "signIn.html"
}
window.goToSignUp = function(){
  window.location.href = "signup.html"
}



window.signUp = function () {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var obj = {
    name,
    email,
    password,
  }
createUserWithEmailAndPassword(auth, obj.email, obj.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Signed up successfully")
    window.location.href = "signIn.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error.message)
  });


}
window.signIn = function (){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var obj = {
    email,
    password,
  }
signInWithEmailAndPassword(auth, obj.email, obj.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Signed in successfully");
    window.location.href = "data.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(error.message)
  });
}
window.add = function () {
  var input = document.getElementById("input");
  var obj ={
    text: input.value,
    date: new Date().getHours() + ":" + new Date().getMinutes(),
  };
  if(input.value == ""){
    alert("Empty item cannot be added.Write any text")
  }else{
  var reference = ref(db ,"Lists/");
  var newRef = push(reference);
  set(newRef,obj);
  input.value = "";
  }
  getListData();
}
var parent = document.getElementById("parent");
function getListData(){
parent.innerHTML = "";
const dbRef = ref(db, 'Lists/');

onValue(dbRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
     parent.innerHTML += `<div id="li" class="bg-secondary p-2 d-flex justify-content-between rounded my-2">
  <span id="val" class="text-white">${childData.text}</span>
  <span class="ms-auto">
    <span class="text-white mx-2">${ "Time : " + childData.date }
    </span>
    <button class="edit bg-primary btn text-white" onclick="edit(this,'${childKey}')">Edit</button>
    <button class="delete bg-success btn text-white"  onclick="del(this,'${childKey}')">Delete</button>
 </span>
  </div>`
  });
}, {
  onlyOnce: true
});  
}
getListData();

window.del = function(delBtn,key){
  set(ref(db, 'Lists/'+ key ), { value: null})
  delBtn.parentNode.parentNode.remove();
}

window.edit =  function(editBtn , key){ 
  var val = prompt("Enter Updated value",editBtn.parentNode.parentNode.firstElementChild.textContent );
  set(ref(db, 'Lists/'+ key), { value: val})
  editBtn.parentNode.parentNode.firstElementChild.textContent = val;
}

window.deleteAll = function(){
  set(ref(db, 'Lists/'), { value: null});
  var parent = document.getElementById("parent");
 parent.innerHTML = "";
}







