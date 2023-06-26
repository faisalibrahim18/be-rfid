const { response } = require('express');
const { createLinen,
    getAllLinen,
    getOneLinen,
    updateLinen,
    deleteLinen,
    countLinen,
    countLinenByHospital
} = require('../../../service/mongoose/linen');
const { checkCategory } = require('../../../service/mongoose/category')

const { StatusCodes } = require('http-status-codes');
const xlsx = require('xlsx');

const Linen = require('./model');

const exceljs = require('exceljs');
const { NotFoundError, BadRequestError } = require('../../../errors');
const Hospital = require('../hospital/model');



const create = async (req, res, next) => {
    try {
        const result = await createLinen(req)

        res.status(StatusCodes.CREATED).json({
            message: 'Linen created successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        const result = await getAllLinen();

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneLinen(req);

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateLinen(req);

        res.status(StatusCodes.OK).json({
            message: 'Linen update successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const destroy = async (req, res, next) => {
    try {
        const result = await deleteLinen(req);

        res.status(StatusCodes.OK).json({
            message: 'Linen deleted successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }

}

const count = async (req, res, next) => {
    try {
        const result = await countLinen()

        res.json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const importExcel = async (req, res, next) => {
    try {

        const { category, hospital } = req.body;
        

        if (!category) throw new BadRequestError('category required')

        await checkCategory(category);

        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

        const count = jsonData.length;

        if (!workbook) throw new BadRequestError('file required')

        for (const item of jsonData) {
            const existingLinen = await Linen.findOne({ epc: item.EPC });
            if (existingLinen) {
                return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Duplicate EPC' });
            }
        }

        if (hospital) {
            await Hospital.findByIdAndUpdate(
                { _id: hospital },
                {
                    $inc: { stock: count } 
                },
                { new: true, runValidators: true }
            )
        }
        

        const transformedData = jsonData.map((item, index) => {
            const codeNumber = index + 1;
            const code = `A${codeNumber.toString().padStart(6, '0')}`;
            const transformedItem = {
                epc: item.EPC,
                date: new Date(),
                category: category,
                code: code,
                hospital: hospital
            }
            return transformedItem
        })

        const result = await Linen.create(transformedData)

        res.status(StatusCodes.OK).json({
            message: "import linen success",
            data: result
        })
    } catch (err) {
        next(err)
        
    }
}


const exportExcel = async (req, res, next) => {
    try {
        const result = await getAllLinen()

        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('linen');

        worksheet.columns = [
            { header: 'No', key: 'no', width: 4, alignment: { horizontal: 'middle' } },
            { header: 'Epc', key: 'epc', width: 30, alignment: { horizontal: 'middle' } },
            { header: 'Category', key: 'category', width: 20, alignment: { horizontal: 'middle' } },
            { header: 'Date', key: 'date', width: 20, alignment: { horizontal: 'middle' } },
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

        result.forEach((item, index) => {
            const categoryValue = item.category ? item.category.name : '-';
            worksheet.addRow({
                no: index + 1,
                epc: item.epc,
                category: categoryValue,
                date: item.date
            })
        })

        await workbook.xlsx.writeFile('linen.xlsx');
        res.download('linen.xlsx');
    } catch (err) {
        next(err);
    }
}

const countByHospital = async (req, res, next) => {

    try {
        const result = await countLinenByHospital(req)

        res.status(StatusCodes.OK).send({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

module.exports = { create, index, find, update, destroy, count, importExcel, exportExcel, countByHospital }
