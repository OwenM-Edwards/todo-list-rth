import './App.css'
import LoginPage from './pages/LoginPage'
import useAuth from "./hooks/useAuth";
import { useStoreState, useStoreActions } from 'easy-peasy';
import LoadingIndicator from './components/LoadingIndicator';
import TodoPage from './pages/TodoPage';

function App() {
  const { user, loading } = useAuth();
  const authenticated = useStoreState((state) => state.authenticated);
  const setAuthenticated = useStoreActions((actions) => actions.setAuthenticated);

  if (loading) return <div className="min-w-screen min-h-screen flex items-center justify-center"><LoadingIndicator/></div>;

  if(user) setAuthenticated(true);
  
  return authenticated ? (
    <TodoPage/>
  ) : (
    <LoginPage/>
  );
}

export default App
