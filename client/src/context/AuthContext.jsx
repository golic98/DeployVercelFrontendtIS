import { createContext, useState, useContext, useEffect } from "react";
import { 
    registerRequest, 
    loginRequest, 
    verifyTokenRequest, 
    getUsersAdmin, 
    deleteUserAdmin,
    getOneProfileUser,
    updateOneProfile,
    addPayVigilanceFromUser,
    getAllUsersForUser,
    registerRequestByAdmin,
    updatePasswordRequest
} from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe estar dentro del provider");
    }
    return context;
};

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [users, setGetUsers] = useState([]);
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [getAdminUsers, setGetAdminUsers] = useState([]);
    
    
    const updatePasswordByPassword = async ({ username, password }) => {
    try {
      setErrors([]);
      await updatePasswordRequest({ username, password });
    } catch (error) {
      const data = error.response?.data;
      const msgs = Array.isArray(data)
        ? data
        : [data?.message || "Error al actualizar la contraseña"];
      setErrors(msgs);
      throw error;
    }
  };

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticate(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setIsAuthenticate(true);
            setUser(res.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    }
    
    const createUser = async (userData) => {
    try {
      await registerRequestByAdmin(userData);
    } catch (error) {
      const data = error.response?.data || { message: "Error desconocido" };
      setErrors(Array.isArray(data) ? data : [data.message || data]);
    }
  };

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticate(false);
        setUser(null);
    }

    const getUsers = async () => {
        try {
            const res = await getUsersAdmin();
            setGetAdminUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllUsers = async () => {
        try {
            const res = await getAllUsersForUser();
            setGetUsers(res.data);
        } catch (error) {
           console.log(error);
        }
    }

    const deleteUser = async (id) => {
        const res = await deleteUserAdmin(id);
        console.log(res);
        window.location.reload();
    };

    const getOneProfile = async(id) => {
        try {
            const res = await getOneProfileUser(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateProfile = async(id, profile) => {
        try {
            await updateOneProfile(id, profile);
        } catch (error) {
            console.log(error);
        }
    }

    const addPay = async (pay) => {
        try {
            const res = await addPayVigilanceFromUser(pay);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (errors.length > 0) {
            const time = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(time);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticate(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticate(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticate(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticate(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            signup, 
            loading, 
            user, 
            isAuthenticate, 
            setIsAuthenticate,
            errors, 
            signin, 
            logout, 
            getAdminUsers, 
            getUsers,
            deleteUser,
            getOneProfile,
            updateProfile,
            addPay, 
            users,
            getAllUsers,
            createUser,
            updatePasswordByPassword
            }}>
            {children}
        </AuthContext.Provider>
    )
}
