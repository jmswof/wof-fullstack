import OptionType from '../model/option-type';
import { useAuthContext } from '../context/AuthContext';

const LaborRateRest = () => {

  const { user } = useAuthContext();

  return {
    create: async (active:boolean, customerCost:string, floorType:OptionType, jobService:OptionType, laborCost:string, laborType:OptionType, unit:string) => await fetch(`${process.env.WOF_SERVER}/configure/labor-rate`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify({
        active,
        customerCost,
        floorType,
        jobService,
        laborCost,
        laborType,
        unit
      })
    }).then(response => response.json()),
    getAll: async (type:string) => await fetch(`${process.env.WOF_SERVER}/configure/labor-rate?type=${type}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      }
    }).then(response => response.json())
  };
}

export default LaborRateRest;