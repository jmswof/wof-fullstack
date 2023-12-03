import { useAuthContext } from '../context/AuthContext';

const ProductCostRest = () => {
  const {user} = useAuthContext();

  return { 
    getAll: async (type:string) => await fetch(`${process.env.WOF_SERVER}/configure/product-cost?type=${type}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      }
    }).then(response => response.json()),
    create: async ({active, boxCost, floorType, palletCost, productBrand, productCategory, vendor}) => await fetch(`${process.env.WOF_SERVER}/configure/product-cost`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${btoa(user['multiFactor'].user.accessToken)}`
      },
      body: JSON.stringify({
        active,
        boxCost,
        floorType,
        palletCost,
        productBrand,
        productCategory,
        vendor
      })
    })
    .then(response => response.json())
  };
}

export default ProductCostRest;