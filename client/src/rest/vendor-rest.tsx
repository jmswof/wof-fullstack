import { useAuthContext } from '../context/AuthContext';

const VendorRest = () => {

  const {user} = useAuthContext();

  return {
    create: async (label:string, active:boolean) => await fetch(`${process.env.WOF_SERVER}/configure/vendor`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify({label, active})
    }).then(response => response.json()),
    getAll: async (type:string) => await fetch(`${process.env.WOF_SERVER}/configure/vendor?type=${type}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      }
    }).then(response => response.json())
  };
}

export default VendorRest;