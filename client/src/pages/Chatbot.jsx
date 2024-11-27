import { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

// Chatbot component
export default function Chatbot() {
    const [question, setQuestion] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // State for chatbot visibility

    // Load history from localStorage on component mount
    useEffect(() => {
        const storedHistory = localStorage.getItem("chatHistory");
        if (storedHistory) {
            setChatHistory(JSON.parse(storedHistory));
        }
    }, []);

    // Save chat history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }, [chatHistory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("transcript: ", transcript);
        setQuestion(transcript);
        if (!question.trim()) return;

        if (transcript) {
            const newHistory = [...chatHistory, { role: "user", text: question }];
            setChatHistory(newHistory);
            setQuestion("");

        }
        else {

            // Add user's question to the history
            const newHistory = [...chatHistory, { role: "user", text: question }];
            setChatHistory(newHistory);
            setQuestion("");
        }

        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_PRO_API_KEY}`,
                method: "post",
                data: { contents: [{ parts: [{ text: question }] }] },
            });

            const botResponse = response.data.candidates[0].content.parts[0].text;

            // Update chat history with bot's response
            setChatHistory((prev) => [
                ...prev,
                { role: "bot", text: botResponse },
            ]);
        } catch (error) {
            setChatHistory((prev) => [
                ...prev,
                { role: "bot", text: "Error fetching the response. Please try again." },
            ]);
            console.log("error: ", error);
        }
    };

    const [transcript, setTranscript] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        // Initialize the SpeechRecognition API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.addEventListener('result', (event) => {
            const resultTranscript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            setTranscript(resultTranscript);
        });

        recognitionInstance.addEventListener('end', () => {
            setIsRecording(false);
        });
        console.log("transript: ", transcript);
        setRecognition(recognitionInstance);
    }, []);

    const startRecording = (e) => {
        e.preventDefault();
        if (!isRecording) {
            recognition.start();
            setIsRecording(true);
            setTranscript(''); // Clear previous transcript
        }
    };

    const stopRecording = (e) => {
        e.preventDefault();

        if (isRecording) {
            recognition.stop();
        }
    };

    // const handleSubmit = () => {
    //     if (transcript.trim()) {
    //         // Sending data to backend (dummy URL)
    //         fetch('https://your-backend-endpoint.com/submit', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ text: transcript }),
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 alert('Transcript sent successfully!');
    //             }).catch(error => {
    //                 console.error('Error:', error);
    //             });
    //     }
    // };



    return (
        <div className="absolute right-0 z-99999">
            <button
                onClick={() => setIsOpen(!isOpen)} // Toggle chatbot visibility
                className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-400 rounded-lg px-4 py-2 text-white"
            >
                {isOpen ? "Close Chatbot" : "Open Chatbot"}
            </button>

            {isOpen && ( // Render chatbot only if isOpen is true
                <div className="fixed bottom-16 right-4 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
                    <div className="flex-1 p-4 overflow-y-auto">
                        {chatHistory.map((chat, index) => (
                            <div key={index} className={`mb-2 ${chat.role === "user" ? "text-right" : "text-left"}`}>
                                <div
                                    className={`inline-block p-2 rounded-lg ${chat.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                                        }`}
                                >
                                    <ReactMarkdown>{chat.text}</ReactMarkdown>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form className="flex flex-col p-2 gap-2" onSubmit={handleSubmit}>
                        <div className="controls flex gap-2 justify-center items-center">
                            <button onClick={startRecording} disabled={isRecording} className="rounded-lg border-[1px] border-black px-2">Speak</button>
                            <button onClick={stopRecording} disabled={!isRecording} className="rounded-lg border-[1px] border-black px-2">Stop</button>
                        </div>


                        <div className="flex gap-2">

                            <textarea
                                name="question"
                                className="flex-1 border-2 border-gray-500 p-2 rounded-lg resize-none"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Type your message..."
                                rows={1}
                            />
                            <button
                                type="submit"
                                className="ml-2 bg-blue-500 hover:bg-blue-400 rounded-lg px-4 py-2 text-white"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
