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

// export const list = (req, res) => {
//     Product.find().exec((err, data)=>{
//         if(err){
//             return res.status(400).json({
//                 err: "Không tìm thấy sản phẩm nào!",
//             })
//         }
//         res.json(data)
//     })
// }

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
/*
* Sell
* by sell = /products?sortBy=sold&order=desc&limit=4
* by arrival = /products?sortBy=createdAt&order=desc&limit=4
* Nếu không có tham số nào được nhận thì sẽ trả về tất cả sản phẩm
*/
export const list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? +req.query.limit : 20;

    Product.find()
        .select("-photo")
        // .populate('category')
        // .sort([[order, sortBy]])
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Product not found"
                })
            }
            res.json(data)
        })
}
/**
 * Module này sẽ trả về các sản phẩm có cùng danh mục 
 */
export const listRelated = (req, res) => {
    // let limit = req.query.limit ? req.query.limit : 5;

    Product.find({
        _id: { $ne: req.product },
        category: req.product.category
    }) // $ne: not include
        // .limit(limit)
        .populate('category', '_id name',)
        .exec((err, products) => {
            if (err) {
                res.status(400).json({
                    error: "Products not found"
                })
            }
            res.json(products)
        })
}

export const listCategories = (req, res) => {
    // console.log(req.category)
    Product.find({ "category": "604f2fd31c881aa9b4cc08e0" }, (err, products) => {
        if (err) {
            res.status(400).json({
                error: "Products not found"
            })
        }
        products.photo = undefined;
        res.json(products);
    })


}
/**
 * Hiển thị danh sách sản phẩm khi tìm kiếm
 * Được áp dụng khi tìm kiếm ở react hoặc js project
 * Hiển thị các danh mục trong checkbox và khoảng giá trong radio buttons
 * user click vào checkbox và radio buttons
 * sẽ thiết kế api và hiển thị danh sách sản phẩm mà người dùng tìm kiếm
 */
export const listBySearch = () => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? +req.query.limit : 6;
    let skip = parseInt(req.body.skip);
    let findArgs = {}


    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte - greater than price [0 - 10]
                // lte - nhỏ hơn 
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1],
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                res.status(400).json({
                    error: "Products not found"
                })
            }
            res.json({
                size: data.length,
                data
            })
        });
}