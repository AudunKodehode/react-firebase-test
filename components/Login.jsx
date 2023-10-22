import "./Login.css"
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";


export default function Login() {

let adminToggle = false; 
let adminLoggedIn = false;


function adminOnlineFunction() {
    adminLoggedIn = true;
    document.querySelector(".adminButton").textContent = "Logged in"
    document.querySelector(".adminButton").style.backgroundColor = "green";
    document.querySelector(".inputcontainer").style.display = "none";
}
function adminOfflineFunction() {
    adminLoggedIn = false;
    document.querySelector(".adminButton").textContent = "Admin"
    document.querySelector(".adminButton").style.backgroundColor = "gray";
    document.querySelector(".inputcontainer").style.display = "flex";
}

function toggleAdmin() {
adminToggle = !adminToggle;
if (adminToggle == true) {
    document.querySelector(".inputcontainer").style.display = "flex";
}else if (adminToggle == false) {
    document.querySelector(".inputcontainer").style.display = "none";
}
}

const logIn = async () => {
try {
    let adminUsername = document.querySelector("#adminUsername").value;
    let adminPassword = document.querySelector("#adminPassword").value;
    const docRef = doc(db, "adminlogin", "adminlogin");
    const docSnap = await getDoc(docRef);
    const adminUsern = docSnap.data().username || [];
    const adminPass = docSnap.data().password || [];
    if (adminPass === adminPassword && adminUsern === adminUsername) {
        adminOnlineFunction();
    } else {
        adminOfflineFunction();
    }
} catch (error) {
    console.log("error")
}
}
    return (
        <div className="login">
            <button onClick={toggleAdmin} className="adminButton">Admin</button>
            <div className="inputcontainer">
            <input id="adminUsername" type="text" placeholder="Username"/>
            <input id="adminPassword" type="password" placeholder="Password"/>
            <button onClick={logIn} className="loginButton">Log in</button>
            </div>
       </div>
    )
}