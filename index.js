const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent =
        className === "outgoing"
            ? `<p>${message}</p>`
            : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;

    
    chatLi.innerHTML = chatContent;
    return chatLi;
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";

    // Append user message in chat box
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    // Display "Thinking ..." message
    chatbox.appendChild(createChatLi("Fetching response ...", "incoming"));

    // Response message
    setTimeout(() => {
        const departments = {
            // ...
            "electrical": "https://drive.google.com/drive/folders/1oJBBzBsG536XAbyCk9e8B_cYEtN4RluL?usp=sharing",
            "mechanical": "https://drive.google.com/drive/folders/1UViONzB-gF-uTGWab0SYv_g92Ciq-gRE?usp=sharing",
            "building": "https://drive.google.com/drive/folders/184r16le774PcZdMSaDvij7hvXnBya6HN?usp=sharing",
            "agriculture": "https://drive.google.com/drive/folders/1uGKxhCPN2ks-2Eb3sW4MJWm0xgdnv1NA?usp=sharing",
            "business": "https://drive.google.com/drive/folders/1wDOxAMfO-DUgrY9Q3NDka9pn0xduPslD?usp=sharing",
            "hospitality": "https://drive.google.com/drive/folders/1yaRLRV0gf2Q7eI7YQJoglYRmxwzdSrlk?usp=sharing",
            "ict": "https://drive.google.com/drive/folders/1yaRLRV0gf2Q7eI7YQJoglYRmxwzdSrlk?usp=sharing"
        };

        const departmentName = userMessage.trim().toLowerCase();
        const departmentLink = departments[departmentName];

        // Remove "Thinking ..." message from chatbox
        chatbox.removeChild(chatbox.lastChild);

        if (departmentLink) {
            // Extract just the word "link" from the URL
            const linkWord = `<a href="${departmentLink}" target="_blank">link</a>`;
            chatbox.appendChild(createChatLi(`Sure, here is the e-library ${linkWord} for ${departmentName} department <br> Happy learning! .`, "incoming"));
        } else {
            chatbox.appendChild(createChatLi(`Oops! Sorry, I don't have information about ${departmentName}.`, "incoming"));
        }

        // Always scroll to bottom if chatbox is overflowing
        if (chatbox.scrollHeight > chatbox.clientHeight) {
            chatbox.scrollTop = chatbox.scrollHeight;
        }

    }, 2000); // Change delay to 2000 milliseconds (2 seconds)
};


chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
sendChatBtn.addEventListener("click", handleChat);

// Add a listener to detect changes in chatbox content
chatbox.addEventListener("DOMNodeInserted", () => {
    // Always scroll to bottom if chatbox is overflowing after new content is added
    if (chatbox.scrollHeight > chatbox.clientHeight) {
        chatbox.scrollTop = chatbox.scrollHeight;
    }
});
