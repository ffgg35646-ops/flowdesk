import mongoose, { Schema, models } from "mongoose";


const DepartmentSchema = new Schema(

  {

    name: {
      type: String,
      required: true,
      trim: true,
    },


    description: {
      type: String,
      default: "",
      trim: true,
    },


    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },


    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },


    employees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],


    isActive: {
      type: Boolean,
      default: true,
    },


  },

  {
    timestamps: true,
  }

);



const Department =
  models.Department ||
  mongoose.model(
    "Department",
    DepartmentSchema
  );


export default Department;
