const router = require(`express`).Router()

const salesModel = require(`../models/sales`)
const carsModel = require(`../models/products`)

const GetSalesDocument = (req, res, next) => 
{
    salesModel.find({customerEmail: req.params.customerEmail}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
        
        return res.json(data)
    })
}
const createNewSaleDocument = (req, res, next) => 
{           
    // Use the PayPal details to create a new sale document                
    let saleDetails = new Object()
           
    saleDetails.paypalPaymentID = req.params.paymentID
    saleDetails.carID = req.params.carID
    saleDetails.price = req.params.price
    saleDetails.customerName = req.params.customerName
    saleDetails.customerEmail = req.params.customerEmail
        
    carsModel.findByIdAndUpdate({_id:req.params.carID}, {sold: true}, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }  
    }) 
    
    salesModel.create(saleDetails, (err, data) => 
    {
        if(err)
        {
            return next(err)
        }                        
    })   
    
    return res.json({success:true})
}
const ChangeRefund = (req, res, next) =>
{
	
}


// Save a record of each Paypal payment
router.post('/sales/:paymentID/:carID/:price/:customerName/:customerEmail', createNewSaleDocument)
router.put('/sales/:paymentID', ChangeRefund)
router.get('/sales/:customerEmail', GetSalesDocument)


module.exports = router