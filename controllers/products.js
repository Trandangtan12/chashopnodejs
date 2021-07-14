import Product from '../models/products';
import _ from "lodash"

export const read = (req, res) =>{
    return res.json(req.product);
}
export const productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product)=>{
        if(err || !product){
            res.status(400).json({
                error: "không tìm thấy sản phẩm",
            })
        }
        req.product = product;
        next();
    });
}

export const create = (req, res) => {
    const product = new Product(req.body)
    product.save((err, data)=>{
        if(err){
            return res.status(400).json({
                err: "Không thể thêm sản phẩm",
            })
        }
        res.json(data)
    })
}

export const list = (req, res) => {
    Product.find().exec((err, data)=>{
        if(err){
            return res.status(400).json({
                err: "Không tìm thấy sản phẩm nào!",
            })
        }
        res.json(data)
    })
}

export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error: "không tìm thấy sản phầm!"
            })
        }
        res.json({
            deletedProduct,
            message: "Xóa sản phẩm thành công"
        })
    })
}

export const update = (req, res) => {
    let product = req.product;
    product = _.assignIn(product, req.body);
    product.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error: "Không sửa được sản phẩm !",
            })
        }
        return res.json(data);
    })
}