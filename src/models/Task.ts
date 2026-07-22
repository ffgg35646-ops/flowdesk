import mongoose, { Schema, models } from "mongoose";


const TaskSchema = new Schema(

  {

    title: {
      type: String,
      required: true,
      trim: true,
    },


    description: {
      type: String,
      default: "",
      trim: true,
    },


    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },


    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },


    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
        "todo",
        "in_progress",
        "review",
        "completed",
      ],
      default: "todo",
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


    dueDate: {
      type: Date,
      default: null,
    },


    attachments: [
      {
        type: String,
      }
    ],


    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },

        message: {
          type: String,
          trim: true,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      }
    ],


  },

  {
    timestamps: true,
  }

);



const Task =
  models.Task ||
  mongoose.model(
    "Task",
    TaskSchema
  );


export default Task;
