import { UserService } from '../users/user.service.js';
import { TransfreService } from './transfer.service.js';

export const makeTransfer = async (req, res) => {
  try {
    const { amount, recipientAccountNumber, senderAccountNumber } = req.body;

    const recipientUserPromise = await UserService.findOneAccount(
      recipientAccountNumber
    );
    const senderUserPromise = await UserService.findOneAccount(
      senderAccountNumber
    );

    const [recipientUser, senderUser] = await Promise.all([
      recipientUserPromise,
      senderUserPromise,
    ]);

    if (!recipientUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Recipient account does not exist',
      });
    }

    if (!senderUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Sender account does not exist',
      });
    }

    if (amount > senderUser.amount) {
      return res.status(400).json({
        status: 'error',
        message: 'insufficient balance',
      });
    }

    const newRecipientBalance = amount + recipientUser.amount;
    const newSenderBlance = senderUser.amount - amount;

    const updateRecipientUserPromise = UserService.updateAmount(
      recipientUser,
      newRecipientBalance
    );
    const updateSenderUserPromise = UserService.updateAmount(
      senderUser,
      newSenderBlance
    );
    const transferPromise = TransfreService.createRecordTransfer(
      amount,
      senderUser.id,
      recipientUser.id
    );

    await Promise.all([
      updateRecipientUserPromise,
      updateSenderUserPromise,
      transferPromise,
    ]);

    return res.status(201).json({
      message: 'transfer ok!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
