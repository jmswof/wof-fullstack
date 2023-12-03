import { useAuthContext } from '../context/AuthContext';

const PriorityRest = () => {

  const { user } = useAuthContext();

  return { 
    getAll: async (type:string) => await fetch(`${process.env.WOF_SERVER}/configure/priority?type=${type}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      }
    }).then(response => response.json())
  };
}

export default PriorityRest;