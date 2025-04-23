"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async findById(id) {
        return this.model.findById(id);
    }
    async findAll() {
        return this.model.find();
    }
    async create(data) {
        const doc = new this.model(data);
        await doc.save();
        return doc;
    }
    async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        const result = await this.model.findByIdAndDelete(id);
        return result != null;
    }
}
exports.BaseRepository = BaseRepository;
