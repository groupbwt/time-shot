import UserCreateValidator from '../../validations/user/user-create.validation';
import UserUpdateValidator from '../../validations/user/user-update.validation';
import canModifyUser from '../../permissions/user.permission';
import getHashPassword from 'common/utils/get-hashed-password';


const editBeforeUser = async (request, context) => {
  if (request.payload.password) {
      UserCreateValidator.validatePassword(request.payload.password, request.payload.duplicatePassword);
      request.payload = {
          ...request.payload,
          hashedPassword: await getHashPassword(request.payload.password)
      }
  }
  if (request.payload.role) {
      UserUpdateValidator.validateRole(context.currentAdmin.role, request.payload.id, context.currentAdmin.id);
  }
  return request;
};

export default editBeforeUser;
