import { NextFunction ,Request,Response} from "express";
import Cart from "../models/cart.model";

const cartId = async(req : Request,res : Response,next : NextFunction) => {
    const cartId = req.cookies.cart_id;
    if(!cartId){
        const cart = new Cart();
        const expiresTime = 1000*60*60*24*365;
        res.cookie("cart_id", cart._id , {
            expires : new Date(Date.now() + expiresTime)
        });
        await cart.save();
        
    }else{
        const cart = await Cart.findOne({_id : req.cookies.cart_id});
        const quantity:number = cart.products.reduce((init : number , item:any) => init + item.quantity , 0);
        req.app.locals.quantityCart = quantity;
    }
    

    next();
}

export default cartId;