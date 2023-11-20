// content.js
function getIMDbID() {
  const urlRegex = /\/title\/(tt\d+)\//;
  const match = window.location.href.match(urlRegex);
  return match ? match[1] : null;
}

function isTVSeries() {
  const seriesClasses = "ipc-inline-list ipc-inline-list--show-dividers sc-7f1a92f5-4 kIoyyw baseAlt"; // Adjust this based on your specific case
  const seriesList = document.getElementsByClassName(seriesClasses);
  console.log(seriesList)
  return seriesList && seriesList[0].children.length === 4;
}

function addEmbed(imdbID, isSeries) {
  const embedURL = isSeries ?
        `https://vidsrc.me/embed/tv?imdb=${imdbID}&season=1&episode=1` :
        `https://vidsrc.me/embed/movie?imdb=${imdbID}`;

    const iframe = document.createElement("iframe");
    iframe.src = embedURL;
    iframe.style = "width: 100%; height: 100vh; position: relative; z-index: 2147483647;"; // Set z-index to max value
    iframe.frameBorder = "0";
    iframe.referrerPolicy = "origin";
    iframe.allowFullscreen = true;

    // Find the section element to append the iframe below
    const sectionElement = document.querySelector('.ipc-page-background.ipc-page-background--baseAlt.sc-ae13f4cd-0.liescR.atf-background-theme-dark');

    if (sectionElement) {
        // Create a container div to hold the iframe, input fields, and button, and set the z-index
        const inputDiv = document.createElement("div");
        const playerDiv = document.createElement("div");
        const topBarDiv = document.createElement("div");
        inputDiv.style = "position: relative; z-index: 2147483647; display:flex; justify-content:left; background-color:black;";
        topBarDiv.style = "position: relative; z-index: 2147483647; display:flex; justify-content:space-between; background-color:black; padding:10px";
        // Create input fields for season and episode
        const seasonInput = document.createElement("input");
        seasonInput.type = "text";
        seasonInput.placeholder = "Enter Season";
        seasonInput.style = 'padding: 8px; margin-right: 10px; border: 1px solid #ccc;'; // Combined styles as a string

        isSeries && inputDiv.appendChild(seasonInput);

        const episodeInput = document.createElement("input");
        episodeInput.type = "text";
        episodeInput.placeholder = "Enter Episode";
        episodeInput.style = 'padding: 8px; margin-right: 10px; border: 1px solid #ccc;'; // Combined styles as a string

        isSeries &&  inputDiv.appendChild(episodeInput);

        // Create a button to update the iframe
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.style = 'padding: 8px 16px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;'; // Combined styles as a string

        updateButton.addEventListener("click", () => {
            // Update the iframe source with the entered season and episode values
            const updatedURL = `https://vidsrc.me/embed/tv?imdb=${imdbID}&season=${seasonInput.value}&episode=${episodeInput.value}`;
            iframe.src = updatedURL;
        });
        isSeries && inputDiv.appendChild(updateButton);

        const githubButton = document.createElement("button");
        githubButton.textContent = "GitHub";
        githubButton.style = 'padding: 8px 16px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;';
        githubButton.addEventListener("click", () => {
          // Update the iframe source with the entered season and episode values
          const url = `https://github.com/HarshalKudale`;
          window.open(url, "_blank");
      });
        // Append the iframe, input fields, and button below the section element
        topBarDiv.appendChild(inputDiv);
        topBarDiv.appendChild(githubButton)
        playerDiv.appendChild(topBarDiv);
        playerDiv.appendChild(iframe);
        sectionElement.insertAdjacentElement('afterend', playerDiv);
    } else {
        // If the section element is not found, append the iframe at the top of the body
        document.body.appendChild(iframe);
    }
}

const imdbID = getIMDbID();
if (imdbID) {
  const isSeries = isTVSeries();
  addEmbed(imdbID, isSeries);
}
