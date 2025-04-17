// frontend/src/pages/Activate.jsx or Activate.tsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Activate() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/activate/${token}`);
        console.log("Activation response:", response.data);
        alert("Account activated successfully!");
        navigate('/login');
      } catch (err) {
        console.error("Activation failed:", err);
        alert("Invalid or expired activation link.");
      }
    };
  
    activateAccount();
  }, [token]);
  


  return <div>Activating your account...</div>;
}
