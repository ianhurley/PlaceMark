import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").regex(/^[A-Z][a-z]{2,}$/), 
  lastName: Joi.string().example("Simpson").regex(/^[A-Z][A-Za-z'-]{2,}$/), 
  mobile: Joi.string().example("0861234567").regex(/^08[0-9]{8}$/), 
  postcode: Joi.string().example("D16WE22").regex(/^[a-zA-Z0-9]{7}$/), 
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const SpotSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Bull Wall"),
    county: Joi.string().required().example("Dublin"),
    latitude: Joi.number().required().example(53.354531),
    longitude: Joi.number().required().example(-6.169717),
    categorey: Joi.string().required().example("The Sea"),
    swimlistid: IdSpec,
  })
  .label("Spot");

export const SpotSpecPlus = SpotSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("SpotPlus");

export const SpotArraySpec = Joi.array().items(SpotSpecPlus).label("SpotArray");
  
export const SwimlistSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Leinster"),
    userid: IdSpec,
    spots: SpotArraySpec,
  })
  .label("Swimlist");

export const SwimlistSpecPlus = SwimlistSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("SwimlistPlus");

export const SwimlistArraySpec = Joi.array().items(SwimlistSpecPlus).label("SwimlistArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");