import catchAsync  from "../middlewares/catchAync.js";
import ErrorHandler from "./errorHandler.js";
import User from "../models/user.js";

export const register = catchAsync(async (req, res, next) => {
  const { fullname, email, phone, course } = req.body;

  if (!fullname || !email || !phone || !course) {
    return next(
      new ErrorHandler(
        400,
        'Missing registration params. "fullname, email, phone and course is required"'
      )
    );
  }

  const user = await User.create({
    fullname,
    email,
    phone,
    course,
  });

  res.status(200).json({
    status: "Successful",
    message: "Registration Completed!",
  });
});

export const getAllEnrollee = catchAsync(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    status: "Successful",
    user,
  });
});
