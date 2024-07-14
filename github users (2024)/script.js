const usernameInput = document.querySelector("#usernameInput");
const searchButton = document.querySelector("#search");
const profileTemplate = document.querySelector("template");
const searchSection = document.querySelector(".search-section");
const profileSection = document.querySelector(".profile-section");
const backButton = document.querySelector("#backBtn");

searchButton.addEventListener("click", () => {
  const username = usernameInput.value.split(" ");
  let fetchArray = username.map((user) => {
    return fetch("https://api.github.com/users/" + user);
  });
  Promise.all(fetchArray)
    .then((response) => {
      response.forEach((response) => {
        if (response.status >= 400 && response.status <= 500)
          throw new Error("invalid username");
        else if (response.status >= 500) throw new Error("server error");
        else if (response.status >= 300 && response.status <= 400)
          throw new Error("the request has more than one possible response");
      });
      return Promise.all(response.map((el) => el.json()));
    })
    .then((data) => {
      data.forEach((data) => {
        const templateCopy = profileTemplate.content.cloneNode(true);
        const username = templateCopy.querySelector("#username");
        const profileImg = templateCopy.querySelector(".image-container img");
        const joinDate = templateCopy.querySelector("#date");
        const followers = templateCopy.querySelector("#followers");
        const following = templateCopy.querySelector("#following");
        const bio = templateCopy.querySelector("#bio");

        username.textContent = data.login;
        profileImg.src = data.avatar_url;

        let creationDate = data.created_at
          .split("")
          .slice(0, 10)
          .join("")
          .split("-")
          .reverse()
          .join(".");
        joinDate.textContent = creationDate;

        followers.textContent = data.followers;
        following.textContent = data.following;
        bio.textContent = data.bio;
        if (!data.bio) bio.textContent = "Looks like it's empty...";
        profileSection.appendChild(templateCopy);
      });
      profileSection.classList.remove("hidden");
      searchSection.classList.add("hidden");
    })
    .catch((error) => {
      alert(error);
    });
});

backButton.addEventListener("click", () => {
  const profilePanel = document.querySelectorAll("main");
  profilePanel.forEach((panel) => {
    panel.remove();
  });
  profileSection.classList.add("hidden");
  searchSection.classList.remove("hidden");
  usernameInput.value = "";
});
