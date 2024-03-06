const form = document.getElementById("tran_form");

form.addEventListener("submit", async function(e) {
  e.preventDefault();
 
  const key = document.querySelector("#pvtkey").value;
  console.log(key);

  try {
    const response = await fetch("/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error}`);
    }

    const result = await response.json();
    const transactionHash = result.receipt.transactionHash;

    const transactionHashSpan = document.querySelector(".trans_hash");
    transactionHashSpan.textContent = "Transaction Hash: " + transactionHash;

  } catch (error) {
    console.error("Error occurred:", error);
  }
});
