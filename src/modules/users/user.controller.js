import { UserService } from './user.service.js';

export const signup = async (req, res) => {
  try {
    const { name, password } = req.body;

    const accountNumber = Math.floor(Math.random() * 900000) + 100000;

    const user = await UserService.create({ name, password, accountNumber });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'internal server error',
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;
    const user = await UserService.login({ accountNumber, password });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'accountNumber or password is not valid',
      });
    }

    return res.status(200).json({
      message: 'are you logged',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'internal server error',
      error,
    });
  }
};

export const getHistory = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'internal server error',
      error,
    });
  }
};
