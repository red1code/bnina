export enum COLLECTIONS {
  PROFILES = 'profiles',
}

export enum STORAGE_KEYS {
  VERIFICATION_ID = 'verificationId',
}

export enum ERRORS {
  NOT_FOUND_IN_STORAGE = 'Item was not found in local storage',
  NULL_CREDENTIAL = 'User Credential is null',
  FIREBASE_USER_NULL = 'Firebase user is null',
  NO_FORM_VALUES = 'No form values!'
}

export enum AUTH_MESSAGES {
  NEW_USER = 'New User',
  ALREADY_EXIST = 'Already Exist',
}
