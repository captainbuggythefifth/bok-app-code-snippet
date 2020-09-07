import { IService } from "./../redux/interfaces/service";
import { IProduct } from "./../redux/interfaces/product";

const totalProductsAndServiceCalculator = (services: IService[] | null, products: IProduct[] | null) => {

    let serviceTotal = 0;
    let productTotal = 0;
    
    if (services) {
        services.map((service: IService) => {
            serviceTotal += service.fee ? ((service.price + service.fee) * service.quantity) : (service.price * service.quantity)
        });
    }

    if (products) {
        products.map((product: IProduct) => {
            productTotal += product.fee ? ((product.price + product.fee) * product.quantity) : (product.price * product.quantity)
        });
    }
    
    return serviceTotal + productTotal
}

export default totalProductsAndServiceCalculator