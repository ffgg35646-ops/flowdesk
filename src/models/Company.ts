import mongoose, { Schema, models } from "mongoose";


const CompanySchema = new Schema(

  {

    name: {
      type: String,
      required: true,
      trim: true,
    },


    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    description: {
      type: String,
      default: "",
    },


    logo: {
      type: String,
      default: "",
    },


    industry: {
      type: String,
      default: "",
    },


    employeesCount: {
      type: Number,
      default: 0,
    },


    createdAt: {
      type: Date,
      default: Date.now,
    },


  },

  {
    timestamps: true,
  }

);



const Company =
  models.Company ||
  mongoose.model(
    "Company",
    CompanySchema
  );


export default Company;
