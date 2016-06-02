'use strict';

import User from '../models/User'

module.exports = {

    getUsers: async() => {
        return await User.find({});
    },

    updateIfExists: async(user, distance) => {
        let oldUser = await Promise.resolve(User.findOneAndUpdate({userName: user.userName}, {
            loc: user.loc,
            created: Date.now()
        }, {
            new: true, select: {
                _id: false, __v: false
            }
        }));
        if (oldUser) {
            return await getUsersInRange(user, distance);
        } else {
            let newUser = new User({
                userName: user.userName,
                loc: user.loc
            });
            await newUser.save();
            return await getUsersInRange(newUser, distance);
        }
    }
};

async function getUsersInRange(user, distance) {
    let maxDistance = (1 / 111.12) * distance;
    return await Promise.resolve(User.find({
        userName: {$ne: user.userName},
        loc: {$near: user.loc, $maxDistance: maxDistance}
    }, {_id: false, __v: false}));
}
