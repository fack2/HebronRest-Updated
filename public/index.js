const request = (url, cb) => {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return cb(data);
    })
    .catch(error => {
      console.log("fetch error", error);
    });
};
//pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
const cuisineDivs = document.querySelectorAll(".type");
const ul = document.createElement("ul");

const submit = document.getElementById("contact-submit");

cuisineDivs.forEach(element => {
  const img = document.querySelector(`#${element.id} img`);
  img.addEventListener("click", () => {
    request(`/cuisine=${img.alt}`, data => {
      data.forEach(ele => {
        const restaurantColumn = document.createElement("section");
        const restaurantContent = document.createElement("section");

        const restaurantLogo = document.createElement("img");
        restaurantLogo.setAttribute("class", "restaurantLogo");
        const resName = document.createElement("p");
        const delivery = document.createElement("p");
        const phone = document.createElement("p");
        restaurantContent.appendChild(restaurantLogo);
        restaurantContent.appendChild(resName);
        restaurantContent.appendChild(delivery);
        restaurantContent.appendChild(phone);

        const li = document.createElement("li");

        const imageName = ele.res_name.replace(/ /g, "");

        restaurantLogo.src = `./public/images/${imageName}.png`;
        resName.innerText = ele.res_name;
        let deliveryStatus = "Yes";
        if (!ele.delivery) {
          deliveryStatus = "No";
        }

        delivery.innerText = `Delivery: ${deliveryStatus}`;
        phone.innerText = `Phone: ${ele.phone}`;
        restaurantColumn.appendChild(restaurantContent);
        li.appendChild(restaurantColumn);

        ul.appendChild(li);
      });
      element.appendChild(ul);
    });
    ul.innerText = "";
  });
});

const closeBtn = document.getElementById("closeBtn");
const logindiv = document.getElementById("logindiv");
closeBtn.addEventListener("click", () => {
  logindiv.style.display = "none";
});

const addPlace = document.getElementById("addPlace");
addPlace.addEventListener("click", () => {
  logindiv.style.display = "block";
});
const loginBtn = document.getElementById("loginBtn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");

var form = document.getElementById("formId");
form.addEventListener("submit", function(event) {
  
  event.preventDefault();

  if (password.value === "") {
    error.textContent = "Please enter a password";
  }

  if (email.value === "") {
    error.textContent = "Please enter an email address";
  }
});

const closeOutBtn = document.getElementById("closeOutBtn");
const logOutdiv = document.getElementById("logOutdiv");
closeOutBtn.addEventListener("click", () => {
  logindiv.style.display = "none";
  logOutdiv.style.display = "none";
});

const signUp = document.getElementById("signup");
signUp.addEventListener("click", () => {
  console.log("heeke");
  logOutdiv.style.display = "block";
});
