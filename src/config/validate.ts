import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validate = (schema: any) => {
  return (req: any, res: Response, next: NextFunction) => {
    const validations = ["body", "params", "query"].map(
      (value: string, idx: number) => {
        if (schema[value]) {
          const joiValidations = Joi.compile(schema[value]!)
            .prefs({
              abortEarly: true,
              errors: { label: "key" },
            })
            .validate(req[value] || {});
          if (joiValidations.error) {
            return joiValidations.error;
          }
          return null;
        } else return null;
      }
    );
    const errors = validations.filter(Boolean);
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors });
    } else next();
  };
};

export default validate;
