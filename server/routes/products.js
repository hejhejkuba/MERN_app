const router = require(`express`).Router()
var createError = require('http-errors')

const productModel = require(`../models/products`)

const jwt = require('jsonwebtoken')
const fs = require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')

const multer  = require('multer')
var upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})


const verifyUsersJWTPassword = (req, res, next) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => 
    {
        if (err) 
        { 
            return next(err)
        }

        req.decodedToken = decodedToken
        return next()
    })
}


const checkThatUserIsAnAdministrator = (req, res, next) =>
{
    if(req.decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
    {    
        return next()
    }
    else
    {
        return next(createError(401))
    }
}


const createNewProductDocument = (req, res, next) => 
{           
    // Use the new car details to create a new car document                
    let productDetails = new Object()
                
    productDetails.name = req.body.name
    productDetails.details = req.body.details
    productDetails.year = req.body.year
	productDetails.price = req.body.price
	productDetails.amount = req.body.amount

    // add the car's photos to the productDetails JSON object
    productDetails.photos = []
                
    req.files.map((file, index) =>
    {
        productDetails.photos[index] = {filename:`${file.filename}`}
    })
        
    productModel.create(productDetails, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }
        
        return res.json(data)        
    })
}


const getAllProductDocuments = (req, res, next) => 
{   
    
    //user does not have to be logged in to see car details
    productModel.find((err, data) => 
    {       
        if(err)
        {
            return next(err)
        }     
        return res.json(data)
    })
}


const getProductPhotoAsBase64 = (req, res, next) => 
{   
    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, 'base64', (err, fileData) => 
    {     
        if(err)
        {
            return next(err)
        }  
        
        if(fileData)
        {  
            return res.json({image:fileData})                           
        }   
        else
        {
            return res.json({image:null})
        }
    })             
}


const getProductDocument = (req, res, next) => 
{
    productModel.findById(req.params.id, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })
}

const getProductDocumentName = (req, res, next) => 
{
    productModel.find({ name: req.params.name }, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
		return res.json(data)
    })
    
}


const updateProductDocument = (req, res, next) => 
{
    ProductModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })        
}


const deleteProductDocument = (req, res, next) => 
{
    productModel.findByIdAndRemove(req.params.id, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })      
}


// read all records
router.get(`/products`, getAllProductDocuments)
//get all record matching 
router.get(`/products/:name`, getProductDocumentName)
// get one car photo
router.get(`/products/photo/:filename`, getProductPhotoAsBase64)

// Read one record
router.get(`/products/:id`, verifyUsersJWTPassword, getProductDocument)

// Add new record
router.post(`/products`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, upload.array("productPhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), createNewProductDocument)

// Update one record
router.put(`/products/:id`, verifyUsersJWTPassword, updateProductDocument)

// Delete one record
router.delete(`/products/:id`, verifyUsersJWTPassword, checkThatUserIsAnAdministrator, deleteProductDocument)


module.exports = router