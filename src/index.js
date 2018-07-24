document.addEventListener("DOMContentLoaded", function() {
  fetchAllHogs();
  document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let speciality = document.getElementById("specialty").value;
    let medal = document.getElementById("medal").value;
    let weight = document.getElementById("weight").value;
    let image = document.getElementById("img").value;
    let greased = document.getElementById("greased").checked;
    if (name) {
      postHog(name, speciality, medal, weight, image, greased);
    }
  });
});

function fetchAllHogs() {
  fetch(`http://localhost:3000/hogs`)
    .then(response => response.json())
    .then(jsonData => jsonData.forEach(hog => renderHog(hog)));
}

function patchHog(hog, greased) {
  let data = { greased: greased };
  fetch(`http://localhost:3000/hogs/${hog.id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(hog => {
      console.log(hog);
    });
}

function deleteHog(hog) {
  fetch(`http://localhost:3000/hogs/${hog.id}`, {
    method: "DELETE"
  }).then(response => {
    console.log("Successfully deleted hog", hog.id);
    let container = document.getElementById("hog-container");
    container.innerHTML = "";
    fetchAllHogs();
  });
}

function postHog(name, specialty, medal, weight, image, greased) {
  let data = {
    name: name,
    specialty: specialty,
    "highest medal achieved": medal,
    "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight,
    image: image,
    greased: greased
  };

  fetch(`http://localhost:3000/hogs/`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(function(hog) {
      renderHog(hog);
    });
}

function renderHog(hog) {
  let container = document.getElementById("hog-container");
  newHogCard = document.createElement("div");
  container.appendChild(newHogCard);
  newHogCard.className = "hog-card";
  let name = document.createElement("h2");
  name.innerHTML = `${hog.name}`;
  let speciality = document.createElement("p");
  speciality.innerHTML = `Specialty: ${hog.specialty}`;
  let medal = document.createElement("p");
  medal.innerHTML = `Highest Medal Achieved: ${hog["highest medal achieved"]}`;
  let weight = document.createElement("p");
  weight.innerHTML = `Weight, in fridges, or something like that: ${
    hog[
      "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"
    ]
  }`;
  let image = document.createElement("img");
  image.src = `${hog.image}`;
  image.style = "border-style: solid; border-width: 2.5px;";
  let greased = document.createElement("input");
  greased.type = "checkbox";
  let greasedLabel = document.createElement("p");
  greasedLabel.innerHTML = "Greased?";
  greased.checked = hog.greased ? true : false;

  let lineBreak = document.createElement("p");

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "delete";

  newHogCard.appendChild(name);
  newHogCard.appendChild(speciality);
  newHogCard.appendChild(medal);
  newHogCard.appendChild(weight);
  newHogCard.appendChild(image);
  newHogCard.appendChild(greasedLabel);
  newHogCard.appendChild(greased);
  newHogCard.appendChild(lineBreak);
  newHogCard.appendChild(deleteButton);

  greased.addEventListener("change", function(event) {
    patchHog(hog, greased.checked);
  });

  deleteButton.addEventListener("click", function(event) {
    deleteHog(hog);
  });
}
