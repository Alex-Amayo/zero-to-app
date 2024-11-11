Object.defineProperty(exports, "__esModule", {
  value: !0
});

class GraphQLError extends Error {
  constructor(e, r, n, i, t, a, o) {
    super(e);
    this.name = "GraphQLError";
    this.message = e;
    if (t) {
      this.path = t;
    }
    if (r) {
      this.nodes = Array.isArray(r) ? r : [ r ];
    }
    if (n) {
      this.source = n;
    }
    if (i) {
      this.positions = i;
    }
    if (a) {
      this.originalError = a;
    }
    var l = o;
    if (!l && a) {
      var u = a.extensions;
      if (u && "object" == typeof u) {
        l = u;
      }
    }
    this.extensions = l || {};
  }
  toJSON() {
    return {
      ...this,
      message: this.message
    };
  }
  toString() {
    return this.message;
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
}

var e;

var r;

function error(e) {
  return new GraphQLError(`Syntax Error: Unexpected token at ${r} in ${e}`);
}

function advance(n) {
  n.lastIndex = r;
  if (n.test(e)) {
    return e.slice(r, r = n.lastIndex);
  }
}

var n = / +(?=[^\s])/y;

function blockString(e) {
  var r = e.split("\n");
  var i = "";
  var t = 0;
  var a = 0;
  var o = r.length - 1;
  for (var l = 0; l < r.length; l++) {
    n.lastIndex = 0;
    if (n.test(r[l])) {
      if (l && (!t || n.lastIndex < t)) {
        t = n.lastIndex;
      }
      a = a || l;
      o = l;
    }
  }
  for (var u = a; u <= o; u++) {
    if (u !== a) {
      i += "\n";
    }
    i += r[u].slice(t).replace(/\\"""/g, '"""');
  }
  return i;
}

function ignored() {
  for (var n = 0 | e.charCodeAt(r++); 9 === n || 10 === n || 13 === n || 32 === n || 35 === n || 44 === n || 65279 === n; n = 0 | e.charCodeAt(r++)) {
    if (35 === n) {
      while (10 !== (n = e.charCodeAt(r++)) && 13 !== n) {}
    }
  }
  r--;
}

var i = /[_A-Za-z]\w*/y;

var t = new RegExp("(?:(null|true|false)|\\$(" + i.source + ')|(-?\\d+)((?:\\.\\d+)?[eE][+-]?\\d+|\\.\\d+)?|("""(?:"""|(?:[\\s\\S]*?[^\\\\])"""))|("(?:"|[^\\r\\n]*?[^\\\\]"))|(' + i.source + "))", "y");

var a = function(e) {
  e[e.Const = 1] = "Const";
  e[e.Var = 2] = "Var";
  e[e.Int = 3] = "Int";
  e[e.Float = 4] = "Float";
  e[e.BlockString = 5] = "BlockString";
  e[e.String = 6] = "String";
  e[e.Enum = 7] = "Enum";
  return e;
}(a || {});

var o = /\\/;

function value(n) {
  var l;
  var u;
  t.lastIndex = r;
  if (91 === e.charCodeAt(r)) {
    r++;
    ignored();
    var d = [];
    while (93 !== e.charCodeAt(r)) {
      d.push(value(n));
    }
    r++;
    ignored();
    return {
      kind: "ListValue",
      values: d
    };
  } else if (123 === e.charCodeAt(r)) {
    r++;
    ignored();
    var s = [];
    while (125 !== e.charCodeAt(r)) {
      if (null == (l = advance(i))) {
        throw error("ObjectField");
      }
      ignored();
      if (58 !== e.charCodeAt(r++)) {
        throw error("ObjectField");
      }
      ignored();
      s.push({
        kind: "ObjectField",
        name: {
          kind: "Name",
          value: l
        },
        value: value(n)
      });
    }
    r++;
    ignored();
    return {
      kind: "ObjectValue",
      fields: s
    };
  } else if (null != (u = t.exec(e))) {
    r = t.lastIndex;
    ignored();
    if (null != (l = u[a.Const])) {
      return "null" === l ? {
        kind: "NullValue"
      } : {
        kind: "BooleanValue",
        value: "true" === l
      };
    } else if (null != (l = u[a.Var])) {
      if (n) {
        throw error("Variable");
      } else {
        return {
          kind: "Variable",
          name: {
            kind: "Name",
            value: l
          }
        };
      }
    } else if (null != (l = u[a.Int])) {
      var v;
      if (null != (v = u[a.Float])) {
        return {
          kind: "FloatValue",
          value: l + v
        };
      } else {
        return {
          kind: "IntValue",
          value: l
        };
      }
    } else if (null != (l = u[a.BlockString])) {
      return {
        kind: "StringValue",
        value: blockString(l.slice(3, -3)),
        block: !0
      };
    } else if (null != (l = u[a.String])) {
      return {
        kind: "StringValue",
        value: o.test(l) ? JSON.parse(l) : l.slice(1, -1),
        block: !1
      };
    } else if (null != (l = u[a.Enum])) {
      return {
        kind: "EnumValue",
        value: l
      };
    }
  }
  throw error("Value");
}

function arguments_(n) {
  if (40 === e.charCodeAt(r)) {
    var t = [];
    r++;
    ignored();
    var a;
    do {
      if (null == (a = advance(i))) {
        throw error("Argument");
      }
      ignored();
      if (58 !== e.charCodeAt(r++)) {
        throw error("Argument");
      }
      ignored();
      t.push({
        kind: "Argument",
        name: {
          kind: "Name",
          value: a
        },
        value: value(n)
      });
    } while (41 !== e.charCodeAt(r));
    r++;
    ignored();
    return t;
  }
}

function directives(n) {
  if (64 === e.charCodeAt(r)) {
    var t = [];
    var a;
    do {
      r++;
      if (null == (a = advance(i))) {
        throw error("Directive");
      }
      ignored();
      t.push({
        kind: "Directive",
        name: {
          kind: "Name",
          value: a
        },
        arguments: arguments_(n)
      });
    } while (64 === e.charCodeAt(r));
    return t;
  }
}

function type() {
  var n;
  var t = 0;
  while (91 === e.charCodeAt(r)) {
    t++;
    r++;
    ignored();
  }
  if (null == (n = advance(i))) {
    throw error("NamedType");
  }
  ignored();
  var a = {
    kind: "NamedType",
    name: {
      kind: "Name",
      value: n
    }
  };
  do {
    if (33 === e.charCodeAt(r)) {
      r++;
      ignored();
      a = {
        kind: "NonNullType",
        type: a
      };
    }
    if (t) {
      if (93 !== e.charCodeAt(r++)) {
        throw error("NamedType");
      }
      ignored();
      a = {
        kind: "ListType",
        type: a
      };
    }
  } while (t--);
  return a;
}

var l = new RegExp("(?:(\\.{3})|(" + i.source + "))", "y");

var u = function(e) {
  e[e.Spread = 1] = "Spread";
  e[e.Name = 2] = "Name";
  return e;
}(u || {});

function selectionSet() {
  var n = [];
  var t;
  var a;
  do {
    l.lastIndex = r;
    if (null != (a = l.exec(e))) {
      r = l.lastIndex;
      if (null != a[u.Spread]) {
        ignored();
        var o = advance(i);
        if (null != o && "on" !== o) {
          ignored();
          n.push({
            kind: "FragmentSpread",
            name: {
              kind: "Name",
              value: o
            },
            directives: directives(!1)
          });
        } else {
          ignored();
          if ("on" === o) {
            if (null == (o = advance(i))) {
              throw error("NamedType");
            }
            ignored();
          }
          var d = directives(!1);
          if (123 !== e.charCodeAt(r++)) {
            throw error("InlineFragment");
          }
          ignored();
          n.push({
            kind: "InlineFragment",
            typeCondition: o ? {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: o
              }
            } : void 0,
            directives: d,
            selectionSet: selectionSet()
          });
        }
      } else if (null != (t = a[u.Name])) {
        var s = void 0;
        ignored();
        if (58 === e.charCodeAt(r)) {
          r++;
          ignored();
          s = t;
          if (null == (t = advance(i))) {
            throw error("Field");
          }
          ignored();
        }
        var v = arguments_(!1);
        ignored();
        var c = directives(!1);
        var f = void 0;
        if (123 === e.charCodeAt(r)) {
          r++;
          ignored();
          f = selectionSet();
        }
        n.push({
          kind: "Field",
          alias: s ? {
            kind: "Name",
            value: s
          } : void 0,
          name: {
            kind: "Name",
            value: t
          },
          arguments: v,
          directives: c,
          selectionSet: f
        });
      }
    } else {
      throw error("SelectionSet");
    }
  } while (125 !== e.charCodeAt(r));
  r++;
  ignored();
  return {
    kind: "SelectionSet",
    selections: n
  };
}

function fragmentDefinition() {
  var n;
  var t;
  if (null == (n = advance(i))) {
    throw error("FragmentDefinition");
  }
  ignored();
  if ("on" !== advance(i)) {
    throw error("FragmentDefinition");
  }
  ignored();
  if (null == (t = advance(i))) {
    throw error("FragmentDefinition");
  }
  ignored();
  var a = directives(!1);
  if (123 !== e.charCodeAt(r++)) {
    throw error("FragmentDefinition");
  }
  ignored();
  return {
    kind: "FragmentDefinition",
    name: {
      kind: "Name",
      value: n
    },
    typeCondition: {
      kind: "NamedType",
      name: {
        kind: "Name",
        value: t
      }
    },
    directives: a,
    selectionSet: selectionSet()
  };
}

var d = /(?:query|mutation|subscription|fragment)/y;

function operationDefinition(n) {
  var t;
  var a;
  var o;
  if (n) {
    ignored();
    t = advance(i);
    a = function variableDefinitions() {
      ignored();
      if (40 === e.charCodeAt(r)) {
        var n = [];
        r++;
        ignored();
        var t;
        do {
          if (36 !== e.charCodeAt(r++)) {
            throw error("Variable");
          }
          if (null == (t = advance(i))) {
            throw error("Variable");
          }
          ignored();
          if (58 !== e.charCodeAt(r++)) {
            throw error("VariableDefinition");
          }
          ignored();
          var a = type();
          var o = void 0;
          if (61 === e.charCodeAt(r)) {
            r++;
            ignored();
            o = value(!0);
          }
          ignored();
          n.push({
            kind: "VariableDefinition",
            variable: {
              kind: "Variable",
              name: {
                kind: "Name",
                value: t
              }
            },
            type: a,
            defaultValue: o,
            directives: directives(!0)
          });
        } while (41 !== e.charCodeAt(r));
        r++;
        ignored();
        return n;
      }
    }();
    o = directives(!1);
  }
  if (123 === e.charCodeAt(r)) {
    r++;
    ignored();
    return {
      kind: "OperationDefinition",
      operation: n || "query",
      name: t ? {
        kind: "Name",
        value: t
      } : void 0,
      variableDefinitions: a,
      directives: o,
      selectionSet: selectionSet()
    };
  }
}

var s = {};

function mapJoin(e, r, n) {
  var i = "";
  for (var t = 0; t < e.length; t++) {
    if (t) {
      i += r;
    }
    i += n(e[t]);
  }
  return i;
}

function printString(e) {
  return JSON.stringify(e);
}

function printBlockString(e) {
  return '"""\n' + e.replace(/"""/g, '\\"""') + '\n"""';
}

var v = "\n";

var c = {
  OperationDefinition(e) {
    var r = e.operation;
    if (e.name) {
      r += " " + e.name.value;
    }
    if (e.variableDefinitions && e.variableDefinitions.length) {
      if (!e.name) {
        r += " ";
      }
      r += "(" + mapJoin(e.variableDefinitions, ", ", c.VariableDefinition) + ")";
    }
    if (e.directives && e.directives.length) {
      r += " " + mapJoin(e.directives, " ", c.Directive);
    }
    return "query" !== r ? r + " " + c.SelectionSet(e.selectionSet) : c.SelectionSet(e.selectionSet);
  },
  VariableDefinition(e) {
    var r = c.Variable(e.variable) + ": " + _print(e.type);
    if (e.defaultValue) {
      r += " = " + _print(e.defaultValue);
    }
    if (e.directives && e.directives.length) {
      r += " " + mapJoin(e.directives, " ", c.Directive);
    }
    return r;
  },
  Field(e) {
    var r = e.alias ? e.alias.value + ": " + e.name.value : e.name.value;
    if (e.arguments && e.arguments.length) {
      var n = mapJoin(e.arguments, ", ", c.Argument);
      if (r.length + n.length + 2 > 80) {
        r += "(" + (v += "  ") + mapJoin(e.arguments, v, c.Argument) + (v = v.slice(0, -2)) + ")";
      } else {
        r += "(" + n + ")";
      }
    }
    if (e.directives && e.directives.length) {
      r += " " + mapJoin(e.directives, " ", c.Directive);
    }
    if (e.selectionSet) {
      r += " " + c.SelectionSet(e.selectionSet);
    }
    return r;
  },
  StringValue(e) {
    if (e.block) {
      return printBlockString(e.value).replace(/\n/g, v);
    } else {
      return printString(e.value);
    }
  },
  BooleanValue: e => "" + e.value,
  NullValue: e => "null",
  IntValue: e => e.value,
  FloatValue: e => e.value,
  EnumValue: e => e.value,
  Name: e => e.value,
  Variable: e => "$" + e.name.value,
  ListValue: e => "[" + mapJoin(e.values, ", ", _print) + "]",
  ObjectValue: e => "{" + mapJoin(e.fields, ", ", c.ObjectField) + "}",
  ObjectField: e => e.name.value + ": " + _print(e.value),
  Document(e) {
    if (!e.definitions || !e.definitions.length) {
      return "";
    }
    return mapJoin(e.definitions, "\n\n", _print);
  },
  SelectionSet: e => "{" + (v += "  ") + mapJoin(e.selections, v, _print) + (v = v.slice(0, -2)) + "}",
  Argument: e => e.name.value + ": " + _print(e.value),
  FragmentSpread(e) {
    var r = "..." + e.name.value;
    if (e.directives && e.directives.length) {
      r += " " + mapJoin(e.directives, " ", c.Directive);
    }
    return r;
  },
  InlineFragment(e) {
    var r = "...";
    if (e.typeCondition) {
      r += " on " + e.typeCondition.name.value;
    }
    if (e.directives && e.directives.length) {
      r += " " + mapJoin(e.directives, " ", c.Directive);
    }
    return r += " " + c.SelectionSet(e.selectionSet);
  },
  FragmentDefinition(e) {
    var r = "fragment " + e.name.value;
    r += " on " + e.typeCondition.name.value;
    if (e.directives && e.directives.length) {
      r += " " + mapJoin(e.directives, " ", c.Directive);
    }
    return r + " " + c.SelectionSet(e.selectionSet);
  },
  Directive(e) {
    var r = "@" + e.name.value;
    if (e.arguments && e.arguments.length) {
      r += "(" + mapJoin(e.arguments, ", ", c.Argument) + ")";
    }
    return r;
  },
  NamedType: e => e.name.value,
  ListType: e => "[" + _print(e.type) + "]",
  NonNullType: e => _print(e.type) + "!"
};

var _print = e => c[e.kind](e);

function valueFromASTUntyped(e, r) {
  switch (e.kind) {
   case "NullValue":
    return null;

   case "IntValue":
    return parseInt(e.value, 10);

   case "FloatValue":
    return parseFloat(e.value);

   case "StringValue":
   case "EnumValue":
   case "BooleanValue":
    return e.value;

   case "ListValue":
    var n = [];
    for (var i = 0, t = e.values.length; i < t; i++) {
      n.push(valueFromASTUntyped(e.values[i], r));
    }
    return n;

   case "ObjectValue":
    var a = Object.create(null);
    for (var o = 0, l = e.fields.length; o < l; o++) {
      var u = e.fields[o];
      a[u.name.value] = valueFromASTUntyped(u.value, r);
    }
    return a;

   case "Variable":
    return r && r[e.name.value];
  }
}

exports.BREAK = s;

exports.GraphQLError = GraphQLError;

exports.Kind = {
  NAME: "Name",
  DOCUMENT: "Document",
  OPERATION_DEFINITION: "OperationDefinition",
  VARIABLE_DEFINITION: "VariableDefinition",
  SELECTION_SET: "SelectionSet",
  FIELD: "Field",
  ARGUMENT: "Argument",
  FRAGMENT_SPREAD: "FragmentSpread",
  INLINE_FRAGMENT: "InlineFragment",
  FRAGMENT_DEFINITION: "FragmentDefinition",
  VARIABLE: "Variable",
  INT: "IntValue",
  FLOAT: "FloatValue",
  STRING: "StringValue",
  BOOLEAN: "BooleanValue",
  NULL: "NullValue",
  ENUM: "EnumValue",
  LIST: "ListValue",
  OBJECT: "ObjectValue",
  OBJECT_FIELD: "ObjectField",
  DIRECTIVE: "Directive",
  NAMED_TYPE: "NamedType",
  LIST_TYPE: "ListType",
  NON_NULL_TYPE: "NonNullType"
};

exports.OperationTypeNode = {
  QUERY: "query",
  MUTATION: "mutation",
  SUBSCRIPTION: "subscription"
};

exports.Source = function Source(e, r, n) {
  return {
    body: e,
    name: r,
    locationOffset: n || {
      line: 1,
      column: 1
    }
  };
};

exports.isSelectionNode = function isSelectionNode(e) {
  return "Field" === e.kind || "FragmentSpread" === e.kind || "InlineFragment" === e.kind;
};

exports.parse = function parse(n, i) {
  r = 0;
  return function document(e, n) {
    var i;
    var t;
    ignored();
    var a = [];
    do {
      if ("fragment" === (i = advance(d))) {
        ignored();
        a.push(fragmentDefinition());
      } else if (null != (t = operationDefinition(i))) {
        a.push(t);
      } else {
        throw error("Document");
      }
    } while (r < e.length);
    if (!n) {
      var o;
      return {
        kind: "Document",
        definitions: a,
        set loc(e) {
          o = e;
        },
        get loc() {
          if (!o) {
            o = {
              start: 0,
              end: e.length,
              startToken: void 0,
              endToken: void 0,
              source: {
                body: e,
                name: "graphql.web",
                locationOffset: {
                  line: 1,
                  column: 1
                }
              }
            };
          }
          return o;
        }
      };
    }
    return {
      kind: "Document",
      definitions: a
    };
  }(e = "string" == typeof n.body ? n.body : n, i && i.noLocation);
};

exports.parseType = function parseType(n, i) {
  e = "string" == typeof n.body ? n.body : n;
  r = 0;
  return type();
};

exports.parseValue = function parseValue(n, i) {
  e = "string" == typeof n.body ? n.body : n;
  r = 0;
  ignored();
  return value(!1);
};

exports.print = function print(e) {
  v = "\n";
  return c[e.kind] ? c[e.kind](e) : "";
};

exports.printBlockString = printBlockString;

exports.printString = printString;

exports.valueFromASTUntyped = valueFromASTUntyped;

exports.valueFromTypeNode = function valueFromTypeNode(e, r, n) {
  if ("Variable" === e.kind) {
    return n ? valueFromTypeNode(n[e.name.value], r, n) : void 0;
  } else if ("NonNullType" === r.kind) {
    return "NullValue" !== e.kind ? valueFromTypeNode(e, r, n) : void 0;
  } else if ("NullValue" === e.kind) {
    return null;
  } else if ("ListType" === r.kind) {
    if ("ListValue" === e.kind) {
      var i = [];
      for (var t = 0, a = e.values.length; t < a; t++) {
        var o = valueFromTypeNode(e.values[t], r.type, n);
        if (void 0 === o) {
          return;
        } else {
          i.push(o);
        }
      }
      return i;
    }
  } else if ("NamedType" === r.kind) {
    switch (r.name.value) {
     case "Int":
     case "Float":
     case "String":
     case "Bool":
      return r.name.value + "Value" === e.kind ? valueFromASTUntyped(e, n) : void 0;

     default:
      return valueFromASTUntyped(e, n);
    }
  }
};

exports.visit = function visit(e, r) {
  var n = [];
  var i = [];
  try {
    var t = function traverse(e, t, a) {
      var o = !1;
      var l = r[e.kind] && r[e.kind].enter || r[e.kind] || r.enter;
      var u = l && l.call(r, e, t, a, i, n);
      if (!1 === u) {
        return e;
      } else if (null === u) {
        return null;
      } else if (u === s) {
        throw s;
      } else if (u && "string" == typeof u.kind) {
        o = u !== e;
        e = u;
      }
      if (a) {
        n.push(a);
      }
      var d;
      var v = {
        ...e
      };
      for (var c in e) {
        i.push(c);
        var f = e[c];
        if (Array.isArray(f)) {
          var p = [];
          for (var g = 0; g < f.length; g++) {
            if (null != f[g] && "string" == typeof f[g].kind) {
              n.push(e);
              i.push(g);
              d = traverse(f[g], g, f);
              i.pop();
              n.pop();
              if (null == d) {
                o = !0;
              } else {
                o = o || d !== f[g];
                p.push(d);
              }
            }
          }
          f = p;
        } else if (null != f && "string" == typeof f.kind) {
          if (void 0 !== (d = traverse(f, c, e))) {
            o = o || f !== d;
            f = d;
          }
        }
        i.pop();
        if (o) {
          v[c] = f;
        }
      }
      if (a) {
        n.pop();
      }
      var m = r[e.kind] && r[e.kind].leave || r.leave;
      var h = m && m.call(r, e, t, a, i, n);
      if (h === s) {
        throw s;
      } else if (void 0 !== h) {
        return h;
      } else if (void 0 !== u) {
        return o ? v : u;
      } else {
        return o ? v : e;
      }
    }(e);
    return void 0 !== t && !1 !== t ? t : e;
  } catch (r) {
    if (r !== s) {
      throw r;
    }
    return e;
  }
};
//# sourceMappingURL=graphql.web.js.map
