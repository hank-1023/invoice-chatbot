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

const Review = ({steps}) => {
  const [receiverName, setReceiverName] = useState('');
  const [receiverCompany, setReceiverCompany] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const {receiverName, receiverCompany, receiverEmail, description, amount} = steps;


    setReceiverName(receiverName);
    setReceiverCompany(receiverCompany);
    setReceiverEmail(receiverEmail);
    setDescription(description);
    setAmount(amount);
  }, [steps]);

  return (
    <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{receiverName.value}</td>
            </tr>
            <tr>
              <td>Company</td>
              <td>{receiverCompany.value}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{receiverEmail.value}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{description.value}</td>
            </tr>
            <tr>
              <td>Amount</td>
              <td>{amount.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
  );
};

const App = () => {
  const steps = [
    {
      id: '0',
      message: 'Welcome to Lumanu Invoice Sender!',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Who are you sending invoice to?',
      trigger: 'receiverName',
    },
    {
      id: 'receiverName',
      user: true,
      trigger: "2",
    },
    {
      id: '2',
      message: "What is the name of the company?",
      trigger: 'receiverCompany',
    },
    {
      id: 'receiverCompany',
      user: true,
      trigger: "3",
    },
    {
      id: '3',
      message: "Got it! What's their email?",
      trigger: 'receiverEmail',
    },
    {
      id: 'receiverEmail',
      user: true,
      trigger: "4",
    },
    {
      id: '4',
      message: "What's the description of the item?",
      trigger: 'description',
    },
    {
      id: 'description',
      user: true,
      trigger: "5",
    },
    {
      id: '5',
      message: "How much do you want to charge for?",
      trigger: 'amount',
    },
    {
      id: 'amount',
      user: true,
      trigger: 'review',
    },
    {
      id: 'review',
      component: <Review />,
      asMessage: true,
      trigger: 'confirm',
    },
    {
      id: 'confirm',
      message: 'Does it all looks correct?',
      trigger: 'confirm_options',
    },
    {
      id: 'confirm_options',
      options: [
        { value: 'yes', label: 'Yes', trigger: 'redirect' },
        { value: 'no', label: 'No', trigger: 'redirect' },
      ],
    },
    {
      id: 'redirect',
      message: 'Redirecting you to Lumanu',
      end: true
    }
  ]

  const handleEnd = ({ steps, values }) => {
    const [receiverName, receiverCompany, receiverEmail, description, amount] = values;
    const url = `https://staging-3.creators.lumanu.com/invoice/create?email=${receiverEmail}&to_name=${receiverName}&company=${receiverCompany}&item=${description}&amount_total=${amount}`;
    window.open(url, '_blank');
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
         <ChatBot 
          handleEnd={handleEnd}
          steps={steps} />
      </ThemeProvider>
    </div>
  );
};

export default App;
