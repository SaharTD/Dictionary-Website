
// API endpoint URL
const   apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// DOM elements
const resultElements = document.getElementById("result");
const inputField = document.getElementById("inp-word");
const searchbtn = document.getElementById("search-btn");
const clearbtn = document.getElementById("clear-btn");

// Create an XMLHttpRequest object
const xhr = new XMLHttpRequest();


//event listener for the search button
searchbtn.addEventListener("click", function () {


  const word = inputField.value;

//api request 
  xhr.open("GET", `${apiUrl}${word}`, true);

  xhr.onload = function () {
    if (xhr.status === 200) {

      //parse the request
      const response = JSON.parse(xhr.responseText);

      console.log(response);



      // display the word`s definition

      let definitionsHTML = '';

      response[0].meanings.forEach(meaning => {
        definitionsHTML +=
          `
          <div class="word">
            <h3>${word}</h3>
          </div>
          <div class="details">
            <p>${meaning.partOfSpeech}</p>
            <p>/${response[0].phonetic}/</p>
          </div>
          <p class="word-meaning">
            ${meaning.definitions[0].definition}
          </p>
          <p class="word-example">
            ${meaning.definitions[0].example || ""}
          </p>`;

      });


      resultElements.innerHTML = definitionsHTML;
    } else {
      //display an error message in case if the word is not found
      resultElements.textContent = "Sorry,Couldn't find the word.";
    }
  };

  //send the request
  xhr.send();
});

//event listener for the clear button

clearbtn.addEventListener("dblclick", function () {
  resultElements.innerHTML = "";
  inputField.value = "";
});
//event listener for the input to converted to uppercase 

inputField.addEventListener("keyup", function () {

  inputField.value = inputField.value.toUpperCase();

});