import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    jobTitle: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: [
        "owner",
        "manager",
        "employee",
      ],
      default: "employee",
    },

    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },

    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },

    permissions: [
      {
        type: String,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


const User =
  models.User ||
  mongoose.model(
    "User",
    UserSchema
  );


export default User;
