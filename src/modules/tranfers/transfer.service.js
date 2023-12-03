import Transfer from './transfer.model.js';

export class TransfreService {
  static async createRecordTransfer(amount, senderUserId, receiverUserId) {
    return await Transfer.create({
      amount,
      senderUserId,
      receiverUserId,
    });
  }
}
