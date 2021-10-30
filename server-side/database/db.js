const mongoose = require("mongoose");
const Note = require("../models/Note");
const User = require("../models/User");
const MONGO_URL = "mongodb+srv://david:david@cluster0.axzcq.mongodb.net/app";
// const connectDB = async () => {
//   try {
//     const url = "mongodb+srv://david:david@cluster0.axzcq.mongodb.net/app";
//     mongoose.connect(url, {
//       useNewUrlParser: true,
//     });

//     const db = mongoose.connection;
//     db.once("open", (_) => {
//       console.log("Database connected:", url);
//     });
//   } catch (err) {
//     console.log("err");
//   }
// };

class Controller {
  constructor() {
    this.connect();
  }
  async connect() {
    try {
      await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
      });
      console.info("Connect to DB");
    } catch (err) {
      console.error(err);
    }
  }
  addUser(res, data) {
    User.create(data, (err, newUser) => {
      if (err) throw err;
      res.json({
        status: 200,
        message: "Created",
        user: newUser,
      });
    });
  }
  login(res, data) {
    User.findOne(
      {
        $and: [{ email: data.email }, { password: data.password }],
      },
      (err, user) => {
        if (err) throw err;
        res.json({
          status: 200,
          message: "ok",
          user,
        });
      }
    );
  }
  updateUser(res, id, data) {
    User.updateOne(
      {
        _id: id,
      },
      data,
      (err, updateUser) => {
        if (err) throw err;
        res.json({
          status: 200,
          message: "Updated",
          user: updateUser,
        });
      }
    );
  }
  getUser(res, id) {
    User.findOne(
      {
        _id: id,
      },
      (err, user) => {
        if (err) throw err;
        res.json({
          status: 200,
          message: "ok",
          user,
        });
      }
    );
  }
  getUsers(res, data) {
    User.find({}, data, (err, user) => {
      if (err) throw err;
      res.json({
        status: 200,
        message: "ok",
        user: getUsers,
      });
    });
  }
  deleteUser(res, id) {
    User.deleteOne(
      {
        _id: id,
      },
      (err) => {
        if (err) throw err;
        res.json({
          status: 200,
          message: "Deleted",
        });
      }
    );
  }
  addNote(res, data) {
    Note.create(data, (err, newNote) => {
      if (err) throw err;
      res.json({
        status: 200,
        message: "Created",
        note: newNote,
      });
    });
  }
  getNotes(res, userId) {
    Note.find(
      {
        id_user: userId,
      },
      (err, notes) => {
        if (err) throw err;
        res.json({
          status: 200,
          message: "ok",
          notes,
        });
      }
    );
  }
  updateNote(res, id, data) {
    Note.updateOne(
      {
        _id: id,
      },
      data,
      (err, updateNote) => {
        if (err) throw err;
        res.json({
          status: 200,
          message: "Updated",
          note: updateNote,
        });
      }
    );
  }
  deleteNote(res, id) {
    Note.deleteOne(
      {
        _id: id,
      },
      (err) => {
        if (err) throw err;
        res.json({
          status: 200,
          message: "Deleted",
        });
      }
    );
  }
}
exports.db = new Controller();
