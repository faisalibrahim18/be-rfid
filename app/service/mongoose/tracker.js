const Tracker = require('../../api/v1/tracker/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const xlsx = require('xlsx');
const Linen = require('../../api/v1/linen/model');
const Hospital = require('../../api/v1/hospital/model');
const Audit = require('../../api/v1/audit trail/model');

const ExcelJS = require('exceljs');
const path = require('path')

const fs = require('fs');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const pdf = require('html-pdf')

const createTracker = async (req) => {

    const result = await Tracker.create({
        status: 'processing'
    })

    return result
}

const getOneTracker = async (req) => {

    const { id } = req.params
    const result = await Tracker.findOne({ _id: id })
        .select('status checking transit accepted wash dry returned done');
    if (!result) throw new BadRequestError('id not found')

    return result;
}

const chekingTracker = async (req) => {
    const { id } = req.params;

    const {
        name,
        email,
        no_hp,
        heavy,
        note,

    } = req.body;

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const count = jsonData.length;

    const transformedData = jsonData.map(async (item) => {
        const codeEpc = item.EPC;

        const Category = await Linen.findOne({ epc: codeEpc }, 'epc').
            populate({
                path: 'category',
                select: 'name'
            })

        if (Category) {
            item.category = Category.category.name;
        }
        const transformedItem = {
            epc: item.EPC,
            category: Category ? Category.category.name : null
        }
        return transformedItem
    })

    const transformedformis = await Promise.all(transformedData);


    const tracker = await Tracker.findById(id);

    if (tracker.status === 'transit to laundry' || tracker.status === 'accepted' || tracker.status === 'washing' || tracker.status === 'drying' || tracker.status === 'success') {
        throw new BadRequestError(`Cannot change status when status is ${tracker.status}`);
    }

    const result = await Tracker.findByIdAndUpdate(
        { _id: id },
        {
            status: 'checking',
            checking: {
                name: name,
                email: email,
                no_hp: no_hp,
                amount: count,
                heavy: heavy,
                note: note,
                linen: transformedformis
            }
        },
        { new: true, runValidators: true }
    )
    if (!result) throw new NotFoundError('Tracker not found')

    
    await Audit.create({
        task: 'Tacker status Check',
        status: 'UPDATE',
        user: req.user.id
    })

    return result;
}

const transitTracker = async (req) => {
    const { id } = req.params;
    const {
        name,
        email,
        no_hp,
        vehicle,
        license,
        amount,
        heavy,
        note,
    } = req.body;

    const tracker = await Tracker.findById(id);

    if (!tracker) throw new NotFoundError('Tracker not found');

    if (tracker.status === 'accepted' || tracker.status === 'washing' || tracker.status === 'drying' || tracker.status === 'success') {
        throw new BadRequestError(`Cannot change status when status is ${tracker.status}`);
    }

    const result = await Tracker.findByIdAndUpdate(
        { _id: id },
        {
            status: 'transit to laundry',
            transit: {
                name: name,
                email: email,
                no_hp: no_hp,
                vehicle: vehicle,
                license: license,
                amount: amount,
                heavy: heavy,
                note: note,
            }
        },
        { new: true, runValidators: true }
    )
    if (!result) throw new NotFoundError('Tracker not found')

    await Audit.create({
        task: 'Tacker status Tansit',
        status: 'UPDATE',
        user: req.user.id
    })

    return result;
}

const acceptedTracker = async (req) => {
    const { id } = req.params;

    const {
        name,
        email,
        no_hp,
        heavy,
        note,
    } = req.body;

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const count = jsonData.length;

    const transformedData = jsonData.map(async (item) => {
        const codeEpc = item.EPC;

        const Category = await Linen.findOne({ epc: codeEpc }, 'epc').
            populate({
                path: 'category',
                select: 'name'
            })

        if (Category) {
            item.category = Category.category.name;
        }
        const transformedItem = {
            epc: item.EPC,
            category: Category ? Category.category.name : null
        }
        return transformedItem
    })

    const transformedformis = await Promise.all(transformedData);

    const tracker = await Tracker.findById(id);


    if (tracker.status === 'washing' || tracker.status === 'drying' || tracker.status === 'success') {
        throw new BadRequestError(`Cannot change status when status is ${tracker.status}`);
    }

    const result = await Tracker.findByIdAndUpdate(
        { _id: id },
        {
            status: 'accepted',
            accepted: {
                name: name,
                email: email,
                no_hp: no_hp,
                amount: count,
                heavy: heavy,
                note: note,
                linen: transformedformis
            }
        },
        { new: true, runValidators: true }
    )

    if (!result) throw new NotFoundError('Tracker not found')

    await Audit.create({
        task: 'Tacker status Acc',
        status: 'UPDATE',
        user: req.user.id
    })

    return result;
}

const washTracker = async (req) => {
    const { id } = req.params;

    const {
        name,
        email,
        no_hp,
        note,
        heavy
    } = req.body;


    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const count = jsonData.length;

    const transformedData = jsonData.map(async (item) => {
        const codeEpc = item.EPC;

        const Category = await Linen.findOne({ epc: codeEpc }, 'epc').
            populate({
                path: 'category',
                select: 'name'
            })

        if (Category) {
            item.category = Category.category.name;
        }
        const transformedItem = {
            epc: item.EPC,
            category: Category ? Category.category.name : null
        }
        return transformedItem
    })
    const tracker = await Tracker.findById(id);

    if (!tracker) throw new NotFoundError('Tracker not found');

    if (tracker.status === 'drying' || tracker.status === 'success') {
        throw new BadRequestError(`Cannot change status when status is ${tracker.status}`);
    }
    const transformedformis = await Promise.all(transformedData);

    const result = await Tracker.findByIdAndUpdate(
        { _id: id },
        {
            status: 'wash',
            wash: {
                name: name,
                email: email,
                no_hp: no_hp,
                amount: count,
                heavy: heavy,
                note: note,
                linen: transformedformis
            }
        },
        { new: true, runValidators: true }
    )

    if (!result) throw new NotFoundError('Tracker not found')

    await Audit.create({
        task: 'Tacker status Wash',
        status: 'UPDATE',
        user: req.user.id
    })

    return result;
}

const dryTracker = async (req) => {
    const { id } = req.params;

    const {
        name,
        email,
        no_hp,
        note,
        heavy,
        amount
    } = req.body;

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const count = jsonData.length;

    const transformedData = jsonData.map(async (item) => {
        const codeEpc = item.EPC;

        const Category = await Linen.findOne({ epc: codeEpc }, 'epc').
            populate({
                path: 'category',
                select: 'name'
            })

        if (Category) {
            item.category = Category.category.name;
        }
        const transformedItem = {
            epc: item.EPC,
            category: Category ? Category.category.name : null
        }
        return transformedItem
    })

    const transformedformis = await Promise.all(transformedData);

    const tracker = await Tracker.findById(id);

    if (!tracker) throw new NotFoundError('Tracker not found');

    if (tracker.status === 'success', tracker.status === 'transit to hospital') {
        throw new BadRequestError(`Cannot change status when status is ${tracker.status}`);
    }
    const result = await Tracker.findByIdAndUpdate(
        { _id: id },
        {
            status: 'drying',
            dry: {
                name: name,
                email: email,
                no_hp: no_hp,
                note: no_hp,
                amount: count,
                heavy: heavy,
                note: note,
                linen: transformedformis
            }
        },
        { new: true, runValidators: true },
    )

    if (!result) throw new NotFoundError('Tracker not found')

    await Audit.create({
        task: 'Tacker status Dry',
        status: 'UPDATE',
        user: req.user.id
    })

    return result;
}

const deliveryToHospital = async (req) => {
    const { id } = req.params;
    const {
        name,
        email,
        no_hp,
        vehicle,
        license,
        amount,
        heavy,
        note,
    } = req.body;

    const tracker = await Tracker.findById(id);

    if (!tracker) throw new NotFoundError('Tracker not found');

    if (tracker.status === 'success') {
        throw new BadRequestError(`Cannot change status when status is ${tracker.status}`);
    }

    const result = await Tracker.findByIdAndUpdate(
        { _id: id },
        {
            status: 'transit to hospital',
            returned: {
                name: name,
                email: email,
                no_hp: no_hp,
                vehicle: vehicle,
                license: license,
                amount: amount,
                heavy: heavy,
                note: note,
            }
        },
        { new: true, runValidators: true }
    )
    if (!result) throw new NotFoundError('Tracker not found')

    await Audit.create({
        task: 'Tacker status transit to hospital',
        status: 'UPDATE',
        user: req.user.id
    })

    return result;
}

const doneTracker = async (req) => {
    const { id } = req.params;

    const { name, email, no_hp, note, heavy } = req.body;

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    const count = jsonData.length;

    const transformedData = [];

    for (const item of jsonData) {
        const codeEpc = item.EPC;

        const linen = await Linen.findOne({ epc: codeEpc }).populate('category').populate({
            path: 'hospital',
            select: 'name'
        });

        let counter = 0;

        

        const transformedItem = {
            epc: item.EPC,
            category: linen ? linen.category.name : null,
            counter: counter,
        };

        if (linen) {
            item.category = linen.category.name;
            if (linen.hospital) {


                const checkEpc = await Hospital.findOne(
                    { _id: linen.hospital._id },
                )

                const getEpc = checkEpc.linen.map(x => x.epc);
                
                if (getEpc.includes(codeEpc)) throw new NotFoundError(`Linen sudah terdaftart di rumah sakit ${checkEpc.name}`);
                
                await Hospital.findByIdAndUpdate(
                    { _id: linen.hospital._id },
                    {
                        $inc: { stock: 1  },
                        $push: { linen: transformedItem } 
                    },
                    { new: true, runValidators: true }
                )
            }
            counter = await counterPlus(linen);
        }

        transformedData.push(transformedItem);
    }

    console.log(transformedData)
    const result = await Tracker.findByIdAndUpdate(
        { _id: id },
        {
            status: 'success',
            done: {
                name: name,
                email: email,
                no_hp: no_hp,
                note: note,
                heavy: heavy,
                amount: count,
                linen: transformedData,
            },
        },
        { new: true, runValidators: true }
    );

    if (!result) throw new NotFoundError('Tracker not found');

    await Audit.create({
        task: 'Tacker status Success',
        status: 'UPDATE',
        user: req.user.id
    })

    return result;
};

const counterPlus = async (linen) => {
    try {
        linen.counter += 1;
        await linen.save();
        return linen.counter;
    } catch (error) {
        console.error('Failed to increment counter:', error);
        throw error;
    }
};




const checkStatus = async (id) => {
    const result = await Tracker.findById({
        _id: id
    })


    if (!result) throw new NotFoundError('Status id not found');
    return result;
}



const countTrackers = async () => {
    const result = await Tracker.find().count();

    return result;
}

const exportWashTracker = async (req, res) => {
    const { id } = req.params;
    const result = await Tracker.findOne({ _id: id })
        .select('wash')

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('data');
    worksheet.columns = [
        { header: 'Name', key: 'Name', width: 20, alignment: { horizontal: 'middle' } },
        { header: 'Email', key: 'Email', width: 20, alignment: { horizontal: 'middle' } },
        { header: 'Phone_Number', key: 'Phone_Number', width: 20, alignment: { horizontal: 'middle' } },
        { header: 'Amount', key: 'Amount', width: 10, alignment: { horizontal: 'middle' } },
        { header: 'Heavy', key: 'Heavy', width: 10, alignment: { horizontal: 'middle' } },
        { header: 'Note', key: 'Note', width: 20, alignment: { horizontal: 'middle' } },
        { header: 'EPC', key: 'EPC', width: 30, alignment: { horizontal: 'middle' } },
        { header: 'Category', key: 'Category', width: 15, alignment: { horizontal: 'middle' } },
        { header: 'Date', key: 'Date', width: 15, alignment: { horizontal: 'middle' } },
    ];

    worksheet.columns.forEach(column => {
        column.headerStyle = {
            alignment: { horizontal: 'middle' },
            fill: {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF00FF00' }
            }
        };
    });

    result.wash.linen.forEach(async (item) => {
        worksheet.addRow({
            Name: result.wash.name,
            Email: result.wash.email,
            Phone_Number: result.wash.no_hp,
            Amount: result.wash.amount,
            Heavy: result.wash.heavy,
            Note: result.wash.note,
            EPC: item.epc,
            Category: item.category,
            Date: result.wash.date,
        });
    });
    const filePath = 'wash.xlsx';
    await workbook.xlsx.writeFile(filePath);

    res.download(filePath);

}


const serahTerimaPdf = async (req) => {
    const { id } = req.params
    const browser = await puppeteer.launch();
    const page = await browser.newPage();



    // Meload file EJS
    const url = await page.goto(`http://localhost:9000/api/v1/rfid/tracker/serahTerima/${id}`,
        {
            waitUntil: 'networkidle0'
        });


    await page.pdf({
        path: 'serahterima.pdf', 
        format: 'A4', 
        printBackground: true,
    });

    await browser.close();

    return pdfPath;
};


module.exports = {
    createTracker,
    checkStatus,
    chekingTracker,
    transitTracker,
    acceptedTracker,
    washTracker,
    dryTracker,
    doneTracker,
    getOneTracker,
    countTrackers,
    exportWashTracker,
    deliveryToHospital,
    serahTerimaPdf
}


