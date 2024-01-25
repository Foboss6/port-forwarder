import { resolve } from "path";
import { coloredText } from "./colored-text";
import { ColorsType } from "./colors.type";
import { getFormattedTimestamp } from "./timestamp.util";

export class Logger {
  isDebug: boolean;
  context: string;

  constructor(context?: string, isDebug?: boolean) {
    this.isDebug = isDebug ?? false;
    this.context = context ?? "";
  }

  private logToConsole(message: string, context?: string, color: ColorsType = "white") {
    console.log(coloredText(`${getFormattedTimestamp()} [${context ?? this.context}] ${message}`, color));
  }

  log(message: string, context?: string, color: ColorsType = "white") {
    this.logToConsole(message, context, color);
  }

  info(message: string, context?: string, color: ColorsType = "white") {
    this.logToConsole(message, context, color);
  }

  success(message: string, context?: string) {
    this.logToConsole(message, context);
  }

  warn(message: string, context?: string) {
    this.logToConsole(message, context, "yellow");
  }

  error(message: string, context?: string) {
    this.logToConsole(message, context, "red");
  }

  debug(message: string, context?: string) {
    if (this.isDebug) {
      this.logToConsole(message, context, "blue");
    }
  }
}
