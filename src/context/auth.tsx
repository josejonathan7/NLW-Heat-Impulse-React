import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../service/api";
 
type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

type AuthContext = {
  children: ReactNode;
}

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
}

export const AuthContex = createContext({} as AuthContextData);

export function AuthProvider(props: AuthContext) {
  const [ user, setUser ] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=656fe56e2937f3eadb53`;

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile: token');
  }

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('authenticate', { code: githubCode });
    const { token, user } = response.data;

    localStorage.setItem('@dowhile: token', token);
    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile: token');

    if(token){
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('profile').then( response => {
        setUser(response.data);
      })
    }
  }, [])

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if(hasGithubCode) {
      const [ urlWithoutCode, gitHubCode ] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);

      signIn(gitHubCode);
    }


  }, [])

  return (
    <AuthContex.Provider value={{ signInUrl, user, signOut }} >
      {props.children}
    </AuthContex.Provider>
  )
}