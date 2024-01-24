// CREDENTIALS BUTTON
document.addEventListener("DOMContentLoaded", function () {
  const inputText = document.getElementById("inputText");
  const setButton = document.getElementById("setButton");
  const output = document.getElementById("output");

  setButton.addEventListener("click", function () {
    const inputValue = inputText.value.trim();

    if (inputValue !== "") {
      // Make a POST request to the server
      fetch("/session-creds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputValue }),
      })
        .then((response) => response.json())
        .then((data) => {
          output.innerHTML = `<p>Server response: ${data.message}</p>`;
        })
        .catch((error) => {
          console.error("Error:", error);
          output.innerHTML = "<p>An error occurred while communicating with the server.</p>";
        });
    } else {
      output.innerHTML = "<p>Please enter some text.</p>";
    }
  });
});
