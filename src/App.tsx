import style from './app.module.scss';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';

export function App() {

  return (
    <main className={style.contentWrapper}>
      <MessageList />
      <LoginBox />
    </main>
  )
}

