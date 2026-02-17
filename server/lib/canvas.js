import CanvasLmsApi from "canvas-lms-api";
import { getPlatformUrl } from "./util.js";
import { canvas as cfg } from "../config.js";

class Canvas {
  constructor(res) {
    this.api = new CanvasLmsApi(getPlatformUrl(res), {
      accessToken: cfg.token,
    });
  }
}

export default Canvas;
