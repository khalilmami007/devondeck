const Developer = require("../models/developer.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const Secret = process.env.SECRET_KEY;

module.exports = {
  register: (req, res) => {
    Developer.create(req.body)
      .then((developer) => {
        const developerToken = jwt.sign(
          { id: developer._id },
          process.env.JWT_SECRET
        );
        res
          .cookie("Developertoken", developerToken, { httpOnly: true })
          .json({ msg: "success!", developer: developer });
      })
      .catch((err) => res.status(400).json(err));
  },

  login: async (req, res) => {
    const developer = await Developer.findOne({ email: req.body.email });
    if (developer === null) {
      // email not found in Developers collection
      return res.sendStatus(400);
    }

    const correctPassword = await bcrypt.compare(
      req.body.password,
      developer.password
    );
    if (!correctPassword) {
      return res.sendStatus(400);
    }

    const developerToken = jwt.sign(
      {
        id: developer._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("Developertoken", developerToken, {
        httpOnly: true,
      })
      .json({ msg: "success!" });
  },

  logout: (req, res) => {
    res.clearCookie("Developertoken");
    res.sendStatus(200);
  },

  getLoggedDeveloper: async (req, res) => {
    // Check if the token exists in the request cookies
    const developerToken = req.cookies.Developertoken;
    if (!developerToken) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    try {
      // Verify the token and extract the developer id
      const decoded = jwt.verify(developerToken, process.env.JWT_SECRET);
      const loggedDeveloper = await Developer.findOne({ _id: decoded.id });

      if (!loggedDeveloper) {
        return res.status(404).json({ msg: "Developer not found" });
      }

      res.json(loggedDeveloper);
    } catch (err) {
      res.status(401).json({ msg: "Token verification failed" });
    }
  },
};

// Rest of the code for getAllDevelopers, getOneDeveloper, updateDeveloper, deleteDeveloper

// //const Developer = jwt.verify(req.cookies.Developertoken, process.env.SECRET_KEY)
// console.log('Developer1    :',Developer)
// Developer.findOne({ _id:Developer.id })
//     .then((Developer) => {
//     res.json(Developer );
// })
// .catch((err )=> {console.log(err)});
//}

// module.exports.getDeveloperData = (request, response) => {
//   const devId = request.params.devId;
  
//   console.log(devId)
//   Developer.aggregate([
//     { $match: { _id:new mongoose.Types.ObjectId(devId) } },
//     {
//       $lookup: {
//         from: "skills",
//         localField: "_id",
//         foreignField: "devId",
//         as: "developerskills",
//       },
//     },
//     {
//       $unwind: "$developerskills",
//     },{
//       $project:{
//         _id:1,
//         firstName:1,
//         lastName:1,
//         bio:'$developerskills.bio',
//         languages:'$developerskills.languages'
//       }
//     }
//   ]).then(data=>{
//     console.log(data)
//     response.json(data)
//   })
//   .catch(err=>{
//     console.log(err)
//     response.json(err)
//   })
// };
module.exports.getAllDevelopersWithSkills = (request, response) => {
  Developer.aggregate([
    {
      $lookup: {
        from: 'skills',
        localField: '_id',
        foreignField: 'devId',
        as: 'developerskills',
      },
    },
    {
      $project: {
        _id: 1,
        firstName: 1,
        lastName: 1,
        bio: '$developerskills.bio',
        languages: '$developerskills.languages',
      },
    },
  ])
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      console.error(err);
      response.json(err);
    });
};
module.exports.getAllDevelopers = (request, response) => {
  Developer.find({})
    .then((Developers) => {
      response.json(Developers);
    })
    .catch((err) => {
      response.json(err);
    });
};

module.exports.getOneDeveloper = (request, response) => {
  Developer.findOne({ email: request.params.email })
    .then((Developer) => {
      response.json(Developer);
    })
    .catch((err) => {
      response.json(err);
    });
};

module.exports.updateDeveloper = (request, response) => {
  Developer.findOneAndUpdate({ _id: request.params.id }, request.body, {
    new: true,
  })
    .then((updatedDeveloper) => response.json(updatedDeveloper))
    .catch((err) => response.json(err));
};

module.exports.deleteDeveloper = (request, response) => {
  Developer.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
};
