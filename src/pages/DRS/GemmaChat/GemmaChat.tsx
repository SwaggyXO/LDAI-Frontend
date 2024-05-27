import React, { useEffect, useState } from 'react';
import './gemmachat.css'; // Import CSS for styling
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Button from '../../../components/buttons/Button';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from '../../Loader/Loader';
import SuggestiveTextBox from './SuggestiveTextBox';
import { useFetchUserQuizzesQuery, useFetchUserResultQuery } from '../../../api/userApiSlice';
import { getUserCookie } from '../../../features/user/userCookieHandler';

const GemmaChat: React.FC = () => {

    const { isAuthenticated, isLoading, error } = useAuth0();

    const [inputText, setInputText] = useState<string>('');
    const [conversation, setConversation] = useState<{ question: string; answer: string }[]>([]);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [isMessageLoading, setIsMessageLoading] = useState(false);

    const user = getUserCookie();

    const { data: quizzesData, isLoading: isFetchUserQuizzesLoading, error: isFetchUserQuizzesError } = useFetchUserQuizzesQuery({
        userId: user?.userId!,
        limit: 3,
    });

    const { data: quiz, isLoading: isFetchUserResultLoading, error: isFetchUserResultError } = useFetchUserResultQuery([
        user?.userId!,
        quizzesData?.data.quizzes.length! > 0 ? quizzesData?.data.quizzes[quizzesData?.data.quizzes.length - 2].quizId! : 'undefined'
    ], {
        skip: quizzesData?.data.quizzes.length! <= 0 || quizzesData === undefined,
    });

    useEffect(() => {
        if (inputText === '') setIsDisabled(true);
        else setIsDisabled(false);
    }, [inputText]); 

    const responses = quiz && quiz!.data?.responses!;

    const buttonElements = (
        <p>{<FontAwesomeIcon icon={faArrowLeft} color='rgba(0, 0, 0, 0.5)'/>}</p>
    )

    const sendMessageToAPI = async (message: string): Promise<string> => {
        try {
            const response = await axios.post('https://lightly-rare-starfish.ngrok-free.app/gemma-chat', {
                question: message
            });

            const data = response.data;
            const paraphrasedQuestion = data.answer;
            return paraphrasedQuestion;
        } catch (error) {
            console.error('Error sending message to API:', error);
            return 'Error: Unable to fetch response';
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(event.target.value);
    };

    const handleSendMessage = async () => {
        setInputText('');

        if (!inputText.trim()) return;

        setIsMessageLoading(true);

        try {
            const response = await sendMessageToAPI(inputText);
            const newConversation = [...conversation, { question: inputText, answer: response }];
            setConversation(newConversation);
            setIsDisabled(false);
        } catch (error) {
            console.error('Error handling message:', error);
        }  finally {
            setIsMessageLoading(false);
        }
    };

    const handleSuggestiveMessage = async (text: string) => {
        if (!text.trim()) return;

        try {
            const response = await sendMessageToAPI(text);
            const newConversation = [...conversation, { question: text, answer: response }];
            setConversation(newConversation);
        } catch (error) {
            console.error('Error handling message:', error);
        }
    };
    

    const content = (
        <div className="box">
        <div className="gemma-chat">
            <div className="header">
            <Button buttonText={buttonElements} className="drs-back-button" to="/drs"/>
            <h2 className="dot-ai-heading">Dot AI</h2>
            <div className="filler"></div>
            </div>

            <div className="chat-input">
            <textarea
                className="input-field"
                placeholder="Ask your doubt here..."
                value={inputText}
                onChange={handleInputChange}
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleSendMessage();
                    }
                }}
                disabled={isMessageLoading}
            />
            <button className="send-button" onClick={handleSendMessage} disabled={isDisabled}>
                Send
            </button>
            </div>

            <SuggestiveTextBox 
                inputText={inputText}
                handleSendMessage={handleSuggestiveMessage}
                responses={responses!}
            />

            <div className="chat-output">
            {conversation.map((item, index) => (
                <div key={index} className="conversation">
                <div className="gemma-question">
                    <span className="user-marker">You:</span> {item.question}
                </div>
                <div className="gemma-answer">
                    <span className="ai-marker">Dot:</span> {item.answer}
                </div>
                </div>
            ))}
            </div>
            
        </div>
        </div>
    );

    return (
        <>
        {isLoading || (isFetchUserQuizzesLoading || isFetchUserResultLoading) && <Loader />}
        {error && <p style={{height: "100vh"}}>Authentication Error</p>}
        {!isLoading && isAuthenticated && !isFetchUserResultLoading && !isFetchUserQuizzesLoading && content}
        </>
    );
};

export default GemmaChat;