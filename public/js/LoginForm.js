// Get form elements and fade them in with a delay
const formElements = [...document.querySelector(".form").children];
formElements.forEach((element, i) => {
  setTimeout(() => {
    element.style.opacity = 1;
  }, i * 100);
});

// Get the home button element
const homeButton = document.querySelector(".home-btn");

// Add a click event listener to the home button for redirection
homeButton.addEventListener("click", () => {
  setTimeout(() => {
    document.location.href = "index.html";
  }, 300);
});

// Get the login form element
const loginForm = document.getElementById("login");

// Add a submit event listener to the login form
loginForm.addEventListener("submit", handleLogin);

// Function to handle user login
async function handleLogin(event) {
  event.preventDefault();

  // Get user input values
  const enteredUsername = document.getElementById("username").value;
  const enteredPassword = document.getElementById("password").value;

  // Send a POST request to the server for login
  const loginResult = await fetch("api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: enteredUsername,
      password: enteredPassword,
    }),
  }).then((response) => response.json());

  // Check the login result
  if (loginResult.status === "ok") {
    // Store the token in localStorage
    localStorage.setItem("token", loginResult.data);

    // Set session storage variables
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("username", enteredUsername);

    // Redirect to the index.html page
    window.location.href = "index.html";
  } else {
    // Display an alert if there's a login error
    alert(loginResult.error);
  }
}
