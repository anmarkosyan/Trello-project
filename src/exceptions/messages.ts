const ExceptionMessages = {
  NOT_DEFINED: 'Data is not defined',
  UNAUTHORIZED: 'Not authorized',
  ALREADY_EXISTS: 'Already exists',
  NOT_FOUND: {
    USER: 'User not found',
    BOARD: 'Board not found',
    LIST: 'List not found',
    CARD: 'Card not found',
    UPDATE: 'nothing to update',
    COMMENT: 'comment not found ',
  },
  INVALID: {
    EMAIL: 'Email is not valid',
    PASSWORD: 'Password is not valid',
    NAME: 'Name is not valid',
    TOKEN: 'Token is not valid',
    TITLE: 'Title is not valid',
    LISTS: 'not valid input for lists',
    TEXT: 'not valid input for comment',
  },
  INCORRECT: {
    PASSWORD: 'Password is not correct',
  },
  INTERNAL: 'Internal Server Error',
  BLOCKED_USER: 'User is blocked',
  DELETED_USER: 'User is deleted',
  DB_ERROR: 'Database error',
};
export default ExceptionMessages;
