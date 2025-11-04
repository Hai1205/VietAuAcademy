import { handleCreateUser, handleGetUserByEmail } from "../repositories/user.repository.js";
import { ROOT_EMAIL, ROOT_PASSWORD } from "../utils/configs/constants.js";
import { HandlerCustom } from "../utils/configs/custom.js";

export const createRootUser = HandlerCustom(async () => {
    console.log("Kiểm tra và khởi tạo root user...");
    
    const existingUser = await handleGetUserByEmail({ email: ROOT_EMAIL });
    
    if (existingUser) {
        console.log("Root user đã được tạo, dừng tiến trình...");
        return;
    }

    // Nếu chưa tồn tại, tạo mới với quyền admin
    console.log("Root user chưa tồn tại, đang tạo mới...");

    await handleCreateUser({ email: ROOT_EMAIL, password: ROOT_PASSWORD });
    
    console.log("Đã tạo root user thành công!");
});