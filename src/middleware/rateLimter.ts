import { NextFunction, Request, Response } from "express";
import { IRateLimiterOptions, RateLimiterMemory } from "rate-limiter-flexible";

const maxRequestLimit = 10;
const maxWindow = 1 * 60;
const Message = "Too many requests";

const options: IRateLimiterOptions = {
  duration: maxWindow,
  points: maxRequestLimit,
};

const rateLimiter = new RateLimiterMemory(options);
export const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  rateLimiter
    .consume(req.ip)
    .then((rateLimiterRes) => {
      res.setHeader("Retry-After", rateLimiterRes.msBeforeNext / 1000);
      res.setHeader("X-RateLimit-Limit", maxRequestLimit);
      res.setHeader("X-RateLimit-Remaining", rateLimiterRes.remainingPoints);
      res.setHeader(
        "X-RateLimit-Reset",
        new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString()
      );
      next();
    })
    .catch(() => {
      res.status(429).json({ message: Message });
    });
};
