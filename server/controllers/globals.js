const Global = require('../models/global');
const moment = require('moment');

createGlobal = async global => {
    // Create a new global
    const newGlobal = new Global(global);
    await newGlobal.save();
    return newGlobal;
}

module.exports = {
    setRip: async(req, res, next) => {
        const { rip, global } = req.value.body;

        // Store rip properties
        const totalRips = global.totalRips + 1;
        let todaysRips = global.todaysRips;
        let ripDateTime = global.ripDateTime;

        // Set current date
        let m = moment().utc();
        let currDate = m.format("YYYY-MM-DD");


        // If the date is null or date is not the same, set today's rip to 1 and
        // date to the current date. Otherwise, just increase the todaysRips.
        if (currDate > ripDateTime || ripDateTime === null) {
            todaysRips = 1;
            ripDateTime = currDate;
        } else {
            todaysRips += 1;
        }

        // Update the global
        Global.findOneAndUpdate(
            {'type': "Rip"},
            {$set: {totalRips, todaysRips, ripDateTime}},
            {},
            function(e, object) {
                if (e) return res.status(500).json({ error: e.message })

                return res.status(200).json({ message: `:white_check_mark: Rip updated`, todaysRips, totalRips });
            }
        );
    }

}
