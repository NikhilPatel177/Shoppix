import express from 'express';

declare global {
  namespace Express {
    interface Request {
      validatedData?: any;
      user?: any;
    }
  }
}
