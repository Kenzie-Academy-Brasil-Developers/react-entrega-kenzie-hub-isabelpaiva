import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  const [modalOpen, setModalOpen] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const [state, setState] = useState(null)
  const [skill, setSkill] = useState(null)
  const navigate = useNavigate();
  const token = localStorage.getItem("@TOKEN");

  
  const onSubmit = async (data) => {
    delete data.passwordConfirmation;
    try {
      await api.post("http://localhost:3000/users", data);
      navigate("/");
      console.log(data)
      toast.success("Conta criada com sucesso!");
    } catch (error) {
      toast.error("Ops! Algo deu errado");
    }
  };

  const onSubmitLogin = async (data) => {
    api
      .post("http://localhost:3000/login", data)
      .then((response) => {
        setUser(response.data);
        console.log(response)  
    
        localStorage.setItem("@TOKEN", response.data.token);
        localStorage.setItem("@USERID", response.data.userId);
      })
      .catch((error) => {
        toast.error("Email ou senha incorretos");
      });
  };

  useEffect(() => {
    const requisition = (data) => {
      if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`;
        api
          .get("http://localhost:3000/users", data)
          .then((response) => {
            setUser(response.data);
            navigate("/dashboard");
            console.log(response.data)
          
          })
          .catch((error) => 
          toast.error("Algo deu errado!"));
      }
    };

    requisition();
  } , [token]);

  const clearLocalStorage = () => {
    localStorage.clear();
    navigate("/");
  };


  useEffect(() => {
    const teste = () => {
    
      if (!token) {
        navigate('/')
      }
    };

    teste();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, onSubmit,onSubmitLogin, skill,setSkill, clearLocalStorage, state, setState, modalOpen, setModalOpen, modalEdit, setModalEdit }}>
      {children}
    </UserContext.Provider>
  );
};
