import { useAuthContext } from '../context/AuthContext';
import AppointmentType from '../model/appointment-type';
import DelegateAppointmentType from '../model/delegate-appointment-type';

const AppointmentRest = () => {

  const { user } = useAuthContext();

  return {

    create: async (appointment:AppointmentType) => await fetch(`${process.env.WOF_SERVER}/appointments`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify(appointment)
    }).then(response => response.json()),

    delete: async (appointments:AppointmentType[]) => await fetch(process.env.WOF_SERVER + '/appointments', {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify(appointments)
    }).then(response => response.json()),

    get: async (appointmentId:string) => await fetch(`${process.env.WOF_SERVER}/appointments?type=single&id=${appointmentId}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      }
    }).then(response => response.json()),

    getAll: async (type:string) => await fetch(`${process.env.WOF_SERVER}/appointments?type=${type}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      }
    }).then(response => response.json()),

    patch: async (delegation:object) => await fetch(process.env.WOF_SERVER + '/appointments', {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify(delegation)
    }).then(response => response.json()),

    update: async (appointment:AppointmentType) => await fetch(`${process.env.WOF_SERVER}/appointments`, {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify(appointment)
    }).then(response => response.json())
  };
}

export default AppointmentRest;