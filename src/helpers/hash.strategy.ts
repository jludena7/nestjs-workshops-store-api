import * as bcrypt from 'bcryptjs';

const saltOrRounds = 10;

const createHash = async (plainValue: string): Promise<string> => {
  return await bcrypt.hash(plainValue, saltOrRounds);
};

const compareHash = async (plainValue, hashValue): Promise<any> => {
  return await bcrypt.compare(plainValue, hashValue);
};

export { createHash, compareHash };
