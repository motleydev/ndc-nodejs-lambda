import { describe, it } from "mocha";
import { assert } from "chai";
import { deriveSchema } from "../../../src/inference";
import { BuiltInScalarTypeName, FunctionNdcKind, NullOrUndefinability } from "../../../src/schema";

describe("basic inference", function() {
  it("simple types", function() {
    const schema = deriveSchema(require.resolve("./simple-types.ts"));

    assert.deepStrictEqual(schema, {
      compilerDiagnostics: [],
      functionIssues: {},
      functionsSchema: {
        scalarTypes: {
          BigInt: { type: "built-in" },
          Boolean: { type: "built-in" },
          Float: { type: "built-in" },
          String: { type: "built-in" },
          DateTime: { type: "built-in" },
          JSON: { type: "built-in" },
        },
        objectTypes: {},
        functions: {
          "hello": {
            ndcKind: FunctionNdcKind.Procedure,
            description: null,
            parallelDegree: null,
            arguments: [],
            resultType: {
              name: "String",
              kind: "scalar",
              type: "named",
            }
          },
          "add": {
            ndcKind: FunctionNdcKind.Function,
            description: null,
            parallelDegree: null,
            arguments: [
              {
                argumentName: "a",
                description: null,
                type: {
                  name: "Float",
                  kind: "scalar",
                  type: "named",
                }
              },
              {
                argumentName: "b",
                description: null,
                type: {
                  name: "Float",
                  kind: "scalar",
                  type: "named",
                }
              }
            ],
            resultType: {
              name: "Float",
              kind: "scalar",
              type: "named",
            }
          },
          "isEven": {
            ndcKind: FunctionNdcKind.Function,
            description: null,
            parallelDegree: null,
            arguments: [
              {
                argumentName: "x",
                description: null,
                type: {
                  name: "BigInt",
                  kind: "scalar",
                  type: "named",
                }
              }
            ],
            resultType: {
              name: "Boolean",
              kind: "scalar",
              type: "named",
            }
          },
          "dateTime": {
            ndcKind: FunctionNdcKind.Procedure,
            description: null,
            parallelDegree: null,
            arguments: [],
            resultType: {
              name: "DateTime",
              kind: "scalar",
              type: "named",
            }
          },
          "json": {
            ndcKind: FunctionNdcKind.Function,
            description: null,
            parallelDegree: null,
            arguments: [
              {
                argumentName: "input",
                description: null,
                type: {
                  name: "JSON",
                  kind: "scalar",
                  type: "named",
                }
              }
            ],
            resultType: {
              name: "JSON",
              kind: "scalar",
              type: "named",
            }
          }
        }
      }
    })
  });

  it("object return type", function() {
    const schema = deriveSchema(require.resolve("./object-return-type.ts"));

    assert.deepStrictEqual(schema, {
      compilerDiagnostics: [],
      functionIssues: {},
      functionsSchema: {
        functions: {
          "complex": {
            ndcKind: FunctionNdcKind.Procedure,
            description: null,
            parallelDegree: null,
            arguments: [
              {
                argumentName: "a",
                description: null,
                type: {
                  name: "Float",
                  kind: "scalar",
                  type: "named",
                }
              },
              {
                argumentName: "b",
                description: null,
                type: {
                  name: "Float",
                  kind: "scalar",
                  type: "named",
                }
              },
              {
                argumentName: "c",
                description: null,
                type: {
                  type: "nullable",
                  nullOrUndefinability: NullOrUndefinability.AcceptsUndefinedOnly,
                  underlyingType: {
                    name: "String",
                    kind: "scalar",
                    type: "named",
                  }
                }
              }
            ],
            resultType: {
              name: "Result",
              kind: "object",
              type: "named",
            },
          }
        },
        objectTypes: {
          "Result": {
            description: null,
            properties: [
              {
                propertyName: "num",
                description: null,
                type: {
                  name: "Float",
                  kind: "scalar",
                  type: "named",
                },
              },
              {
                propertyName: "str",
                description: null,
                type: {
                  name: "String",
                  kind: "scalar",
                  type: "named",
                },
              },
              {
                propertyName: "bod",
                description: null,
                type: {
                  name: "String",
                  kind: "scalar",
                  type: "named",
                },
              },
            ],
            isRelaxedType: false,
          },
        },
        scalarTypes: {
          Float: { type: "built-in" },
          String: { type: "built-in" },
        }
      }
    })
  })

  it("complex types", function() {
    const schema = deriveSchema(require.resolve("./complex-types.ts"));

    assert.deepStrictEqual(schema, {
      compilerDiagnostics: [],
      functionIssues: {},
      functionsSchema: {
        functions: {
          "bar": {
            ndcKind: FunctionNdcKind.Procedure,
            description: null,
            parallelDegree: null,
            arguments: [
              {
                argumentName: "string",
                description: null,
                type: {
                  type: "named",
                  kind: "scalar",
                  name: "String"
                }
              },
              {
                argumentName: "aliasedString",
                description: null,
                type: {
                  type: "named",
                  kind: "scalar",
                  name: "String"
                }
              },
              {
                argumentName: "genericScalar",
                description: null,
                type: {
                  type: "named",
                  kind: "scalar",
                  name: "String"
                }
              },
              {
                argumentName: "booleanUnion",
                description: null,
                type: {
                  type: "named",
                  kind: "scalar",
                  name: "Boolean"
                }
              },
              {
                argumentName: "array",
                description: null,
                type: {
                  type: "array",
                  elementType: {
                    type: "named",
                    kind: "scalar",
                    name: "String"
                  }
                }
              },
              {
                argumentName: "anonObj",
                description: null,
                type: {
                  type: "named",
                  kind: "object",
                  name: "bar_arguments_anonObj"
                }
              },
              {
                argumentName: "aliasedObj",
                description: null,
                type: {
                  type: "named",
                  kind: "object",
                  name: "Bar"
                }
              },
              {
                argumentName: "genericAliasedObj",
                description: null,
                type: {
                  type: "named",
                  kind: "object",
                  name: "GenericBar<string>"
                }
              },
              {
                argumentName: "genericAliasedObjWithComplexTypeParam",
                description: null,
                type: {
                  kind: "object",
                  name: "GenericBar<Bar>",
                  type: "named",
                }
              },
              {
                argumentName: "interfce",
                description: null,
                type: {
                  type: "named",
                  kind: "object",
                  name: "IThing"
                }
              },
              {
                argumentName: "aliasedInterface",
                description: null,
                type: {
                  type: "named",
                  kind: "object",
                  name: "IThing"
                }
              },
              {
                argumentName: "genericInterface",
                description: null,
                type: {
                  type: "named",
                  kind: "object",
                  name: "IGenericThing<string>"
                }
              },
              {
                argumentName: "aliasedGenericInterface",
                description: null,
                type: {
                  type: "named",
                  kind: "object",
                  name: "AliasedIGenericThing<number>"
                }
              },
              {
                argumentName: "aliasedClosedInterface",
                description: null,
                type: {
                  type: "named",
                  kind: "object",
                  name: "AliasedClosedIGenericThing"
                }
              },
              {
                argumentName: "aliasedIntersectionObj",
                description: null,
                type: {
                  type: "named",
                  kind: "object",
                  name: "IntersectionObject"
                }
              },
              {
                argumentName: "anonIntersectionObj",
                description: null,
                type: {
                  type: "named",
                  kind: "object",
                  name: "bar_arguments_anonIntersectionObj"
                }
              },
              {
                argumentName: "genericIntersectionObj",
                description: null,
                type: {
                  type: "named",
                  kind: "object",
                  name: "GenericIntersectionObject<string>"
                }
              },
            ],
            resultType: {
              name: "String",
              kind: "scalar",
              type: "named",
            }
          }
        },
        objectTypes: {
          "GenericBar<Bar>": {
            description: null,
            properties: [
              {
                propertyName: "data",
                description: null,
                type: {
                  kind: "object",
                  name: "Bar",
                  type: "named",
                },
              },
            ],
            isRelaxedType: false,
          },
          "GenericBar<string>": {
            description: null,
            properties: [
              {
                propertyName: "data",
                description: null,
                type: {
                  name: "String",
                  kind: "scalar",
                  type: "named",
                },
              },
            ],
            isRelaxedType: false,
          },
          "GenericIntersectionObject<string>": {
            description: null,
            properties: [
              {
                propertyName: "data",
                description: null,
                type: {
                  name: "String",
                  kind: "scalar",
                  type: "named",
                },
              },
              {
                propertyName: "test",
                description: null,
                type: {
                  name: "String",
                  kind: "scalar",
                  type: "named",
                },
              },
            ],
            isRelaxedType: false,
          },
          "Bar": {
            description: null,
            properties: [
              {
                propertyName: "test",
                description: null,
                type: {
                  name: "String",
                  kind: "scalar",
                  type: "named",
                },
              },
            ],
            isRelaxedType: false,
          },
          "IGenericThing<string>": {
            description: null,
            properties: [
              {
                propertyName: "data",
                description: null,
                type: {
                  name: "String",
                  kind: "scalar",
                  type: "named",
                },
              },
            ],
            isRelaxedType: false,
          },
          "AliasedIGenericThing<number>": {
            description: null,
            properties: [
              {
                propertyName: "data",
                description: null,
                type: {
                  name: "Float",
                  kind: "scalar",
                  type: "named",
                },
              },
            ],
            isRelaxedType: false,
          },
          "AliasedClosedIGenericThing": {
            description: null,
            properties: [
              {
                propertyName: "data",
                description: null,
                type: {
                  name: "Float",
                  kind: "scalar",
                  type: "named",
                },
              },
            ],
            isRelaxedType: false,
          },
          "IThing": {
            description: null,
            properties: [
              {
                propertyName: "prop",
                description: null,
                type: {
                  name: "String",
                  kind: "scalar",
                  type: "named",
                },
              },
            ],
            isRelaxedType: false,
          },
          "IntersectionObject": {
            description: null,
            properties: [
              {
                propertyName: "wow",
                description: null,
                type: {
                  name: "String",
                  kind: "scalar",
                  type: "named",
                },
              },
              {
                propertyName: "test",
                description: null,
                type: {
                  name: "String",
                  kind: "scalar",
                  type: "named",
                },
              },
            ],
            isRelaxedType: false,
          },
          "bar_arguments_anonIntersectionObj": {
            description: null,
            properties: [
              {
                propertyName: "num",
                description: null,
                type: {
                  name: "Float",
                  kind: "scalar",
                  type: "named",
                },
              },
              {
                propertyName: "test",
                description: null,
                type: {
                  name: "String",
                  kind: "scalar",
                  type: "named",
                },
              },
            ],
            isRelaxedType: false,
          },
          "bar_arguments_anonObj": {
            description: null,
            properties: [
              {
                propertyName: "a",
                description: null,
                type: {
                  name: "Float",
                  kind: "scalar",
                  type: "named",
                },
              },
              {
                propertyName: "b",
                description: null,
                type: {
                  name: "String",
                  kind: "scalar",
                  type: "named",
                },
              },
            ],
            isRelaxedType: false,
          },
        },
        scalarTypes: {
          Boolean: { type: "built-in" },
          Float: { type: "built-in" },
          String: { type: "built-in" },
        }
      }
    })
  });

  it("nullable and undefined types", function() {
    const schema = deriveSchema(require.resolve("./nullable-types.ts"));

    assert.deepStrictEqual(schema, {
      compilerDiagnostics: [],
      functionIssues: {},
      functionsSchema: {
        functions: {
          "test": {
            ndcKind: FunctionNdcKind.Procedure,
            description: null,
            parallelDegree: null,
            arguments: [
              {
                argumentName: "myObject",
                description: null,
                type: {
                  kind: "object",
                  name: "MyObject",
                  type: "named",
                },
              },
              {
                argumentName: "nullableParam",
                description: null,
                type: {
                  type: "nullable",
                  nullOrUndefinability: NullOrUndefinability.AcceptsNullOnly,
                  underlyingType: {
                    kind: "scalar",
                    name: "String",
                    type: "named",
                  },
                },
              },
              {
                argumentName: "undefinedParam",
                description: null,
                type: {
                  type: "nullable",
                  nullOrUndefinability: NullOrUndefinability.AcceptsUndefinedOnly,
                  underlyingType: {
                    kind: "scalar",
                    name: "String",
                    type: "named",
                  },
                },
              },
              {
                argumentName: "nullOrUndefinedParam",
                description: null,
                type: {
                  type: "nullable",
                  nullOrUndefinability: NullOrUndefinability.AcceptsEither,
                  underlyingType: {
                    kind: "scalar",
                    name: "String",
                    type: "named",
                  },
                },
              },
              {
                argumentName: "optionalParam",
                description: null,
                type: {
                  type: "nullable",
                  nullOrUndefinability: NullOrUndefinability.AcceptsUndefinedOnly,
                  underlyingType: {
                    kind: "scalar",
                    name: "String",
                    type: "named",
                  },
                },
              },
            ],
            resultType: {
              type: "nullable",
              nullOrUndefinability: NullOrUndefinability.AcceptsNullOnly,
              underlyingType: {
                kind: "scalar",
                name: "String",
                type: "named",
              }
            },
          },
        },
        objectTypes: {
          "MyObject": {
            description: null,
            properties: [
              {
                propertyName: "string",
                description: null,
                type: {
                  kind: "scalar",
                  name: "String",
                  type: "named",
                },
              },
              {
                propertyName: "nullableString",
                description: null,
                type: {
                  type: "nullable",
                  nullOrUndefinability: NullOrUndefinability.AcceptsNullOnly,
                  underlyingType: {
                    kind: "scalar",
                    name: "String",
                    type: "named",
                  },
                },
              },
              {
                propertyName: "optionalString",
                description: null,
                type: {
                  type: "nullable",
                  nullOrUndefinability: NullOrUndefinability.AcceptsUndefinedOnly,
                  underlyingType: {
                    kind: "scalar",
                    name: "String",
                    type: "named",
                  },
                },
              },
              {
                propertyName: "optionalBoolean",
                description: null,
                type: {
                  type: "nullable",
                  nullOrUndefinability: NullOrUndefinability.AcceptsUndefinedOnly,
                  underlyingType: {
                    kind: "scalar",
                    name: "Boolean",
                    type: "named",
                  },
                },
              },
              {
                propertyName: "undefinedString",
                description: null,
                type: {
                  type: "nullable",
                  nullOrUndefinability: NullOrUndefinability.AcceptsUndefinedOnly,
                  underlyingType: {
                    kind: "scalar",
                    name: "String",
                    type: "named",
                  },
                },
              },
              {
                propertyName: "nullOrUndefinedString",
                description: null,
                type: {
                  type: "nullable",
                  nullOrUndefinability: NullOrUndefinability.AcceptsEither,
                  underlyingType: {
                    kind: "scalar",
                    name: "String",
                    type: "named",
                  },
                },
              },
            ],
            isRelaxedType: false,
          },
        },
        scalarTypes: {
          Boolean: { type: "built-in" },
          String: { type: "built-in" },
        },
      }
    })
  });

  it("recursive types", function() {
    const schema = deriveSchema(require.resolve("./recursive-types.ts"));

    assert.deepStrictEqual(schema, {
      compilerDiagnostics: [],
      functionIssues: {},
      functionsSchema: {
        functions: {
          "bar": {
            ndcKind: FunctionNdcKind.Procedure,
            description: null,
            parallelDegree: null,
            arguments: [],
            resultType: {
              type: "named",
              kind: "object",
              name: "Foo"
            }
          }
        },
        objectTypes: {
          "Foo": {
            description: null,
            properties: [
              {
                propertyName: "a",
                description: null,
                type: {
                  type: "named",
                  kind: "scalar",
                  name: "Float"
                }
              },
              {
                propertyName: "b",
                description: null,
                type: {
                  type: "array",
                  elementType: {
                    type: "named",
                    kind: "object",
                    name: "Foo"
                  }
                }
              }
            ],
            isRelaxedType: false,
          },
        },
        scalarTypes: {
          Float: { type: "built-in" },
        },
      }
    })
  });

  it("literal types", function() {
    const schema = deriveSchema(require.resolve("./literal-types.ts"));

    assert.deepStrictEqual(schema, {
      compilerDiagnostics: [],
      functionIssues: {},
      functionsSchema: {
        scalarTypes: {
          BigInt: { type: "built-in" },
          Boolean: { type: "built-in" },
          Float: { type: "built-in" },
          String: { type: "built-in" },
        },
        functions: {
          "literalTypes": {
            ndcKind: FunctionNdcKind.Procedure,
            description: null,
            arguments: [],
            parallelDegree: null,
            resultType: {
              name: "LiteralProps",
              kind: "object",
              type: "named",
            }
          },
        },
        objectTypes: {
          "LiteralProps": {
            description: null,
            properties: [
              {
                propertyName: "literalString",
                description: null,
                type: {
                  type: "named",
                  kind: "scalar",
                  name: BuiltInScalarTypeName.String,
                  literalValue: "literal-string"
                }
              },
              {
                propertyName: "literalNumber",
                description: null,
                type: {
                  type: "named",
                  kind: "scalar",
                  name: BuiltInScalarTypeName.Float,
                  literalValue: 123,
                }
              },
              {
                propertyName: "literalBoolean",
                description: null,
                type: {
                  type: "named",
                  kind: "scalar",
                  name: BuiltInScalarTypeName.Boolean,
                  literalValue: true,
                }
              },
              {
                propertyName: "literalBigInt",
                description: null,
                type: {
                  type: "named",
                  kind: "scalar",
                  name: BuiltInScalarTypeName.BigInt,
                  literalValue: -123n,
                }
              },
              {
                propertyName: "literalStringEnum",
                description: null,
                type: {
                  type: "named",
                  kind: "scalar",
                  name: BuiltInScalarTypeName.String,
                  literalValue: "EnumItem",
                }
              },
              {
                propertyName: "literalNumericEnum",
                description: null,
                type: {
                  type: "named",
                  kind: "scalar",
                  name: BuiltInScalarTypeName.Float,
                  literalValue: 0,
                }
              }
            ],
            isRelaxedType: false,
          }
        },
      }
    })
  });
});
