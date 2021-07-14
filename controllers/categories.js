import Category from '../models/categories';
import _ from "lodash"

export const read = (req, res) =>{
    return res.json(req.category);
}
export const categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category)=>{
        if(err || !category){
            res.status(400).json({
                error: "không tìm thấy sản phẩm",
            })
        }
        req.category = category;
        next();
    });
}

export const create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data)=>{
        if(err){
            return res.status(400).json({
                err: "Không thể thêm danh mục",
            })
        }
        res.json(data)
    })
}

export const list = (req, res) => {
    Category.find().exec((err, data)=>{
        if(err){
            return res.status(400).json({
                err: "Không tìm thấy sản phẩm nào!",
            })
        }
        res.json(data)
    })
}

export const remove = (req, res) => {
    let category = req.category;
    category.remove((err, deletedCategory)=>{
        if(err){
            return res.status(400).json({
                error: "không tìm thấy sản phầm!"
            })
        }
        res.json({
            deletedCategory,
            message: "Xóa sản phẩm thành công"
        })
    })
}

export const update = (req, res) => {
    let category = req.category;
    category = _.assignIn(category, req.body);
    category.save((err, data)=>{
        if(err){
            return res.status(400).json({
                error: "Không sửa được sản phẩm !",
            })
        }
        return res.json(data);
    })
}