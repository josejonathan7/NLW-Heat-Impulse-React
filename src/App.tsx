import { useContext } from 'react';
import style from './app.module.scss';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { SendMessageForm } from './components/SendMessageForm';
import { AuthContex } from './context/auth';

export function App() {
  const { user } = useContext(AuthContex);

  return (
    <main className={`${style.contentWrapper} ${!!user ? style.contentSigned : ''}`}>
      <MessageList />
      { !!user ? <SendMessageForm /> : <LoginBox /> }
    </main>
  )
}

