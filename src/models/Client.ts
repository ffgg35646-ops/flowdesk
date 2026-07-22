import mongoose, { Schema, models } from "mongoose";


const ClientSchema = new Schema(

  {

    name: {
      type: String,
      required: true,
      trim: true,
    },


    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },


    phone: {
      type: String,
      default: "",
    },


    companyName: {
      type: String,
      default: "",
      trim: true,
    },


    address: {
      type: String,
      default: "",
    },


    notes: {
      type: String,
      default: "",
    },


    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },


    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    status: {
      type: String,
      enum: [
        "active",
        "inactive",
      ],
      default: "active",
    },


  },

  {
    timestamps: true,
  }

);



const Client =
  models.Client ||
  mongoose.model(
    "Client",
    ClientSchema
  );


export default Client;
