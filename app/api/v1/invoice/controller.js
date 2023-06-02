const {
    createInvoice,
    getAllInvoice,
    getOneInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceByUserId
} = require('../../../service/mongoose/invois');

const { StatusCodes } = require('http-status-codes');
const ejs = require('ejs');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');



const create = async (req, res, next) => {
    try {
        const result = await createInvoice(req)

        res.status(StatusCodes.CREATED).json({
            message: 'create succes ',
            data: result
        })
    } catch (err) {
        next(err)
    }
} 

const index = async (req, res, next) => {
    try {
        const invoice = await getAllInvoice();

        // res.status(StatusCodes.OK).json({
        //     data: result
        // })

        res.render('invoice', { invoice })
    } catch(err) {
        next(err)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneInvoice(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateInvoice(req);

        res.status(StatusCodes.OK).json({
            message: 'update success',
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await deleteInvoice(req);

        res.status(StatusCodes.OK).json({
            message: 'delete success',
            data: result
        })
    } catch (err) {
        next(err)
    } 
}
const exportPdf = async (req, res, next) => {
    try {
        const invoice = await getAllInvoice()

        const data = {
            invoice: invoice
        };
        const filePathName = path.resolve(__dirname, '../../../../views/invoice.ejs');
        const htmlString = fs.readFileSync(filePathName).toString();
        const ejsData = ejs.render(htmlString, data);

        const options = {
            format: 'Letter'
        };

        
        pdf.create(ejsData, options).toFile('invoice.pdf', (err, response) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Failed to generate PDF');
            }
            const filePath = path.resolve(__dirname, '../../../../invoice.pdf')

            
            fs.readFile(filePath, (err, file) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Could not download PDF');
                }
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment;filename="invoice.pdf"');

                res.send(file);
            });
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Failed to generate PDF');
    }
};

const findByUserId = async (req, res, next) => {
    try {
        const result = await getInvoiceByUserId(req);

        res.status(StatusCodes.OK).json({
            data: result
        })

    } catch (err) {
        next(err)
    }
}

module.exports = {
    create,
    index,
    find,
    update,
    destroy,
    exportPdf,
    findByUserId
}