import React, { useEffect } from 'react'
import './gemmachat.css';

interface SuggestiveTextProps {
  inputText: string,
  handleSendMessage: (text: string) => void,
  responses: Response[]
}

interface Response {
  questionId: string;
  text: string;
  options: string[];
  response: string[];
  score: number;
  timeTaken: string;
}

const SuggestiveTextBox = ({ handleSendMessage, responses }: SuggestiveTextProps) => {

  if (!responses) {
    return null;
  }
  
  const sortedResponses = [...responses].sort((a, b) => a.score - b.score);

  const suggestiveTexts = sortedResponses.slice(0, 2).map(response => response.text);

  return (
    <div className="suggestive-text-div">
      {suggestiveTexts.map((text, index) => (
        <div key={index} className="suggestive-text-box" onClick={() => handleSendMessage(text)}>
          {text.length > 35 ? text.slice(0, 35) + '...' : text}
        </div>
      ))}
    </div>
  )
}

export default SuggestiveTextBox;