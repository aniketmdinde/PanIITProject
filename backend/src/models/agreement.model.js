import mongoose from "mongoose";

const agreementSchema = new mongoose.Schema(
    {
        agreements: [
            {
                type: String, //cloudinary_url
                required: true
            }
        ],
        latest_agreement: {
            type: String, //cloudinary_url
            required: true
        },
        type: {
            type: String,
            enum: ["saas", "end_user_license", "data_protection", "cloud_service", "it_support"],
            required: true
        },
        agreement_company: {
            type: String,
            required: true
        },
        company_mails: [
            {
                type: String,
                required: true
            }
        ],
        organisation_mails: [
            {
                type: String,
                required: true
            }
        ],
        fields: {
            type: Object,
            default: {},
            validate: {
                validator: function (v) {
                    return typeof v === "object";
                },
            }
        }
    }, 
    {
        timestamps: true
    }
);

export const Agreement = mongoose.model("Agreement", agreementSchema)