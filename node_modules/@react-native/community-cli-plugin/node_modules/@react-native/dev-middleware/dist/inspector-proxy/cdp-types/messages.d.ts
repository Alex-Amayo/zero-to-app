/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 * @format
 * @oncall react_native
 */

import type { Commands, Events } from "./protocol";
export type CDPEvent<TEvent extends keyof Events = "unknown"> = Readonly<{
  method: TEvent;
  params: Events[TEvent];
}>;
export type CDPRequest<TCommand extends keyof Commands = "unknown"> = Readonly<{
  method: TCommand;
  params: Commands[TCommand]["paramsType"];
  id: number;
}>;
export type CDPResponse<TCommand extends keyof Commands = "unknown"> =
  | Readonly<{ result: Commands[TCommand]["resultType"]; id: number }>
  | Readonly<{ error: CDPRequestError; id: number }>;
export type CDPRequestError = Readonly<{
  code: number;
  message: string;
  data?: unknown;
}>;
export type CDPClientMessage =
  | CDPRequest<"Debugger.getScriptSource">
  | CDPRequest<"Debugger.scriptParsed">
  | CDPRequest<"Debugger.setBreakpointByUrl">
  | CDPRequest<>;
export type CDPServerMessage =
  | CDPEvent<"Debugger.scriptParsed">
  | CDPEvent<>
  | CDPResponse<"Debugger.getScriptSource">
  | CDPResponse<>;
