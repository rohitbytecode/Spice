
import test from "node:test";
import assert from "node:assert/strict";
import { deriveNamingConvention } from "../src/utils/naming.js";

test("converts kebab-case names", () => {
    assert.deepEqual(deriveNamingConvention("claim-management"), {
        originalName: "claim-management",
        kebabName: "claim-management",
        camelName: "claimManagement",
        pascalName: "ClaimManagement",
        constantName: "CLAIM_MANAGEMENT",
    });
});

test("normalizes underscores and spaces", () => {
    assert.equal(
        deriveNamingConvention("claim_management").pascalName,
        "ClaimManagement",
    );

    assert.equal(
        deriveNamingConvention("claim management").camelName,
        "claimManagement",
    );
});

test("handles PascalCase input", () => {
    assert.equal(
        deriveNamingConvention("ClaimManagement").kebabName,
        "claim-management",
    );
});

test("rejects names without alphanumeric characters", () => {
    assert.throws(
        () => deriveNamingConvention("   "),
        /Name must contain letters or numbers/,
    );
});