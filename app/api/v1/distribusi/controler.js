const { createDistribusi, downloadDistribusi, getAllDistribusi, getOneDistribusi, updateDistribusi, deleteDistrbusi, downloadPDF } = require('../../../service/mongoose/distribusi');
const { StatusCodes } = require('http-status-codes');
const Distribusi = require('./model');
const ExcelJS = require('exceljs');

const ejs = require('ejs');
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');


const create = async (req, res, next) => {
    try {
        const result = await createDistribusi(req);

        res.status(StatusCodes.CREATED).json({
            message: 'distribusi created successfully',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllDistribusi(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneDistribusi(req)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateDistribusi(req)

        res.status(StatusCodes.OK).json({
            message: 'distribusi update successfully',
            data: result
        })
    } catch (err) {
        next(err)
    }
}


const destroy = async (req, res, next) => {
    try {
        const result = await deleteDistrbusi(req)

        res.status(StatusCodes.OK).json({
            message: 'distribusi delete successfully',
            data: result
        })
    } catch {
        next(err)
    }
}

const download = async (req, res, next) => {
    try {
        const result = await getAllDistribusi(req)

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('data');

        worksheet.columns = [
            { header: 'Customer', key: 'customer', width: 30, alignment: { horizontal: 'middle' } },
            { header: 'Category', key: 'category', width: 20, alignment: { horizontal: 'middle' } },
            { header: 'Quality', key: 'quality', width: 20, alignment: { horizontal: 'middle' } },
            { header: 'Service', key: 'service', width: 20, alignment: { horizontal: 'middle' } },
            { header: 'Status', key: 'status', width: 20, alignment: { horizontal: 'middle' } },
            { header: 'Date In', key: 'dateIn', width: 15, alignment: { horizontal: 'middle' } },
            { header: 'Date Out', key: 'dateOut', width: 15, alignment: { horizontal: 'middle' } },
            { header: 'Amount', key: 'amount', width: 10, alignment: { horizontal: 'middle' } },
            { header: 'Weight', key: 'weight', width: 10, alignment: { horizontal: 'middle' } },
        ];

        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF00FF00' }
        };

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


        result.forEach((item) => {
            const statusValue = item.status ? item.status.status : '-';
            worksheet.addRow({
                customer: item.customer.name,
                category: item.category.name,
                quality: item.quality,
                service: item.service,
                status: statusValue,
                dateIn: item.dateIn,
                dateOut: item.dateOut,
                amount: item.amount,
                weight: item.weight,
            });
        });


        await workbook.xlsx.writeFile('data.xlsx');
        res.download('data.xlsx');

    } catch (err) {
        next(err)
    }
}
const downloadDistribusiPDF = async (req, res, next) => {
    try {
        const distribusi = await getAllDistribusi(req)
            
        const data = {
            distribusi: distribusi
        };
        const filePathName = path.resolve(__dirname, '../../../../public/pdf/distribusi.ejs');
        const htmlString = fs.readFileSync(filePathName).toString();
        const ejsData = ejs.render(htmlString, data);

        const options = {
            format: 'Letter'
        };

        pdf.create(ejsData, options).toFile('distribusi.pdf', (err, response) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Failed to generate PDF');
            }

            const filePath = path.resolve(__dirname, '../../../../distribusi.pdf')

            fs.readFile(filePath,(err, file) => {
                if (err) {
                    console.log(err);
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Could not download PDF');
                }
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment;filename="distribusi.pdf"');

                res.send(file);
            });
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('Failed to generate PDF');
    }
};


module.exports = {
    create,
    find,
    update,
    index,
    destroy,
    download,
    downloadDistribusiPDF
}
