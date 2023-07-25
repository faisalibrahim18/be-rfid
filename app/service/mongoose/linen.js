const Linen = require('../../api/v1/linen/model');
const { BadRequestError, NotFoundError } = require('../../errors');
const xlsx = require('xlsx');
const Audit = require('../../api/v1/audit trail/model');
const cron = require('node-cron');
const Hospital = require('../../api/v1/hospital/model');

const createLinen = async (req) => {
    const { name } = req.body;

    const checkName = await Linen.findOne({ name: name })

    if (checkName) throw new BadRequestError('Name has already been registered');

    const result = await Linen.create({
        name,
    })

    const data = result.map(x => x.code)
    await Audit.create({
        task: `Linen imported ${data}`,
        status: 'CREATE',
        user: req.user.id
    })
    return result;
}

const getAllLinen = async (req) => {
    const result = await Linen.find()
  
        .populate({
            path: 'category',
            select: 'name'
        })
        .populate({
            path: 'hospital',
            select: 'name'
        })
    if (!result) throw new NotFoundError('Linen not found');

    return result;
}

const getOneLinen = async (req) => {
    const { id } = req.params;

    const result = await Linen.findOne({ _id: id })
        .select('epc category')

    if (!result) throw new NotFoundError('Linen not found');

    return result;
}

const updateLinen = async (req) => {
    const { id } = req.params;
    const { category } = req.body;

    const result = await Linen.findByIdAndUpdate(
        { _id: id },
        { category },
        { new: true, runValidators: true }
    )

    if (!result) throw new NotFoundError(`Linen name id ${id} not found`);

    await Audit.create({
        task: `Linen updated ${result.code}`,
        status: 'UPDATE',
        user: req.user.id
    })
    return result;
}

const deleteLinen = async (req) => {
    const { id } = req.params;

    const result = await Linen.findByIdAndDelete({ _id: id })

    if (!result) throw new NotFoundError(`Linen name ${id} not found`);

    await Audit.create({
        task: `Linen deleted ${result.code}`,
        status: 'DELETE',
        user: req.user.id
    })

    if (result.hospital) {
        const hospital = await Hospital.findOneAndUpdate(
            { _id: result.hospital },
            {
               $pull:  { linen: { epc: result.epc } }
            },
            { new: true }
        );
        hospital.stock -= 1;
        await hospital.save(); 
    }

    return result;
}


const checkLinen = async (id) => {
    const result = await Linen.findOne({ _id: id })

    if (!result) throw new NotFoundError('Linen id not found');

    return result
}

const countLinen = async () => {
    const result = await Linen.find().count();

    return result
}

const countLinenByHospital = async (req) => {
    const  idHospital   = req.params.id;
    const Linen = await Linen.countDocuments({ hospital: idHospital })

    return result 
}

const checkExpiredLinen = async () => {
    try {
        console.log('Cron job untuk memeriksa linen kadaluarsa sedang berjalan.');

        const expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() - 30);

        // const now = new Date();
        // const expiredDate = new Date(now.getTime() - 30 * 1000); 



        const linenToUpdate = await Linen.find({
            $or: [
                { expireDate: { $exists: false } },
                { expireDate: null }
              ],
              updatedAt: { $lt: expiredDate }
        });

        // Perbarui status linen yang kadaluarsa
        await Linen.updateMany(
            { _id: { $in: linenToUpdate.map((linen) => linen._id) } },
            { 
                expireDate: new Date(),
                status: "5"
            }
        );
    } catch (err) {
        console.error('Error checking expired linen:', err);
    }
};

// Menjadwalkan tugas untuk memeriksa dan memperbarui status linen yang kadaluarsa setiap 30 detik
cron.schedule('*/60 * * * * *', checkExpiredLinen);

module.exports = {
    createLinen,
    getAllLinen,
    getOneLinen,
    updateLinen,
    deleteLinen,
    checkLinen,
    countLinen,
    countLinenByHospital,
    checkExpiredLinen
};