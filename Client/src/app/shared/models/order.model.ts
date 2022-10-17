import { LatLng } from "leaflet";
import { CartItem } from "./CartItem.model";

export class Order{
  id!:number;
  items!: CartItem[];
  totalPrice!:number;
  name!: string;
  address!: string;
  addressLatLng?:LatLng
  paymentId!: string;
  createdAt!: string;
  status!: string;
}
