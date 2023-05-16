const Tracker = require('../../api/v1/tracker/model');
const { BadRequestError, NotFoundError } = require('../../errors');


const createTracker = async (req) => {

    const result = await Tracker.create({
        status: 'processing'
    })

    return result
}

const getOneTracker = async (req) => {
    const result = await Tracker.findOne({_id : id})
    .select('status checking transit accepted wash dry done');

    if (!result) throw new BadRequestError('id not found')

    return result;
}

const chekingTracker = async (req) => {
    const { id } = req.params;

    const {
        checking
    } = req.body;

    const result = await Tracker.findByIdAndUpdate(
        { _id: id },
        {
            checking,
            status: 'checking',
            
        },
        { new: true, runValidators: true }
    )
    if (!result) throw new NotFoundError('Tracker not found')

    return result;
}

const transitTracker = async (req) => {
    const { id } = req.params;
    const {
        transit
    } = req.body;

    const result = await Tracker.findByIdAndUpdate(
        { _id: id },
        {
            status: 'transit',
            transit
        },
        { new: true, runValidators: true }
    )
    if (!result) throw new NotFoundError('Tracker not found')

    return result;
}

const acceptedTracker = async (req) => {
    const { id } = req.params;

    const {
        accepted
    } = req.body;

    const result = await Tracker.findByIdAndUpdate(
        { _id: id },
        {
            status: 'accepted',
            accepted
        },
        { new: true,  runValidators: true}
    )

    if (!result) throw new NotFoundError('Tracker not found')

    return result;
}

const washTracker = async (req) => {
    const { id } = req.params;

    const {
        wash
    } = req.body;

    const result = await Tracker.findByIdAndUpdate(
        { _id: id },
        {   
            status: 'washing',
            wash
        },
        { new: true, runValidators: true }
    )

    if (!result) throw new NotFoundError('Tracker not found')

    return result;
}

const dryTracker = async (req) => {
    const  { id } = req.params;

    const { 
        dry
    } = req.body;

    const result = await Tracker.findByIdAndUpdate(
        { _id: id },
        {
            status: 'drying',
            dry
        },
        { new: true, runValidators: true },
    )

    if (!result) throw new NotFoundError('Tracker not found')
    
    return result;
}

const doneTracker = async (req) => {
    const { id } = req.params;

    const { 
        done
    } = req.body;

    const result = await Tracker.findByIdAndUpdate(
        { _id : id },
        {
            status: 'success',
            done
        },
        { new: true, runValidators: true }
    )

    if (!result) throw new NotFoundError('Tracker not found')

    return result;
}

const checkStatus = async (id) => {
    const result = await Tracker.findById({
        _id: id
    })
    if (!result) throw new NotFoundError('Status id not found');
    return result;
}

module.exports = {
    createTracker,
    checkStatus,
    chekingTracker,
    transitTracker,
    acceptedTracker,
    washTracker,
    dryTracker,
    doneTracker,
    getOneTracker
}