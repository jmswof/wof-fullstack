import AppointmentRest from './appointment-rest';
import ColorRest from './color-rest';
import FirebaseUserRest from './firebase-user-rest';
import FloorTypeRest from './floor-type-rest';
import JobServiceRest from './job-service-rest';
import LaborRateRest from './labor-rate-rest';
import LaborTypeRest from './labor-type-rest';
import PriorityRest from './priority-rest';
import ProductBrandRest from './product-brand-rest';
import ProductCategoryRest from './product-category-rest';
import ProductCostRest from './product-cost-rest';
import ReferenceRest from './reference-rest';
import SaleAgentRest from './sale-agent-rest';
import UnitedStateRest from './united-state-rest';
import VendorRest from './vendor-rest';

const WofRest = () => {

  return {
    appointment: AppointmentRest(),
    color: ColorRest(),
    firebaseUser: FirebaseUserRest(),
    floorType: FloorTypeRest(),
    jobService: JobServiceRest(),
    laborRate: LaborRateRest(),
    laborType: LaborTypeRest(),
    priority: PriorityRest(),
    productBrand: ProductBrandRest(),
    productCategory: ProductCategoryRest(),
    productCost: ProductCostRest(),
    reference: ReferenceRest(),
    saleAgent: SaleAgentRest(),
    ustate: UnitedStateRest(),
    vendor: VendorRest()
  }
}

export default WofRest;