import { ISubmitContactData } from "../controllers/contact.controller.js";
import { Contact } from "../models/contact.model.js";
import { HandlerCustom } from "../utils/configs/custom.js";
import { EContactStatus } from "../utils/types/enum.js";

export const handleGetContacts = HandlerCustom(async () => {
    const contacts = await Contact
        .find()
        .sort({ createdAt: -1 })
        .exec();

    return contacts;
});

export const handleGetContactById = HandlerCustom(async (data: { id: string }) => {
    const contact = await Contact
        .find({ _id: data.id })
        .exec();

    return contact;
});

export const handleSubmitContact = HandlerCustom(async (data: ISubmitContactData) => {
    const contact = await new Contact(
        {
            name: data.name,
            email: data.email,
            phone: data.phone,
            program: data.program,
            message: data.message
        }
    ).save();

    return contact;
});

export const handleResolveContact = HandlerCustom(async (data: { id: string; userId: string }) => {
    const contact = await Contact
        .findByIdAndUpdate(
            data.id,
            {
                status: EContactStatus.RESOLVED,
                resolvedBy: data.userId,
                resolvedAt: new Date()
            },
            { new: true }
        )
        .exec();

    return contact;
});