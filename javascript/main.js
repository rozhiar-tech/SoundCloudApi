var searchbutton = document
  .querySelector(".js-submit")
  .addEventListener("click", function () {
    var searchinput = document.querySelector(".js-search").value;
    SoundClaoudAPI.getTrack(searchinput);
  });

var se = document
  .querySelector(".js-search")
  .addEventListener("keyup", function (e) {
    var searchinput = document.querySelector(".js-search").value;

    if (e.which === 13) {
      SoundClaoudAPI.getTrack(searchinput);
    }
  });

var SoundClaoudAPI = {};

SoundClaoudAPI.init = function () {
  SC.initialize({
    client_id: "cd9be64eeb32d1741c17cb39e41d254d",
  });
};
SoundClaoudAPI.init();
SoundClaoudAPI.getTrack = function (inputValue) {
  // find all sounds of buskers licensed under 'creative commons share alike'
  SC.get("/tracks", {
    q: inputValue,
  }).then(function (tracks) {
    console.log(tracks);
    SoundClaoudAPI.renderTracks(tracks);
  });
};

SoundClaoudAPI.renderTracks = function (tracks) {
  tracks.forEach(function (track) {
    //card
    var card = document.createElement("div");
    card.classList.add("card");
    var searchclass = document.querySelector(".js-search-results");
    searchclass.appendChild(card);
    //image
    var image = document.createElement("div");
    image.classList.add("image");
    var image_img = document.createElement("img");
    image_img.classList.add("image_img");
    image_img.src = track.artwork_url || "http://www.placekitten.com/290/290";
    image.appendChild(image_img);
    //content
    var content = document.createElement("div");
    content.classList.add("cacontentrd");

    var header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML =
      "<a href=" +
      track.permalink_url +
      " target=_blank >" +
      track.title +
      "</a";
    //button
    var button = document.createElement("div");
    button.classList.add("ui", "attached", "button", "js-button");

    var icon = document.createElement("i");
    icon.classList.add("add", "icon");
    var button_text = document.createElement("span");
    button.innerHTML = "add to playlist";

    content.appendChild(header);
    button.appendChild(icon);
    button.addEventListener("click", function () {
      SoundClaoudAPI.showPlaylist(track.permalink_url);
    });
    card.appendChild(image);
    card.appendChild(content);
    card.appendChild(button);
    var searchResult = document.querySelector(".search-results");
    searchclass.appendChild(card);
  });
};

SoundClaoudAPI.showPlaylist = function (trackk) {
  console.log("iam in bed");
  SC.oEmbed(trackk, {
    auto_play: true,
  }).then(function (embed) {
    console.log("oEmbed response: ", embed);
    var sidebar = document.querySelector(".js-playlist");
    var box = document.createElement("div");
    box.innerHTML = embed.html;
    sidebar.insertBefore(box, sidebar.firstChild);
    localStorage.setItem("key", sidebar.innerHTML);
  });
};
function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

var sidebar = document.querySelector(".js-playlist");
sidebar.innerHTML = localStorage.getItem("key");
