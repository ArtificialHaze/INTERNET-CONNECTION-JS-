const statusDisplay = document.getElementById("status");
const image = document.getElementById("image");
const backgroundColor = document.getElementById("main");

window.addEventListener("load", (e) => {
  statusDisplay.textContent = navigator.onLine ? "Online" : "Offline";
});

window.addEventListener("offline", (e) => {
  statusDisplay.textContent = "Offline";
});

window.addEventListener("online", (e) => {
  statusDisplay.textContent = "Online";
});

async function connnectionStatus() {
  try {
    const fetchResults = await fetch(
      `[TARGET_GOES_HERE]${new Date().getTime()}`
    );
    image.src = "[ONLINE.PNG]";
    setColor();
    return fetchResults.status >= 200 && fetchResults.status < 300;
  } catch (e) {
    statusDisplay.textContent =
      "404 or something else? Internet connection is down.";
    console.error(e.message);
    image.src = "[OFFLINE.PNG]";
    backgroundColor.classList.remove("online");
  }
}

function setColor() {
  backgroundColor.classList.add("online");
}

setInterval(async () => {
  const result = await connnectionStatus();
  if (result) {
    statusDisplay.textContent =
      "You are Online, Internet connection looks good";
    setColor();
  }
}, 6000);

window.addEventListener("load", async (event) => {
  if (connnectionStatus()) {
    statusDisplay.textContent = "You are Online";
  } else {
    statusDisplay.textContent = "You are Offline";
  }
});
