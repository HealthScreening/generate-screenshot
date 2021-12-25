import {assert} from "chai"
import generateScreenshot, {closeBrowser, startupBrowser} from "./generateScreenshot";

describe("generateScreenshot Test Suite", () => {
    before(async () => {
        await startupBrowser();
    })
    it("should generate a guest screenshot", async () => {
        await generateScreenshot({
            name: "John Doe",
            date: "2020-01-01",
            type: "guest"
        });
        assert.isTrue(true)
    })
    it("should generate a student screenshot", async () => {
        await generateScreenshot({
            name: "John Doe",
            date: "2020-01-01",
            type: "student"
        });
        assert.isTrue(true)
    })
    it("should generate a employee screenshot", async () => {
        await generateScreenshot({
            name: "John Doe",
            date: "2020-01-01",
            type: "employee"
        });
        assert.isTrue(true)
    })
    it("should generate a guest screenshot on an iPhone 6", async () => {
        await generateScreenshot({
            name: "John Doe",
            date: "2020-01-01",
            type: "guest",
            device: "iPhone 6"
        });
        assert.isTrue(true)
    })
    after(async () => {
        await closeBrowser();
    })
})