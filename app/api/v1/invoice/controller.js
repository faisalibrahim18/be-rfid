const {
    createInvoice,
    getAllInvoice,
    getOneInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoiceByUserId,
    
} = require('../../../service/mongoose/invois');

const { StatusCodes } = require('http-status-codes');
const ejs = require('ejs');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');



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

        res.status(StatusCodes.OK).json({
            data: invoice
        })
        // res.render('invoice', { invoice })
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

const invoicePage = async (req, res, next) => {
    try {
        const invoice = await getOneInvoice(req);
        const filePath = path.join(__dirname, "../../../../views/invoice.ejs")
        ejs.renderFile(filePath, { invoice }, (err, html) => {
            if (err) {
                console.log(err)
            }
            return res.send(html)
        })


    } catch (error) {
        next(err)
    }
};

const generatePdf = async (req, res, next) => {
    try {
        const { id } = req.params
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        const ENV = process.env.API_LOCAL || process.env.API_DEVELOPMENT 

        await page.goto(`${ENV}/invoiceView/${id}`,
            {
                waitUntil: 'networkidle0'
            });


        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        await browser.close();

        const filePath = path.join(__dirname, 'invoice.pdf');
        fs.writeFileSync(filePath, pdf);

       

        res.download(filePath, 'invoice.pdf', (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }

            fs.unlinkSync(filePath);
        });



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
    generatePdf,
    findByUserId,
    invoicePage
}