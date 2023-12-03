import { useAuthContext } from '../context/AuthContext';

const ReferenceRest = () => {

  const { user } = useAuthContext();

  return { 
    getAll: async (type:string) => await fetch(`${process.env.WOF_SERVER}/configure/reference?type=${type}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      }
    }).then(response => response.json())
  };
}

export default ReferenceRest;