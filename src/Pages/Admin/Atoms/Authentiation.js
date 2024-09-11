import { useRecoilState, useSetRecoilState } from 'recoil';
import { authenticationState } from './atoms';
import axios from 'axios';
import { server } from '@/main';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useAuthentication = () => {
  const [authState,setAuthState] = useRecoilState(authenticationState);
  const navigate = useNavigate();
  const loginAdmin = async (email, password) => {
    setAuthState((prevState) => ({
      ...prevState,
    }));

    try {
      const response = await axios.post(
        `${server}/admin/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, 
        }
      );
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        token: response.data.data,
        // email:response.data.data.data
      }));

      //store token and time in local Storage
      console.log(response.data.data);
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; 
      localStorage.setItem('adminAuthToken',response.data.data.token);
      localStorage.setItem('adminName',response.data.data.name);
      localStorage.setItem('adminEmail',response.data.data.email);
      localStorage.setItem('tokenExpiration', expirationTime);
      // localStorage.setItem('specificEmail',response.data.data.data)


      toast.success(" You have successfully logged in.", {
        position: "bottom-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      navigate("/admin/dasbord");
    } catch (error) {
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: false,
        token: null,
        // email:null
      }));
      toast.error(
        error.response.data.error  ,
        {
          position: "top-center",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        }
      );
    }
  };

  return { loginAdmin };
};
