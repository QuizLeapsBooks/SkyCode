document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
  
    if (!chatBox || !userInput || !sendBtn) {
      console.error('One or more elements not found. Check HTML IDs.');
      return;
    }
  
    const API_KEY = 'API';
  
    function addMessage(message, sender) {
      const msgDiv = document.createElement('div');
      msgDiv.classList.add('message', sender);
      msgDiv.innerText = message;
      chatBox.appendChild(msgDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  
    function showLoading() {
      const loadingMsg = document.createElement('div');
      loadingMsg.classList.add('message', 'ai', 'loading');
      loadingMsg.innerText = 'SkyCode AI is typing...';
      chatBox.appendChild(loadingMsg);
      chatBox.scrollTop = chatBox.scrollHeight;
      return loadingMsg;
    }
  
    async function sendMessage() {
      const message = userInput.value.trim();
      if (message === '') return;
  
      addMessage(message, 'user');
      userInput.value = '';
  
      const nonCodingKeywords = ["joke", "weather", "movie", "game", "friend", "age", "song", "music", "life"];
      const isUnrelated = nonCodingKeywords.some(word => message.toLowerCase().includes(word));
      if (isUnrelated) {
        addMessage("❌ I only help with HTML, CSS, JS, and SkyCode topics!", "ai");
        return;
      }
  
      const loadingMsg = showLoading();
  
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are SkyCode AI. Only help with HTML, CSS, JavaScript, or SkyCode-related queries. Never answer non-coding questions."
              },
              {
                role: "user",
                content: message
              }
            ],
            max_tokens: 500,
            temperature: 0.7
          })
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        if (!data.choices || data.choices.length === 0) {
          throw new Error('No valid response from AI');
        }
  
        const reply = data.choices[0].message.content || "⚠️ No response received.";
  
        loadingMsg.remove();
        addMessage(reply, 'ai');
      } catch (error) {
        loadingMsg.remove();
        addMessage(`❌ Error: ${error.message}. Check your internet or API key.`, "ai");
        console.error('Error:', error);
      }
    }
  
    sendBtn.addEventListener("click", sendMessage);
  
    userInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  });