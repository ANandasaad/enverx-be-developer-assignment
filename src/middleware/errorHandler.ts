export const notFound = (
  req: { originalUrl: any },
  res: { status: (arg0: number) => void },
  next: (arg0: Error) => void
) => {
  const error = new Error(`Not Found :${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: { message: any; stack: any },
  req: any,
  res: {
    statusCode: number;
    status: (arg0: any) => void;
    json: (arg0: { message: any; stack: any }) => void;
  },
  next: any
) => {
  const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statuscode);
  res.json({
    message: err?.message,
    stack: err?.stack,
  });
};
