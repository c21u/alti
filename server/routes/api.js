import express from "express";
import { readFile } from "fs/promises";

const router = express.Router();
import Canvas from "../lib/canvas.js";
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
    await readFile(resolve(__dirname, "..", "..", "package.json")),
  ).version;
  return `${packageVersion}${
    process.env.APP_VERSION ? `__${process.env.APP_VERSION}` : ""
  }`;
};

router.get("/context", async (req, res) => {
  res.send({
    context: createContext(res),
    data: { version: await getVersion() },
  });
});

router.get("/canvas-status", (req, res) => {
  const canvas = canvasStatusHandler(new Canvas(res));
  canvas(req).then((response) => res.send(response));
});

export default router;
