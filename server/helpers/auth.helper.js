import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPaasword = await bcrypt.hash(password, saltRounds);
    return hashedPaasword;
  } catch (error) {
    console.log(error);
  }
};

export const compairPassword = async (password, hashedPaasword) => {
  return bcrypt.compare(password, hashedPaasword);
};
