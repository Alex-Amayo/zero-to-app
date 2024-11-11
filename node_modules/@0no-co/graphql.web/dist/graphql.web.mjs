var e = {
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

var r = {
  QUERY: "query",
  MUTATION: "mutation",
  SUBSCRIPTION: "subscription"
};

class GraphQLError extends Error {
  constructor(e, r, n, i, t, a, l) {
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
    var o = l;
    if (!o && a) {
      var u = a.extensions;
      if (u && "object" == typeof u) {
        o = u;
      }
    }
    this.extensions = o || {};
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

var n;

var i;

function error(e) {
  return new GraphQLError(`Syntax Error: Unexpected token at ${i} in ${e}`);
}

function advance(e) {
  e.lastIndex = i;
  if (e.test(n)) {
    return n.slice(i, i = e.lastIndex);
  }
}

var t = / +(?=[^\s])/y;

function blockString(e) {
  var r = e.split("\n");
  var n = "";
  var i = 0;
  var a = 0;
  var l = r.length - 1;
  for (var o = 0; o < r.length; o++) {
    t.lastIndex = 0;
    if (t.test(r[o])) {
      if (o && (!i || t.lastIndex < i)) {
        i = t.lastIndex;
      }
      a = a || o;
      l = o;
    }
  }
  for (var u = a; u <= l; u++) {
    if (u !== a) {
      n += "\n";
    }
    n += r[u].slice(i).replace(/\\"""/g, '"""');
  }
  return n;
}

function ignored() {
  for (var e = 0 | n.charCodeAt(i++); 9 === e || 10 === e || 13 === e || 32 === e || 35 === e || 44 === e || 65279 === e; e = 0 | n.charCodeAt(i++)) {
    if (35 === e) {
      while (10 !== (e = n.charCodeAt(i++)) && 13 !== e) {}
    }
  }
  i--;
}

var a = /[_A-Za-z]\w*/y;

var l = new RegExp("(?:(null|true|false)|\\$(" + a.source + ')|(-?\\d+)((?:\\.\\d+)?[eE][+-]?\\d+|\\.\\d+)?|("""(?:"""|(?:[\\s\\S]*?[^\\\\])"""))|("(?:"|[^\\r\\n]*?[^\\\\]"))|(' + a.source + "))", "y");

var o = function(e) {
  e[e.Const = 1] = "Const";
  e[e.Var = 2] = "Var";
  e[e.Int = 3] = "Int";
  e[e.Float = 4] = "Float";
  e[e.BlockString = 5] = "BlockString";
  e[e.String = 6] = "String";
  e[e.Enum = 7] = "Enum";
  return e;
}(o || {});

var u = /\\/;

function value(e) {
  var r;
  var t;
  l.lastIndex = i;
  if (91 === n.charCodeAt(i)) {
    i++;
    ignored();
    var d = [];
    while (93 !== n.charCodeAt(i)) {
      d.push(value(e));
    }
    i++;
    ignored();
    return {
      kind: "ListValue",
      values: d
    };
  } else if (123 === n.charCodeAt(i)) {
    i++;
    ignored();
    var v = [];
    while (125 !== n.charCodeAt(i)) {
      if (null == (r = advance(a))) {
        throw error("ObjectField");
      }
      ignored();
      if (58 !== n.charCodeAt(i++)) {
        throw error("ObjectField");
      }
      ignored();
      v.push({
        kind: "ObjectField",
        name: {
          kind: "Name",
          value: r
        },
        value: value(e)
      });
    }
    i++;
    ignored();
    return {
      kind: "ObjectValue",
      fields: v
    };
  } else if (null != (t = l.exec(n))) {
    i = l.lastIndex;
    ignored();
    if (null != (r = t[o.Const])) {
      return "null" === r ? {
        kind: "NullValue"
      } : {
        kind: "BooleanValue",
        value: "true" === r
      };
    } else if (null != (r = t[o.Var])) {
      if (e) {
        throw error("Variable");
      } else {
        return {
          kind: "Variable",
          name: {
            kind: "Name",
            value: r
          }
        };
      }
    } else if (null != (r = t[o.Int])) {
      var s;
      if (null != (s = t[o.Float])) {
        return {
          kind: "FloatValue",
          value: r + s
        };
      } else {
        return {
          kind: "IntValue",
          value: r
        };
      }
    } else if (null != (r = t[o.BlockString])) {
      return {
        kind: "StringValue",
        value: blockString(r.slice(3, -3)),
        block: !0
      };
    } else if (null != (r = t[o.String])) {
      return {
        kind: "StringValue",
        value: u.test(r) ? JSON.parse(r) : r.slice(1, -1),
        block: !1
      };
    } else if (null != (r = t[o.Enum])) {
      return {
        kind: "EnumValue",
        value: r
      };
    }
  }
  throw error("Value");
}

function arguments_(e) {
  if (40 === n.charCodeAt(i)) {
    var r = [];
    i++;
    ignored();
    var t;
    do {
      if (null == (t = advance(a))) {
        throw error("Argument");
      }
      ignored();
      if (58 !== n.charCodeAt(i++)) {
        throw error("Argument");
      }
      ignored();
      r.push({
        kind: "Argument",
        name: {
          kind: "Name",
          value: t
        },
        value: value(e)
      });
    } while (41 !== n.charCodeAt(i));
    i++;
    ignored();
    return r;
  }
}

function directives(e) {
  if (64 === n.charCodeAt(i)) {
    var r = [];
    var t;
    do {
      i++;
      if (null == (t = advance(a))) {
        throw error("Directive");
      }
      ignored();
      r.push({
        kind: "Directive",
        name: {
          kind: "Name",
          value: t
        },
        arguments: arguments_(e)
      });
    } while (64 === n.charCodeAt(i));
    return r;
  }
}

function type() {
  var e;
  var r = 0;
  while (91 === n.charCodeAt(i)) {
    r++;
    i++;
    ignored();
  }
  if (null == (e = advance(a))) {
    throw error("NamedType");
  }
  ignored();
  var t = {
    kind: "NamedType",
    name: {
      kind: "Name",
      value: e
    }
  };
  do {
    if (33 === n.charCodeAt(i)) {
      i++;
      ignored();
      t = {
        kind: "NonNullType",
        type: t
      };
    }
    if (r) {
      if (93 !== n.charCodeAt(i++)) {
        throw error("NamedType");
      }
      ignored();
      t = {
        kind: "ListType",
        type: t
      };
    }
  } while (r--);
  return t;
}

var d = new RegExp("(?:(\\.{3})|(" + a.source + "))", "y");

var v = function(e) {
  e[e.Spread = 1] = "Spread";
  e[e.Name = 2] = "Name";
  return e;
}(v || {});

function selectionSet() {
  var e = [];
  var r;
  var t;
  do {
    d.lastIndex = i;
    if (null != (t = d.exec(n))) {
      i = d.lastIndex;
      if (null != t[v.Spread]) {
        ignored();
        var l = advance(a);
        if (null != l && "on" !== l) {
          ignored();
          e.push({
            kind: "FragmentSpread",
            name: {
              kind: "Name",
              value: l
            },
            directives: directives(!1)
          });
        } else {
          ignored();
          if ("on" === l) {
            if (null == (l = advance(a))) {
              throw error("NamedType");
            }
            ignored();
          }
          var o = directives(!1);
          if (123 !== n.charCodeAt(i++)) {
            throw error("InlineFragment");
          }
          ignored();
          e.push({
            kind: "InlineFragment",
            typeCondition: l ? {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: l
              }
            } : void 0,
            directives: o,
            selectionSet: selectionSet()
          });
        }
      } else if (null != (r = t[v.Name])) {
        var u = void 0;
        ignored();
        if (58 === n.charCodeAt(i)) {
          i++;
          ignored();
          u = r;
          if (null == (r = advance(a))) {
            throw error("Field");
          }
          ignored();
        }
        var s = arguments_(!1);
        ignored();
        var c = directives(!1);
        var f = void 0;
        if (123 === n.charCodeAt(i)) {
          i++;
          ignored();
          f = selectionSet();
        }
        e.push({
          kind: "Field",
          alias: u ? {
            kind: "Name",
            value: u
          } : void 0,
          name: {
            kind: "Name",
            value: r
          },
          arguments: s,
          directives: c,
          selectionSet: f
        });
      }
    } else {
      throw error("SelectionSet");
    }
  } while (125 !== n.charCodeAt(i));
  i++;
  ignored();
  return {
    kind: "SelectionSet",
    selections: e
  };
}

function fragmentDefinition() {
  var e;
  var r;
  if (null == (e = advance(a))) {
    throw error("FragmentDefinition");
  }
  ignored();
  if ("on" !== advance(a)) {
    throw error("FragmentDefinition");
  }
  ignored();
  if (null == (r = advance(a))) {
    throw error("FragmentDefinition");
  }
  ignored();
  var t = directives(!1);
  if (123 !== n.charCodeAt(i++)) {
    throw error("FragmentDefinition");
  }
  ignored();
  return {
    kind: "FragmentDefinition",
    name: {
      kind: "Name",
      value: e
    },
    typeCondition: {
      kind: "NamedType",
      name: {
        kind: "Name",
        value: r
      }
    },
    directives: t,
    selectionSet: selectionSet()
  };
}

var s = /(?:query|mutation|subscription|fragment)/y;

function operationDefinition(e) {
  var r;
  var t;
  var l;
  if (e) {
    ignored();
    r = advance(a);
    t = function variableDefinitions() {
      ignored();
      if (40 === n.charCodeAt(i)) {
        var e = [];
        i++;
        ignored();
        var r;
        do {
          if (36 !== n.charCodeAt(i++)) {
            throw error("Variable");
          }
          if (null == (r = advance(a))) {
            throw error("Variable");
          }
          ignored();
          if (58 !== n.charCodeAt(i++)) {
            throw error("VariableDefinition");
          }
          ignored();
          var t = type();
          var l = void 0;
          if (61 === n.charCodeAt(i)) {
            i++;
            ignored();
            l = value(!0);
          }
          ignored();
          e.push({
            kind: "VariableDefinition",
            variable: {
              kind: "Variable",
              name: {
                kind: "Name",
                value: r
              }
            },
            type: t,
            defaultValue: l,
            directives: directives(!0)
          });
        } while (41 !== n.charCodeAt(i));
        i++;
        ignored();
        return e;
      }
    }();
    l = directives(!1);
  }
  if (123 === n.charCodeAt(i)) {
    i++;
    ignored();
    return {
      kind: "OperationDefinition",
      operation: e || "query",
      name: r ? {
        kind: "Name",
        value: r
      } : void 0,
      variableDefinitions: t,
      directives: l,
      selectionSet: selectionSet()
    };
  }
}

function parse(e, r) {
  i = 0;
  return function document(e, r) {
    var n;
    var t;
    ignored();
    var a = [];
    do {
      if ("fragment" === (n = advance(s))) {
        ignored();
        a.push(fragmentDefinition());
      } else if (null != (t = operationDefinition(n))) {
        a.push(t);
      } else {
        throw error("Document");
      }
    } while (i < e.length);
    if (!r) {
      var l;
      return {
        kind: "Document",
        definitions: a,
        set loc(e) {
          l = e;
        },
        get loc() {
          if (!l) {
            l = {
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
          return l;
        }
      };
    }
    return {
      kind: "Document",
      definitions: a
    };
  }(n = "string" == typeof e.body ? e.body : e, r && r.noLocation);
}

function parseValue(e, r) {
  n = "string" == typeof e.body ? e.body : e;
  i = 0;
  ignored();
  return value(!1);
}

function parseType(e, r) {
  n = "string" == typeof e.body ? e.body : e;
  i = 0;
  return type();
}

var c = {};

function visit(e, r) {
  var n = [];
  var i = [];
  try {
    var t = function traverse(e, t, a) {
      var l = !1;
      var o = r[e.kind] && r[e.kind].enter || r[e.kind] || r.enter;
      var u = o && o.call(r, e, t, a, i, n);
      if (!1 === u) {
        return e;
      } else if (null === u) {
        return null;
      } else if (u === c) {
        throw c;
      } else if (u && "string" == typeof u.kind) {
        l = u !== e;
        e = u;
      }
      if (a) {
        n.push(a);
      }
      var d;
      var v = {
        ...e
      };
      for (var s in e) {
        i.push(s);
        var f = e[s];
        if (Array.isArray(f)) {
          var m = [];
          for (var g = 0; g < f.length; g++) {
            if (null != f[g] && "string" == typeof f[g].kind) {
              n.push(e);
              i.push(g);
              d = traverse(f[g], g, f);
              i.pop();
              n.pop();
              if (null == d) {
                l = !0;
              } else {
                l = l || d !== f[g];
                m.push(d);
              }
            }
          }
          f = m;
        } else if (null != f && "string" == typeof f.kind) {
          if (void 0 !== (d = traverse(f, s, e))) {
            l = l || f !== d;
            f = d;
          }
        }
        i.pop();
        if (l) {
          v[s] = f;
        }
      }
      if (a) {
        n.pop();
      }
      var p = r[e.kind] && r[e.kind].leave || r.leave;
      var h = p && p.call(r, e, t, a, i, n);
      if (h === c) {
        throw c;
      } else if (void 0 !== h) {
        return h;
      } else if (void 0 !== u) {
        return l ? v : u;
      } else {
        return l ? v : e;
      }
    }(e);
    return void 0 !== t && !1 !== t ? t : e;
  } catch (r) {
    if (r !== c) {
      throw r;
    }
    return e;
  }
}

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

var f = "\n";

var m = {
  OperationDefinition(e) {
    var r = e.operation;
    if (e.name) {
      r += " " + e.name.value;
    }
    if (e.variableDefinitions && e.variableDefinitions.length) {
      if (!e.name) {
        r += " ";
      }
      r += "(" + mapJoin(e.variableDefinitions, ", ", m.VariableDefinition) + ")";
    }
    if (e.directives && e.directives.length) {
      r += " " + mapJoin(e.directives, " ", m.Directive);
    }
    return "query" !== r ? r + " " + m.SelectionSet(e.selectionSet) : m.SelectionSet(e.selectionSet);
  },
  VariableDefinition(e) {
    var r = m.Variable(e.variable) + ": " + _print(e.type);
    if (e.defaultValue) {
      r += " = " + _print(e.defaultValue);
    }
    if (e.directives && e.directives.length) {
      r += " " + mapJoin(e.directives, " ", m.Directive);
    }
    return r;
  },
  Field(e) {
    var r = e.alias ? e.alias.value + ": " + e.name.value : e.name.value;
    if (e.arguments && e.arguments.length) {
      var n = mapJoin(e.arguments, ", ", m.Argument);
      if (r.length + n.length + 2 > 80) {
        r += "(" + (f += "  ") + mapJoin(e.arguments, f, m.Argument) + (f = f.slice(0, -2)) + ")";
      } else {
        r += "(" + n + ")";
      }
    }
    if (e.directives && e.directives.length) {
      r += " " + mapJoin(e.directives, " ", m.Directive);
    }
    if (e.selectionSet) {
      r += " " + m.SelectionSet(e.selectionSet);
    }
    return r;
  },
  StringValue(e) {
    if (e.block) {
      return printBlockString(e.value).replace(/\n/g, f);
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
  ObjectValue: e => "{" + mapJoin(e.fields, ", ", m.ObjectField) + "}",
  ObjectField: e => e.name.value + ": " + _print(e.value),
  Document(e) {
    if (!e.definitions || !e.definitions.length) {
      return "";
    }
    return mapJoin(e.definitions, "\n\n", _print);
  },
  SelectionSet: e => "{" + (f += "  ") + mapJoin(e.selections, f, _print) + (f = f.slice(0, -2)) + "}",
  Argument: e => e.name.value + ": " + _print(e.value),
  FragmentSpread(e) {
    var r = "..." + e.name.value;
    if (e.directives && e.directives.length) {
      r += " " + mapJoin(e.directives, " ", m.Directive);
    }
    return r;
  },
  InlineFragment(e) {
    var r = "...";
    if (e.typeCondition) {
      r += " on " + e.typeCondition.name.value;
    }
    if (e.directives && e.directives.length) {
      r += " " + mapJoin(e.directives, " ", m.Directive);
    }
    return r += " " + m.SelectionSet(e.selectionSet);
  },
  FragmentDefinition(e) {
    var r = "fragment " + e.name.value;
    r += " on " + e.typeCondition.name.value;
    if (e.directives && e.directives.length) {
      r += " " + mapJoin(e.directives, " ", m.Directive);
    }
    return r + " " + m.SelectionSet(e.selectionSet);
  },
  Directive(e) {
    var r = "@" + e.name.value;
    if (e.arguments && e.arguments.length) {
      r += "(" + mapJoin(e.arguments, ", ", m.Argument) + ")";
    }
    return r;
  },
  NamedType: e => e.name.value,
  ListType: e => "[" + _print(e.type) + "]",
  NonNullType: e => _print(e.type) + "!"
};

var _print = e => m[e.kind](e);

function print(e) {
  f = "\n";
  return m[e.kind] ? m[e.kind](e) : "";
}

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
    for (var l = 0, o = e.fields.length; l < o; l++) {
      var u = e.fields[l];
      a[u.name.value] = valueFromASTUntyped(u.value, r);
    }
    return a;

   case "Variable":
    return r && r[e.name.value];
  }
}

function valueFromTypeNode(e, r, n) {
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
        var l = valueFromTypeNode(e.values[t], r.type, n);
        if (void 0 === l) {
          return;
        } else {
          i.push(l);
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
}

function isSelectionNode(e) {
  return "Field" === e.kind || "FragmentSpread" === e.kind || "InlineFragment" === e.kind;
}

function Source(e, r, n) {
  return {
    body: e,
    name: r,
    locationOffset: n || {
      line: 1,
      column: 1
    }
  };
}

export { c as BREAK, GraphQLError, e as Kind, r as OperationTypeNode, Source, isSelectionNode, parse, parseType, parseValue, print, printBlockString, printString, valueFromASTUntyped, valueFromTypeNode, visit };
//# sourceMappingURL=graphql.web.mjs.map
