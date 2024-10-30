import { CartItem } from "./CartItem";

export class Cart {
    items:CartItem[] = [];

    get totalPrice():number {
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.price;
        })
        return totalPrice
    } 
    get totalCount():number {
        let totalCount = 0;
        this.items.forEach(item => {
            totalCount += 1;
        })
        return totalCount
    }
}

// export class Cart {
//     items:CartItem[] = [];
//     totalPrice:number = 0;
//     totalCount:number = 0;
//   }