const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const http = require("http");
const { Web3 } = require("web3");

const User = require("./models/user");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use("/", express.static(path.join(__dirname, "public")));

// Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const JWT_SECRET =
  "sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk";

// Connect to MongoDB
const URI =
  "mongodb+srv://siddraimb:XqIdW7BEAOEx6hyj@cluster0.us6nzjb.mongodb.net/minorRegisterdb?retryWrites=true&w=majority";
mongoose.connect(URI);

// Create HTTP server
const server = http.createServer(app);

// Initialize Web3 instance
const web3 = new Web3("https://ethereum-sepolia.publicnode.com");

// Handle user login
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean();

    if (!user) {
      return res.json({ status: "error", error: "Invalid username/password" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        JWT_SECRET
      );

      return res.json({ status: "ok", data: token });
    }

    res.json({ status: "error", error: "Invalid username/password" });
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Handle user registration
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password: plainTextPassword } = req.body;

    // Validation checks for username, email, and password
    if (!username || typeof username !== "string") {
      return res.json({ status: "error", error: "Invalid username" });
    }

    if (!plainTextPassword || typeof plainTextPassword !== "string") {
      return res.json({ status: "error", error: "Invalid password" });
    }

    if (!email || typeof email !== "string") {
      return res.json({ status: "error", error: "Invalid email" });
    }

    if (plainTextPassword.length < 6) {
      return res.json({
        status: "error",
        error: "Password should be at least 6 characters",
      });
    }
    // Hash the password
    const password = await bcrypt.hash(plainTextPassword, 10);

    // Create user
    await User.create({
      username,
      email,
      password,
    });

    res.json({ status: "ok" });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Email already in use" });
    }
    console.error("Error occurred during registration:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Handle transaction
app.post("/api/transaction", async (req, res) => {
  try {
    const privatekey = req.body.key;

    // Function to send the transaction
    async function sendTransaction() {
      const accountTo = web3.eth.accounts.create();
      const accountFrom = web3.eth.accounts.privateKeyToAccount(privatekey);
      const wallet = web3.eth.accounts.wallet.add(accountFrom.privateKey);

      const _to = accountTo.address;
      const _value = "0.01";

      // Send the transaction
      const receipt = await web3.eth.sendTransaction({
        from: wallet[0].address,
        to: _to,
        value: web3.utils.toWei(_value, "ether"),
      });

      console.log("Account From:", accountFrom);
      console.log("Account To:", accountTo);
      console.log("Tx receipt:", receipt);

      return receipt;
    }

    // Execute the transaction and send the response
    const transactionReceipt = await sendTransaction();
    const transactionHashString = transactionReceipt.transactionHash.toString();

    res.json({ receipt: { transactionHash: transactionHashString } });
  } catch (error) {
    console.error("Error occurred during transaction:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Start the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
