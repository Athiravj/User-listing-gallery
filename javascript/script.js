const fetchUserList = () => {
  fetch("https://dummyapi.io/data/v1/user?limit=10", {
    method: "GET",
    headers: {
      "app-id": "624a622e330887b47314e943",
    },
  })
    .then((response) => {
      if (response.ok === false) {
        throw error("Error");
      }
      return response.json();
    })
    .then((data) => {
      const html = data.data
        .map((user) => {
          return `
        <div class="users" id="${user?.id}"   >
        <img src="${user?.picture}" id="imgId1" alt="${user?.firstName}" />
          <div class="personal-info">
            <p>  ${user?.title}</p>
            <p class="name"> ${user?.firstName} ${user?.lastName}</p>
            <i class="fa fa-youtube-play" aria-hidden="true"></i>
            <i class="fa fa-twitter" aria-hidden="true"></i>
            <i class="fa fa-instagram" aria-hidden="true"></i>
          </div>
        </div>
        `;
        })
        .join("");

      document.getElementById("app").insertAdjacentHTML("afterbegin", html);
      const elements = document.getElementsByClassName("users");

      for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", loadDetailScreen);
      }

      const element_img = document.getElementById("imgId");
      for (let i = 0; i < elements.length; i++) {
        element_img[i].addEventListener("click", loadDetailScreen);
      }

    })
    .catch((error) => {
      console.log("An Error ocuured", error);
    });
};

fetchUserList();

const fetchUserDetails = (userId) => {
  fetch(`https://dummyapi.io/data/v1/user/${userId}`, {
    method: "GET",
    headers: {
      "app-id": "624a622e330887b47314e943",
    },
  })
    .then((response) => {
      if (response.ok === false) {
        throw error("Error");
      }
      return response.json();
    })
    .then((data) => {

      let info = `
      <div class="usersdetails" id="${data?.id}">
        <p>
        <img src="${data?.picture}" id="imgId2" alt="${data?.firstName}"  />
        </p>
          <div class="singledetails">
                <p>  ${data?.title}</p>
                <p class="names"> ${data?.firstName} ${data?.lastName}</p>
                 <p style="font-size: 15px;  line-height: 25px;"> ${data?.email}<br>
                  ${data?.dateOfBirth}<br>
                  ${data?.gender}<br></p>
                  <p class="text">Emergency Contact number</p>
              <div class="contact">
                ${data?.phone}
                </div>
                <h3 style>DISEASE / SYMPTOM</h3>
                <p class="disease">
                Hyper tension, Blood pressure, Daibetes, Sugar, headache
                </p>
          <h3>ADDRESS</h3>
            <div class="address" >
              <p>${data?.location?.street}<br>
              ${data?.location?.city}<br>
              ${data?.location?.country}<br>
              ${data?.location?.state}</p>
        
            </div>
          </div>
      </div>
        `;

      const div = document.querySelector("#details");
      div.innerHTML = info;
      document.getElementById("imgId2").insertAdjacentHTML("afterbegin", info);
    });
};

const loadDetailScreen = (e) => {
  const { id, tagName, parentNode } = e.target;
  const uid = tagName === "DIV" ? id : parentNode.id;
  let fullcontainer = document.getElementById("parent");
  
  if (fullcontainer.style.display === "none") {
    fullcontainer.style.display = "block";
  } else {
    fullcontainer.style.display = "none";
    document.getElementById("back").style.display = "block";
    document.getElementById("details").style.display = "block";
  }

  fetchUserDetails(uid);
};

const backButton = () => {
  document.getElementById("parent").style.display = "block";
  document.getElementById("back").style.display = "none";
  document.getElementById("details").style.display = "none";
};
