import {Product} from '../home/catalog.model'

export class ShopCart {
    _id:string;
    user_id:string;
    lines : ShopCartLine[];
    total : number=0;
    count : number=0;
    created_at: Date;
    enabled: boolean=true;
}

export class ShopCartLine {
    _id:string;
    product:Product;
    quantity:number=1;
    sub_total:number=0;
}