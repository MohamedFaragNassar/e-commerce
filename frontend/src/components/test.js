{
    manufacturer: { S: req.body.manufacturer},
    category: {S: req.body.category},
    amount: {N:Number(req.body.amount)},
    price: {N:Number(req.body.price)},
    cpu: {S:req.body.cpu},
    ram: {N:Number(req.body.ram)},
    storage: {N:Number(req.body.storage)},
    display: {S:req.body.display},
    specifications:{S: req.body.specifications},
    discription: {S:req.body.discription},
}