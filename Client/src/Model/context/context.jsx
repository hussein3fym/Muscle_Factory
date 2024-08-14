import React from "react";
import { createContext, useEffect, useRef, useState } from "react";
import runChat from "../config/gemini";
import PropTypes from "prop-types";

export const Context = createContext();
const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");

  const [prevPrompts, setPrevPrompts] = useState([]);
  const [prevResults, setPrevResults] = useState([]);

  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const [currentChat, setCurrentChat] = useState(-1);
  const nextId = useRef(0);
  const [chatList, setChatList] = useState([]);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const stored = localStorage.getItem("chatList");
    if (stored !== null) {
      const chatListTmp = JSON.parse(stored);
      setChatList(chatListTmp);
      nextId.current = Math.max(...chatListTmp.map((chat) => chat.id)) + 1;
    }
  }, []);

  const loadChat = (chatId) => {
    const stored = localStorage.getItem(`__chat_${chatId}`);
    if (stored !== null) {
      const chat = JSON.parse(stored);
      setCurrentChat(chatId);
      setPrevPrompts(chat.prompts);
      setPrevResults(chat.results);
      setRecentPrompt(chat.prompts[chat.prompts.length - 1]);
      setResultData(chat.results[chat.results.length - 1]);
      setShowResult(true);
      console.log(chat);
    } else {
      const chatListTmp = chatList.filter((chat) => chat.id !== chatId);
      setChatList(chatListTmp);
      localStorage.setItem("chatList", JSON.stringify(chatListTmp));
      newChat();
      console.log("problem lolol");
    }
  };

  const delayParam = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setPrevPrompts([]);
    setPrevResults([]);
    setCurrentChat(-1);
  };

  const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    console.log("Sending data:", input);

    let response;
    setRecentPrompt(input);
    const newPrompts = [...prevPrompts, input];
    setPrevPrompts(newPrompts);
    response = await runChat(input);

    let responseArray = response.split("**");
    let newArray = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 === 0) {
        newArray += responseArray[i];
      } else {
        newArray += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newArray2 = newArray.split("*").join("<br>");

    const newResults = [...prevResults, newArray2];
    setPrevResults(newResults);

    let newResponseArray = newArray2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayParam(i, nextWord + " ");
    }

    let chatId = currentChat;
    if (chatId == -1) {
      setCurrentChat(nextId.current);
      const newChatList = [
        ...chatList,
        { id: nextId.current, firstPrompt: input },
      ];
      setChatList(newChatList);
      localStorage.setItem("chatList", JSON.stringify(newChatList));
      chatId = nextId.current++;
    }

    localStorage.setItem(
      `__chat_${chatId}`,
      JSON.stringify({
        prompts: newPrompts,
        results: newResults,
      })
    );

    setLoading(false);
    setInput("");
  };
  const updateFormData = (newFormData) => {
    setFormData(newFormData);
  };
  const updateInputAndSendData = (newInput) => {
    setInput(newInput);
  };
  const contextValue = {
    prevPrompts,
    prevResults,
    setPrevPrompts,
    currentChat,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    chatList,
    loadChat,
    formData,
    updateFormData,
    updateInputAndSendData,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

// Here we add prop types validation
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
