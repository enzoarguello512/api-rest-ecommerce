import {persistenceType} from "../database/factoryType";
import {Request, Response} from "express";
import {FactoryProducts} from "./factory/products";
import {ICrudProducts} from "../libs/interfaces/crud.interfaces";

export class ProductsController implements ICrudProducts {
  factory: ICrudProducts;

  constructor() {
    /* Depending on the type of persistence selected in "/config/factoryType.ts" we will use
     * a particular database model or another */
    this.factory = FactoryProducts.type(persistenceType);
  }
  getProducts = (req: Request, res: Response) => {
    return this.factory.getProducts(req, res);
  };
  getProductById = (req: Request, res: Response) => {
    return this.factory.getProductById(req, res);
  };
  addProduct = (req: Request, res: Response) => {
    return this.factory.addProduct(req, res);
  };
  updateProductById = (req: Request, res: Response) => {
    return this.factory.updateProductById(req, res);
  };
  deleteProductById = (req: Request, res: Response) => {
    return this.factory.deleteProductById(req, res);
  };
  filter = (req: Request, res: Response) => {
    return this.factory.filter(req, res);
  };
}
