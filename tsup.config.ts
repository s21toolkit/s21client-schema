import { configs } from "@s21toolkit/shared/tsup"
import env from "env-var"
import { defineConfig } from "tsup"

const PRODUCT_VERSION = env.get("PRODUCT_VERSION").required().asString()

export default defineConfig({
	...configs.library,
	define: {
		PRODUCT_VERSION__: JSON.stringify(PRODUCT_VERSION),
	},
})
