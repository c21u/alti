import express from "express";
import { readFile } from "fs/promises";
// eslint-disable-next-line new-cap
const router = express.Router();
import Data from "../lib/dataLayer.js";
import canvasStatusHandler from "./canvasStatusHandler.js";
import { createContext } from "../lib/util.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * @return {string}
 */
const getVersion = async () => {
  const packageVersion = JSON.parse(
    await readFile(resolve(__dirname, "..", "..", "package.json"))
  ).version;
  return `${packageVersion}${
    process.env.APP_VERSION ? `__${process.env.APP_VERSION}` : ""
  }`;
};

router.get("/context", async (req, res, next) => {
  res.send({
    context: createContext(req, res),
    data: { version: await getVersion() },
  });
});

const canvas = canvasStatusHandler(Data);
router.get("/canvas-status", (req, res, next) => {
  canvas(req).then((response) => res.send(response));
});

export default router;
