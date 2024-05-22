// Fixes "The inferred type of X cannot be named without a reference to Y" for gql`` literals
import type {} from "graphql"

export * from "./sdk"

import { type Sdk, getSdk } from "./sdk"

export type Schema = Sdk
export const Schema = getSdk
