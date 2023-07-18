const {
    createTracker, chekingTracker, transitTracker,
    acceptedTracker,
    washTracker,
    dryTracker,
    doneTracker,
    getOneTracker,
    countTrackers,
    exportWashTracker,
    deliveryToHospital,
    serahTerimaPdf
} = require('../../../service/mongoose/tracker')
const { StatusCodes } = require('http-status-codes');

const path = require('path');
const ejs = require('ejs')


const fs = require('fs')


const create = async (req, res, next) => {
    try {
        const result = await createTracker();

        res.status(StatusCodes.CREATED).json({
            message: 'tracker created successfully',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneTracker(req);

        res.status(StatusCodes.CREATED).json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const checking = async (req, res, next) => {
    try {
        const result = await chekingTracker(req);

        res.status(StatusCodes.OK).json({
            message: 'Status changed successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const transit = async (req, res, next) => {
    try {
        const result = await transitTracker(req);

        res.status(StatusCodes.OK).json({
            message: 'Status changed successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const accepted = async (req, res, next) => {
    try {
        const result = await acceptedTracker(req);

        res.status(StatusCodes.OK).json({
            message: 'Status Changed Successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const wash = async (req, res, next) => {
    try {
        const result = await washTracker(req);

        res.status(StatusCodes.OK).json({
            message: 'Status Changed Successfully' + result.status,
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const dry = async (req, res, next) => {
    try {
        const result = await dryTracker(req);

        res.status(StatusCodes.OK).json({
            message: 'Status changed successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const done = async (req, res, next) => {
    try {
        const result = await doneTracker(req);

        res.status(StatusCodes.OK).json({
            message: 'Status changed successfully',
            data: result
        })
    } catch (err) {
        next(err);
    }

}

const count = async (req, res, next) => {
    try {
        const result = await countTrackers();

        res.json({
            data: result
        })
    } catch (err) {
        next(err);
    }
}

const backHospital = async (req, res, next) => {
    try {
        const result = await deliveryToHospital(req)

        res.status(StatusCodes.OK).json({
            message: 'Status changed successfully',
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const exportWash = async (req, res, next) => {
    try {
        await exportWashTracker(req, res)
    } catch (err) {
        next(err)
    }
}



module.exports = {
    create,
    checking,
    transit,
    accepted,
    wash,
    dry,
    done,
    find,
    count,
    exportWash,
    backHospital,
    
}

