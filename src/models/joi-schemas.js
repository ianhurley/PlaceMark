import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };
  
  export const SpotSpec = {
    name: Joi.string().required(),
    categorey: Joi.string().required(),
    description: Joi.string().required(),
  };
  
  export const SwimlistSpec = {
    title: Joi.string().required(),
  };