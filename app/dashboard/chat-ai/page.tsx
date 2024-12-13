'use client';
import { useState } from 'react';

const Chat = () => {
  const [input, setInput] = useState<string>(''); // User input
  const [response, setResponse] = useState<string>(''); // Response from OpenAI
  const [loading, setLoading] = useState<boolean>(false); // Response from OpenAI

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    setResponse(''); // Reset response
    try {
      const res = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!res.body) throw new Error('No stream body received');

      // Read and display the stream
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        setLoading(false)
        if (value) {
          const chunk = decoder.decode(value, { stream: true }); // Decode the chunk
          setResponse((prev) => prev + chunk); // Append chunk to the response
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to fetch response');
      setLoading(false)
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-md">
      <h1 className="text-2xl font-bold mb-4">OpenAI Chat</h1>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message and press Enter..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </form>

      {/* Response Display */}
      <div className="mt-4 p-2 bg-gray-100 rounded-md">
        <strong>Response:</strong>
        <p>{response || "No response yet."}</p>
      </div>
    </div>
  );
};

export default Chat;
