import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  // Function to handle button clicks
  const handleClick = (newMessage) => {
    setMessage(newMessage);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Dynamic Button Messages</h1>

      {/* Buttons with different messages */}
      <button onClick={() => handleClick("You clicked Button 1!")}>
        Button 1
      </button>
      <button onClick={() => handleClick("You clicked Button 2!")}>
        Button 2
      </button>
      <button onClick={() => handleClick("You clicked Button 3!")}>
        Button 3
      </button>

      {/* Display the message */}
      <p style={{ marginTop: "20px", fontSize: "18px" }}>{message}</p>
    </div>
  );
}

export default App;