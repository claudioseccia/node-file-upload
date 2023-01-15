const {StatusCodes} = require('http-status-codes');
const path = require("path");
const CustomeError = require("../errors")
//controller to upload the products image
const uploadProductImage = async(req,res) => {
    const maxSize = 1024 * 1024; //1Mb
    //check if file already exists
    if(!req.files) {
        throw new CustomeError.BadRequestError("No file uploaded");
    }
    // console.log(req.files);
    let productImage = req.files.image; //get the file name (image, here) for the uploaded file
    //check format
    if(!productImage.mimetype.startsWith('image')) {
        throw new CustomeError.BadRequestError("Please upload image")
    }
    //check file size
    if(productImage.size > maxSize) {
        throw new CustomeError.BadRequestError(`Please upload image smaller than ${maxSize} bytes (1Mb)`)
    }
    const imagePath  = path.join(__dirname,`../public/uploads/${productImage.name}`); //create a path for the move function
    await productImage.mv(imagePath);
    //res.send('upload product image');
    return res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}}); //return back in the response the path
}


module.exports = {
    uploadProductImage
}