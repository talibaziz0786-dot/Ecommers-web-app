import { useState } from "react";

import {
  MessageCircle,
  X,
  Send,
} from "lucide-react";

export default function ChatBot({
  products,
}) {

  const [open, setOpen] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [chat, setChat] =
    useState([
      {
        type: "bot",
        text:
          "Hi 👋 Welcome to LuxeStore. Ask me anything about products.",
      },
    ]);

  const sendMessage = () => {

    if (!message.trim()) return;

    const userMessage = {
      type: "user",
      text: message,
    };

    const lower =
      message.toLowerCase();

    // SMART PRODUCT SEARCH

    const matched =
      products.filter(
        (p) =>
          p.name
            .toLowerCase()
            .includes(lower) ||

          p.category
            .toLowerCase()
            .includes(lower) ||

          p.description
            .toLowerCase()
            .includes(lower)
      );

    let botReply = "";

    if (matched.length > 0) {

      botReply =
        "I found these products:\n\n" +
        matched
          .slice(0, 4)
          .map(
            (p) =>
              `• ${p.name} - ₹${p.price}`
          )
          .join("\n");

    } else {

      botReply =
        "Sorry 😢 No matching products found.";
    }

    setChat((prev) => [
      ...prev,
      userMessage,
      {
        type: "bot",
        text: botReply,
      },
    ]);

    setMessage("");
  };

  return (
    <>
      {/* FLOAT BUTTON */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          fixed
          bottom-6
          right-6
          z-50
          bg-black
          text-white
          p-4
          rounded-full
          shadow-2xl
          hover:scale-110
          transition
        "
      >
        {open ? (
          <X size={26} />
        ) : (
          <MessageCircle
            size={26}
          />
        )}
      </button>

      {/* CHAT WINDOW */}

      {open && (
        <div
          className="
            fixed
            bottom-24
            right-6
            w-87.5
            h-125
            bg-white
            dark:bg-zinc-900
            border
            border-zinc-200
            dark:border-zinc-800
            rounded-[30px]
            shadow-2xl
            overflow-hidden
            flex
            flex-col
            z-50
          "
        >

          {/* HEADER */}

          <div
            className="
              bg-black
              text-white
              p-5
              font-bold
              text-lg
            "
          >
            AI Shopping Assistant
          </div>

          {/* CHAT */}

          <div
            className="
              flex-1
              overflow-y-auto
              p-4
              space-y-4
            "
          >

            {chat.map(
              (msg, index) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.type ===
                    "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`
                      max-w-[80%]
                      px-4
                      py-3
                      rounded-2xl
                      whitespace-pre-line
                      ${
                        msg.type ===
                        "user"
                          ? "bg-black text-white"
                          : "bg-zinc-100 dark:bg-zinc-800"
                      }
                    `}
                  >
                    {msg.text}
                  </div>

                </div>
              )
            )}

          </div>

          {/* INPUT */}

          <div
            className="
              p-4
              border-t
              border-zinc-200
              dark:border-zinc-800
              flex
              gap-2
            "
          >

            <input
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              placeholder="Ask about products..."
              className="
                flex-1
                border
                border-zinc-300
                dark:border-zinc-700
                bg-white
                dark:bg-zinc-950
                rounded-full
                px-4
                py-3
                outline-none
              "
            />

            <button
              onClick={
                sendMessage
              }
              className="
                bg-black
                text-white
                p-3
                rounded-full
              "
            >
              <Send size={18} />
            </button>

          </div>
        </div>
      )}
    </>
  );
}