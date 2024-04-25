import { useState } from "react";
import "./threequestion.scss";

const ThreeQuestion = () => {
  const [text, setText] = useState<string>("");
  const [height, setHeight] = useState<string>("auto"); // Initial height is auto
  const wordLimit: number = 50; // Change the word limit as needed

  // Update textarea height based on its content
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setText(event.target.value);
    setHeight(`${event.target.scrollHeight}px`);
  };

  const wordCount: number = text.trim().length;

  const content = (
    <div className="info-box--inside">
      <p className="info-box--q">Answer according to the annotations.</p>
      <p className="info-box--wl">
        Word Count: {wordCount}/{wordLimit}
      </p>

      <div className="info-box--text">
        <textarea
          value={text}
          onChange={handleChange}
          style={{ height: height }}
          maxLength={wordLimit}
        />
      </div>
    </div>
  );

  return (
    <div className="question-header">
      <div className="info-box">{content}</div>
    </div>
  );
};

export default ThreeQuestion;
