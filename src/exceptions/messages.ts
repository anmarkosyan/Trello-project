const ExceptionMessages = {
  NOT_DEFINED: 'Data is not defined',
  UNAUTHORIZED: 'Not authorized',
  ALREADY_EXISTS: 'Already exists',
  NOT_FOUND: {
    USER: 'User not found',
    BOARD: 'Board not found',
    LIST: 'List not found',
    CARD: 'Card not found',
    UPDATE: 'Nothing to update',
    COMMENT: 'Comment not found ',
  },
  INVALID: {
    EMAIL: 'Email is not valid',
    PASSWORD: 'Password is not valid',
    NAME: 'Name is not valid',
    TOKEN: 'Token is not valid',
    TITLE: 'Title is not valid',
    LISTS: 'Not valid input for lists',
    TEXT: 'Not valid input for comment',
    INPUT: 'Not valid input',
    ID: 'Id is not valid',
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
