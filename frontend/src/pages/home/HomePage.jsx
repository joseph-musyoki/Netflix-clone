import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthScreen } from './AuthScreen.jsx';
import { HomeScreen } from './homeScreen.jsx';
import { useAuthStore } from './../../store/authUser';

export const HomePage = ()=>{
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      navigate("/");   // ensures you always land at home after login
    }
  }, [user, navigate]);

  return (
    <div>
      {user ? <HomeScreen/> : <AuthScreen/>}
    </div>
  );
};
