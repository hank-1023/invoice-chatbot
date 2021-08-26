import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
import "./App.css";

const theme = {
  //background: "#000",
  fontFamily: "Moret",
  headerBgColor: "#000",
  headerFontColor: "#fff",
  headerFontSize: "18px",
  botBubbleColor: "#B9FA3D",
  botFontColor: "#000",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const Review = ({ steps }) => {
  const [senderName, setName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverEmail, setReceiverEmail] = useState("");

  useEffect(() => {
    const { senderName, receiverName, receiverEmail } = steps;

    setName(senderName);
    setReceiverName(receiverName);
    setReceiverEmail(receiverEmail);
  }, [steps]);

  return (
    <div style={{ width: "100%" }}>
      <h3>Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>From</td>
            <td>{senderName.value}</td>
          </tr>
          <tr>
            <td>To</td>
            <td>{receiverName.value}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{receiverEmail.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const steps = [
  {
    id: "0",
    message: "Welcome to Lumanu Invoice Sender!",
    trigger: "1",
  },
  {
    id: "1",
    message: "May I know your name please?",
    trigger: "senderName",
  },
  {
    id: "senderName",
    user: true,
    trigger: "2",
  },
  {
    id: "2",
    message: "Hi {previousValue}! Who are you sending invoice to?",
    trigger: "receiverName",
  },
  {
    id: "receiverName",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "Got it! What's the email of the receiver",
    trigger: "receiverEmail",
  },
  {
    id: "receiverEmail",
    user: true,
    trigger: "review",
  },
  {
    id: "review",
    component: <Review />,
    asMessage: true,
    end: true,
  },
];

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ChatBot steps={steps} />
      </ThemeProvider>
    </div>
  );
};

export default App;
