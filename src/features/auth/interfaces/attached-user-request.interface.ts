import { ISharedFieldsUser } from 'src/common/interfaces/shared-fields-user.interface';

export interface AttachedUserRequest extends Request {
  user: ISharedFieldsUser;
}
