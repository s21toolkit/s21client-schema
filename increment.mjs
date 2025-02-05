import { readFileSync } from "node:fs"

/**
 * @type { {version: string} }
 */
// @ts-ignore
const pkg = JSON.parse(
	readFileSync("package.json", { encoding: "utf8", flag: "r" }),
)

const currentProductVersion = process.env.VERSION
if (!currentProductVersion) throw new Error("No product version specified")

const [version, buildVersion] = pkg.version.split("+")
if (!version || !buildVersion) throw new Error("Version parsing failed")

const productVersion = version.slice(0, version.lastIndexOf(buildVersion))

let buildNumber = Number.parseInt(buildVersion, 10) + 1
if (productVersion !== currentProductVersion) {
	buildNumber = 1
}

console.log(`${process.env.VERSION}${buildNumber}+${buildNumber}`)
