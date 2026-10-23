import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
) => {
  console.error("Unhandled error:", error);

  if (error instanceof SyntaxError) {
    return res.status(400).json({
      message: "Virheellinen JSON-data",
    });
  }

  return res.status(500).json({
    message: "Palvelimella tapahtui odottamaton virhe",
  });
};