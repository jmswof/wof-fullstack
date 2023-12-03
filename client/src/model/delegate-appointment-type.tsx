import AppointmentType from "./appointment-type";
import SaleAgentType from "./sale-agent-type";


export default interface DelegateAppointmentType {
  saleAgent: SaleAgentType;
  appointment: AppointmentType;
}