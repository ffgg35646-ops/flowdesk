import mongoose, { Schema, models } from "mongoose";


const NotificationSchema = new Schema(

  {

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },


    title: {
      type: String,
      required: true,
      trim: true,
    },


    message: {
      type: String,
      required: true,
      trim: true,
    },


    type: {
      type: String,
      enum: [
        "system",
        "project",
        "task",
        "invoice",
        "employee",
      ],
      default: "system",
    },


    isRead: {
      type: Boolean,
      default: false,
    },


    link: {
      type: String,
      default: "",
    },


  },

  {
    timestamps: true,
  }

);



const Notification =
  models.Notification ||
  mongoose.model(
    "Notification",
    NotificationSchema
  );


export default Notification;
