const request = (url, cb) => {
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      return cb(data);
    })
    .catch(error => {
      console.log(error);
    });
};

const cuisineDivs = document.querySelectorAll(".type");
const ul = document.createElement("ul");

const submit = document.getElementById("contact-submit");

cuisineDivs.forEach(element => {
  const img = document.querySelector(`#${element.id} img`);
  img.addEventListener("click", () => {
    request(`/cuisine=${img.alt}`, data => {
      data.forEach(ele => {
        const restaurantColumn = document.createElement("div");
        const restaurantContent = document.createElement("div");

        const restaurantLogo = document.createElement("img");
        restaurantLogo.setAttribute("width", "20%");
        restaurantLogo.setAttribute("height", "20%");
        const resName = document.createElement("p");
        const deliviry = document.createElement("p");
        const phone = document.createElement("p");
        restaurantContent.appendChild(restaurantLogo);
        restaurantContent.appendChild(resName);
        restaurantContent.appendChild(deliviry);
        restaurantContent.appendChild(phone);

        const li = document.createElement("li");

        const imageName = ele.res_name.replace(/ /g, "");

        restaurantLogo.src = `./public/images/${imageName}.png`;
        resName.innerText = ele.res_name;
        let delivery = "Yes";
        if (!ele.delivery) {
          delivery = "No";
        }
        deliviry.innerText = `Deliviry: ${delivery}`;
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

const loginBtn = getElementById("loginBtn");
loginBtn.addEventListener("click", () => {
	request(`/profile`, data => {


});
