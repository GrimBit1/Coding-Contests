let container = document.getElementsByClassName("container")[0];


let search = document.getElementsByClassName("form-control")[0];


let card = document.getElementsByClassName("card");


let title = document.getElementsByClassName("title")[0];

let titleText = title.innerText;

console.log(titleText);


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
    allCardsHtml += `<div class="card" style="width: 18rem">
    <img src="${imgSrc}" class="card-img-top" alt="${element.name}" />
    <div class="card-body">
      <h5 class="card-title">${element.name}</h5>
      
        <h6>Creator</h6>
        <h6 class='site'>${element.site}</h6>
      <div class="status">${
        element.status == "CODING" ? "Live" : "Not Started"
      }</div>
      <a href="${element.url}" class="btn btn-primary">Go to ${element.site}</a>
    </div>
  </div>`;


    container.innerHTML = allCardsHtml;

  });


  // container.innerHTML += allCardsHtml
};

fetchContest();


const searchValue = () => {

  container.innerHTML = allCardsHtml;

  title.innerText = titleText;

  if (search.value != ``) {
    let allSearch = Array.from(card);

    title.innerText = `${search.value}`.toUpperCase();

    // console.log(allSearch);


    let filterSearch = allSearch.filter((element) => { 
      let elementTxt = `${element.lastElementChild.lastElementChild.innerText}`.toLowerCase()
      console.log(elementTxt)
      let lowerSearch = `${search.value}`.toLowerCase()
console.log(lowerSearch)
      return elementTxt.includes(
        lowerSearch
      ); // to search which creator is hosting that

    });


    // console.log(filterSearch);


    container.innerHTML = ``;


    filterSearch.forEach((element) => {
      //console.log(element);


      container.innerHTML += element.outerHTML; // Adding the filtered element

    });

  }
  // else{
  //   title.innerText = titleText;
  // }

  // container.childNodes = [...filterSearch]
  // console.log(container)
};

