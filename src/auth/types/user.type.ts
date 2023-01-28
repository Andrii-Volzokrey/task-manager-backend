import { UserEntity } from 'src/user/user.entity';
type UserType = Omit<UserEntity, 'password' | 'boards'>;
export default UserType;
