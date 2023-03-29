let container = document.getElementsByClassName("container")[0];
console.log(container);

let allCardsHtml = "";
let randomUniqueNumArr = [];

const fetchContest = async () => {
  let api = "https://kontests.net/api/v1/all";
  let contestResponse = fetch(api);
  let imgSrc = "";
  let allContest = await contestResponse.then(
    (value) => value.json(),
    (err) => {
      console.log("Error Occured");
    }
  );
  let allContestLength = allContest.length;
  // console.log(allContest);

  // Requesting the image for each card
  allContest.forEach(async (element) => {
    let response = await fetch(
      "https://api.unsplash.com/photos/random?query=programming",
      {
        headers: {
          Authorization:
            "Client-ID -9TysSBIeOahCTUC9peQVK3iCgwH7RcepDGUN9Jirkk",
        },
      }
    );
    // If the response is not good then
    if (!response.ok) {
      response = await fetch(
        `https://api.pexels.com/v1/search?query=programming&per_page=${allContestLength}`,
        {
          headers: {
            Authorization:
              "YSWF8I2pKMrnidleyVMbI1KUVxUj8n2lNIwPf6IEnsIt5AmHMHKaydPl",
          },
        }
      );
      let value = await response.json();


      // To generate a random num which doesn't come again
      let randomNum = parseInt(Math.random() * allContestLength);
      while (randomUniqueNumArr.includes(randomNum)) {
        randomNum = parseInt(Math.random() * allContestLength);
      }
      randomUniqueNumArr.push(randomNum);
      imgSrc = value.photos[randomNum].src.large;
    }


    // If the response is good then
    else if (response.ok) {
      let value = await response.json();
      imgSrc = value.urls.regular;
    } else {
    }

    // To populate the container according to the array of contest
    container.innerHTML += `<div class="card" style="width: 18rem">
        <img src="${imgSrc}" class="card-img-top" alt="${element.name}" />
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <div class="status">${
            element.status == "CODING" ? "Live" : "Not Started"
          }</div>
          <a href="${element.url}" class="btn btn-primary">Go to ${
      element.site
    }</a>
        </div>
      </div>`;
  });

  // container.innerHTML += allCardsHtml
};
fetchContest();
