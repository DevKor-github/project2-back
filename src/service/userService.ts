import dataSource from '../config/dataSource';
import { User } from '../entity/user';

const userRepository = dataSource.getRepository(User);

export const register = async (username: string, password: string) => {
  const user = await userRepository.findOne({ where: { username } });
  if (user) throw new Error('invalid username');

  const newUser = userRepository.create({
    username,
    password,
  });
  await userRepository.save(newUser);
};

export const validateUser = async (username: string, password: string) => {
  const user = await userRepository.findOne({
    where: { username, password },
  });
  if (!user) throw new Error('invalid');
  return user.id;
};
