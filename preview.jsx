import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Patient",
    message: "",
  });

  const [summary, setSummary] = useState("");

  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simple summary logic
  const generateSummary = (text) => {
    return text.split(" ").slice(0, 12).join(" ") + "...";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSummary(generateSummary(formData.message));
  };

  // Chatbot logic
  const getBotResponse = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes("fever")) {
      return "Stay hydrated, take rest, and consult a doctor if needed.";
    } else if (msg.includes("covid")) {
      return "Isolate and consult a healthcare provider.";
    } else if (msg.includes("doctor")) {
      return "You can visit nearby hospitals or NGOs.";
    } else if (msg.includes("help")) {
      return "Please fill the form above. Our team will contact you.";
    } else {
      return "Sorry, I can answer only basic health questions.";
    }
  };

  const handleChat = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: getBotResponse(input) };

    setChat([...chat, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      
      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-lg">
        <h1 className="text-xl font-bold mb-4">Healthcare Support</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Describe your issue"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-blue-600 text-white p-2 rounded">
            Submit
          </button>
        </form>

        {summary && (
          <div className="mt-4 bg-green-100 p-3 rounded">
            <b>Summary:</b> {summary}
          </div>
        )}
      </div>

      {/* CHATBOT */}
      <div className="bg-white p-6 mt-6 rounded-xl shadow w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-2">Chatbot</h2>

        <div className="h-48 overflow-y-auto border p-2 rounded mb-2">
          {chat.map((msg, i) => (
            <div key={i} className={msg.sender === "user" ? "text-right" : "text-left"}>
              <span
                className={`inline-block px-3 py-1 m-1 rounded ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border p-2 rounded-l"
            placeholder="Ask something..."
          />
          <button
            onClick={handleChat}
            className="bg-blue-600 text-white px-4 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}