import { useContext } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';
import { AuthContex } from '../../context/auth'
import { api } from '../../service/api';
import styles from './style.module.scss';

export function LoginBox() {
  const { signInUrl } = useContext(AuthContex);

  return (
    <div className={styles.LoginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem:</strong>

      <a href={signInUrl}
        className={styles.signInWithGithub}
      >
        <VscGithubInverted size="24" />
        Entrar com Github
      </a>  


    </div>
  )
}
