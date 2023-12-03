import { useAuthContext } from '../context/AuthContext';

const SaleAgentRest = () => {

  const { user } = useAuthContext();

  return {
    create: async (active:boolean, firebase, firstName:string, lastName:string) => await fetch(`${process.env.WOF_SERVER}/configure/sale-agent`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify({firstName, lastName, active, firebase})
    })
    .then(response => response.json()),

    getAll: async (type:string) => await fetch(`${process.env.WOF_SERVER}/configure/sale-agent?type=${type}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      }
    }).then(response => response.json())
  };
}

export default SaleAgentRest;