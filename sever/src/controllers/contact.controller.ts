import { handleGetContactById, handleGetContacts, handleSubmitContact, handleResolveContact, handleDeleteContact } from "../repositories/contact.repository.js";
import { RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";

export const getAllContacts = RequestHandlerCustom(
  async (req, res) => {
    const contacts = await handleGetContacts();

    res.status(200).json({
      success: true,
      message: "Lấy tất cả liên hệ thành công",
      contacts: contacts
    });
  }
);

export const getContact = RequestHandlerCustom(
  async (req, res) => {
    const id = req.params.id;

    const contact = await handleGetContactById({ id });

    res.status(200).json({
      success: true,
      message: "Lấy liên hệ thành công",
      contact: contact
    });
  }
);

export interface ISubmitContactData {
  name: string,
  email: string,
  program: string,
  phone: string,
  message: string
};

export const submitContact = RequestHandlerCustom(
  async (req, res) => {
    const data: ISubmitContactData = parseRequestData(req);
    const contact = await handleSubmitContact(data);

    res.status(201).json({
      success: true,
      message: "Đã tạo liên hệ mới",
      contact: contact
    });
  }
);

export const resolveContact = RequestHandlerCustom(
  async (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;

    const contact = await handleResolveContact({ id, userId });

    res.status(200).json({
      success: true,
      message: "Giải quyết liên hệ thành công",
      contact: contact
    });
  }
);

export const deleteContact = RequestHandlerCustom(
  async (req, res) => {
    const id = req.params.id;

    const result = await handleDeleteContact({ id });

    res.status(200).json({
      success: true,
      message: result.message
    });
  }
);