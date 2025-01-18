import { Agreement } from "../models/agreement.model.js";
import {ApiError} from '.././utils/ApiError.js'
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createAgreement = async (req, res) => {
    try {
        const { type, agreement_company, company_mails, organisation_mails } = req.body;
        const file = req.files?.agreement?.[0]; // Access the file here

        if (!file) {
            throw new ApiError(400, "Agreement PDF is required");
        }

        if (file.mimetype !== "application/pdf") {
            throw new ApiError(400, "Invalid file type. Only PDF files are allowed.");
        }

        if (
            [type, agreement_company].some((field) => field?.trim() === "") || 
            [company_mails, organisation_mails].some(
                (field) => field?.trim() === ""
            )
        ) {
            throw new ApiError(400, "All fields are required");
        }

        // Upload file to Cloudinary
        const agreementLocalPath = file.path;
        const agreementUploadResponse = await uploadOnCloudinary(agreementLocalPath);
        

        // Create agreement document in MongoDB
        const created_agreement = await Agreement.create({
            agreements: [agreementUploadResponse.url],
            latest_agreement: agreementUploadResponse.url,
            type,
            agreement_company,
            company_mails: JSON.parse(company_mails),
            organisation_mails: JSON.parse(organisation_mails)
        });

        return res.status(201).json(
            new ApiResponse(200, created_agreement, "Agreement created successfully!")
        );
    } catch (error) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }
};


export const getAllAgreements = async (req, res) => {
    try {
        const agreements = await Agreement.find({});
        return res.status(200).json(
            new ApiResponse(200, agreements, "Agreement found!")
        )
    } catch (error) {
        console.log(`Error while fetching categories :: ${error}`);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const getAgreement = async (req, res) => {
    try {
        const {id} = req.body;

        if(!id) {
            throw new ApiError(400, "Invalid id");
        }

        const agreement = await Agreement.findById({_id:id})

        return res.status(200).json(
            new ApiResponse(200, agreement, "Agreement found!")
        );

    } catch (error) {
        console.log(`Error while fetching agreement :: ${error}`);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

export const updateAgreement = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.files?.agreement?.[0]; // Access the file here

        if (!file) {
            throw new ApiError(400, "Agreement PDF is required");
        }

        if (file.mimetype !== "application/pdf") {
            throw new ApiError(400, "Invalid file type. Only PDF files are allowed.");
        }

        if (!id) {
            throw new ApiError(400, "Invalid id");
        }

        const agreement = await Agreement.findById({_id:id});
        console.log(agreement);
        

        // Upload file to Cloudinary
        const agreementLocalPath = file.path;
        const agreementUploadResponse = await uploadOnCloudinary(agreementLocalPath);
        
        agreement.agreements.push(agreementUploadResponse.url);
        agreement.latest_agreement = agreementUploadResponse.url;

        const updatedAgreement = await agreement.save();

        return res.status(200).json(
            new ApiResponse(200, updatedAgreement, "Agreement updated successfully!")
        );

    } catch (error) {
        console.error(`Error while updating agreement :: ${error.message}`);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
}