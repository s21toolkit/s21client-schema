import { readFileSync, writeFileSync } from "node:fs"

/**
 * @param {string} currentVersion
 * @param {number} currentBuildVersion
 * @param {{ (p: number, b: number): number }} cb
 */
function getVersionWithBuildNumber(currentVersion, currentBuildVersion, cb) {
	const [major, minor, patch] = currentVersion
		.split(".")
		.map((e) => Number.parseInt(e, 10))
	if (
		Number.isNaN(major) ||
		Number.isNaN(minor) ||
		Number.isNaN(patch) ||
		patch === undefined
	)
		throw new Error("Semver parsing failed")
	return `${major}.${minor}.${Math.max(cb(patch, currentBuildVersion), 0)}`
}

/**
 * @type { {version: string} }
 */
// @ts-ignore
const pkg = JSON.parse(
	readFileSync("package.json", { encoding: "utf8", flag: "r" }),
)

const newProductVersion = process.env.VERSION
if (!newProductVersion) throw new Error("No product version specified")

const [currentVersion, currentBuildVersion] = pkg.version.split("+")
if (!currentVersion || !currentBuildVersion)
	throw new Error("Version parsing failed")

const currentBuildNumber = Number.parseInt(currentBuildVersion, 10)
const currentProductVersion = getVersionWithBuildNumber(
	currentVersion,
	currentBuildNumber,
	(p, b) => p - b,
)

let newBuildVersion = currentBuildNumber + 1
if (
	currentProductVersion.split(".").slice(0, 2).join(".") !==
	newProductVersion.split(".").slice(0, 2).join(".")
) {
	newBuildVersion = 1
}

// console.log(`${currentBuildVersion} => ${newBuildVersion}`, `${currentProductVersion} => ${newProductVersion}`)
const newVersion = getVersionWithBuildNumber(
	newProductVersion,
	newBuildVersion,
	(p, b) => p + b,
)
pkg.version = `${newVersion}+${newBuildVersion}`
writeFileSync("package.json", JSON.stringify(pkg, undefined, 2), {
	encoding: "utf8",
})

console.log(pkg.version)
