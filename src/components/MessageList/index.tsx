import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { api } from '../../service/api';
import styles from './style.module.scss';
import Logo from '../../assets/logo.svg';

type Messages ={
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

const messageQueue: Messages[] = [];
const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage: Messages) => {
  messageQueue.push(newMessage);
})

export function MessageList() {
  const [ messages, setMessages ] = useState<Messages[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      if(messageQueue.length > 0){
        setMessages(prevState => [
          messageQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean));

        messageQueue.shift();
      }
    }, 3000);
  }, [])

  useEffect(() => {
    api.get<Messages[]>("messages/last3").then((response) => {
      setMessages(response.data)
    })
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={Logo} alt="DoWhile 2021" />


      <ul className={styles.messageList}>

        {messages.map(message => {
          return(
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>
                {message.text}
              </p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          )
        })}

      </ul>
    </div>
  )
}
