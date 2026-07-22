import mongoose, { Schema, models } from "mongoose";


const ProjectSchema = new Schema(

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
      required: true,
    },


    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],


    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      default: null,
    },


    status: {
      type: String,
      enum: [
        "planning",
        "active",
        "completed",
        "cancelled",
      ],
      default: "planning",
    },


    priority: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
        "urgent",
      ],
      default: "medium",
    },


    startDate: {
      type: Date,
      default: null,
    },


    endDate: {
      type: Date,
      default: null,
    },


    budget: {
      type: Number,
      default: 0,
    },


    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },


  },

  {
    timestamps: true,
  }

);



const Project =
  models.Project ||
  mongoose.model(
    "Project",
    ProjectSchema
  );


export default Project;
