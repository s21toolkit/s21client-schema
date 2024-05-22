import type { CodegenConfig } from "@graphql-codegen/cli"

export default {
	overwrite: true,
	schema: "./schema.gql",
	documents: "./schema.gql",
	generates: {
		"src/sdk.ts": {
			plugins: [
				"typescript",
				"typescript-graphql-request",
				"typescript-operations",
			],
			config: {
				scalars: {
					Date: "Date",
					DateTime: "Date",
					JsonNode: "unknown",
					Time: "Date",
					URL: "string",
					UUID: "string",
				},
			},
		},
	},
} satisfies CodegenConfig
