import mongoose, { Schema, models } from "mongoose";


const InvoiceSchema = new Schema(

  {

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },


    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },


    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },


    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },


    items: [
      {

        title: {
          type: String,
          required: true,
        },


        description: {
          type: String,
          default: "",
        },


        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },


        price: {
          type: Number,
          default: 0,
          min: 0,
        },


      }
    ],


    subtotal: {
      type: Number,
      default: 0,
    },


    tax: {
      type: Number,
      default: 0,
    },


    total: {
      type: Number,
      default: 0,
    },


    status: {
      type: String,
      enum: [
        "draft",
        "sent",
        "paid",
        "overdue",
        "cancelled",
      ],
      default: "draft",
    },


    dueDate: {
      type: Date,
      default: null,
    },


    paidAt: {
      type: Date,
      default: null,
    },


    notes: {
      type: String,
      default: "",
    },


  },

  {
    timestamps: true,
  }

);



const Invoice =
  models.Invoice ||
  mongoose.model(
    "Invoice",
    InvoiceSchema
  );


export default Invoice;
