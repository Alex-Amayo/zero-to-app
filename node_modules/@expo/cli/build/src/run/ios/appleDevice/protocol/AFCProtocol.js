/**
 * Copyright (c) 2021 Expo, Inc.
 * Copyright (c) 2018 Drifty Co.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AFC_OPS: ()=>AFC_OPS,
    AFC_STATUS: ()=>AFC_STATUS,
    AFC_FILE_OPEN_FLAGS: ()=>AFC_FILE_OPEN_FLAGS,
    AFC_MAGIC: ()=>AFC_MAGIC,
    AFC_HEADER_SIZE: ()=>AFC_HEADER_SIZE,
    AFCError: ()=>AFCError,
    AFCProtocolClient: ()=>AFCProtocolClient,
    AFCProtocolReader: ()=>AFCProtocolReader,
    AFCProtocolWriter: ()=>AFCProtocolWriter
});
function _debug() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("debug"));
    _debug = function() {
        return data;
    };
    return data;
}
const _abstractProtocol = require("./AbstractProtocol");
const _errors = require("../../../../utils/errors");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const debug = (0, _debug().default)("expo:apple-device:protocol:afc");
const AFC_MAGIC = "CFA6LPAA";
const AFC_HEADER_SIZE = 40;
var AFC_OPS;
(function(AFC_OPS) {
    AFC_OPS[AFC_OPS[/**
   * Invalid
   */ "INVALID"] = 0x00000000] = "INVALID";
    AFC_OPS[AFC_OPS[/**
   * Status
   */ "STATUS"] = 0x00000001] = "STATUS";
    AFC_OPS[AFC_OPS[/**
   * Data
   */ "DATA"] = 0x00000002] = "DATA";
    AFC_OPS[AFC_OPS[/**
   * ReadDir
   */ "READ_DIR"] = 0x00000003] = "READ_DIR";
    AFC_OPS[AFC_OPS[/**
   * ReadFile
   */ "READ_FILE"] = 0x00000004] = "READ_FILE";
    AFC_OPS[AFC_OPS[/**
   * WriteFile
   */ "WRITE_FILE"] = 0x00000005] = "WRITE_FILE";
    AFC_OPS[AFC_OPS[/**
   * WritePart
   */ "WRITE_PART"] = 0x00000006] = "WRITE_PART";
    AFC_OPS[AFC_OPS[/**
   * TruncateFile
   */ "TRUNCATE"] = 0x00000007] = "TRUNCATE";
    AFC_OPS[AFC_OPS[/**
   * RemovePath
   */ "REMOVE_PATH"] = 0x00000008] = "REMOVE_PATH";
    AFC_OPS[AFC_OPS[/**
   * MakeDir
   */ "MAKE_DIR"] = 0x00000009] = "MAKE_DIR";
    AFC_OPS[AFC_OPS[/**
   * GetFileInfo
   */ "GET_FILE_INFO"] = 0x0000000a] = "GET_FILE_INFO";
    AFC_OPS[AFC_OPS[/**
   * GetDeviceInfo
   */ "GET_DEVINFO"] = 0x0000000b] = "GET_DEVINFO";
    AFC_OPS[AFC_OPS[/**
   * WriteFileAtomic (tmp file+rename)
   */ "WRITE_FILE_ATOM"] = 0x0000000c] = "WRITE_FILE_ATOM";
    AFC_OPS[AFC_OPS[/**
   * FileRefOpen
   */ "FILE_OPEN"] = 0x0000000d] = "FILE_OPEN";
    AFC_OPS[AFC_OPS[/**
   * FileRefOpenResult
   */ "FILE_OPEN_RES"] = 0x0000000e] = "FILE_OPEN_RES";
    AFC_OPS[AFC_OPS[/**
   * FileRefRead
   */ "FILE_READ"] = 0x0000000f] = "FILE_READ";
    AFC_OPS[AFC_OPS[/**
   * FileRefWrite
   */ "FILE_WRITE"] = 0x00000010] = "FILE_WRITE";
    AFC_OPS[AFC_OPS[/**
   * FileRefSeek
   */ "FILE_SEEK"] = 0x00000011] = "FILE_SEEK";
    AFC_OPS[AFC_OPS[/**
   * FileRefTell
   */ "FILE_TELL"] = 0x00000012] = "FILE_TELL";
    AFC_OPS[AFC_OPS[/**
   * FileRefTellResult
   */ "FILE_TELL_RES"] = 0x00000013] = "FILE_TELL_RES";
    AFC_OPS[AFC_OPS[/**
   * FileRefClose
   */ "FILE_CLOSE"] = 0x00000014] = "FILE_CLOSE";
    AFC_OPS[AFC_OPS[/**
   * FileRefSetFileSize (ftruncate)
   */ "FILE_SET_SIZE"] = 0x00000015] = "FILE_SET_SIZE";
    AFC_OPS[AFC_OPS[/**
   * GetConnectionInfo
   */ "GET_CON_INFO"] = 0x00000016] = "GET_CON_INFO";
    AFC_OPS[AFC_OPS[/**
   * SetConnectionOptions
   */ "SET_CON_OPTIONS"] = 0x00000017] = "SET_CON_OPTIONS";
    AFC_OPS[AFC_OPS[/**
   * RenamePath
   */ "RENAME_PATH"] = 0x00000018] = "RENAME_PATH";
    AFC_OPS[AFC_OPS[/**
   * SetFSBlockSize (0x800000)
   */ "SET_FS_BS"] = 0x00000019] = "SET_FS_BS";
    AFC_OPS[AFC_OPS[/**
   * SetSocketBlockSize (0x800000)
   */ "SET_SOCKET_BS"] = 0x0000001a] = "SET_SOCKET_BS";
    AFC_OPS[AFC_OPS[/**
   * FileRefLock
   */ "FILE_LOCK"] = 0x0000001b] = "FILE_LOCK";
    AFC_OPS[AFC_OPS[/**
   * MakeLink
   */ "MAKE_LINK"] = 0x0000001c] = "MAKE_LINK";
    AFC_OPS[AFC_OPS[/**
   * GetFileHash
   */ "GET_FILE_HASH"] = 0x0000001d] = "GET_FILE_HASH";
    AFC_OPS[AFC_OPS[/**
   * SetModTime
   */ "SET_FILE_MOD_TIME"] = 0x0000001e] = "SET_FILE_MOD_TIME";
    AFC_OPS[AFC_OPS[/**
   * GetFileHashWithRange
   */ "GET_FILE_HASH_RANGE"] = 0x0000001f] = "GET_FILE_HASH_RANGE";
    AFC_OPS[AFC_OPS[// iOS 6+
    /**
   * FileRefSetImmutableHint
   */ "FILE_SET_IMMUTABLE_HINT"] = 0x00000020] = "FILE_SET_IMMUTABLE_HINT";
    AFC_OPS[AFC_OPS[/**
   * GetSizeOfPathContents
   */ "GET_SIZE_OF_PATH_CONTENTS"] = 0x00000021] = "GET_SIZE_OF_PATH_CONTENTS";
    AFC_OPS[AFC_OPS[/**
   * RemovePathAndContents
   */ "REMOVE_PATH_AND_CONTENTS"] = 0x00000022] = "REMOVE_PATH_AND_CONTENTS";
    AFC_OPS[AFC_OPS[/**
   * DirectoryEnumeratorRefOpen
   */ "DIR_OPEN"] = 0x00000023] = "DIR_OPEN";
    AFC_OPS[AFC_OPS[/**
   * DirectoryEnumeratorRefOpenResult
   */ "DIR_OPEN_RESULT"] = 0x00000024] = "DIR_OPEN_RESULT";
    AFC_OPS[AFC_OPS[/**
   * DirectoryEnumeratorRefRead
   */ "DIR_READ"] = 0x00000025] = "DIR_READ";
    AFC_OPS[AFC_OPS[/**
   * DirectoryEnumeratorRefClose
   */ "DIR_CLOSE"] = 0x00000026] = "DIR_CLOSE";
    AFC_OPS[AFC_OPS[// iOS 7+
    /**
   * FileRefReadWithOffset
   */ "FILE_READ_OFFSET"] = 0x00000027] = "FILE_READ_OFFSET";
    AFC_OPS[AFC_OPS[/**
   * FileRefWriteWithOffset
   */ "FILE_WRITE_OFFSET"] = 0x00000028] = "FILE_WRITE_OFFSET";
})(AFC_OPS || (AFC_OPS = {}));
var AFC_STATUS;
(function(AFC_STATUS) {
    AFC_STATUS[AFC_STATUS["SUCCESS"] = 0] = "SUCCESS";
    AFC_STATUS[AFC_STATUS["UNKNOWN_ERROR"] = 1] = "UNKNOWN_ERROR";
    AFC_STATUS[AFC_STATUS["OP_HEADER_INVALID"] = 2] = "OP_HEADER_INVALID";
    AFC_STATUS[AFC_STATUS["NO_RESOURCES"] = 3] = "NO_RESOURCES";
    AFC_STATUS[AFC_STATUS["READ_ERROR"] = 4] = "READ_ERROR";
    AFC_STATUS[AFC_STATUS["WRITE_ERROR"] = 5] = "WRITE_ERROR";
    AFC_STATUS[AFC_STATUS["UNKNOWN_PACKET_TYPE"] = 6] = "UNKNOWN_PACKET_TYPE";
    AFC_STATUS[AFC_STATUS["INVALID_ARG"] = 7] = "INVALID_ARG";
    AFC_STATUS[AFC_STATUS["OBJECT_NOT_FOUND"] = 8] = "OBJECT_NOT_FOUND";
    AFC_STATUS[AFC_STATUS["OBJECT_IS_DIR"] = 9] = "OBJECT_IS_DIR";
    AFC_STATUS[AFC_STATUS["PERM_DENIED"] = 10] = "PERM_DENIED";
    AFC_STATUS[AFC_STATUS["SERVICE_NOT_CONNECTED"] = 11] = "SERVICE_NOT_CONNECTED";
    AFC_STATUS[AFC_STATUS["OP_TIMEOUT"] = 12] = "OP_TIMEOUT";
    AFC_STATUS[AFC_STATUS["TOO_MUCH_DATA"] = 13] = "TOO_MUCH_DATA";
    AFC_STATUS[AFC_STATUS["END_OF_DATA"] = 14] = "END_OF_DATA";
    AFC_STATUS[AFC_STATUS["OP_NOT_SUPPORTED"] = 15] = "OP_NOT_SUPPORTED";
    AFC_STATUS[AFC_STATUS["OBJECT_EXISTS"] = 16] = "OBJECT_EXISTS";
    AFC_STATUS[AFC_STATUS["OBJECT_BUSY"] = 17] = "OBJECT_BUSY";
    AFC_STATUS[AFC_STATUS["NO_SPACE_LEFT"] = 18] = "NO_SPACE_LEFT";
    AFC_STATUS[AFC_STATUS["OP_WOULD_BLOCK"] = 19] = "OP_WOULD_BLOCK";
    AFC_STATUS[AFC_STATUS["IO_ERROR"] = 20] = "IO_ERROR";
    AFC_STATUS[AFC_STATUS["OP_INTERRUPTED"] = 21] = "OP_INTERRUPTED";
    AFC_STATUS[AFC_STATUS["OP_IN_PROGRESS"] = 22] = "OP_IN_PROGRESS";
    AFC_STATUS[AFC_STATUS["INTERNAL_ERROR"] = 23] = "INTERNAL_ERROR";
    AFC_STATUS[AFC_STATUS["MUX_ERROR"] = 30] = "MUX_ERROR";
    AFC_STATUS[AFC_STATUS["NO_MEM"] = 31] = "NO_MEM";
    AFC_STATUS[AFC_STATUS["NOT_ENOUGH_DATA"] = 32] = "NOT_ENOUGH_DATA";
    AFC_STATUS[AFC_STATUS["DIR_NOT_EMPTY"] = 33] = "DIR_NOT_EMPTY";
    AFC_STATUS[AFC_STATUS["FORCE_SIGNED_TYPE"] = -1] = "FORCE_SIGNED_TYPE";
})(AFC_STATUS || (AFC_STATUS = {}));
var AFC_FILE_OPEN_FLAGS;
(function(AFC_FILE_OPEN_FLAGS) {
    AFC_FILE_OPEN_FLAGS[AFC_FILE_OPEN_FLAGS[/**
   * r (O_RDONLY)
   */ "RDONLY"] = 0x00000001] = "RDONLY";
    AFC_FILE_OPEN_FLAGS[AFC_FILE_OPEN_FLAGS[/**
   * r+ (O_RDWR | O_CREAT)
   */ "RW"] = 0x00000002] = "RW";
    AFC_FILE_OPEN_FLAGS[AFC_FILE_OPEN_FLAGS[/**
   * w (O_WRONLY | O_CREAT | O_TRUNC)
   */ "WRONLY"] = 0x00000003] = "WRONLY";
    AFC_FILE_OPEN_FLAGS[AFC_FILE_OPEN_FLAGS[/**
   * w+ (O_RDWR | O_CREAT  | O_TRUNC)
   */ "WR"] = 0x00000004] = "WR";
    AFC_FILE_OPEN_FLAGS[AFC_FILE_OPEN_FLAGS[/**
   * a (O_WRONLY | O_APPEND | O_CREAT)
   */ "APPEND"] = 0x00000005] = "APPEND";
    AFC_FILE_OPEN_FLAGS[AFC_FILE_OPEN_FLAGS[/**
   * a+ (O_RDWR | O_APPEND | O_CREAT)
   */ "RDAPPEND"] = 0x00000006] = "RDAPPEND";
})(AFC_FILE_OPEN_FLAGS || (AFC_FILE_OPEN_FLAGS = {}));
function isAFCResponse(resp) {
    return AFC_OPS[resp.operation] !== undefined && resp.id !== undefined && resp.data !== undefined;
}
function isStatusResponse(resp) {
    return isAFCResponse(resp) && resp.operation === 0x00000001;
}
function isErrorStatusResponse(resp) {
    return isStatusResponse(resp) && resp.data !== 0;
}
class AFCInternalError extends Error {
    constructor(msg, requestId){
        super(msg);
        this.requestId = requestId;
    }
}
class AFCError extends Error {
    constructor(msg, status){
        super(msg);
        this.status = status;
    }
}
class AFCProtocolClient extends _abstractProtocol.ProtocolClient {
    requestId = 0;
    requestCallbacks = {};
    constructor(socket){
        super(socket, new _abstractProtocol.ProtocolReaderFactory(AFCProtocolReader), new AFCProtocolWriter());
        const reader = this.readerFactory.create((resp, err)=>{
            if (err && err instanceof AFCInternalError) {
                this.requestCallbacks[err.requestId](resp, err);
            } else if (isErrorStatusResponse(resp)) {
                this.requestCallbacks[resp.id](resp, new AFCError(AFC_STATUS[resp.data], resp.data));
            } else {
                this.requestCallbacks[resp.id](resp);
            }
        });
        socket.on("data", reader.onData);
    }
    sendMessage(msg) {
        return new Promise((resolve, reject)=>{
            const requestId = this.requestId++;
            this.requestCallbacks[requestId] = async (resp, err)=>{
                if (err) {
                    reject(err);
                    return;
                }
                if (isAFCResponse(resp)) {
                    resolve(resp);
                } else {
                    reject(new _errors.CommandError("APPLE_DEVICE_AFC", "Malformed AFC response"));
                }
            };
            this.writer.write(this.socket, {
                ...msg,
                requestId
            });
        });
    }
}
class AFCProtocolReader extends _abstractProtocol.ProtocolReader {
    constructor(callback){
        super(AFC_HEADER_SIZE, callback);
    }
    parseHeader(data) {
        const magic = data.slice(0, 8).toString("ascii");
        if (magic !== AFC_MAGIC) {
            throw new AFCInternalError(`Invalid AFC packet received (magic != ${AFC_MAGIC})`, data.readUInt32LE(24));
        }
        // technically these are uint64
        this.header = {
            magic,
            totalLength: data.readUInt32LE(8),
            headerLength: data.readUInt32LE(16),
            requestId: data.readUInt32LE(24),
            operation: data.readUInt32LE(32)
        };
        debug(`parse header: ${JSON.stringify(this.header)}`);
        if (this.header.headerLength < AFC_HEADER_SIZE) {
            throw new AFCInternalError("Invalid AFC header", this.header.requestId);
        }
        return this.header.totalLength - AFC_HEADER_SIZE;
    }
    parseBody(data) {
        const body = {
            operation: this.header.operation,
            id: this.header.requestId,
            data
        };
        if (isStatusResponse(body)) {
            const status = data.readUInt32LE(0);
            debug(`${AFC_OPS[this.header.operation]} response: ${AFC_STATUS[status]}`);
            body.data = status;
        } else if (data.length <= 8) {
            debug(`${AFC_OPS[this.header.operation]} response: ${Array.prototype.toString.call(body)}`);
        } else {
            debug(`${AFC_OPS[this.header.operation]} response length: ${data.length} bytes`);
        }
        return body;
    }
}
class AFCProtocolWriter {
    write(socket, msg) {
        const { data , payload , operation , requestId  } = msg;
        const dataLength = data ? data.length : 0;
        const payloadLength = payload ? payload.length : 0;
        const header = Buffer.alloc(AFC_HEADER_SIZE);
        const magic = Buffer.from(AFC_MAGIC);
        magic.copy(header);
        header.writeUInt32LE(AFC_HEADER_SIZE + dataLength + payloadLength, 8);
        header.writeUInt32LE(AFC_HEADER_SIZE + dataLength, 16);
        header.writeUInt32LE(requestId, 24);
        header.writeUInt32LE(operation, 32);
        socket.write(header);
        socket.write(data);
        if (data.length <= 8) {
            debug(`socket write, header: { requestId: ${requestId}, operation: ${AFC_OPS[operation]}}, body: ${Array.prototype.toString.call(data)}`);
        } else {
            debug(`socket write, header: { requestId: ${requestId}, operation: ${AFC_OPS[operation]}}, body: ${data.length} bytes`);
        }
        debug(`socket write, bytes written ${header.length} (header), ${data.length} (body)`);
        if (payload) {
            socket.write(payload);
        }
    }
}

//# sourceMappingURL=AFCProtocol.js.map