# 🏥 AI-Powered HCP Interaction CRM

An intelligent Healthcare CRM platform designed to manage Healthcare Professional (HCP) interactions with AI-assisted data extraction and analysis.

The application helps pharmaceutical sales representatives and healthcare organizations efficiently record, analyze, and manage HCP interactions.

---

## 🚀 Features

### 👨‍⚕️ HCP Interaction Management
- Create HCP interaction records
- Track interaction date and time
- Manage attendees
- Store discussion topics
- Maintain follow-up information
- View historical interactions

### 🤖 AI Assistant
- Extract information from natural language prompts
- Identify missing fields automatically
- Generate structured interaction data
- Reduce manual data entry
- Smart validation of required fields

### 📊 Analytics
- Interaction insights
- Sentiment analysis
- Product discussion tracking
- Follow-up recommendations


## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Redux Toolkit
- Axios
- CSS

### Backend
- FastAPI
- Python
- LangChain
- LangSmith
- Pydantic

### Database
- PostgreSQL

### AI
- Groq LLM
- LangChain
- Prompt Engineering

---

## 📁 Project Structure

```text
HCP/
│
├── public/
│
├── src/
│   ├── Components/
│   │   ├── Button.jsx
│   │   ├── DateSelector.jsx
│   │   ├── InputField.jsx
│   │   ├── MultiSelect.jsx
│   │   └── Select.jsx
│   │
│   ├── Page/
│   │   ├── AIChatBot.jsx
│   │   └── Details.jsx
│   │
│   ├── Redux/
│   │   ├── ApiCall.jsx
│   │   ├── hcpSlice.js
│   │   └── store.js
│   │
│   ├── Root/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── router.jsx
│   └── App.css
│
├── .gitignore
├── index.html
├── package.json
└── README.md
