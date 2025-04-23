"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const baseRepository_1 = require("./baseRepository");
class UserRepository extends baseRepository_1.BaseRepository {
    constructor(userModel) { super(userModel); }
    async findByEmail(email) {
        try {
            const user = await this.model.findOne({ email });
            return user;
        }
        catch (error) {
            console.error("Error finding user by email!");
            throw error;
        }
    }
}
exports.UserRepository = UserRepository;
