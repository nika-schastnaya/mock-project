import { Config } from "@framework/configuration/configuration_helper";
import path from "path";

export class PathHelper {
  resolveUploadPath() {
    const projectRoot = path.resolve(__dirname, "../../");
    return projectRoot + Config.UPLOAD_FOLDER;
  }
}
