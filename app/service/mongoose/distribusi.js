const Distribusi = require('../../api/v1/distribusi/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const Linen = require('../../api/v1/linen/model')
const xlsx = require('xlsx');
const Hospital = require('../../api/v1/hospital/model');
const Invoice = require('../../api/v1/invoice/model');
const Audit = require('../../api/v1/audit trail/model');
const { createInvoice, generateUniqueTransactionNumber, HargaPerKG } = require('./invois')
const Tracker = require('../../api/v1/tracker/model')


const createDistribusi = async (req, res, next) => {
    const {
        customer,
        quality,
        service,
        weight,
        note,
    } = req.body;

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const count = jsonData.length;


    const transformedData = jsonData.map(async (item, index) => {
        const codeEpc = item.EPC;

        const Category = await Linen.findOne({ epc: codeEpc }, 'epc').
            populate({
                path: 'category',
                select: 'name'
            }).populate({
                path: 'hospital',
            })

        if (!Category) throw new BadRequestError('Linen ada yang belum terdaftar')

        if (Category) {
            item.category = Category.category.name;

            if (Category.hospital) {
                if (Category.hospital._id.toString() !== customer) throw new BadRequestError('linen milik rumah sakit lain')
                const checkEpc = await Hospital.findOne(
                    { _id: Category.hospital._id },
                )

                const getEpc = checkEpc.linen.map(x => x.epc);

                if (!getEpc.includes(codeEpc)) throw new NotFoundError(`Linen ini bukan milik rumah sakit ${checkEpc.name}`);

                await Hospital.findByIdAndUpdate(
                    { _id: Category.hospital._id },
                    {
                        $inc: { stock: -1 },
                        $pull: { linen: { epc: codeEpc } }
                    },
                    { new: true, runValidators: true }
                )
            }

        }
        const transformedItem = {
            epc: item.EPC,
            category: Category ? Category.category.name : null
        }
        return transformedItem
    })
    const transformedformis = await Promise.all(transformedData);


    const lastDistribusi = await Distribusi.findOne({}, {}, { sort: { 'code': -1 } });

    let codeNumber = 1; 

    if (lastDistribusi) {
      
        const lastCode = lastDistribusi.code;
        codeNumber = parseInt(lastCode.slice(1), 10) + 1;
    }

    const code = `A${codeNumber.toString().padStart(6, '0')}`;

    

    const result = await Distribusi.create({
        code,
        customer,
        quality,
        linen: transformedformis,
        service,
        dateIn: Date.now(),
        amount: count,
        weight,
        note,
        status: null,
        invoice_id: null
    });

const rumahsakit = await Hospital.findOne({ _id: result.customer })
    await Audit.create({
        task: `Distribusi created ${rumahsakit.name}`,
        status: 'CREATE',
        user: req.user.id
    })

    return result;
}

const getAllDistribusi = async (req, res, next) => {
    const { startDate, endDate } = req.query;
    let condition = {};

    if (startDate && endDate) {
        condition.dateIn = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
        condition.dateIn = { $gte: new Date(startDate) };
    } else if (endDate) {
        condition.dateIn = { $lte: new Date(endDate) };
    }

    const result = await Distribusi.find(condition)
        .populate({
            path: 'customer',
            select: '_id name  number_phone  address'

        })

        .populate({
            path: 'status',
        })
        .populate({
            path: 'invoice_id'
        })
        .sort({ createdAt: -1 })


    if (!result) throw new NotFoundError('Distribusi Not Found')

    return result
}

const getOneDistribusi = async (req, res, next) => {
    const { id } = req.params;

    const result = await Distribusi.findOne({ _id: id })
    .populate({
        path: 'customer',
        select: '_id name  number_phone  address'

    })
    .populate({
        path: 'status',
    })
    .populate({
        path: 'invoice_id'
    })
    if (!result) throw new NotFoundError('Distribusi id Not Found')

    return result
}

const confirmDistribusi = async (req, res, next) => {
    const { id } = req.params;
    const distribusi = await Distribusi.findOne({ _id: id });

    const berat = distribusi.weight;
    
    const hospital = distribusi.customer;

   

    // Create Transaction / Invoice
    const noTransaction = await generateUniqueTransactionNumber(17)
    const Harga = await HargaPerKG()

    const price = berat * Harga;

    const invoice = await Invoice.create({
        transactionNumber: noTransaction,
        price: price,
        weight: berat,
        hospital: hospital
    })

    const status = await Tracker.create({
        status: 'processing'
    })

    // console.log('status', status)
    const result = await Distribusi.findByIdAndUpdate(
        { _id: id },
        {
            status: status._id,
            invoice_id: invoice._id
        },
        { new: true, runValidators: true }
    );

    if (!result) throw new NotFoundError('Distribusi id Not Found')

    await Audit.create({
        task: `Distribusi statu confirm`,
        status: 'UPDATE',
        user: req.user.id
    })

    return result
}

const updateDistribusi = async (req, res, next) => {
    const { id } = req.params;
    const {
        customer,
        category,
        linen,
        service,
        quality,
        status,
        dateIn,
        dateOut,
        amount,
        weight,
        note
    } = req.body;


    const distribusi = await Distribusi.findOne({ _id: id });

    const berat = distribusi.weight;
    const hospital = distribusi.customer;
    const code = distribusi.code;

     // Create Transaction / Invoice
     const noTransaction = await generateUniqueTransactionNumber(17)
     const Harga = await HargaPerKG()
 
     const price = berat * Harga;
 
     const invoice = await Invoice.create({
         transactionNumber: noTransaction,
         price: price,
         weight: berat,
         hospital: hospital,
         code_distribusi: code
     })

    

    const result = await Distribusi.findByIdAndUpdate(
        { _id: id },
        {
            
            status,
            
            invoice_id: invoice._id
        },
        { new: true, runValidators: true }
    );

    if (!result) throw new NotFoundError('Distribusi id Not Found')
    const rumahsakit = await Hospital.findOne({ _id: result.customer })

    await Audit.create({
        task: `Distribusi updated ${rumahsakit.name}`,
        status: 'UPDATE',
        user: req.user.id
    })

    return result
}

const deleteDistrbusi = async (req, res, next) => {
    const { id } = req.params;

   
    const distribusi = await Distribusi.findOne({ _id: id })
    .populate({
        path: 'status'
    })
    .populate({
        path: 'customer'
    })

    if (!distribusi) throw new NotFoundError('Distribusi not found')
    // console.log('customer.linen', distribusi.customer)
    // console.log('distribusi.linen', distribusi.linen)



    if (distribusi.status == null || !(distribusi.status.status === 'success')) {
        const linenList = distribusi.linen;

        const asyncTasks = [];

        for (const item of linenList) {
            const codeEpc = item.epc;
            asyncTasks.push(
                (async () => {

                    const linen = await Linen.findOne({ epc: codeEpc }).populate('category').populate({
                        path: 'hospital',
                        select: 'name'
                    });
                    const transformedItem = {
                        epc: item.epc,
                        category: linen.category._id,
                        code: linen.code
                    }

                    if (linen) {
                        await Hospital.findByIdAndUpdate(
                            { _id: distribusi.customer._id },
                            {
                                $inc: { stock: 1 },
                                $push: { linen: transformedItem },
                            },
                            { new: true, runValidators: true }
                        );
                    }
                })()
            );
        }

        // Run all asynchronous tasks concurrently
        await Promise.all(asyncTasks);
    }

    const result = await Distribusi.findByIdAndDelete({ _id: id })

    if (!result) throw new NotFoundError('Distribusi id Not Found')

    const rumahsakit = await Hospital.findOne({ _id: result.customer })

    if (!rumahsakit) throw new NotFoundError('rumahsakit tidak aad')

    if (result.invoice_id){
        const invoice = await Invoice.findOne({ _id: result.invoice_id });

        if (invoice.is_deletable == false) {
            await Invoice.deleteOne({ _id: invoice._id})
        }  
    }
    
 
    await Audit.create({
        task: `Distribusi deleted ${rumahsakit.name}`,
        status: 'UPDATE',
        user: req.user.id
    })

    return result
}



const countDistrbusi = async (req, res, next) => {
    const result = await Distribusi.find().count()

    return result;
}

module.exports = {
    createDistribusi,
    getAllDistribusi,
    getOneDistribusi,
    updateDistribusi,
    deleteDistrbusi,
    countDistrbusi,
    confirmDistribusi
};